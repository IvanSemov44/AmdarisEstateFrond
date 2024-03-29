import Box from '@mui/material/Box';

import { CountryContext } from "../../contexts/CountryContext";
import useCountries from "../../CustemHooks/CustemCountryHooks/useCountries";
import useFetchForCountry from "../../CustemHooks/CustemCountryHooks/useFetchForCountry";

import CountryList from './CountryList';
import CreateCountry from './CreateCountry';
import { Spinner } from '../Common/Spinner/Spinner';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const CountryPage = () => {
    const { user } = useContext(AuthContext);
    const [countries, setCountries, isLoading] = useFetchForCountry([]);
    const { removeCountry, createCountry, updateCountry } = useCountries(user.token);

    const countryCreateHandler = async (newCountry) => {
        const createdCountry = await createCountry(newCountry);
        setCountries(state => [
            ...state,
            createdCountry
        ]);
    };

    const countryRemoveHandler = async (countryId) => {
        removeCountry(countryId);
        setCountries(state => state.filter(x => x.countryId !== countryId));
    };

    const countryEditHandler = async (country, newCountryName) => {
        const updatedCountry = { ...country, countryName: newCountryName };

        updateCountry(updatedCountry, { countryName: newCountryName });

        setCountries(state => state.map(x => x.countryId === country.countryId ? updatedCountry : x));
    }

    return (
        <CountryContext.Provider value={{ countries, countryRemoveHandler, countryEditHandler }}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <CreateCountry countryCreateHandler={countryCreateHandler} />

                {
                    isLoading
                        ? <Spinner />
                        : <CountryList />
                }
            </Box>
        </CountryContext.Provider>
    )
}

export default CountryPage;