import React, {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {Route} from 'react-router'

import App from './App';


class Navigation extends Component {
    render() {
      return (
       <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />

            {/* if refresh it doesn't return blank page  */}
            <Route  path="/admin" component={App}>
                <Route exact path="/admin/home" component={App} />
                <Route exact path="/admin/accounting" component={App} />
            </Route>

        </Switch>
       </BrowserRouter>
      );
    }
  }
  
  export default Navigation;