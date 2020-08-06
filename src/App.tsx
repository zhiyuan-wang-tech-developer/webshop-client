import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalReduxStore from './reducers/store';
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
                <HomePage />
              </Route>
              <Route exact path="/admin">
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
