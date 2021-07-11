import React from 'react'

import styles from './checkboxRadioList.scss'

enum Kind {
  checkbox = "checkbox",
  radio = "radio"
}


type KindOfList = keyof typeof Kind;

type CheckboxRadioListProps = {
  className? : string
  type : KindOfList
  name : string
  elements : Array<CheckboxRadioListElementProps>
  onChange : ((e: React.ChangeEvent<HTMLInputElement>) => void)
}

export type CheckboxRadioListElementProps = {
	label : string
	className? : string
	value : string
	id : string
	checked? : boolean
}

//need this to make sure type and name are consistant across elements am open to better way to accomplish this

type CheckboxRadioListElementPropsInternal = {
	label : string
	className? : string
	value : string
	id : string
	name : string
	checked? : boolean
	type : KindOfList
	onChange : ((e: React.ChangeEvent<HTMLInputElement>) => void)
}

const CheckboxRadioListElement = (props : CheckboxRadioListElementPropsInternal) => {
	return (
	<li className={(props.type == Kind.checkbox) ? styles.styled_checkbox : styles.styled_radio}>
    	<input className={props.className} id={props.id} name={props.name} type={props.type} value={props.value} defaultChecked={props.checked} onChange={props.onChange} />
    	<label htmlFor={props.id}>{props.label}</label>
  	</li>
	)
}


const CheckboxRadioList = (props : CheckboxRadioListProps) => {
 
  return (
<ul className={[styles.unstyled, styles.centered, props.className].join(" ")}>
	{props.elements.map(function (value) {
  		return <CheckboxRadioListElement key={value.id} label={value.label} value={value.value} id={value.id} name={props.name} type={props.type} checked={value.checked} onChange={props.onChange} />
	})}
</ul>
  )
}

export default CheckboxRadioList