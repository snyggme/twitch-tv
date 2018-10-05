import React from 'react'
import { AddStreamForm } from './StreamForm'

export const Header = (props) => {
  return(
    <header>
      <h1><i className="fa fa-twitch"/><span>Twitch Streamers</span></h1>
      <AddStreamForm onSubmit={props.onSubmit}/>
    </header>
  )
}