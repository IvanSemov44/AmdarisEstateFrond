import * as imageService from '../Services/ImageService';

const useCities = (estateId) => {
    const removeImage = (imageId) => {
        return imageService.deleteImage(estateId, imageId);
    }

    const createImage = (dataImage) => {
        return imageService.create(estateId,dataImage);
    }

    const updateImage = (imageId, imageData) => {
        return imageService.update(estateId, imageId, imageData);
    }
    
    return {
        removeImage,
        createImage,
        updateImage
    }
}

export default useCities;