import * as currencyService from '../../Services/CurrencyService';

const useCurrencies = () => {
    const removeCurrency = (currencyId) => {
        return currencyService.deleteCurrency(currencyId);
    }

    const createCurrency = (currencyName) => {
        return currencyService.create(currencyName);
    }

    const updateCurrency = (currency, currencyName) => {
        return currencyService.update(currency, currencyName);
    }

    return {
        removeCurrency,
        createCurrency,
        updateCurrency
    }
}

export default useCurrencies;