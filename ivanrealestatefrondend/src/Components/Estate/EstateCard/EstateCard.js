import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import useGetCityById from '../../../CustemHooks/CustemCityHooks/useGetCityById';
import useGetCountryById from '../../../CustemHooks/CustemCountryHooks/useGetCountryById';
import useGetCurrencyById from '../../../CustemHooks/CustemCurrencyHooks/useGetCurrencyById';
import useGetEstateTypById from '../../../CustemHooks/CustemEstateTypeHooks/useGetEstateTypById';
import { ListItemText } from '@mui/material';


const EstateCard = ({
    estate
}) => {
    const city = useGetCityById(estate.cityId);
    const country = useGetCountryById(estate.countryId);
    const currency = useGetCurrencyById(estate.curencyId);
    const estateType = useGetEstateTypById(estate.estateTypeId);

    let elementSellOrRent;

    if (estate.sell)
        elementSellOrRent = "Sell";
    else
        elementSellOrRent = "Rent";

    let estateImage;
    console.log(estate.images)
    if (estate.images.length ===0)
        estateImage = "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
    else
        estateImage = estate.images[0].imageUrl;

    return (
        <Card sx={{ maxWidth: 345, margin: 1 }}>
            <CardActionArea >
                <Link to={`/catalog/${estate.estateId}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={estateImage}
                        alt="Estate"
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Price: {estate.price} {currency.currencyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <ListItemText>{elementSellOrRent}</ListItemText>
                        <ListItemText>Country: {country.countryName}</ListItemText>
                        <ListItemText>City: {city.cityName}</ListItemText>
                        <ListItemText>Address: {estate.address}</ListItemText>
                        <ListItemText>Type: {estateType.typeName}</ListItemText>
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}

export default EstateCard;