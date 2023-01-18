//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom'

import GiphyCatalog from './Components/Giphy/GiphyCatalog/GiphyCatalog';
import CreateEstate from './Components/Estate/CreateEstate/CreateEstate';
import EstateDetails from './Components/Estate/EstateDetails/EstateDetails';
import EstateCatalog from './Components/Estate/EstateCatalog/EstateCatalog';

import Home from './Components/Home/Home';
import CityPage from './Components/City/CityPage';
import ImagePage from './Components/Image/ImagePage';
import CreateCity from './Components/City/CreateCity';
import CountryPage from './Components/Country/CountryPage';
import HeaderMenu from './Components/HeaderMenu/HeaderMenu';
import CurrencyPage from './Components/Currency/CurrencyPage';
import EditEstate from './Components/Estate/EditEstate/EditEstate';
import EstateTypePage from './Components/EstateType/EstateTypePage';

import { AuthProvider } from './contexts/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <div className="App">
          <CssBaseline>
            <HeaderMenu />

            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/catalog' element={<EstateCatalog />}></Route>
              <Route path='/catalog/:estateId' element={<EstateDetails />}></Route>
              <Route path='/createEstate' element={<CreateEstate />}></Route>
              <Route path='/editEstate/:estateId' element={<EditEstate />}></Route>
              <Route path='/editEstate/:estateId/images' element={<ImagePage />}></Route>
              <Route path='/cities' element={<CityPage />}></Route>
              <Route path='/countries' element={<CountryPage />}></Route>
              <Route path='/currencies' element={<CurrencyPage />}></Route>
              <Route path='/estatetypes' element={<EstateTypePage />}></Route>
              <Route path='/giphy' element={<GiphyCatalog />}></Route>
              <Route path='/createcity' element={<CreateCity />}></Route>

            </Routes>
          </CssBaseline>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
