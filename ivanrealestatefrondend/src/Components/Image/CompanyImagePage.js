import { useParams } from "react-router-dom";

import { Box } from "@mui/system";

import { ImageContext } from "../../contexts/ImageContext";
import useCompanyImages from "../../CustemHooks/CustemImageHook/useCompanyImages";
import useFetchForCompanyImage from "../../CustemHooks/CustemImageHook/useFetchForCompanyImage";

import ImagesList from "./ImageList";
import CreateImage from "./CreateImage";
import { Spinner } from "../Common/Spinner/Spinner";


const CompanyImagePage = () => {
    const { companyId } = useParams();
    const [images, setImages, isLoading] = useFetchForCompanyImage([], companyId);
    const { removeImage, createImage, updateImage } = useCompanyImages(companyId);

    const imageCreateHandler = async (dataImage) => {
        const createdImage = await createImage(dataImage);
        setImages(state => [
            ...state,
            createdImage,
        ]);
    };

    const imageDeleteHandler = (imageId) => {
        removeImage(imageId);
        setImages(state => state.filter(x => x.imageId !== imageId));
    };

    const imageEditHandler = (imageId, image, newImageUrl) => {
        const updatedImage = { ...image, imageUrl: newImageUrl };

        updateImage(imageId, updatedImage);

        setImages(state => state.map(x => x.imageId === image.imageId ? updatedImage : x))
    }

    return (
        <ImageContext.Provider value={{ images, imageDeleteHandler, imageEditHandler }}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                <CreateImage imageCreateHandler={imageCreateHandler} />

                {
                    isLoading
                        ? <Spinner />
                        : <ImagesList />
                }
            </Box>
        </ImageContext.Provider>
    )
}

export default CompanyImagePage;