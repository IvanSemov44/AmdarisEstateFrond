import * as companyImageService from '../../Services/CompanyImagesService';

const useImages = (companyId) => {
    const removeImage = (imageId) => {
        return companyImageService.deleteImage(companyId, imageId);
    }

    const createImage = (dataImage) => {
        return companyImageService.create(companyId, dataImage);
    }

    const updateImage = (imageId, imageData) => {
        return companyImageService.update(companyId, imageId, imageData);
    }

    return {
        removeImage,
        createImage,
        updateImage
    }
}

export default useImages;