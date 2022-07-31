import React, { Component } from 'react'
import botGif from '../resource/bot/Oro.png'
import './bot.css'
import { getAuth } from 'firebase/auth';

export class Bot extends Component {

    constructor(props) {
        super(props)
        this.acceptBot = this.acceptBot.bind(this);
        this.state = {
            acceptedBot: false,
            botIdeaContent:
                <div>
                    <p className='content'>Hi,</p>
                    <p className='content'>Im mood recommender bot</p>
                    {/* <br /> */}
                    <p className='question'>
                        <span onClick={this.acceptBot}>
                            can i start &lt;yes&gt;
                        </span>
                    </p>
                </div>
        }
        this.botActivate = this.botActivate.bind(this);
        this.botIdea = React.createRef();
        this.bot_active = false

    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(this.state)

    // }
    // componentDidMount() {
    //     console.log(this.botIdea)
    // }

    botActivate(params) {
        if (this.bot_active) {
            this.botIdea.current.style.display = 'none'
        }
        else {
            this.botIdea.current.style.display = 'block'
            
        }
        this.bot_active = !this.bot_active

    }
    acceptBot(e) {
        const auth = getAuth();

        this.setState({
            botIdeaContent: <div>
                <p className='content'>hey {auth.currentUser.displayName}</p>
                <p className='content'>What should i recommend you<br /></p>
                <div onClick={this.props.getMusic} className='question'>
                    1.Music
                </div>
            </div>
        })

    }
    render() {
        return (
            <div className='bot-main'>
                <div className='bot-idea' ref={this.botIdea} id='bot-idea'>
                    {this.state.botIdeaContent}

                </div>
                <button onClick={this.botActivate} className='bot-gif {}' id='bot-gif'>
                    <img src={botGif} height='300' alt="error bot" />
                </button>
            </div>
        )
    }
}

export default Bot