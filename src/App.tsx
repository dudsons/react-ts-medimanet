import React, {Component} from 'react'
import './App.css'
// import StompJs5Example from "./components/examples/StompJs5Example";
// import ReactStompExample from "./components/examples/ReactStompExample";
import Room from "./components/websocket/Room";
import StompJsExample from "./components/tests/StompJsExample";
// import TestButton from "./components/medimanet/TestButton";

type ShowHideComponent = {
    room: boolean,
    showHideStompJs5Example: boolean,
}


class App extends Component<any, ShowHideComponent> {

    // constructor() {
    //   super();
    //   this.state = {
    //     name: "React",
    //     showHideStompJs5Example: false,
    //     showHideReactStompExample: false,
    //   };
    // }

    state: ShowHideComponent = {
        room: false,
        showHideStompJs5Example: false
    };

    hideComponent(name: string) {
        console.log(name);
        switch (name) {
            case "showHideStompJs5Example":
                this.setState({showHideStompJs5Example: !this.state.showHideStompJs5Example});
                this.setState({room: false});
                break;
            case "room":
                this.setState({room: !this.state.room});
                this.setState({showHideStompJs5Example: false});
                break;
            default:
            // null;
        }
    }

    render() {
        const {showHideStompJs5Example, room} = this.state;
        return (
            <div>
                <div>
                    <button onClick={() => this.hideComponent("showHideStompJs5Example")}>
                        Click to show StompJs5Example component
                    </button>
                    <button onClick={() => this.hideComponent("room")}>
                        Click to show Room component
                    </button>
                </div>
                {room && <Room/>}
                {showHideStompJs5Example && <StompJsExample/>}
            </div>
        );
    }

}

export default App
