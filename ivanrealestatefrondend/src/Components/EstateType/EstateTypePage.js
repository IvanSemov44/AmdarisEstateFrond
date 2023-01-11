import useEstateTypes from '../../CustemHooks/useEstateTypes';
import useFetchForEstateType from '../../CustemHooks/useFetchForEstateType';

import {EstateTypeContext} from '../../contexts/EstateTypeContext';

import Box from '@mui/material/Box';
import CreateEstateType from './CreateEstateType';
import { Spinner } from '../Common/Spinner/Spinner';
import EstateTypeList from './EstateTypeList';

const EstateTypePage = () => {
    const [estateTypes, setEstateTypes, isLoading] = useFetchForEstateType([]);
    const { removeEstateType, createEstateType, updateEstateType } = useEstateTypes();

    const estateTypeCreateHandler = async (newEstateType) => {
        const createdEstateType = await createEstateType(newEstateType);
        setEstateTypes(state => [
            ...state,
            createdEstateType
        ]);
    };

    const estateTypeRemoveHandler = async (estateTypeId) => {
        removeEstateType(estateTypeId);
        setEstateTypes(state => state.filter(x => x.estateTypeId !== estateTypeId));
    };

    const estateTypeEditHandler = async (estateType, typeName) => {
        const updatedEstateType = { ...estateType, typeName: typeName };
        updateEstateType(updatedEstateType, { typeName: typeName });
        setEstateTypes(state => state.map(x => x.estateTypeId === estateType.estateTypeId ? updatedEstateType : x));
    };

    return (
        <EstateTypeContext.Provider value={{ estateTypes, estateTypeRemoveHandler, estateTypeEditHandler }}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <CreateEstateType estateTypeCreateHandler={estateTypeCreateHandler} />

                {
                    isLoading
                        ? <Spinner />
                        : <EstateTypeList />
                }
            </Box>
        </EstateTypeContext.Provider>
    )
}

export default EstateTypePage;