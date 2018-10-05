import React, { Component } from 'react';
import { AddStreamForm } from './components/StreamForm'
import { Streams } from './components/Streams'
import { Button } from './components/Button'
import { Header } from './components/Header'
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {   
      show: 'all',
      isLoaded: false,
      streams: []
    } 
    this.handleAllButton = this.handleAllButton.bind(this)
    this.handleOnlineButton = this.handleOnlineButton.bind(this)
    this.handleOfflineButton = this.handleOfflineButton.bind(this)
    this.handleButtonRemove = this.handleButtonRemove.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
  }
  componentDidMount() {
    allStreams.map(item => this.makeRequest(item))
  }
  handleAllButton(e) {
    this.setState({
      show: 'all'
    })
  }
  handleOnlineButton(e) {
    this.setState({
      show: 'online'
    })
  }
  handleOfflineButton(e) {
    this.setState({
      show: 'offline'
    })
  }
  makeRequest(user) {
    fetch(`https://api.twitch.tv/kraken/streams/${user}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Client-ID': 'rrpmmx09b1azju8jpwk6ugeei3uml9'
      }
    })
      .then(res => res.json())
        .then(
          (result) => {
            const streamObj = result.stream !== null ? {
                name: user,
                title: result.stream.channel.status,
                type: 'online',
                logo: result.stream.channel.logo,
                viewers: result.stream.viewers,
                id: result.stream._id,
                game: result.stream.game
              } : {
                name: user,
                title: 'Offline',
                type: 'offline',
                logo: getRandomLogo(),
                id: Math.random() * 1000
              }
            
            this.setState(prevState => ({
              streams: [...prevState.streams, streamObj],
              isLoaded: prevState.streams.length + 1 === allStreams.length
            }))
          },
          (error) => {
            alert(error)
          }
        )
  }
  handleButtonRemove(stream) {
    allStreams = allStreams.filter(item => item !== stream)
    this.setState(prevState => ({
      streams: prevState.streams.filter(item => item.name !== stream)
    }))
  }
  handleAddButton(user) {
    if (allStreams.some(item => item === user)) {
      alert('This stream aldeady exists!')
      return
    }

    fetch(`https://api.twitch.tv/kraken/users/${user}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Client-ID': 'rrpmmx09b1azju8jpwk6ugeei3uml9'
      }
    })
      .then(res => res.json())
        .then(
          (result) => {
            if (result.hasOwnProperty('error')) {
              alert('Twitch.tv doesnt stream this!')
              return
            }

            allStreams.push(user)
            
            this.makeRequest(user)
          },
          (error) => {
            alert(error)
          }
        )
  }
  render() {
    const btnActivePosition = {left: this.state.show === 'all' 
                                ? '3.5%' 
                                : this.state.show === 'online' 
                                  ? '36.5%' 
                                  : '69.5%'}
    const streamsContent = this.state.isLoaded 
                            ? <Streams streams={this.state.streams} 
                                       show={this.state.show}
                                       onClick={this.handleButtonRemove}/> 
                            : <div className='loading'></div>
    return(
      <div className='container'>  
        <Header onSubmit={this.handleAddButton}/>
        <main>
          <div className='btns-container' >
            <div className='btn-active' style={btnActivePosition}></div>
            <Button text='All' 
                    active={this.state.show}
                    onClick={this.handleAllButton}/>
            <Button text='Online'
                    active={this.state.show}
                    onClick={this.handleOnlineButton}/>
            <Button text='Offline'
                    active={this.state.show}
                    onClick={this.handleOfflineButton}/>
          </div>
          {streamsContent} 
        </main>
      </div>
    )
  }
}

let allStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp"]

const userDefaultIcons = ['https://static-cdn.jtvnw.net/user-default-pictures/cd618d3e-f14d-4960-b7cf-094231b04735-profile_image-300x300.jpg', 'https://static-cdn.jtvnw.net/user-default-pictures/cd618d3e-f14d-4960-b7cf-094231b04735-profile_image-300x300.jpg', 'https://static-cdn.jtvnw.net/user-default-pictures/49988c7b-57bc-4dee-bd4f-6df4ad215d3a-profile_image-300x300.jpg', 'https://static-cdn.jtvnw.net/user-default-pictures/bb97f7e6-f11a-4194-9708-52bf5a5125e8-profile_image-300x300.jpg', 'https://static-cdn.jtvnw.net/user-default-pictures/4cbf10f1-bb9f-4f57-90e1-15bf06cfe6f5-profile_image-300x300.jpg', 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg']

const getRandomLogo = () => {
  return userDefaultIcons[Math.floor(Math.random() * (userDefaultIcons.length))]
}

export default App;
