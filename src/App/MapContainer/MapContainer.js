import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapRow from "./MapRow";

class MapContainer extends Component {
    render() {
        const { map, width, height, teams, bases, robots } = this.props;
        if (map == null) { // double equals is intentional here, please don't change this
            return (
                <div id="map-container">

                </div>
            )
        }

        const robotsByRow = Array(height);
        for (let i = 0; i < height; i++) robotsByRow[i] = []; // have to do this manually as [] is an object
        robots.forEach(robot => {
            const {xy: [, y]} = robot;
            robotsByRow[y].push(robot);
        });

        const rows = map.map((mapRow, index) => {
            return <MapRow tiles={mapRow} key={index} robots={robotsByRow[index]} y={index}/>
        });

        return (
            <div id="map-container">
                {rows}
            </div>
        )
    }
}

const mapStateToProps = ({board: {map, width, height, teams, bases, robots}}) => {
    return {
        map, width, height, teams, bases, robots
    };
};

export default connect(mapStateToProps)(MapContainer);