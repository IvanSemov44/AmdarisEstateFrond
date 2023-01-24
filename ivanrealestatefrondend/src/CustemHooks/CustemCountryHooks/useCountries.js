import * as countryService from '../../Services/CountryService';

const useCountries = (token) => {
    const removeCountry = (countryId) => {
        return countryService.deleteCountry(countryId, token);
    }

    const createCountry = (countryName) => {
        return countryService.create(countryName, token);
    }

    const updateCountry = (country,countryName)=>{
        return countryService.update(country, countryName, token);
    }

    return {
        removeCountry,
        createCountry,
        updateCountry
    }
}

export default useCountries;