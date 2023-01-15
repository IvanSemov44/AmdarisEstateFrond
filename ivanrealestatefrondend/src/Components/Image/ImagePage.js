import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { ImageContext } from "../../contexts/ImageContext";
import useFetchForImage from "../../CustemHooks/useFetchForImage";
import useImages from "../../CustemHooks/useImages";

import * as imageService from "../../Services/ImageService"
import { Spinner } from "../Common/Spinner/Spinner";
import CreateImage from "./CreateImage";
import ImagesList from "./ImageList";

const ImagePage = () => {
    const { estateId } = useParams();
    const [images, setImages,isLoading] = useFetchForImage([],estateId);
    const { removeImage, createImage, updateImage } = useImages(estateId);

    const imageCreateHandler = async (dataImage) => {
        const createdCity = await createImage(dataImage);
        setImages(state => [
            ...state,
            createdCity,
        ]);
    };

    const imageDeleteHandler = (imageId) => {
        removeImage(imageId);
        setImages(state => state.filter(x => x.imageId !== imageId));
    };

    const imageEditHandler = (imageId,image, newImageUrl) => {
        const updatedImage = { ...image, imageUrl: newImageUrl };

        updateImage(imageId,updatedImage);
        console.log(updatedImage);

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

export default ImagePage;