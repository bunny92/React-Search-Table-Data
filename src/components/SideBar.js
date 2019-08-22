import React, { Component } from "react";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import navbarOption from "../SideBarOption.json";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: navbarOption
    };
  }

  selectedMenu(menuLink){
    console.log(menuLink);
    this.props.sendLink(menuLink)
  }
  render() {
    return (
      <div>
        <SideNav>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            {this.state.nav.map((data, index) => {
              return (
                <NavItem key={index} eventKey={data.name} onClick={this.selectedMenu.bind(this, data.link)}>
                  <NavIcon>
                    <i className={data.icon} style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>{data.name}</NavText>
                </NavItem>
              );
            })}
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}

export default SideBar;
