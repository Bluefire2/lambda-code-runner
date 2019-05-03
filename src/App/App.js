import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './Header';
import EditorGrid from './EditorGrid';
import MapContainer from "./MapContainer";
import MovesListContainer from "./MovesListContainer";
import {bindActionCreators} from "redux";
import {playGame, runSequentialMove, stopGame} from "../actions";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        let {height, nextMove, totalMoves, initialized, play} = this.props;
        if (height === void 0) {
            height = 0;
        }

        return (
            <div className="App">
                <Header/>
                {/* style={{height: 52 * height}} */}
                <div id="data" style={{height: 32 * height}}>
                    <div style={{flex: 2}}>
                        <MapContainer/>
                    </div>
                    <div style={{flex: "1", overflowY: "scroll", overflowX: "scroll"}}>
                        <MovesListContainer/>
                    </div>
                    <br/>
                </div>
                {initialized &&
                    <div id="buttons">
                        <button onClick={() => this.props.runSequentialMove(false)}
                                disabled={play || nextMove === 0}>Previous Move</button>

                        <button onClick={() => this.props.stopGame()} disabled={!play}>Stop</button>

                        <button onClick={() => this.props.playGame()} disabled={play}>Play</button>

                        <button onClick={() => this.props.runSequentialMove(true)}
                                disabled={play || nextMove >= totalMoves}>Next Move</button>
                    </div>
                }

                <br/>
                <EditorGrid/>
            </div>
        );
    }
}

const mapStateToProps = ({board: {height, nextMove, moves}, gameStatus: {initialized, play}}) => {
    const totalMoves = typeof moves === "undefined" ? 0 : moves.length;
    return {height, nextMove, totalMoves, initialized, play};
};

// for testing
// TODO: remove this when done
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        playGame,
        stopGame,
        runSequentialMove
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
