import { google } from "googleapis"
import { prisma } from './prisma'
import dayjs from "dayjs";

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      user_id: userId,
      provider: 'google',
    },
  })

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY
  })

  auth.setCredentials({
    access_token: account.access_token, 
    refresh_token: account.refresh_token,
    expiry_date: account?.expires_at ? account.expires_at * 1000 : null
  })

  if(!account.expires_at) return auth

  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date())

  if(isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {access_token, expiry_date, id_token, refresh_token, scope} = credentials
  }
}
