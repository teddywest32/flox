import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Api from './api';
import Home from './sites/home';
import Category from './sites/category';
import Auth from './sites/auth/auth';
import Header from './partials/header';
import Footer from './partials/footer';

class Flox extends React.Component {

  constructor() {
    super();

    this.state = {
      logged: false
    };

    this.checkLogin();
  }

  render() {
    return (
      <div>
        <Header logged={this.state.logged} />
        {React.cloneElement(this.props.children, {logged: this.state.logged, checkLogin: this.checkLogin.bind(this)})}
        <Footer logged={this.state.logged} />
      </div>
    );
  }

  checkLogin() {
    Api.checkLogin().then((value) => {
      this.setState({
        logged: value.logged
      })
    });
  }
}

render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route component={Flox} path={config.uri}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Auth} />
      <Route path=":category" component={Category} />
    </Route>
  </Router>
), document.querySelector('.flox'));