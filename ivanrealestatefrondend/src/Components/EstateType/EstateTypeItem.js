import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { EstateTypeContext } from "../../contexts/EstateTypeContext";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EstateTypeItem = ({
    estateType
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { estateTypeRemoveHandler, estateTypeEditHandler } = useContext(EstateTypeContext);

    const onEdit = data => {
        estateTypeEditHandler(estateType, data.typeName)
    }

    const taskEditClickHandler = () => {
        setIsEdit(true);
    }

    return (
        <li>
            {isEdit
                ? <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onEdit)}
                >
                    <TextField
                        error={errors.typeName}
                        {...register("typeName", {
                            required: { value: true, message: "Estate Type is required field!" },
                            maxLength: { value: 10, message: "Estate Type can't be more from 10 symbols" }
                        })}
                        label="Edit Estate Type"
                        defaultValue={estateType.typeName}
                        helperText={errors.typeName && errors.typeName?.message}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => setIsEdit(false)}>cancel</Button>
                </Box>
                : <>
                    <TextField
                        id="outlined-read-only-input"
                        label="Estate Type"
                        defaultValue={estateType.typeName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={taskEditClickHandler}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => estateTypeRemoveHandler(estateType.estateTypeId)}>Delete</Button>
                </>
            }
        </li>
    )
}

export default EstateTypeItem;