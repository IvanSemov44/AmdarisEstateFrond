import * as cityService from '../../Services/CityService';

const useCities = (token) => {
    const removeCity = (cityId) => {
        return cityService.deleteCity(cityId,token);
    }

    const createCity = (cityName) => {
        return cityService.create(cityName,token);
    }
    
    const updateCity = (city, cityName,token) => {
        return cityService.Update(city, cityName,token);
    }
    return {
        removeCity,
        createCity,
        updateCity
    }
}

export default useCities;