import React from 'react';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import blue from "@material-ui/core/colors/blue";
import One from '../../assets/cards/1.png';
import Two from '../../assets/cards/2.png';
import Three from '../../assets/cards/3.png';
import Five from '../../assets/cards/5.png';
import Eight from '../../assets/cards/8.png';
import Thirteen from '../../assets/cards/13.png';
import Twenty from '../../assets/cards/20.png';
import Fourty from '../../assets/cards/40.png';
import Hundred from '../../assets/cards/100.png';
import Break from '../../assets/cards/break.png';
import Cake from '../../assets/cards/cake.png';
import Dragon from '../../assets/cards/dragon.png';
import Split from '../../assets/cards/split.png';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        minHeight: 120,
        margin: 0,
        width: '100%'
    },
    paper: {
        height: 70,
        width: 50,
        background: 'var(--light-gray-blue)',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
        opacity: '0.7',

        "&:active, &:hover": {
            opacity: 1,
            marginTop: '-.25rem'
        }
    },
    cardImage: {
        width: '100%',
        height: '100%'
    },
    selectedCard: {
        backgroundColor: blue[300],
        marginTop: '-.25rem'
    }
}));

const cardImageValueMap = {
    1: One,
    2: Two,
    3: Three,
    5: Five,
    8: Eight,
    13: Thirteen,
    20: Twenty,
    40: Fourty,
    100: Hundred,
    'cake': Cake,
    'split': Split,
    'dragon': Dragon,
    'break': Break,
};

function Cards({ cards, onSelection, selectedCard }) {
    const classes = useStyles();
    const onSelect = (card) => {
        onSelection(card);
    }

    return (
        <Grid
            className={classes.root}
            container
            item
            spacing={3}
            justify="center"
            alignItems="center"
            alignContent="center">
            {cards.map((card) => {
                const selectedClass = selectedCard === card ? classes.selectedCard : '';
                return (
                    <Grid key={card} item onClick={() => onSelect(card)}>
                        <Paper
                            className={`${classes.paper} ${selectedClass}`}>
                            { cardImageValueMap[card] ? 
                                (<img className={classes.cardImage} src={cardImageValueMap[card]} alt={card} />) :
                                (<Typography variant="h5" component="h3">
                                    {card}
                                </Typography>)
                            }
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default Cards;
