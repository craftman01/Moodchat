import React, { Component } from 'react'
import botGit from '../resource/bot/robot-idle.gif'
import './bot.css'

export class Bot extends Component {

    constructor(self) {
        super()
    }
    render() {
        return (
            <div className='bot-main'>
                <div className='bot-idea'>
                    Hi,
                    <br />
                    asdfiu hasd fromasdfu hsadf

                </div>
                <button className='bot-gif'>
                    <img src={botGit} height='200' alt="error bot" />
                </button>
            </div>
        )
    }
}

export default Bot