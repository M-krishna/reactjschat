import React, { Component } from 'react'
import logo from '../assets/images/z.png';
import ulogo from '../assets/images/u.png';

export default class MessageList extends Component {

    componentDidUpdate(){
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        var element = document.getElementById("msglist");
        element.scrollTop = element.scrollHeight;
    }

    giveMeEmoji = () => {
        const emojiarr = ['😀', '😁', '😂', '😃', '😄', '😋', '😎']
        let rno = Math.floor((Math.random() * 7) + 1);
        return emojiarr[rno];
    }
    
  render() {
    
    return (
      <div className="messagelist"  id="msglist">
        <ul>
            {this.props.messages.map((data, index) => {
                if(data.uname === 'bot'){
                    if(data.loading){
                        return(
                            <li key={index}>
                                <img src="https://code.fb.com/wp-content/uploads/2017/06/Facebook-Messenger-Bot-01.png" className="botimage" alt="botimg" />
                                <div className="bdiv">
                                    <span id="wave">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </span>
                                </div>
                            </li>
                        )
                    }
                    else{
                        if(data.intent === 'greetings'){
                            return(
                                    <li key={index}>
                                        <img src={logo} className="botimage" alt="botimg" />
                                        <div className="bdiv">
                                            <pre className="botmsg">{data.msg} <span role="img" aria-label="emoji">{}</span></pre>
                                            <p className="btime">{data.time}</p>
                                        </div>
                                    </li>
                            )
                        }
                        else{
                            return(
                                <li key={index}>
                                    <img src={logo} className="botimage" alt="botimg" />
                                    <div className="bdiv">
                                        <p className="botmsg">{data.msg}</p>
                                        <p className="btime">{data.time}</p>
                                    </div>
                                </li>
                            )
                        }
                    }
                }
                else{
                    return(
                        <li key={index}>
                            <img src={ulogo} className="userimage" alt="userimg"/>
                            <div className="udiv">
                                <p className="usermsg">{data.msg}</p>
                                <p className="utime">{data.time}</p>
                            </div>
                        </li>   
                    )
                }  
            })}
        </ul>
      </div>
    )
  }
}
