import { Box } from "@mui/material";
import { useContext } from "react";
import { ImageContext } from "../../contexts/ImageContext";
import ImageItem from "./ImageItem";

const ImagesList = () =>{
    const { images } = useContext(ImageContext);

    return(
        <Box sx={{ '& button': { m: 1 } }}>
            {images.map(x =>
                <ImageItem
                    key={x.imageId}
                    image={x} />
            )}
        </Box>
    )
};

export default ImagesList;