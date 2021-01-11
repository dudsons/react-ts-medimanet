import React, {Component} from 'react'
import './App.css'
// import StompJs5Example from "./components/examples/StompJs5Example";
// import ReactStompExample from "./components/examples/ReactStompExample";
import Room from "./components/websocket/Room";
import StompJsExample from "./components/tests/StompJsExample";
import UserRegisterGraphql from "./components/graphql/UserRegisterGraphql";
import GraphqlTest from "./components/tests/GraphqlTest";
import GraphqlHookTest from "./components/tests/GraphqlHookTest";
// import TestButton from "./components/medimanet/TestButton";

type ShowHideComponent = {
    showRoom: boolean,
    showHideStompJs5Example: boolean,
    showGraphqlTest: boolean,
}


class App extends Component<any, ShowHideComponent> {

    state: ShowHideComponent = {
        showRoom: false,
        showHideStompJs5Example: false,
        showGraphqlTest: false
    };

    hideComponent(name: string) {
        console.log(name);
        switch (name) {
            case "showHideStompJs5Example":
                this.setState({showHideStompJs5Example: !this.state.showHideStompJs5Example});
                this.setState({showRoom: false});
                this.setState({showGraphqlTest: false});
                break;
            case "showRoom":
                this.setState({showRoom: !this.state.showRoom});
                this.setState({showHideStompJs5Example: false});
                this.setState({showGraphqlTest: false});
                break;
            case "showGraphqlTest":
                this.setState({showGraphqlTest: !this.state.showGraphqlTest});
                this.setState({showRoom: false});
                this.setState({showHideStompJs5Example: false});
                break;
            default:
            // null;
        }
    }

    render() {
        const {showHideStompJs5Example, showRoom, showGraphqlTest} = this.state;
        return (
            <div>
                <div>
                    <button onClick={() => this.hideComponent("showHideStompJs5Example")}>
                        Click to show StompJs5Example component
                    </button>
                    <button onClick={() => this.hideComponent("showRoom")}>
                        Click to show Room component
                    </button>
                    <button onClick={() => this.hideComponent("showGraphqlTest")}>
                        Click to show GraphqlTest
                    </button>
                </div>
                {showRoom && <Room/>}
                {showHideStompJs5Example && <StompJsExample/>}
                {showGraphqlTest && <GraphqlTest/>}
                <GraphqlHookTest/>
            </div>
        );
    }

}

export default App
