import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

import {moveToString} from "../../util";
import "./style.css";


class MovesListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {moves, nextMove} = this.props;
        console.log(moves);
        if (moves == null) { // double equals is intentional here, please don't change this
            return (
                <div id="moves-container">

                </div>
            )
        }

        const movesList = moves.map((move, index) => {
            const classes = classNames({
                "move-element": true,
                "past-move": index < nextMove,
                "next-move": index === nextMove
            });

            if (index < nextMove) {
                // don't render past moves :(
                return null;
            } else {
                return <p key={index} className={classes}>{moveToString(move)}</p>
            }
        }).filter(elem => elem !== null);

        return (
            <div id="moves-container">
                {movesList}
            </div>
        )
    }
}

const mapStateToProps = ({board: {moves, nextMove}}) => {
    return {
        moves, nextMove
    };
};

export default connect(mapStateToProps)(MovesListContainer);