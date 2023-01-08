import { useContext, useState } from "react";
import { CountryContext } from "../../contexts/CountryContext";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const CountryItem = ({
    country
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { countryRemoveHandler, countryEditHandler } = useContext(CountryContext);

    const onEdit = (e) => {
        e.preventDefault();
        const { countryName } = Object.fromEntries(new FormData(e.target));
        countryEditHandler(country, countryName)
        setIsEdit(false);
    }

    const taskEditClickHandler = () => {
        setIsEdit(true);
    }

    return (
        <li>
            {isEdit
                ? <form onSubmit={onEdit}>
                    <TextField
                        id="outlined-input"
                        label="Edit Country"
                        name="countryName"
                        defaultValue={country.countryName}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                </form>
                : <>
                    <TextField
                        id="outlined-read-only-input"
                        label="Country"
                        defaultValue={country.countryName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={taskEditClickHandler}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => countryRemoveHandler(country.countryId)}>Delete</Button>
                </>
            }
        </li>
    )
}
export default CountryItem;