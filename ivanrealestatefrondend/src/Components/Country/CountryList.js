import { useContext } from "react";
import { CountryContext } from "../../contexts/CountryContext";
import Box from '@mui/material/Box';
import CountryItem from "./CountryItem";

const CountryList = () => {
    const { countries } = useContext(CountryContext);
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {countries.map(x =>
                <CountryItem
                    key={x.countryId}
                    country={x} />
            )}
        </Box>
    )
}

export default CountryList;