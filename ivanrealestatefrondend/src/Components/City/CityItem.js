import { useContext, useState } from "react";
import { CityContext } from "../../contexts/CityContext";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CityItem = ({
    city,
}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [more, setMore] = useState(false);
    const [cityForEdit, setCityForEdit] = useState(city.cityName);

    const { cityDeleteHandler, cityEditHandler } = useContext(CityContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onEdit = (data) => {
        cityEditHandler(city, data.cityName)
        setIsEdit(false);
    }

    const onChange = (e) => {
        setCityForEdit(e.target.value);

        if (e.target.value) {
            errors.cityName = false;
        } else {
            errors.cityName = true;
        }

        if (e.target.value.length > 15) {
            setMore(true);
        }
        else {
            setMore(false);
        }
    }

    return (
        <li>
            {isEdit
                ? <form onSubmit={handleSubmit(onEdit)}>
                    <TextField
                        error={errors.cityName || more}
                        {...register("cityName", { required: true })}
                        id="outlined-input"
                        label="Edit City"
                        onChange={onChange}
                        value={cityForEdit}
                        defaultValue={city.cityName}
                        helperText={(errors.cityName && "City field is required") || (more && "City can't be more from 15 symbols")}

                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> edit</Button>
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
                    <Button variant="outlined" color="primary" onClick={() => setIsEdit(true)}>edit</Button>
                    <Button variant="outlined" color="error" onClick={() => cityDeleteHandler(city.cityId)}>delete</Button>
                </>
            }
        </li>
    )
}

export default CityItem;