import React, { useEffect } from 'react';
import { localStorageService } from '../storage/local-storage.service';
import { Redirect, useHistory } from 'react-router-dom';
import ConnectionHub from "../rest/connectionHub";
import {Button, Grid} from "@material-ui/core";

function Actions() {
    const history = useHistory();
    const user = localStorageService.getLoggedUser();
    useEffect(() => {
        let wasCanceled = false;
        ConnectionHub.subscribeForJoinLobby((user) => {
            if (!wasCanceled) {
                localStorageService.setLoggedUser(user);
                const { lobbyId } = user;
                history.push(`/room/${lobbyId}`);
            }
        });
        return () => { wasCanceled = true; };
    }, [history]);
    const redirectToCreatePare = () => {
        history.push("/create");
    };
    const redirectToLogin = () => {
        history.push("/login");
    };

    return (
        <>
            { user && <Redirect to={`/room/${user.lobbyId}`} /> }

            <div className="center-page-view">
                <Grid
                    container
                    spacing={10}
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    style={{ minHeight: "25vh" }}>
                    <Grid key={0} item>
                        <Button variant="contained" color="primary" size="large" onClick={redirectToCreatePare}>
                            Create Room
                        </Button>
                    </Grid>
                    <Grid key={1} item>
                        <Button variant="contained" color="primary" size="large" onClick={redirectToLogin}>
                            Join Room
                        </Button>
                    </Grid>
                </Grid>
            </div>
       </>
    )
}

export default Actions;
