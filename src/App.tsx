import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import GlobalReduxStore from './store/store';
import HomePage from './components/Home/HomePage';
import AdminPage from './components/Administration/AdminPage';

function Main() {
  return (
    <div className="Main">
      <main>
        <BrowserRouter>
          <Switch>
            <Provider store={GlobalReduxStore}>
              {/* The exact param disables the partial matching for a route and makes sure that 
              it only returns the route if the path is an EXACT match to the current url. */}
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
            </Provider>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
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
