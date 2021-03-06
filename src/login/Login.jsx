import React, {useState, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, Button, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import HttpRequest from '../rest/httpRequest';
import ConnectionHub from "../rest/connectionHub";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        background: 'var(--light-gray-blue)',
    }
}));

function Login() {
    const [roomId, setRoomId] = useState('');
    const [roomError, setRoomError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [isObserver, setIsObserver] = useState();
    const [rooms, setRooms] = useState([]);
    const history = useHistory();
    const classes = useStyles();

    const selectRoom = async () => {
        if (roomId === '') {
            setRoomError(true);
        }
        if (username === '') {
            setUsernameError(true);
        }
        if (roomId && username) {
            const room = await HttpRequest.getRoom({ id: roomId });
            const userType = isObserver ? 0 : 1;
            ConnectionHub.joinLobby(room.id, username, userType);
        }
    }

    const cancelRoom = () => {
        history.push(`/`);
    }

    const onRoomIdChange = (e) => {
        if (roomError) {
            setRoomError(false);
        }
        setRoomId(e.target.value);
    }

    const onUsernameChange = (e) => {
        if (usernameError) {
            setUsernameError(false);
        }
        setUsername(e.target.value)
    }

    useEffect(() => {
        HttpRequest.getRooms().then(response => {
            response.unshift({ id: '', value: '' })
            setRooms(response || []);
        });
    }, []);


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
                    <FormControl size="medium" style={{ minWidth: 195 }}>
                        <InputLabel value={roomId}>Room</InputLabel>
                        <Select
                            native
                            error={roomError}
                            autoWidth={false}
                            value={roomId}
                            onChange={onRoomIdChange}
                        >
                            {rooms.map(room => {
                                return <option key={room.id} value={room.id}>{room.name}</option>
                            })}
                        </Select>
                        <FormHelperText error={roomError}>Select room.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid key={1} item>
                    <TextField
                        error={usernameError}
                        value={username}
                        onChange={onUsernameChange}
                        placeholder="Username"
                        inputProps={{ maxLength: 16 }}
                        />
                    <FormHelperText error={usernameError}>Enter username.</FormHelperText>
                </Grid>
                <Grid key={2} item>
                    <FormControlLabel
                        control={<Checkbox checked={isObserver} color="primary" onChange={()=>setIsObserver(!isObserver)} />}
                        label="Join as observer"
                    />
                </Grid>
                <Grid key={3} item>
                    <Grid
                        container
                        spacing={3}
                        direction="row">
                        <Grid key={0} item>
                            <Button className={classes.button} variant="contained" color="primary" size="large" onClick={cancelRoom}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid key={1} item>
                            <Button className={classes.button} variant="contained" color="primary" size="large" onClick={selectRoom}>
                                Join
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;
