/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'

import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const username = String(req.query?.username)
  const { year, month } = req.query

  if (!year || !month)
    return res.status(400).json({ message: 'Year or month not specified.' })

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return res.status(400).json({ message: 'User does not exists.' })

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDates = [0, 1, 2, 3, 4, 5, 6].filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableDay) => availableDay.week_day === weekDay,
      ),
  )

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount, 
      ((UTI.end_time_in_minutes - UTI.start_time_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI 
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY)) -- O dia no mysql começa em 1, no javascript no 0. Então vamos adicionar 1 nas datas dos nossos schedulings

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.date),
      ((UTI.end_time_in_minutes - UTI.start_time_in_minutes) / 60)
      
    HAVING amount >= size
      OR size = 0
  `
  const blockedDates = blockedDatesRaw.map((item) => item.date)
  return res.json({ blockedWeekDates, blockedDates })
}
