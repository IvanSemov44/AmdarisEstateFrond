import { useParams } from "react-router-dom";

import * as imageService from "../../Services/ImageService"

const ImagePage = () => {
    const { estateId } = useParams();
    console.log(imageService.getAll(estateId));
    return (
        <p>

        </p>
    )
}

export default ImagePage;