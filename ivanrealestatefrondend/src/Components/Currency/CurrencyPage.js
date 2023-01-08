import { CurrencyContext } from "../../contexts/CurrencyContext";
import useCurrencies from "../../CustemHooks/useCurrencies";
import useFetchForCurrency from "../../CustemHooks/UseFetchForCurrency";

import Box from '@mui/material/Box';
import { Spinner } from '../Common/Spinner/Spinner';
import CreateCurrency from "./CreateCurrency";
import CurrencyList from "./CurrencyList";

const CurrencyPage = () => {
    const [currencies, setCurrencies, isLoading] = useFetchForCurrency([]);
    const { removeCurrency, createCurrency, updateCurrency } = useCurrencies();

    const currencyCreateHandler = async (newCurrency) => {
        const createdCurrency = await createCurrency(newCurrency);
        setCurrencies(state => [
            ...state,
            createdCurrency
        ]);
    };

    const currencyRemoveHandler = async (currencyId) => {
        removeCurrency(currencyId);
        setCurrencies(state => state.filter(x => x.currencyId !== currencyId));
    };

    const currencyEditHandler = async (currency, currencyName) => {
        const updatedCurrency = { ...currency, currencyName: currencyName };

        updateCurrency(updatedCurrency, { currencyName: currencyName });

        setCurrencies(state => state.map(x => x.currencyId === currency.currencyId ? updatedCurrency : x));
    }

    return(
        <CurrencyContext.Provider value={{ currencies, currencyRemoveHandler, currencyEditHandler }}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <CreateCurrency currencyCreateHandler={currencyCreateHandler} />

                {
                    isLoading
                        ? <Spinner />
                        : <CurrencyList />
                }
            </Box>
        </CurrencyContext.Provider>
    )
}

export default CurrencyPage;