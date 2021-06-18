import React from 'react';
import PokerPlayer from './player/PokerPlayer';

function PokerTable({ players, showVotes, user, modes, onShowVotesClick, onClearVotesClick }) {
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

    //TODO: always show vote only for our user

    const d = createPlayerDistribution(players);

    return (
        <div className="table-wrapper">
            <div className="table-container">
                <div className="table-middle">
                    <div className="table-middle__core">
                        <button onClick={onClearVotesClick}>Clear Votes</button>
                        <button onClick={onShowVotesClick}>Show Votes</button>
                        <div>Popular votes: </div>
                        <div className="table-middle__mode-wrapper">
                            { modes.map((item) => {
                                return (<div key="vote" class="mode__container">
                                    <div class="mode__value">{item[0]}</div>
                                    <div class="mode__count">{item[1]} Votes</div>
                                </div>)
                             })
                            }
                        </div>
                    </div>
                </div>
                <div className="table-top">{ d.top.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-right">{ d.right.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-bottom">{ d.bottom.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-left">{ d.left.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
            </div>
        </div>
    )
}

export default PokerTable;
