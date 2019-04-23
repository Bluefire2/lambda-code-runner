import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import FieldFileInput from "../FieldFileInput";
import {loadFile} from "../actions";
import {bindActionCreators} from "redux";
import MapContainer from "./MapContainer";
import MovesListContainer from "./MovesListContainer";

class App extends Component {
    render() {
        let {height} = this.props;
        if (height === void 0) {
            height = 0;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    {/*For testing*/}
                    <FieldFileInput label={"Hello"} types={".json"} onChange={this.props.loadFile} />
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <div id="data" style={{height: 52 * height}}>
                    <div style={{flex: 2}}>
                        <MapContainer/>
                    </div>
                    <div style={{flex: "1", overflowY: "scroll", overflowX: "auto"}}>
                        <MovesListContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({board: {height}}) => {
    return {height};
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadFile
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
