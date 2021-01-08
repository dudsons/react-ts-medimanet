import React, {Component} from 'react';
import { Client } from '../../../node_modules/@stomp/stompjs';


class StompJsExample extends Component<any,any>{

    componentDidMount() {
        // The compat mode syntax is totally different, converting to v5 syntax
        const client = new Client();
        console.log('Component did mount');
        // Client is imported from '@stomp/stompjs'

        client.configure({
            brokerURL: 'ws://127.0.0.1:8080/chat',
            onConnect: () => {
                console.log('onConnect');

                client.subscribe('/topic/messages', message => {
                    const messageFromServerParagraph = document.createElement('p');
                    messageFromServerParagraph.innerText = message.body;
                    if(document.getElementById('messages-from-server')!=null) {
                        document.getElementById('messages-from-server')!.appendChild(messageFromServerParagraph);
                    }
                    console.log(message.body);
                });
            },

        });

        client.activate();
    }

    // clickHandler = (e:any) => {
    //     e.preventDefault();
    //     const textToServer = document.getElementById('text-to-server');
    //     client.publish({destination: '/app/chat', body: JSON.stringify({value: textToServer.value})});
    // };

    render() {
        return (
            <div className="App">
                <div>
                    <p>StompJs5 </p>
                </div>
                <form>
                    <label>Your message</label><input type="text" id="text-to-server"/>
                    {/*<button onClick={this.clickHandler}>Send</button>*/}
                </form>
                <div id='messages-from-server'>Messages from server</div>
            </div>
        );
    }
}
export default StompJsExample
