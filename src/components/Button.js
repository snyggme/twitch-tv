import React from 'react'

export const Button = (props) => {
  const newClass = props.active === props.text.toLowerCase() ? 'btn btn-text-white' : 'btn'
  return(
    <div className={newClass} onClick={props.onClick}>
      {props.text}
      <div>{props.show}</div>
    </div>
  )
}