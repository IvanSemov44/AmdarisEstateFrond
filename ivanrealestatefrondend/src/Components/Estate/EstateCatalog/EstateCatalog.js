import { useEffect, useState } from 'react';

import {
    Box,
    Grid,
    Stack,
    Select,
    Slider,
    MenuItem,
    Pagination,
    InputLabel,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    InputAdornment,
} from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import EstateCard from '../EstateCard/EstateCard';

import * as estatesSevice from '../../../Services/EstateService';
import { Spinner } from '../../Common/Spinner/Spinner';
import useGetCities from '../../../CustemHooks/CustemCityHooks/useGetCities';
import useGetCountries from '../../../CustemHooks/CustemCountryHooks/useGetCountries';
import useGetCurrency from '../../../CustemHooks/CustemCurrencyHooks/useGetCurrency';
import useGetEstateType from '../../../CustemHooks/CustemEstateTypeHooks/useGetEstateType';

function valuetext(value) {
    return `${value}`;
}

const minDistance = 1;
const minDistanceForPrice = 5000;

const EstateCatalog = () => {
    const [page, setPage] = useState(1);
    const [pagin, setPagin] = useState([]);
    const [estates, setEstate] = useState([]);
    const [isEmptyEstate, setIsEmptyEstate] = useState(false);

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [estateType, setEstateType] = useState("");

    const [year, setYear] = useState([2000, 2023]);
    const [price, setPrice] = useState([0, 500000]);
    const [floor, setFloor] = useState([0, 100]);
    const [rooms, setRooms] = useState([0, 30]);
    const [area, setArea] = useState([0, 1000]);
    const [isSell, setIsSell] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const cities = useGetCities();
    const countries = useGetCountries();
    const currencies = useGetCurrency();
    const estateTypes = useGetEstateType();

    useEffect(() => {
        let ignore = false;
        estatesSevice.getByPage(
            page, city, country, currency, estateType, year, price, floor, rooms, area, isSell, searchTerm
        )
            .then(result => {
                if (!ignore) {
                    if (result.returnValue.length === 0)
                        throw new Error("Estate is empty");

                    setPagin(JSON.parse(result.contentType));
                    setEstate(result.returnValue);
                    setIsEmptyEstate(false);
                }
            })
            .catch(() => setIsEmptyEstate(true));
        return () => {
            ignore = true;
        };
    }, [page, city, country, currency, estateType, year, price, floor, rooms, area, isSell,searchTerm]);

    const handleChange = (event, value) => setPage(value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleEstateTypeChange = (e) => setEstateType(e.target.value);
    const handleSellChange = (e) => setIsSell(e.target.value);

    const handleYearChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistance);
                setYear([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setYear([clamped - minDistance, clamped]);
            }
        } else setYear(newValue);
    };

    const handlePriceChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistanceForPrice) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistanceForPrice);
                setPrice([clamped, clamped + minDistanceForPrice]);
            } else {
                const clamped = Math.max(newValue[1], minDistanceForPrice);
                setPrice([clamped - minDistanceForPrice, clamped]);
            }
        } else setPrice(newValue);
    };

    const handleFloorChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistance);
                setFloor([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setFloor([clamped - minDistance, clamped]);
            }
        } else setFloor(newValue);
    };

    const handleRoomsChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistance);
                setRooms([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setRooms([clamped - minDistance, clamped]);
            }
        } else setRooms(newValue);
    };

    const handleAreaChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistance);
                setArea([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setArea([clamped - minDistance, clamped]);
            }
        } else setArea(newValue);
    };

    const show = isEmptyEstate ? "none" : "flex"

    return (
        <>
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item >
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        sx={{ width: 200 }}
                        value=""
                        label="City"
                        onChange={handleCityChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {cities.map(x =>
                            <MenuItem
                                key={x.cityId}
                                value={x.cityId}
                            >
                                {x.cityName}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item >
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        sx={{ width: 200 }}
                        value=""
                        label="Country"
                        onChange={handleCountryChange}
                    >
                        <MenuItem value="">
                            <p>None</p>
                        </MenuItem>
                        {countries.map(x =>
                            <MenuItem
                                key={x.countryId}
                                value={x.countryId}
                            >
                                {x.countryName}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item >
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        sx={{ width: 200 }}
                        value=""
                        label="Currency"
                        onChange={handleCurrencyChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {currencies.map(x =>
                            <MenuItem
                                key={x.currencyId}
                                value={x.currencyId}
                            >
                                {x.currencyName}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        sx={{ width: 200 }}
                        label="Type"
                        value=""
                        onChange={handleEstateTypeChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {estateTypes.map(x =>
                            <MenuItem
                                key={x.estateTypeId}
                                value={x.estateTypeId}
                            >
                                {x.typeName}
                            </MenuItem>
                        )}
                    </Select>

                </Grid>
            </Grid>

            <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Year of Create
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        {`Min year: ${year[0]}, Max year: ${year[1]}`}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={year}
                        onChange={handleYearChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        max={2100}
                        min={1900}
                    />
                </Grid>

                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Price
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        {`Min price: ${price[0]}, Max price: ${price[1]}`}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        max={500000}
                        min={0}
                        step={1000}
                    />
                </Grid>

                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Floor
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        {`Min floor: ${floor[0]}, Max floor: ${floor[1]}`}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={floor}
                        onChange={handleFloorChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        max={100}
                        min={0}
                        step={1}
                    />
                </Grid>

                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Rooms
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        {`Min rooms: ${rooms[0]}, Max rooms: ${rooms[1]}`}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={rooms}
                        onChange={handleRoomsChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        max={30}
                        min={0}
                        step={1}
                    />
                </Grid>
                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Area
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        {`Min area: ${area[0]}, Max area: ${area[1]}`}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={area}
                        onChange={handleAreaChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        max={1000}
                        min={0}
                        step={1}
                    />
                </Grid>
                <Grid item sx={{ width: 300 }}>
                    <Typography id="input-slider" gutterBottom>
                        Range: Area
                    </Typography>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={isSell}
                        onChange={handleSellChange}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Sell" />
                        <FormControlLabel value="false" control={<Radio />} label="Rent" />
                        <FormControlLabel value="" control={<Radio />} label="Both" />
                    </RadioGroup>
                </Grid>
                <Grid item sx={{ width: 300 }}>
                    <TextField
                        label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    // variant="standard"
                    />
                </Grid>
            </Grid>

            <Stack alignItems="center" spacing={2} >
                {estates[0]
                    ? <Box sx={{ display: `${show}`, flexWrap: 'wrap' }} >
                        {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
                    </Box>
                    : isEmptyEstate
                        ? <div></div>
                        : <Spinner></Spinner>

                }
                <Pagination
                    sx={{ margin: 3 }}
                    size="large"
                    count={pagin.TotalPages}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                />
            </Stack >
        </>
    )
}

export default EstateCatalog;