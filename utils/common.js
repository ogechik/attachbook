export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}

export function getMonthsDays(startDate) {
  let days
  const timeDifference = dateDiffInDays(new Date(startDate), new Date())

  const weeks = Math.floor(timeDifference / 7)

  if (timeDifference > 7) {
    days = timeDifference % 7
  } else {
    days = timeDifference
  }

  if (weeks === 0 && days === 0) {
    return 'Day 1'
  }
  if (weeks === 0 && days === 1) {
    return `${days}day`
  }
  if (weeks === 0 && days > 1) {
    return `${days}day(s)`
  }
  if (days === 0) {
    return `${weeks}week(s)`
  }
  return `${weeks}week(s) ${days}day(s)`
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export function formatDate(isoDate) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]
  const formatted = new Date(isoDate)
  const year = formatted.getFullYear()
  const month = months[formatted.getMonth()]
  const day = formatted.getDate()

  return `${day.toString()}TH ${month} ${year.toString()}`
}
