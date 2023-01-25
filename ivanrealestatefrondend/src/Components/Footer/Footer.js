import {
    Button,
    Divider,
    Grid,
    Typography
} from "@mui/material";

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

    return (
        <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="row"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid 
            item 
            xs={12}
                sx={{ mt: 3 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="row">
                <Button sx={{ my: 2, color: 'white', display: 'block' }} disabled >
                    <FacebookIcon sx={{ fontSize: 50 }} color="primary" />
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} disabled >
                    <InstagramIcon sx={{ fontSize: 50 }} color="primary" />
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} disabled >
                    <TwitterIcon sx={{ fontSize: 50 }} color="primary" />
                </Button>
            </Grid>
            <Grid item
            sx={{mb:3}}
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="row"
            >
                <Typography sx={{ fontSize: 30 }}>
                    Terms and conditions
                </Typography >

                <Divider sx={{ m: 2 }} orientation="vertical" variant="middle" flexItem />

                <Typography sx={{ fontSize: 30 }}>
                    About us
                </Typography>

                <Divider sx={{ m: 2 }} orientation="vertical" variant="middle" flexItem />

                <Typography sx={{ fontSize: 30 }}>
                    FAQ
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer;