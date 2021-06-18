import React, { useState } from 'react';
import HttpRequest from "../rest/httpRequest";
import { Grid, TextField, Button, FormHelperText, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    button: {
        background: 'var(--light-gray-blue)',
    }
}));

function Create() {
    const [roomName, setRoomName] = useState('');
    const [roomNameError, setRoomNameError] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const createClick = async () => {
        if (roomName === '') {
            setRoomNameError(true);
            return;
        }
        const response = await HttpRequest.createRoom({ roomName });
        const room = await response.json();
        history.push(`/login/${room.id}`);
    };

    const onRoomNameChange = (e) => {
        if (roomNameError) {
            setRoomNameError(false);
        }
        setRoomName(e.target.value);
    }

    const onCancelClick = () => {
        history.push(`/`);
    }

    return (
        <div className="center-page-view">
            <Grid
                container
                spacing={3}
                justify="center"
                alignItems="center"
                alignContent="center"
                direction="column">
                <Grid key={0} item>
                    <TextField
                        value={roomName}
                        error={roomNameError}
                        onChange={onRoomNameChange}
                        placeholder="Room name" />
                    <FormHelperText error={roomNameError}>Enter room name.</FormHelperText>
                </Grid>
                <Grid key={1} item>
                    <Grid
                        container
                        spacing={3}
                        direction="row">
                        <Grid key={0} item>
                            <Button className={classes.button} variant="contained" color="primary" size="large" onClick={onCancelClick}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid key={1} item>
                            <Button className={classes.button} variant="contained" color="primary" size="large" onClick={createClick}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default Create;
