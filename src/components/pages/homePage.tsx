import React from 'react'

import PageWrapper from 'components/shared/layouts/pageWrapper'

import CheckboxRadioList from 'components/utils/checkboxRadioList'

import type {CheckboxRadioListElementProps} from 'components/utils/checkboxRadioList'


const checkboxes: Array<CheckboxRadioListElementProps> = [
    {"label" : "checkbox1", "id" : "cb1", "value" : "first_box", "checked": true},
    {"label" : "checkbox2", "id" : "cb2", "value" : "second_box"}
];


const HomePage = ({}) => <PageWrapper><CheckboxRadioList type="checkbox" name="test-checks" elements={checkboxes} onChange={(e) => console.log(e.target.value)} /></PageWrapper>

export default HomePage
