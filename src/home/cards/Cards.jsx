import React from 'react';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import blue from "@material-ui/core/colors/blue";

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
        background: blue[100],
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',

        "&:active, &:hover": {
            backgroundColor: blue[300],
            marginTop: '-.25rem'
        }
    },
    selectedCard: {
        backgroundColor: blue[300],
        marginTop: '-.25rem'
    }
}));

function Cards({ items, onSelection, selectedCard }) {
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
            {items.map((card) => {
                const selectedClass = selectedCard === card ? classes.selectedCard : '';
                return (
                    <Grid key={card} item onClick={() => onSelect(card)}>
                        <Paper
                            className={`${classes.paper} ${selectedClass}`}>
                            <Typography variant="h5" component="h3">
                                {card}
                            </Typography>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default Cards;
