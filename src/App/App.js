import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import './App.css';
import FieldFileInput from "../FieldFileInput";
import {loadFile} from "../actions";
import {bindActionCreators} from "redux";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    {/*For testing*/}
                    <FieldFileInput label={"Hello"} types={".txt"} onChange={this.props.loadFile} />
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadFile
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
