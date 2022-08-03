import './App.css';
import React from 'react';
import {Route} from 'react-router-dom'; 
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx';
import Activities from './components/Activities/Activities.jsx';
import CountryDetail from './components/CountryDetail/CountryDetail';

function App() {

  return (
    <React.Fragment>
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path= '/home'>  
        <Home/> 
      </Route> 
      <Route path= '/country/:countryId'>
        <NavBar/>
        <CountryDetail />
      </Route>
      <Route path= '/activities/new'>
        <Activities/>
      </Route> 
  </React.Fragment>
  )
}

export default App;
