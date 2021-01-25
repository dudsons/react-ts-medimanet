import React, {Component} from 'react';
import {Client} from '@stomp/stompjs';
import '../../css/Room.css'

type QuoteState = {
    currentColour: string,
}

export default class Room extends Component <any, QuoteState> {

    state: QuoteState = {
        currentColour: 'green',
    };


    componentDidMount() {

        console.log('Component did mount');
        // The compat mode syntax is totally different, converting to v5 syntax
        // Client is imported from '@stomp/stompjs'
        const client = new Client();

        client.configure({
            brokerURL: 'ws://127.0.0.1:9000/chat',
            onConnect: () => {
                console.log('onConnect');

                client.subscribe('/topic/room', message => {
                    const messageFromServerParagraph = document.createElement('p');
                    const messageJSON = JSON.parse(message.body);

                    messageFromServerParagraph.innerText = messageJSON.status;
                    this.changeColor(messageJSON.status);
                    console.log(messageJSON);

                });
            },


            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        });


        client.activate();
    }


     changeColor (status:String): void {
         if (status === 'alarm') {
                     this.setState({currentColour: 'alarmCssStatus'});
                 } else if (status === 'normal') {
                     this.setState({currentColour: 'normalCssStatus'});
                 }
    }

    render() {
        let rectangle = this.state.currentColour;

        return (
            <div>
                <div>
                    <p>MedimaNet Room </p>
                </div>
                <div id='rectangle'
                     className={rectangle}/>
            </div>
        );
    }
}

