import * as estateTypeService from '../../Services/EstateTypeService';

const useEstateTypes = (token) => {
    const removeEstateType = (estateTypeId) => {
        return estateTypeService.deleteEstateType(estateTypeId,token);
    }

    const createEstateType = (typeName)=>{
        return estateTypeService.create(typeName,token);
    }

    const updateEstateType = (estateType,typeName)=>{
        return estateTypeService.update(estateType,typeName,token);
    }

    return {
        removeEstateType,
        createEstateType,
        updateEstateType
    }
}

export default useEstateTypes;