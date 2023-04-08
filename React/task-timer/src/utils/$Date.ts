export function diffInSeconds(startDate: Date, endDate: Date) {
  const diffInMilliseconds = Math.abs(startDate.getTime() - endDate.getTime())
  const diffInSeconds = diffInMilliseconds / 1000

  return Math.floor(diffInSeconds)
}

export function getDistanceNow(past: Date): string {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - past.getTime()
  const minutes = diffInMilliseconds / 1000 / 60
  const hours = minutes / 60
  const days = hours / 24
  const week = days / 7

  if (week >= 2) {
    return `Há cerca de ${Math.floor(week)} atrás`
  } else if (days >= 2) {
    return `Há ${Math.floor(days)} atrás`
  } else if (hours >= 2) {
    return `Há ${Math.floor(hours)} atrás`
  } else if (minutes >= 2) {
    return `Há ${Math.floor(minutes)} minutos`
  } else {
    return 'Há poucos segundos'
  }
}
