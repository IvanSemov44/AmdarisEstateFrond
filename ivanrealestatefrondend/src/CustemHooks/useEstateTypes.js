import * as estateTypeService from '../Services/EstateTypeService';

const useEstateTypes = () => {
    const removeEstateType = (estateTypeId) => {
        return estateTypeService.deleteEstateType(estateTypeId);
    }

    const createEstateType = (typeName)=>{
        return estateTypeService.create(typeName);
    }

    const updateEstateType = (estateType,typeName)=>{
        return estateTypeService.update(estateType,typeName);
    }

    return {
        removeEstateType,
        createEstateType,
        updateEstateType
    }
}

export default useEstateTypes;