import React from 'react'

export const Stream = (props) => {
  const type = props.title === 'Offline' ? '' : 'stream-online'
  return(
    <div className={`stream-grid ${type}`}> 
      <div className='stream-logo'>
        <img src={props.logo}/>
      </div>
      <div className='stream-name'>
        <a target='_blank' href={`https://twitch.tv/${props.name}`}>{props.name}</a>
      </div>
      <div className='stream-title'>{props.title}</div>
      <div id='delete-stream' 
           onClick={(e) => props.onClick(props.name)}>
        <i className='fa fa-trash'/>
      </div>
      {type === '' ? '' : <div id='stream-viewers'>{props.game} <i className='fa fa-eye'/> {props.viewers}</div>}
    </div>
  )
}
