import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CityContext } from "../../contexts/CityContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ListItem } from "@mui/material";

const CityItem = ({
    city,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { cityDeleteHandler, cityEditHandler } = useContext(CityContext);

    const onEdit = (data) => {
        cityEditHandler(city, data.cityName)
        setIsEdit(false);
    }

    return (
        <ListItem>
            {isEdit
                ? <form onSubmit={handleSubmit(onEdit)}>
                    <TextField
                        error={errors.cityName}
                        {...register("cityName", {
                            required: { value: true, message: "City is required field!" },
                            maxLength: { value: 20, message: "City can't be more from 20 symbols" }
                        })}
                        label="Edit City"
                        defaultValue={city.cityName}
                        helperText={errors.cityName && errors.cityName.message}
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
        </ListItem>
    )
}

export default CityItem;