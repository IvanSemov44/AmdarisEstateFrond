import { useContext, useState } from "react";
import { CityContext } from "../../contexts/CityContext";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CityItem = ({
    city,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [cityForEdit, setCityForEdit] = useState(city.cityName);
    const { cityDeleteHandler, cityEditHandler } = useContext(CityContext);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onEdit = (e) => {
        e.preventDefault();
        const { cityName } = Object.fromEntries(new FormData(e.target));
        cityEditHandler(city, cityName)
        setIsEdit(false);
    }


    const onChange = (e) => {
        setCityForEdit(e.target.value);

        if (e.target.value) {
            errors.cityName = false;
        } else {
            errors.cityName = true;
        }
    }

    return (
        <li>
            {isEdit
                ? <form onSubmit={onEdit}>
                    <TextField
                        error={errors.cityName}
                        {...register("cityName", { required: true })}
                        id="outlined-input"
                        label="Edit City"
                        onChange={onChange}
                        value={cityForEdit}
                        defaultValue={city.cityName}
                        helperText={errors.cityName && "City field is required"}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => setIsEdit(false)}>cancel</Button>

                </form>
                : <>
                    <TextField
                        id="outlined-read-only-input"
                        label="City"
                        defaultValue={city.cityName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={() => setIsEdit(true)}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => cityDeleteHandler(city.cityId)}>Delete</Button>
                </>
            }
        </li>
    )
}

export default CityItem;