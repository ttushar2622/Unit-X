import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';

const MainRoutes = () => {
  return (
     <Router>
        <Route path='/home'  element={<Home/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
     </Router>
  );
}

export default MainRoutes;
