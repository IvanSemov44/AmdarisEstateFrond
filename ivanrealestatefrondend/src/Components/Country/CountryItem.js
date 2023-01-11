import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { CountryContext } from "../../contexts/CountryContext";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const CountryItem = ({
    country
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { countryRemoveHandler, countryEditHandler } = useContext(CountryContext);

    const onEdit = data => {
        const countryName = data.countryName;
        countryEditHandler(country, countryName)
        setIsEdit(false);
    }

    const taskEditClickHandler = () => {
        setIsEdit(true);
    }

    return (
        <li>
            {isEdit
                ? <form onSubmit={handleSubmit(onEdit)}>
                    <TextField
                        error={errors.countryName}
                        {...register("countryName", {
                            required: { value: true, message: "Country is required field!" },
                            maxLength: { value: 20, message: "Country can't be more from 20 symbols" }
                        })}
                        label="Edit Country"
                        defaultValue={country.countryName}
                        helperText={errors.countryName && errors.countryName?.message}
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