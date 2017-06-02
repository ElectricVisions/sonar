import subject from '../js/now_on'

describe('index', () => {
  const artists = [
    { time: '01:00' },
    { time: '17:30' },
    { time: '16:00' },
    { time: '13:00' },
    { time: '22:00' },
    { time: '21:00' },
  ]

  const dateFrom = function (hour, minute) {
    return new Date(2017, 6, 15, hour, minute)
  }

  it('returns sorted artists ordering early times last', () => {
    expect(subject(artists).sort()).toEqual([
      { time: '13:00' },
      { time: '16:00' },
      { time: '17:30' },
      { time: '21:00' },
      { time: '22:00' },
      { time: '01:00' },
    ])
  })

  it('returns index when before first artist', () => {
    expect(subject(artists).index(dateFrom(12, 59))).toEqual(0)
  })

  it('returns index when first artist is starting', () => {
    expect(subject(artists).index(dateFrom(13, 0))).toEqual(0)
  })

  it('returns index when last artist is starting', () => {
    expect(subject(artists).index(dateFrom(1, 0))).toEqual(5)
  })

  it('returns index when after last artist', () => {
    expect(subject(artists).index(dateFrom(2, 0))).toEqual(5)
  })

  it('returns index when time is within artist times', () => {
    expect(subject(artists).index(dateFrom(17, 0))).toEqual(1)
    expect(subject(artists).index(dateFrom(22, 0))).toEqual(4)
    expect(subject(artists).index(dateFrom(21, 15))).toEqual(3)
  })

  it('returns index for first artist at the time', () => {
    const artists = [
      { time: '09:00' },
      { time: '12:00' },
      { time: '12:00' },
      { time: '13:00' },
    ]

    expect(subject(artists).index(dateFrom(12, 20))).toEqual(1)
  })
})
