import subject from '../js/now_on'

describe('index', () => {
  const thursdayArtists = 31
  const fridayDayArtists = 31
  const fridayNightArtists = 23
  const saturdayDayArtists = 32

  it('returns sorted artists ordering early times last', () => {
    const date = new Date(2017, 6, 15, 17, 0)
    const artists = [
      { time: '01:00' },
      { time: '16:00' },
      { time: '13:00' },
    ]
    expect(subject(date).sort(artists)).toEqual([
      { time: '13:00' },
      { time: '16:00' },
      { time: '01:00' },
    ])
  })

  it('returns height when Thursday', () => {
    const date = new Date(2017, 6, 15, 17, 0)
    expect(subject(date).index()).toEqual(1 + 14)
  })

  it('returns height when Friday Day', () => {
    const date = new Date(2017, 6, 16, 16, 0)
    expect(subject(date).index()).toEqual(
      1 +
      thursdayArtists +
      1 +
      8)
  })

  it('returns height when Friday Night', () => {
    const date = new Date(2017, 6, 16, 21, 15)
    expect(subject(date).index()).toEqual(
      1 +
      thursdayArtists +
      1 +
      fridayDayArtists +
      1)
  })

  it('returns height when Saturday Night', () => {
    const date = new Date(2017, 6, 17, 21, 15)
    expect(subject(date).index()).toEqual(
      1 +
      thursdayArtists +
      1 +
      fridayDayArtists +
      1 +
      fridayDayArtists +
      1 +
      fridayNightArtists)
  })
})
