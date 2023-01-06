//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom'
import EstateCatalog from './Components/Estate/EstateCatalog/EstateCatalog';
import EstateDetails from './Components/Estate/EstateDetails/EstateDetails';
import GiphyCatalog from './Components/Giphy/GiphyCatalog/GiphyCatalog';
import CreateEstate from './Components/Estate/CreateEstate/CreateEstate';

import HeaderMenu from './Components/HeaderMenu/HeaderMenu';
import Home from './Components/Home/Home';
import CityPage from './Components/City/CityPage';
import CreateCity from './Components/City/CreateCity';

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <HeaderMenu />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/catalog' element={<EstateCatalog />}></Route>
          <Route path='/catalog/:estateId' element={<EstateDetails />}></Route>
          <Route path='/createEstate' element={<CreateEstate />}></Route>
          <Route path='/cities' element={<CityPage />}></Route>
          <Route path='/giphy' element={<GiphyCatalog />}></Route>
          <Route path='/createcity' element={<CreateCity />}></Route>

        </Routes>
      </CssBaseline>
    </div>
  );
}

export default App;
