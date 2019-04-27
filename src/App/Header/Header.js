import React, {Component} from 'react';
import {connect} from 'react-redux';

import FieldFileInput from "../../FieldFileInput";
import {loadFile} from "../../actions";
import {bindActionCreators} from "redux";


import "./style.css";


class Header extends Component {
    constructor(props) {
        super(props);
    }

    renderScore(teams, scores) {

        //check for null
        if (teams == null || scores == null) {
            return;
        }
        
        var lst = []
        lst.push(
            <div className="section-head" key={-1}>Scores</div>
        )
        for (var i = 0; i < teams.length; i++) {
            lst.push(
                <div className="score-item" key={i}>
                    Team {teams[i]}: {scores[teams[i]]}
                </div> 
            );
        }
        return lst;
    }

    renderBots(teams, bots, cap) {

        //check for null
        if (teams == null || bots == null || cap == null) {
            return;
        }

        var lst = [];
        lst.push(
            <div className="section-head" key={-1}>Num of Bots</div>
        )
        for (var i = 0; i < teams.length; i++) {
            lst.push(
                <div className="bot-item" key={i}>
                    Team {teams[i]}: {bots[i]}/{cap}
                </div>
            )
        }
        return lst;
    }

    renderMovesLeft(moves, next, goldcap) {
        console.log(moves, next, goldcap);

        //check for null
        if (moves == null || next == null || goldcap == null) {
            return;
        }

        var lst = [];
        lst.push(
            <div className="section-head" key={"gold"}>Gold Cap: {goldcap}</div>
        );
        lst.push(
            <div className="section-head" key={"move-head"}>Moves Left: </div>
        );
        lst.push(
            <div id="MovesCounter" key="move">{next} / {moves.length}</div>
        )
        return lst;
    }

    render() {
        /*  teams: a list of all the teams
            scores: a list of the current scores for each team in order of the teams list
            bots: a list of num of bots for the teams in order of teams list
            goldcap: an int that represents the gold cap per bot
            moves: all moves
            next: next index of move
        */
        const {teamNames, teams, bots, max_gold, max_bots, moves, next} = this.props;
        const score = this.renderScore(teamNames, teams);
        //const numBots = this.renderBots(teams, bots, max_bots);
        const movesLeft = this.renderMovesLeft(moves, next, max_gold);
        return (
            <div id="HeaderContainer">
                <FieldFileInput className="header-item" label={"Import"} types={".json"} onChange={this.props.loadFile} />
                <div className="header-item" id="Score">{score}</div>
                {/* <div className="header-item" id="NumBots">{numBots}</div> */}
                <div className="header-item" id="MovesLeft">{movesLeft}</div>
            </div>
        );
    }
}

const mapStateToProps = ({board: {teamNames, max_gold, max_bots, teams, robots},
                          history: {moves, next}}) => {
    return {
        teamNames, teams, robots, max_gold, max_bots, moves, next
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadFile
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);