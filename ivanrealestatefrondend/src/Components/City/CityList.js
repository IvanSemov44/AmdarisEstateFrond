import { useContext } from "react";
import { CityContext } from "../../contexts/CityContext";
import Box from '@mui/material/Box';
import CityItem from "./CityItem";

const CityList = () => {
    const { cities } = useContext(CityContext)
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {cities.map(x =>
                <CityItem
                    key={x.cityId}
                    city={x} />
            )}
        </Box>
    )
}

export default CityList;