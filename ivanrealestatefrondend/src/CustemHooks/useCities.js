import * as cityService from '../Services/CityService';

const useCities = () => {
    const removeCity = (cityId) => {
        return cityService.deleteCity(cityId);
    }

    const createCity = (cityName) => {
        return cityService.create(cityName);
    }

    const updateCity = (city, cityName) => {
        return cityService.Update(city, cityName);
    }
    return {
        removeCity,
        createCity,
        updateCity
    }
}

export default useCities;