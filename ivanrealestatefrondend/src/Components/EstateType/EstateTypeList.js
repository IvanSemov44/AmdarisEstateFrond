import { useContext } from "react";
import { EstateTypeContext } from "../../contexts/EstateTypeContext";

import Box from '@mui/material/Box';
import EstateTypeItem from "./EstateTypeItem";

const EstateTypeList = () => {
    const { estateTypes } = useContext(EstateTypeContext)
    
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {estateTypes.map(x =>
                <EstateTypeItem
                    key={x.estateTypeId}
                    estateType={x} />
            )}
        </Box>
    )
}
export default EstateTypeList;