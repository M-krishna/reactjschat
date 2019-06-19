import React, { Component } from 'react';

export default class MessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSend = e => {
        e.preventDefault();
        const { message } = this.state;
        if(message.length > 0){
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let time = hours + ':' + (minutes < 10 ? '0'+minutes : minutes);
            let userMsg = {
                msg: message,
                uname: 'user',
                time: time
            }
            this.props.sendMessage(userMsg)
        }
        this.setState({message: ''})
    }

  render() {
    return (
      <div className="messageform">
        <form onSubmit={this.handleSend}>
            <input
                type="text"
                value={this.state.message}
                onChange={this.handleChange}
                className="inputfield"
                placeholder="Type your message here..."
            />
        </form>
      </div>
    )
  }
}
