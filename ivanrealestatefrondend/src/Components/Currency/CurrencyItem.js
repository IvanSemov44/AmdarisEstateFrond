import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ListItem } from "@mui/material";

const CurrencyItem = ({
    currency
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();
    const { currencyRemoveHandler, currencyEditHandler } = useContext(CurrencyContext);

    const onEdit = data => {
        resetField('currencyName');
        // const { currencyName } = data.currencyName;
        currencyEditHandler(currency, data.currencyName)
        setIsEdit(false);
    }

    const taskEditClickHandler = () => {
        setIsEdit(true);
    }

    return (
        <ListItem>
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
                        error={errors.currencyName}
                        {...register("currencyName", {
                            required: { value: true, message: "Country is required field!" },
                            maxLength: { value: 10, message: "Country can't be more from 10 symbols" }
                        })}
                        label="Edit Country"
                        defaultValue={currency.currencyName}
                        helperText={errors.currencyName && errors.currencyName?.message}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => setIsEdit(false)}>cancel</Button>
                </Box>
                : <>
                    <TextField
                        id="outlined-read-only-input"
                        label="Currency"
                        defaultValue={currency.currencyName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={taskEditClickHandler}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => currencyRemoveHandler(currency.currencyId)}>Delete</Button>
                </>
            }
        </ListItem>
    )
}

export default CurrencyItem;