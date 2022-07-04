import React, { Component } from 'react'
import botGif from '../resource/bot/Oro.png'
import './bot.css'

export class Bot extends Component {

    constructor(self) {
        super()
        this.state = {
            bot_active: false
        }
        this.botActivate = this.botActivate.bind(this);

    }

    componentDidMount() {

    }

    botActivate(params) {
        this.setState({
            bot_active: !this.state.bot_active
        })
        if(this.state.bot_active){
            document.getElementById('bot-idea').style.display = 'none'
        }
        else{
            document.getElementById('bot-idea').style.display = 'block'

        }
    }
    render() {
        return (
            <div className='bot-main'>
                <div className='bot-idea' id='bot-idea'>
                    Hi,
                    <br />
                    Im mood recommender bot

                </div>
                <button onClick={this.botActivate} className='bot-gif {}' id='bot-gif'>
                    <img src={botGif} height='300' alt="error bot" />
                </button>
            </div>
        )
    }
}

export default Bot