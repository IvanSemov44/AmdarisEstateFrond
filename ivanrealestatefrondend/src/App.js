import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider';
import { createTheme, ThemeProvider } from '@mui/material';

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
import ListMessages from './Components/Message/ListMessages/ListMessages';
import CreateComapny from './Components/Company/CreateCompany/CreateCompany';
import CompanyCatalog from './Components/Company/CompanyCatalog/CompanyCatalog';
import CompanyDetails from './Components/Company/CompanyDetails/CompanyDetails';
import Footer from './Components/Footer/Footer';
import UserDetails from './Components/UserProfile/UserDetails';
import UserEstates from './Components/UserProfile/UserEstates';
import CompanyImagePage from './Components/Image/CompanyImagePage';


function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',

    },
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
              <Route path='/editcompany/:companyId/images' element={<CompanyImagePage />}></Route>
              <Route path='/cities' element={<CityPage />}></Route>
              <Route path='/countries' element={<CountryPage />}></Route>
              <Route path='/currencies' element={<CurrencyPage />}></Route>
              <Route path='/estatetypes' element={<EstateTypePage />}></Route>
              <Route path='/giphy' element={<GiphyCatalog />}></Route>
              <Route path='/createcity' element={<CreateCity />}></Route>
              <Route path='/messages' element={<ListMessages />}></Route>
              <Route path='/createCompany' element={<CreateComapny />}></Route>
              <Route path='/companyCatalog' element={<CompanyCatalog />}></Route>
              <Route path='/companyCatalog/:companyId' element={<CompanyDetails />}></Route>
              <Route path='/user/:userId' element={<UserDetails />}></Route>
              <Route path='/userEstates/:userId' element={<UserEstates />}></Route>
            </Routes>
            <Footer />
          </CssBaseline>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
