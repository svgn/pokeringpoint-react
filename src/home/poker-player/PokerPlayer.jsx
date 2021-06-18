import React from 'react';

function PokerPlayer({ player, showVote }) {
    let avatarClass = 'poker-player__avatar';
    if (!showVote && player.vote) {
        avatarClass += ' poker-player__avatar--voted';
    }
    if (showVote && player.vote) {
        avatarClass += ' flipper';
    }

    let avatarFrontClassName = 'poker-player__avatar--front';
    let avatarBackClassName = 'poker-player__avatar--back poker-player__avatar--vote-visible';

    return (
        <div className="poker-player__container">
            <div className={avatarClass}>
                <div className={avatarFrontClassName}></div>
                <div className={avatarBackClassName}>{ player.vote }</div>
            </div>
            <div className="poker-player__name">{ player.name }</div>
        </div>
    )
}

export default PokerPlayer;
