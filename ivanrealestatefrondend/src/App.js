//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom'

import HeaderMenu from './Components/HeaderMenu/HeaderMenu';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <HeaderMenu />

      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
