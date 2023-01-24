import * as currencyService from '../../Services/CurrencyService';

const useCurrencies = (token) => {
    const removeCurrency = (currencyId) => {
        return currencyService.deleteCurrency(currencyId, token);
    }

    const createCurrency = (currencyName) => {
        return currencyService.create(currencyName, token);
    }

    const updateCurrency = (currency, currencyName) => {
        return currencyService.update(currency, currencyName, token);
    }

    return {
        removeCurrency,
        createCurrency,
        updateCurrency
    }
}

export default useCurrencies;