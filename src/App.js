import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';
import CutIcon from 'material-ui-icons/ContentCut';
import RockIcon from 'material-ui-icons/Gavel';
import PaperIcon from 'material-ui-icons/Assignment';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

/**
 * Theme styling
 * */
const styleSheet = createStyleSheet('App', theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 345,
    },
}));

/**
 * Array of objects that map to ROCK, PAPER, SCISSORS
 * */
const GAME_RULES = [
    {
        name: "ROCK",
        wins: 'SCISSORS',
        loses: 'PAPER',
        draw: 'ROCK'
    },
    {
        name: "SCISSORS",
        wins: 'PAPER',
        loses: 'ROCK',
        draw: 'SCISSORS'
    },
    {
        name: "PAPER",
        wins: 'ROCK',
        loses: 'SCISSORS',
        draw: 'PAPER'
    }
];

/**
 *
 * App class
 * */

class App extends Component {

    constructor(props){
        super(props);
        this.classes = props.classes;
        this.state = {
            results: '',
            wins: 0,
            loses: 0,
            draws: 0
        }
    };

    /**
     * Handler for choice selection.
     * Triggers Computer choice.
     * @param { string } args - the name of the choice selected.
     * */
    _handleOnChoiceSelected = (args) => {
        this._computeShapeResults(this._playShape(args), this._pickAtRandomForComputer());
    };

    /**
     * @param {string} shape - this is the name of the shape the user plays.
     * @return {object} result of filtering through the game rules for a name that matches shape name.
     */
    _playShape = (shape) => {
        return GAME_RULES.filter( rule => rule.name === shape)[0];
    };

    /**
     * @param {number} min - minimum(inclusive) random number.
     * @param {number} max - maximum(exclusive) random number.
     * @return {number} a random number between min and max and could include min.
     */
    _generateRandomNumberForRuleIndex(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    /**
     * Compares user shape properties [wins, loses, draw] with computer  [wins, loses, draw] properties.
     * @param {object} shape_one_from_user - User's choice.
     * @param {object} shape_two_from_computer  - Computer choice.
     */
    _computeShapeResults(shape_one_from_user, shape_two_from_computer){
        if(shape_one_from_user.wins === shape_two_from_computer.name){
            this.setState({
                results: `USER wins with ${shape_one_from_user.name} against CPU ${shape_two_from_computer.name}`,
                wins: this.state.wins + 1
            });
        }else if(shape_one_from_user.loses === shape_two_from_computer.name){
            this.setState({
                results: `USER loses with ${shape_one_from_user.name} against CPU ${shape_two_from_computer.name}`,
                loses: this.state.loses + 1
            });
        }else if(shape_one_from_user.draw === shape_two_from_computer.name){
            this.setState({
                results: `USER draws with ${shape_one_from_user.name} against CPU ${shape_two_from_computer.name}`,
                draws: this.state.draws + 1
            });
        }else{
            this.setState({
                results: `CPU wins with ${shape_one_from_user.name} against CPU ${shape_one_from_user.name}`,
                loses: this.state.loses + 1
            });
        }
    };

    /**
     * Select a random shape from rule object
     * @return{ object } a specific shape object at the random index
     * */
    _pickAtRandomForComputer(){
        return GAME_RULES[this._generateRandomNumberForRuleIndex(0, 3)];
    };

    /**
     * Resets result string*/
    _resetResultString = () => {
        this.setState({results: '', wins: 0, draws: 0, loses:0});
    };

    render(){
        return (
            <div className={this.classes.root}>
                <Grid container gutter={24}>
                    <Grid item xs={12}>
                        <Paper className={this.classes.paper}>
                            <h3>You v Computer</h3>
                            <span>You are playing against Computer</span>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Card raised>
                            <Paper className={this.classes.paper}>
                                <h4>Choose</h4>
                                <span >Select a choice by clicking on ROCK, PAPER, SCISSORS buttons</span>
                            </Paper>
                            <Paper className={this.classes.paper}>
                                <Button onClick={this._handleOnChoiceSelected.bind(this,'ROCK')} raised color="primary" className={this.classes.button}>
                                    Rock
                                    <RockIcon/>
                                </Button>
                                <Button onClick={this._handleOnChoiceSelected.bind(this,'PAPER')} raised color="accent" className={this.classes.button}>
                                    Paper
                                    <PaperIcon/>
                                </Button>
                                <Button  onClick={this._handleOnChoiceSelected.bind(this,'SCISSORS')} raised color="contrast" className={this.classes.button}>
                                    Scissors
                                    <CutIcon/>
                                </Button>
                            </Paper>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{textAlign:'center'}}>
                            <h4>Outcome</h4>
                        </div>
                        <Paper className={this.classes.paper}>
                            <div className={this.classes.button}>
                                <span>{`${this.state.results}`}</span>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={this.classes.paper}>
                            Wins: {this.state.wins}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={this.classes.paper}>
                            Draws: { this.state.draws}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={this.classes.paper}>
                            Loses: {this.state.loses}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={this.classes.paper}>
                            <Button onClick={this._resetResultString} raised color="default" className={this.classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(App);
