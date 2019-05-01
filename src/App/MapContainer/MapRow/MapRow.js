import React from 'react';

import MapTile from "./MapTile";
import "./style.css";

export default ({tiles, robots, y}) => {
    const robotsByTile = Array(tiles.length);
    for (let i = 0; i < tiles.length; i++) robotsByTile[i] = [];
    robots.forEach(robot => {
        const {xy: [x, ]} = robot;
        robotsByTile[x].push(robot);
    });
    return (
        <div className="map-row">
            {tiles.map((tile, index) =>
                <MapTile key={index} tile={tile} robots={robotsByTile[index]} x={index} y={y}/>
            )}
        </div>
    )
}