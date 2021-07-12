import React from 'react'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import RadioButtons, { Option } from 'components/shared/inputs/radioButtons'
import Checkbox from 'components/shared/inputs/checkbox'

const checkboxes: Option[] = [
  { label: 'radio 1', value: 'first_box', disabled: false },
  { label: 'radio 2', value: 'second_box', disabled: true },
  { label: 'radio 3', value: 'third_box' },
  { label: 'radio 4', value: 'fourth_box' },
]

const HomePage = ({}) => (
  <PageWrapper>
    <RadioButtons header='Some Radio Buttons' options={checkboxes} onChange={(v) => console.log(v)} />
    <Checkbox label='Checkbox Label' onChange={(v) => console.log(v)} />
  </PageWrapper>
)

export default HomePage
