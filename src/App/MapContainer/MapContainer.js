import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapRow from "./MapRow";

class MapContainer extends Component {
    render() {
        const { map, width, height, teams, bases, robots } = this.props;
        console.log(map);
        if (map == null) { // double equals is intentional here, please don't change this
            return (
                <div id="map-container">

                </div>
            )
        }
        // TODO: make sure we can use index as the key here
        const rows = map.map((mapRow, index) => {
            return <MapRow tiles={mapRow} key={index} />
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