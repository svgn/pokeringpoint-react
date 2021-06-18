import React from 'react';

function PokerPlayer({ player, showVote }) {
    let avatarClassName = 'poker-player__avatar';
    if (player.vote) {
        avatarClassName += ' poker-player__avatar--voted';
    }
    if (showVote && player.vote) {
        avatarClassName += ' poker-player__avatar--vote-visible';
    }

    return (
        <div className="poker-player__container">
            <div className={avatarClassName}>
                { showVote ? player.vote : '' }
            </div>
            <div className="poker-player__name">{player.name}</div>
        </div>
    )
}

export default PokerPlayer;
