import React from 'react';
import Home from './blocks/pages/home';

import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter,Route,Routes} from 'react-router-dom';

const App = () => (
  <HashRouter>
    <Routes>      
      <Route exact path="/" element={<Home/>}/>
    </Routes>
  </HashRouter>
)

export default App