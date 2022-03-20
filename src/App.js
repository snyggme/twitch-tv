import React, { Component } from 'react';
import { Streams } from './components/Streams'
import { Button } from './components/Button'
import { Header } from './components/Header'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {   
      show: 'all',
      isLoaded: false,
      streams: []
    } 
  }
  componentDidMount() {
    allStreams.map(item => this.makeRequest(item))
  }
  handleAllButton = () => {
    this.setState({
      show: 'all'
    })
  }
  handleOnlineButton = () => {
    this.setState({
      show: 'online'
    })
  }
  handleOfflineButton = () => {
    this.setState({
      show: 'offline'
    })
  }
  makeRequest(user) {
    fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${user}`,)
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
  handleButtonRemove = (stream) => {
    allStreams = allStreams.filter(item => item !== stream)
    this.setState(prevState => ({
      streams: prevState.streams.filter(item => item.name !== stream)
    }))
  }
  handleAddButton = (user) => {
    if (allStreams.some(item => item === user)) {
      alert('This stream aldeady exists!')
      return
    }

    fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${user}`)
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

let allStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

const userDefaultIcons = ['https://robohash.org/1', 'https://robohash.org/2', 'https://robohash.org/3', 'https://robohash.org/4', 'https://robohash.org/5', 'https://robohash.org/6'];

const getRandomLogo = () => {
  return userDefaultIcons[Math.floor(Math.random() * (userDefaultIcons.length))]
}

export default App;
