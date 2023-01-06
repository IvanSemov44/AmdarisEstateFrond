import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import Box from '@mui/material/Box';

import CityItem from "./CityItem";

const CityList = ({
    cityDeleteHandler
}) => {
    const { cities } = useContext(TaskContext)
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {cities.map(x =>
                <CityItem
                    cityDeleteHandler={cityDeleteHandler}
                    key={x.cityId}
                    city={x} />
            )}
        </Box>
    )
}

export default CityList;