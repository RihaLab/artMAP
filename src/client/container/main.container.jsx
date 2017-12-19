import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard.container';
import Pipeline from './pipeline.container';

export default function Main() {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link href="/" className="navbar-brand" to="/">Artin DNA</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><NavLink activeClassName="active" to="/pipeline">Pipeline</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/pipeline" component={Pipeline} />
        </Switch>
      </div>
    </div>
  );
}
