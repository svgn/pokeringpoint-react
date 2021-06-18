import { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { localStorageService } from '../storage/local-storage.service';
import { Redirect } from 'react-router-dom';
import HttpRequest from '../rest/httpRequest';
import ConnectionHub from '../rest/connectionHub.js';
import Cards from "./cards/Cards";
import PokerTable from './poker-table/PokerTable';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { groupVotes, getSuggestedMode } from '../utils/statisticsUtils'

const initialState = {
    name: 'No name',
    showVotes: false,
    userList: [],
    cards: []
};

const calculateModes = (state) => {
    const votes = state.userList?.map(user => user.vote);
    return groupVotes(votes);
}

const calculateSuggestedMode = (state) => {
    const votes = state.userList?.map(user => user.vote);
    return getSuggestedMode(votes);
}

function reducer(state = {}, action = {}) {
    switch (action.type) {
        case 'vote':
            return {
                ...state,
                userList: state.userList.map(user => (user.connectionId === action.payload.connectionId ? { ...user, vote: action.payload.vote } : user))
            };
        case 'showVotes':
            return { ...state, showVotes: true };
        case 'clearVotes':
            return {
                ...state,
                showVotes: false,
                userList: state.userList.map(user => ({ ...user, vote: null }))
            };
        case 'update':
            return { ...action.payload };
        default:
            throw new Error();
    }
}

export function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState(localStorageService.getLoggedUser());
    const params = useParams();
    const roomId = parseInt(params.roomId);
    let modes = calculateModes(state);
    let suggestedMode = calculateSuggestedMode(state);

    useEffect(() => {
        let wasCanceled = false;
        ConnectionHub.subscribeForUpdateLobby(roomId, (lobby) => {
            if (!wasCanceled) {
                const mappedLobby = { ...lobby, userList: lobby.users || [] };
                dispatch({ type: 'update', payload: mappedLobby });
            }
        })

        HttpRequest.getRoom({ id: roomId }).then((lobby) => {
            if (!wasCanceled) {
                const mappedLobby = { ...lobby, userList: lobby.users || [] };
                dispatch({ type: 'update', payload: mappedLobby });

                if (user) {
                    const match = lobby?.users.find(u => u.connectionId === user.connectionId);
                    if (!match) {
                        ConnectionHub.joinLobby(roomId, user.name, user.userType);
                    }
                }
            }
        }).catch(() => {
            clearUser();
        });

        return () => { wasCanceled = true; };
    }, [roomId, user]);

    

    const onShowVotesClick = async (event) => {
        event.preventDefault();
        await ConnectionHub.showVote(roomId);

    }

    const onClearVotesClick = async (event) => {
        event.preventDefault();
        await ConnectionHub.clearVote(roomId);
    }

    const onVoteClick = async (card) => {
        await ConnectionHub.vote(roomId, card);
    };

    const onLeaveRoomClick = async (event) => {
        event.preventDefault();
        await ConnectionHub.leaveLobby(roomId);
        clearUser();
    }

    const clearUser = () => {
        localStorageService.clearLoggedUser();
        setUser(null);
    }

    const showVotes = state.showVotes || state.userList.reduce((acc,user) => (acc && user.vote), true);
    const currentUser = state.userList.find(player => player.connectionId === user.connectionId) || {};

    return (
        <>
            { !user ? <Redirect to='/' /> :
                <div className="home-main">
                    <header className="home__header">
                        <h2>{state.name}</h2>
                        <div className="home__header-button" onClick={onLeaveRoomClick}>
                            <MeetingRoomIcon fontSize="large"/>
                            <div>Leave Room</div>
                        </div>
                    </header>
                    <hr/>
                    <div className="home__table">
                        {state.userList &&
                        <PokerTable
                            players={state.userList}
                            showVotes={showVotes}
                            user={user}
                            onShowVotesClick={onShowVotesClick}
                            onClearVotesClick={onClearVotesClick}
                            modes={modes}
                            suggestedMode={suggestedMode}
                        />
                        }
                    </div>
                    {user.userType === 1 &&
                        <div className="home__voting-footer">
                            <Cards
                                items={state.cards}
                                onSelection={onVoteClick}
                                selectedCard={currentUser.vote}
                                disable={state.showVotes}
                            />
                        </div>
                    }
                </div>
            }
        </>
    );
}
