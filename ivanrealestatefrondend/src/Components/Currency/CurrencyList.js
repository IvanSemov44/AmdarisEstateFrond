import { useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import Box from '@mui/material/Box';
import CurrencyItem from "./CurrencyItem";

const CurrencyList = ()=>{
    const { currencies } = useContext(CurrencyContext);
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {currencies.map(x =>
                <CurrencyItem
                    key={x.currencyId}
                    currency={x} />
            )}
        </Box>
    )
}

export default CurrencyList;