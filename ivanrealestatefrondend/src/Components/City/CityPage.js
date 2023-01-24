import { CityContext } from '../../contexts/CityContext';

import Box from '@mui/material/Box';

import CityList from './CityList';
import CreateCity from './CreateCity';

import useCities from "../../CustemHooks/CustemCityHooks/useCities";
import useFetchForCity from "../../CustemHooks/CustemCityHooks/useFetchForCity";

import { Spinner } from '../Common/Spinner/Spinner';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const CityPage = () => {
    const { user } = useContext(AuthContext);
    const [cities, setCities, isLoading] = useFetchForCity([]);
    const { removeCity, createCity, updateCity } = useCities(user.token);

    const cityCreateHandler = async (newCity) => {
        const createdCity = await createCity(newCity);
        setCities(state => [
            ...state,
            createdCity,
        ]);
    };

    const cityDeleteHandler = (cityId) => {
        removeCity(cityId)
        setCities(state => state.filter(x => x.cityId !== cityId));
    };

    const cityEditHandler = (city, newCityName) => {
        const updatedCity = { ...city, cityName: newCityName };

        updateCity(updatedCity, { cityName: newCityName });

        setCities(state => state.map(x => x.cityId === city.cityId ? updatedCity : x))
    }

    return (
        <CityContext.Provider value={{ cities, cityDeleteHandler, cityEditHandler }}>

            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <CreateCity cityCreateHandler={cityCreateHandler} />
                {
                    isLoading
                        ? <Spinner />
                        : <CityList />
                }
            </Box>
        </CityContext.Provider>
    )
}

export default CityPage;