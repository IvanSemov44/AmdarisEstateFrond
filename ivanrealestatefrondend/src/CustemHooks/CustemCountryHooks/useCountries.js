import * as countryService from '../../Services/CountryService';

const useCountries = () => {
    const removeCountry = (countryId) => {
        return countryService.deleteCountry(countryId);
    }

    const createCountry = (countryName) => {
        return countryService.create(countryName);
    }

    const updateCountry = (country,countryName)=>{
        return countryService.update(country,countryName);
    }

    return {
        removeCountry,
        createCountry,
        updateCountry
    }
}

export default useCountries;