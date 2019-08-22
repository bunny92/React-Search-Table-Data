import React, { Component } from "react";
import "./App.css";
import SideBar from "./components/SideBar";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Client from "./pages/Client";
import Accounting from "./pages/Accounting";
import Projects from "./pages/Projects";
import Messages from "./pages/Messages";
import Template from "./pages/Template";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Support from "./pages/Support";

class App extends Component {
  state = {
    title: "Hi",
    getPath: null
  };

  componentDidMount() {
    if (window.location) {
      this.setState({
        getPath: window.location.pathname
      });
    }
  }

  receivedLink(nav) {
    console.log(nav);
    this.setState(
      {
        getPath: nav
      },
      () => {
        window.history.replaceState({}, "title", this.state.getPath);
      }
    );
  }

  render() {
    console.log(this.state.getPath);
    return (
      <div>
        <SideBar sendLink={this.receivedLink.bind(this)} />
        {(() => {
          switch (this.state.getPath) {
            case "/admin/home":
              return <Home />;
            case "/admin/calender":
              return <Calendar />;
            case "/admin/client":
              return <Client />;
            case "/admin/accounting":
              return <Accounting />;
            case "/admin/projects":
              return <Projects />;
            case "/admin/messages":
              return <Messages />;
            case "/admin/templates":
              return <Template />;
            case "/admin/settings":
              return <Settings />;
            case "/admin/users":
              return <Users />;
            case "/admin/support":
              return <Support />;
            default:
              return null;
          }
        })()}

        {this.state.getPath ? null : <Home />}
        {this.state.getPath === -"/" ? <Home /> : null}
      </div>
    );
  }
}

export default App;
