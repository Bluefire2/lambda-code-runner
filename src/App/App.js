import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './Header';
import EditorGrid from './EditorGrid';
import MapContainer from "./MapContainer";
import MovesListContainer from "./MovesListContainer";
import {bindActionCreators} from "redux";
import {runSequentialMove} from "../actions";

class App extends Component {
    render() {
        let {height} = this.props;
        if (height === void 0) {
            height = 0;
        }

        return (
            <div className="App">
                <Header/>
                <div id="data" style={{height: 52 * height}}>
                    <div style={{flex: 2}}>
                        <MapContainer/>
                    </div>
                    <div style={{flex: "1", overflowY: "scroll", overflowX: "auto"}}>
                        <MovesListContainer/>
                    </div>
                    <br/>
                </div>
<<<<<<< HEAD
                {/*For testing*/}
                <button onClick={() => this.props.runSequentialMove(false)}>Previous Move</button>
                <button onClick={() => this.props.runSequentialMove(true)}>Next Move</button>
=======
                <br/>
                <EditorGrid/>
>>>>>>> levelEditor
            </div>
        );
    }
}

const mapStateToProps = ({board: {height}}) => {
    return {height};
};

// for testing
// TODO: remove this when done
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        runSequentialMove
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
