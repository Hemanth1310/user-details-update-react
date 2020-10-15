import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './containers/Layout/Layout';
import {Switch,Route} from 'react-router-dom'
import Login from './containers/Login/Login'
import Main from './containers/Main/Main'
function App() {
  return (
    <div >
      <Layout>
      <Switch>
        <Route path="/" exact component={Main}></Route>
      </Switch>
      
      </Layout>
    </div>
  );
}

export default App;
