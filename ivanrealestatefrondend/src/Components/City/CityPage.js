import { CityContext } from '../../contexts/CityContext';

import Box from '@mui/material/Box';

import CityList from './CityList';
import useCities from "../../CustemHooks/useCities";
import useFetchForCity from "../../CustemHooks/useFetchForCity";
import CreateCity from './CreateCity';

import { Spinner } from '../Common/Spinner/Spinner';

const CityPage = () => {
    const [cities, setCities, isLoading] = useFetchForCity([]);
    const { removeCity, createCity, updateCity } = useCities();

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