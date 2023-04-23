import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { setCookie } from 'nookies'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, name } = req.body
  const existsUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (existsUser) {
    return res.status(400).json({ message: 'Username already exists.' })
  }

  const user = await prisma.user.create({
    data: {
      username,
      name,
    },
  })

  setCookie({ res }, '@yourcall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res.status(201).json(user)
}
