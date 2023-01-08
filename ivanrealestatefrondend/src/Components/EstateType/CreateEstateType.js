import Grid from '@mui/material/Grid';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';

const CreateEstateType = ({
    estateTypeCreateHandler
})=>{
    const [typeName, setTypeName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const cityForCreate = { typeName: typeName }
        estateTypeCreateHandler(cityForCreate)
        setTypeName('');
    }

    const onChange = (e) => {
        setTypeName(e.target.value);
    }
    return (
        <form onSubmit={onSubmit}>
            <Grid sx={{ '& button': { m: 1 } }} container alignItems="center" justify="center" direction="row">
                <Grid item>
                    <TextField
                        id="cityName-input"
                        name="typeName"
                        label="Create Estate Type"
                        type="text"
                        value={typeName}
                        onChange={onChange}
                    />
                </Grid>

                <Button variant="contained" color="success" type="submit">
                    Create
                </Button>
            </Grid>
        </form>
    );
}

export default CreateEstateType;