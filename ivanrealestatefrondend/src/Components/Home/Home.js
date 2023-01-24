import { Box } from '@mui/material';

const Home = () => {

    const image = "https://wallpaperaccess.com/full/1899348.jpg"
    return (
        <Box sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: 1200
        }}>

        </Box >
    );
}

export default Home;