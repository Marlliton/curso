/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const username = String(req.query?.username)
  const date = String(req.query.date)

  if (!date) return res.status(400).json({ message: 'Date is not defined.' })

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return res.status(400).json({ message: 'User does not exists.' })

  const referenceDate = dayjs(String(date))
  const isPaste = referenceDate.endOf('day').isBefore(new Date())

  if (isPaste) return res.json({ possibleTimes: [], availableTimes: [] })

  const availability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!availability) return res.json({ possibleTimes: [], availableTimes: [] })

  const { start_time_in_minutes, end_time_in_minutes } = availability
  const startHour = start_time_in_minutes / 60
  const endHour = end_time_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isBlockedTime = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isBlockedTime && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}
