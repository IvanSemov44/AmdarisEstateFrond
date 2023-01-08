import { useContext, useState } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CurrencyItem = ({
    currency
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const { currencyRemoveHandler, currencyEditHandler } = useContext(CurrencyContext);

    const onEdit = (e) => {
        e.preventDefault();
        const { currencyName } = Object.fromEntries(new FormData(e.target));
        currencyEditHandler(currency, currencyName)
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
                        label="Edit currency"
                        name="currencyName"
                        defaultValue={currency.currencyName}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                </form>
                : <>
                    <TextField
                        id="outlined-read-only-input"
                        label="Country"
                        defaultValue={currency.currencyName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={taskEditClickHandler}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={() => currencyRemoveHandler(currency.currencyId)}>Delete</Button>
                </>
            }
        </li>
    )
}

export default CurrencyItem;