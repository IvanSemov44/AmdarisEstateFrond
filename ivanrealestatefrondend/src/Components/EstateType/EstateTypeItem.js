import { useContext, useState } from "react";
import { EstateTypeContext } from "../../contexts/EstateTypeContext";

import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';

const EstateTypeItem = ({
    estateType
})=>{
    const [isEdit, setIsEdit] = useState(false);
    const { estateTypeRemoveHandler, estateTypeEditHandler } = useContext(EstateTypeContext);

    const onEdit = (e) => {
        e.preventDefault();
        const { typeName } = Object.fromEntries(new FormData(e.target));
        estateTypeEditHandler(estateType, typeName)
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
                        label="Edit Estate Type"
                        name="typeName"
                        defaultValue={estateType.typeName}
                    />
                    <Button variant="contained" color="primary" type="submit" value="edit"> Edit</Button>
                </form>
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