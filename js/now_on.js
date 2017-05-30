import guideData from '../guide.json'

export default NowOn = function (time) {
  const minutesFrom = function (time) {
    const [hours, minutes] = time.split(':')
    return parseInt(hours) * 60 + parseInt(minutes)
  }
  const minutesNow = minutesFrom(`${time.getHours()}:${time.getMinutes()}`)
  const date = time.getDate()

  const earlyOffset = function (minutes) {
    return minutes + (minutes < (8 * 60) ? 24 * 60 : 0)
  }

  const sort = function (artists) {
    return artists.sort((a, b) => {
      const aMinutes = earlyOffset(minutesFrom(a.time))
      const bMinutes = earlyOffset(minutesFrom(b.time))
      if (aMinutes < bMinutes) { return -1 }
      if (aMinutes > bMinutes) { return 1 }
      return 0
    })
  }

  const flatArtists = (function () {
    return guideData.reduce((total, section) => {
      const heading = {}
      const artists = sort(section.artists).map((artist) => {
        const minutes = minutesFrom(artist.time)
        const incDay = minutes < (8 * 60) ? 1 : 0
        return Object.assign({}, artist, {
          date: section.date + incDay,
          minutes,
        })
      })
      return total.concat(heading).concat(artists)
    }, [])
  }())

  const count = function () {
    return flatArtists.length
  }

  const index = function () {
    const index = flatArtists.findIndex(artist =>
      artist.date === date && artist.minutes >= minutesNow)

    return index === -1 ? 0 : index
  }

  return {
    count,
    sort,
    index,
  }
}
