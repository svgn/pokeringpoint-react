import React from 'react';
import PokerPlayer from './player/PokerPlayer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

function PokerTable({ players, showVotes, user, modes, suggestedMode, onShowVotesClick, onClearVotesClick }) {
    const createPlayerDistribution = () => {
        let distribution = {
            top: [],
            bottom: [],
            left: [],
            right: []
        };
        players.forEach((item, index) => {
            if (index % 4 === 0) {
                distribution.bottom.push(item);
            } else if (index % 4 === 1) {
                distribution.left.push(item);
            } else if (index % 4 === 2) {
                distribution.top.push(item);
            } else {
                distribution.right.push(item);
            }
        });

        return distribution;
    }

    const shouldShowVoteForPlayer = (player) => {
        return showVotes || player.connectionId === user.connectionId;
    }

    const d = createPlayerDistribution(players);
    const hasVotes = players?.some((player) => player.vote !== null);
    const userHasVoted = players?.some((player) => player.connectionId === user.connectionId && player.vote);
    const pleaseVoteLabel = userHasVoted ? '' : 'Please vote!';

    return (
        <div className="table-wrapper">
            <div className="table-header">
                <h3>{pleaseVoteLabel}</h3>
            </div>
            <div className="table-container">
                <div className="table-middle">
                    <div className="table-middle__core">
                        <div className="table-middle__button-wrapper">
                            {showVotes && (
                                <div className="table-middle__button" onClick={onClearVotesClick}>
                                    <DeleteSweepIcon fontSize="large"></DeleteSweepIcon>
                                    <div>Clear Votes</div>
                                </div>)
                            }
                            {hasVotes && !showVotes && (
                                <div className="table-middle__button" onClick={onShowVotesClick}>
                                    <VisibilityIcon fontSize="large"></VisibilityIcon>
                                    <div>Show votes</div>
                                </div>)
                            }
                        </div>
                       
                        <div className="table-middle__mode-wrapper">
                            { showVotes && modes.map((item) => {
                                return (<div key={item.vote} className="mode__container">
                                    <div className="mode__value">{item[0]}</div>
                                    <div className="mode__count">{item[1]} Votes</div>
                                </div>)
                             })
                            }
                        </div>
                        {showVotes && (
                            <div className="table-middle__suggested-vote">
                                <div>Suggested vote:</div>
                                <div key="vote" className="mode__container">
                                    <div className="mode__value">{suggestedMode}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-top">{ d.top.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={shouldShowVoteForPlayer(p)}></PokerPlayer>)) }</div>
                <div className="table-right">{ d.right.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={shouldShowVoteForPlayer(p)}></PokerPlayer>)) }</div>
                <div className="table-bottom">{ d.bottom.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={shouldShowVoteForPlayer(p)}></PokerPlayer>)) }</div>
                <div className="table-left">{ d.left.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={shouldShowVoteForPlayer(p)}></PokerPlayer>)) }</div>
            </div>
        </div>
    )
}

export default PokerTable;
