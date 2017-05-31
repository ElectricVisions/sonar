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
    expect(subject(new Date(), artists).sort()).toEqual([
      { time: '13:00' },
      { time: '16:00' },
      { time: '17:30' },
      { time: '21:00' },
      { time: '22:00' },
      { time: '01:00' },
    ])
  })

  it('returns index when before first artist', () => {
    expect(subject(dateFrom(12, 59), artists).index()).toEqual(0)
  })

  it('returns index when first artist is starting', () => {
    expect(subject(dateFrom(13, 0), artists).index()).toEqual(0)
  })

  it('returns index when last artist is starting', () => {
    expect(subject(dateFrom(1, 0), artists).index()).toEqual(5)
  })

  it('returns index when after last artist', () => {
    expect(subject(dateFrom(2, 0), artists).index()).toEqual(5)
  })

  it('returns index when time is within artist times', () => {
    expect(subject(dateFrom(17, 0), artists).index()).toEqual(1)
    expect(subject(dateFrom(21, 15), artists).index()).toEqual(3)
  })
})
