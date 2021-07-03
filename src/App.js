import "./App.css";
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { localStorageService } from "./storage/local-storage.service";
import blue from "@material-ui/core/colors/blue";
import Actions from "./actions/Actions";
import ConnectionHub from './rest/connectionHub.js';
import Login from "./login/Login";
import Create from "./create/Create";
import Home from "./home/Home.jsx";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: blue[50],
        },
    },
});

function App() {
    const user = localStorageService.getLoggedUser();

    window.addEventListener('beforeunload', () => {
        if (user && user.lobbyId) {
            ConnectionHub.leaveLobby(user.lobbyId);
        }
    });

    return (
        <>
            <img className="appImage" src={'/questions.jpg'} alt="background"></img>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Actions />
                            </Route>
                            <Route path="/create">
                                <Create />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/room/:roomId">
                                <Home user={user} />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </div>
        </>

    );
}

export default App;
