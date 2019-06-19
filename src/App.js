import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Title from './components/Title';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import chat from './assets/images/chat.png';
import close from './assets/images/close.png';

class App extends Component {
  constructor(props){
    super(props);
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = hours + ':' + (minutes < 10 ? '0'+minutes : minutes);
    this.state = {
      messages: [
        {
          msg: `Hello There! Welcome to Zeebavans.
          You can ask 
          1.About our vans
          2.Insurance
          3.Booking
          4.Pricing and Packages
          `,
          uname: 'bot',
          time: time
        },
      ],
      toggleWindow: false,
    }
  }

  sendMessage = msg => {

    this.setState({
      messages: this.state.messages.concat(msg),
    })

    axios.post('http://0217315a.ngrok.io/chatbotresponse/', {
      message: msg.msg
    })
    .then(res => {
      
      let res_data = res.data;
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let time = hours + ':' + (minutes < 10 ? '0'+minutes : minutes);

      let resObj = {
        msg: res_data.msg,
        uname: res_data.uname,
        intent: res_data.intent,
        time: time
      }
        this.setState({
          messages: this.state.messages.concat(resObj),
        })
    })
    .catch(err => {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let time = hours + ':' + (minutes < 10 ? '0'+minutes : minutes);
      let errObj = {
        msg: "There has been some error on our side. Please try again after sometime. Thank You",
        uname: 'bot',
        time: time
      }
        this.setState({
          messages: this.state.messages.concat(errObj),
        })
    })
  }

  toggleChatWindow = () => {
    this.setState({toggleWindow: !this.state.toggleWindow})
  }
  render() {
    return (
      <div className="App">
        <div className={"showChat " + (this.state.toggleWindow ? 'show' : 'hide')}>
          <Title />
          <MessageList messages={this.state.messages} loading={this.state.loading} />
          <MessageForm sendMessage={this.sendMessage} />
        </div>
        <button className="chatBtn" onClick={this.toggleChatWindow}>
          {this.state.toggleWindow ? <img src={close} alt="closeimg" className="chaticons" /> : <img src={chat} alt="chatimg" className="chaticons" />}
        </button>
      </div>
    );
  }
}

export default App;
