import React, {Component} from 'react';
import {Client} from '@stomp/stompjs';
import '../../css/Room.css'

// interface IProps {
//     name: string;
// }
//
// interface IState {
//     roomStatusColor:String
// }

// type QuoteProps = {
//     colour: string
// }

type QuoteState = {
    currentColour: string,
}


class Room extends Component <any, QuoteState> {

    // constructor(props:IProps) {
    //         super(props);
    //
    //         this.state = {
    //             roomStatusColor: 'green',
    //         }

    // this.onClick = this.onClick.bind(this);
    // }

    state: QuoteState = {
        currentColour: 'green',
    };


    componentDidMount() {

        console.log('Component did mount');
        // The compat mode syntax is totally different, converting to v5 syntax
        // Client is imported from '@stomp/stompjs'
        var client = new Client();

        client.configure({
            brokerURL: 'ws://127.0.0.1:8080/chat',
            onConnect: () => {
                console.log('onConnect');

                client.subscribe('/topic/room', message => {
                    const messageFromServerParagraph = document.createElement('p');
                    const messageJSON = JSON.parse(message.body);

                    messageFromServerParagraph.innerText = messageJSON.status;
                    // this.roomStatusHandler(messageJSON.status);

                    // document.getElementById('messages-from-server').appendChild(messageFromServerParagraph);

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

    changeColor2 = (): string => {
        return "pink"

    };

    changeColor = (): void => this.setState(state => ({currentColour: this.changeColor2()}));

    // roomStatusHandler = (status: any) => {
    //     console.log("Room status now is " + status.toString());
    //     if (status === 'alarm') {
    //         this.setState({roomStatusColor: 'alarmCssStatus'});
    //     } else if (status === 'normal') {
    //         this.setState({roomStatusColor: 'normalCssStatus'});
    //     }
    // };

    // onClick(){
    //     this.setState((previousState, props) => ({
    //         roomStatusColor: !previousState.toggle,
    //     }));
    // }

    render() {
        let rectangle = this.state.currentColour;
        // this.state.black === 'green' ? "blackButton" : "whiteButton";
        // this.setState(rectangle,props)=> {
        //
        // }
        return (
            <div>
                <div>
                    <p>MedimaNet Room </p>
                </div>
                <div id='rectangle'
                     className={rectangle}/>
                <button onClick={this.changeColor}>Change color</button>
                <div id='messages-from-server'></div>
            </div>
        );
    }



}

export default Room
