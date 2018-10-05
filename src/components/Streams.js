import React from 'react'
import { Stream } from './StreamItem'

export const Streams = (props) => {
  let arr = props.show === 'all' 
                ? [...props.streams.sort((a, b) => a.type < b.type)] 
                : props.show === 'online' 
                  ? props.streams.filter(item => item.type === 'online')
                  : props.streams.filter(item => item.type === 'offline')

  return(
    <div>
    {arr.map(item => <Stream name={item.name}
                             logo={item.logo}
                             title={item.title}
                             onClick={props.onClick}
                             game={item.game}
                             viewers={item.viewers}
                             key={item.id}/>)}
    </div>
  )
}