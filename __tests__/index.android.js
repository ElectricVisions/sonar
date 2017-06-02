import 'react-native'
import React from 'react'
import Index from '../index.android.js'

import renderer from 'react-test-renderer' // Call after react-native

jest.useFakeTimers()

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  )
})
