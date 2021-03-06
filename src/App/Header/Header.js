import React, {Component} from 'react';
import {connect} from 'react-redux';

import FieldFileInput from "../../FieldFileInput";
import {loadFile} from "../../actions";
import {bindActionCreators} from "redux";

import "./style.css";

class Header extends Component {
    render() {
        /*  teams: a list of all the teams
            scores: a list of the current scores for each team in order of the teams list
            bots: a list of num of bots for the teams in order of teams list
            goldcap: an int that represents the gold cap per bot
            moves: all moves
            next: next index of move
        */
        const {teamNames, teams, maxGold, moves, nextMove} = this.props;
        const input = <FieldFileInput className="header-item"
                                      label={"Import"}
                                      types={".json"}
                                      onChange={this.props.loadFile}/>;
        if (teamNames === void 0) {
            return (
                <div id="header-container">
                    {input}
                </div>
            );
        }
        return (
            <div id="header-container">
                {input}
                <div className="header-item" id="Score">
                    <div className="section-head" key={-1}>Scores</div>

                    {Object.keys(teams).map((team, i) =>
                        <div className="score-item" key={i}>
                            Team {team}: {teams[team]}
                        </div>
                    )}
                </div>

                {/* <div className="header-item" id="NumBots">{numBots}</div> */}
                <div className="header-item" id="MovesLeft">
                    <div className="section-head" key={"gold"}>Gold Cap: {maxGold}</div>
                    <div className="section-head" key={"move-head"}>Moves: {nextMove} / {moves.length}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({board: {teamNames, maxGold, maxBots, teams, robots, moves, nextMove}}) => {
    return {
        teamNames, teams, robots, maxGold, maxBots, moves, nextMove
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadFile
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);