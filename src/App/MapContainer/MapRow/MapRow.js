import React from 'react';

import MapTile from "./MapTile";
import "./style.css";

export default ({tiles, robots, y}) => {
    // TODO: make sure we can use index as the key here
    return (
        <div className="map-row">
            {tiles.map((tile, index) =>
                <MapTile key={index} tile={tile} robots={robots} x={index} y={y}/>
            )}
        </div>
    )
}