import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import globalStore from './store/store';
import HomePage from './components/Home/HomePage';
import AdminPage from './components/Administration/AdminPage';
import AdminLoginContainer from './components/Administration/Login/AdminLoginContainer';

function Main() {
  return (
    <div className="Main">
      <main>
        <Provider store={globalStore}>
          {/* NOTE: Wrap <BrowserRouter /> in <Provider /> so that route handlers can get access to the store. 
          And the store data will not be lost after page switch.*/}
          <BrowserRouter>
            <Switch>
              {/* The exact param disables the partial matching for a route and makes sure that 
              it only returns the route if the path is an EXACT match to the current url. */}
              <Route exact path="/">
                <Redirect to="/login/admin" />
              </Route>
              <Route exact path="/login/admin" component={AdminLoginContainer} />
              <Route exact path="/home" component={HomePage} />
              <Route path="/admin" component={AdminPage} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </main>
    </div >
  )
}

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
