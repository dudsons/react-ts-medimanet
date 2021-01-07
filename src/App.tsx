import React, { Component } from 'react'
import './App.css'
// import StompJs5Example from "./components/examples/StompJs5Example";
// import ReactStompExample from "./components/examples/ReactStompExample";
import Room from "./components/websocket/Room";
// import TestButton from "./components/medimanet/TestButton";

class App extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     name: "React",
  //     showHideStompJs5Example: false,
  //     showHideReactStompExample: false,
  //   };
  // }

  // hideComponent(name) {
  //   console.log(name);
  //   switch (name) {
  //     case "showHideStompJs5Example":
  //       this.setState({ showHideStompJs5Example: !this.state.showHideStompJs5Example });
  //       this.setState({ showHideReactStompExample: false });
  //       this.setState({ showHideDemo3: false });
  //       break;
  //     case "showHideReactStompExample":
  //       this.setState({ showHideReactStompExample: !this.state.showHideReactStompExample });
  //       this.setState({ showHideStompJs5Example: false });
  //       this.setState({ showHideDemo3: false });
  //       break;
  //     default:
  //       // null;
  //   }
  // }

  render() {
    // const { showHideStompJs5Example, showHideReactStompExample, showHideDemo3 } = this.state;
    return (
        <div>
          <div>

            {/*<button onClick={() => this.hideComponent("showHideStompJs5Example")}>*/}
              {/*Click to show StompJs5Example component*/}
            {/*</button>*/}
            {/*<button onClick={() => this.hideComponent("showHideReactStompExample")}>*/}
              {/*Click to show ReactStompExample component*/}
            {/*</button>*/}
          </div>
          {/*{showHideStompJs5Example && <StompJs5Example/>}*/}
          {/*{showHideReactStompExample && <ReactStompExample />}*/}
          <Room/>
        </div>
    );
  }

}

export default App
