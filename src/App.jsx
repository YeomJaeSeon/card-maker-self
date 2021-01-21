import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.module.css';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/app" exact>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
