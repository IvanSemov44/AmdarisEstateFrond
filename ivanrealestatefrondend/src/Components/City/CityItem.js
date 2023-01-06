import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CityItem = ({
    city,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { cityDeleteHandler, cityEditHandler } = useContext(TaskContext);

    const onEdit = (e) => {
        e.preventDefault();
        const {cityName} = Object.fromEntries(new FormData(e.target));
        cityEditHandler(city, cityName)
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
                        label="Edit City"
                        name="cityName"
                        defaultValue={city.cityName}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
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
                    <Button variant="outlined" color="primary" onClick={taskEditClickHandler}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => cityDeleteHandler(city.cityId)}>Delete</Button>
                </>
            }
        </li>
    )
}

export default CityItem;