export default NowOn = function (time, artists) {
  const earlyOffset = function (minutes) {
    return minutes + (minutes < (8 * 60) ? 24 * 60 : 0)
  }

  const minutesFrom = function (time) {
    const [hours, minutes] = time.split(':')
    return earlyOffset(parseInt(hours) * 60 + parseInt(minutes))
  }
  const minutesNow = minutesFrom(`${time.getHours()}:${time.getMinutes()}`)

  const sort = function () {
    return artists.sort((a, b) => {
      const aMinutes = minutesFrom(a.time)
      const bMinutes = minutesFrom(b.time)
      if (aMinutes < bMinutes) { return -1 }
      if (aMinutes > bMinutes) { return 1 }
      return 0
    })
  }

  const times = (function () {
    return sort().map(artist => minutesFrom(artist.time))
  }())

  const count = times.length

  const index = function () {
    const lastIndex = times.length - 1
    if (times[0] >= minutesNow) { return 0 }
    if (times[lastIndex] <= minutesNow) { return lastIndex }
    return times.findIndex(time => time > minutesNow) - 1
  }

  return {
    count,
    sort,
    index,
  }
}
