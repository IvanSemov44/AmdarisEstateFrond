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
    Button,
} from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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

const valueForSorf = [
    { id: 0, name: "Neighborhood" },
    { id: 1, name: "Address" },
    { id: 2, name: "Description" },
    { id: 3, name: "Extras" },
    { id: 4, name: "Price" },
    { id: 5, name: "Floor" },
    { id: 6, name: "Rooms" },
    { id: 7, name: "Created" }
]

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

    const [orderBy, setOrderBy] = useState("");
    const [desc, setDesc] = useState("");

    const [isSell, setIsSell] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const cities = useGetCities();
    const countries = useGetCountries();
    const currencies = useGetCurrency();
    const estateTypes = useGetEstateType();

    const pageSize = 9;

    useEffect(() => {
        let ignore = false;
        estatesSevice.getByPage(
            page, city, country, currency, estateType, year, price, floor, rooms, area, isSell, searchTerm, orderBy, desc,pageSize
        )
            .then(result => {
                if (!ignore) {
                    if (result.returnValue.length === 0)
                        throw new Error();

                    setPagin(JSON.parse(result.contentType));
                    setEstate(result.returnValue);
                    setIsEmptyEstate(false);
                }
            })
            .catch(() => setIsEmptyEstate(true));
        return () => {
            ignore = true;
        };
    }, [page, city, country, currency, estateType, year, price, floor, rooms, area, isSell, searchTerm, orderBy, desc]);


    const handleSliderChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2100 - minDistance);
                return ([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                return ([clamped - minDistance, clamped]);
            }
        } else return (newValue);
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
                <Grid item xs={3} sx={{ m: 4 }}>
                    <Grid item >
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
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                sx={{ width: 200 }}
                                value={orderBy}
                                label="Sort"
                                onChange={e => setOrderBy(e.target.value)}
                            >
                                <MenuItem key="" value="">
                                    None
                                </MenuItem>
                                {valueForSorf.map(x =>
                                    <MenuItem
                                        key={x.id}
                                        value={x.name}
                                    >
                                        {x.name}
                                    </MenuItem>
                                )}
                            </Select>
                            {desc === ""
                                ? <Button onClick={() => setDesc("desc")}>
                                    <ArrowDownwardIcon fontSize="large" />
                                </Button>
                                : <Button onClick={() => setDesc("")}>
                                    <ArrowUpwardIcon fontSize="large" />
                                </Button>}
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                sx={{ width: 200 }}
                                value={city}
                                label="City"
                                onChange={e => setCity(e.target.value)}
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

                        <Grid item sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                sx={{ width: 200 }}
                                value={country}
                                label="Country"
                                onChange={e => setCountry(e.target.value)}
                            >
                                <MenuItem key="" value="">
                                    None
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

                        <Grid item sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                sx={{ width: 200 }}
                                value={currency}
                                label="Currency"
                                onChange={e => setCurrency(e.target.value)}
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

                        <Grid item sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                sx={{ width: 200 }}
                                label="Type"
                                value={estateType}
                                onChange={e => setEstateType(e.target.value)}
                            >
                                <MenuItem key="" value="">
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
                        // alignItems="center"
                        justify="center"
                        direction="column"
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item sx={{ width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                Range: Year of Create
                            </Typography>
                            <Typography id="input-slider" gutterBottom>
                                {`Min year: ${year[0]} Max year: ${year[1]}`}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={year}

                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                max={2100}
                                min={1900}
                                onChange={(event, newValue, activeThumb) =>
                                    setYear(handleSliderChange(event, newValue, activeThumb))}
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                Range: Price
                            </Typography>
                            <Typography id="input-slider" gutterBottom>
                                {`Min price: ${price[0]} Max price: ${price[1]}`}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={price}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                max={500000}
                                min={0}
                                step={1000}
                                onChange={(event, newValue, activeThumb) =>
                                    setPrice(handleSliderChange(event, newValue, activeThumb))}
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                Range: Floor
                            </Typography>
                            <Typography id="input-slider" gutterBottom>
                                {`Min floor: ${floor[0]} Max floor: ${floor[1]}`}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={floor}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                max={100}
                                min={0}
                                step={1}
                                onChange={(event, newValue, activeThumb) =>
                                    setFloor(handleSliderChange(event, newValue, activeThumb))}
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                Range: Rooms
                            </Typography>
                            <Typography id="input-slider" gutterBottom>
                                {`Min rooms: ${rooms[0]} Max rooms: ${rooms[1]}`}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={rooms}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                max={30}
                                min={0}
                                step={1}
                                onChange={(event, newValue, activeThumb) =>
                                    setRooms(handleSliderChange(event, newValue, activeThumb))}
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                Range: Area
                            </Typography>
                            <Typography id="input-slider" gutterBottom>
                                {`Min area: ${area[0]} Max area: ${area[1]}`}
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={area}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                max={1000}
                                min={0}
                                step={1}
                                onChange={(event, newValue, activeThumb) =>
                                    setArea(handleSliderChange(event, newValue, activeThumb))}
                            />
                        </Grid>

                        <Grid item sx={{ width: 300 }} container justify="center">
                            {/* <Typography id="input-slider"  gutterBottom>
                                Range: Area
                            </Typography> */}
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={isSell}

                                onChange={e => setIsSell(e.target.value)}
                            >
                                <Box
                                    direction="row"
                                    alignItems="center"
                                    justify="center"
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Sell" />
                                    <FormControlLabel value="false" control={<Radio />} label="Rent" />
                                    <FormControlLabel value="" control={<Radio />} label="Both" />
                                </Box>
                            </RadioGroup>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={8}>

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
                            onChange={(e, v) => setPage(v)}
                        />
                    </Stack >
                </Grid>
            </Grid>
        </>
    )
}

export default EstateCatalog;