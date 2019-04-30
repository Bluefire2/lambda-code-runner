import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './Header';
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
                <Header/>
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

export default connect(mapStateToProps)(App);
