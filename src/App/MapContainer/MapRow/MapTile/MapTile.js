import React from 'react';
import "../style.css";
import {TILE} from "../../../../util";

import redBot from '../red_robot_128.svg';
import blueBot from '../blue_robot_128.svg';

export default ({tile, robots, x, y}) => {
    const {type} = tile,
        style = {};
    if (type === TILE.BASE) {
        style["border"] = `1px solid ${tile.team.toLowerCase()}`; // TODO make this nicer!
    }

    let contents = "";
    if (type === TILE.GOLD) {
        contents = tile.amount;
    } else if (type === TILE.PATH) {
        contents = tile.cost;
    }

    let bot = null;
    const botEntries = Object.entries(robots);
    for (const [handle, value] of botEntries) {
        if (value.xy[0] === x && value.xy[1] === y) {
            if (value.team === "Red") {
                bot = <img className="bot-img" src={redBot} alt="RBot" />;
            } else if (value.team === "Blue") {
                bot = <img className="bot-img" src={blueBot} alt="RBot" />;
            }
            console.log("has robot on " + x + y);
            break;
        }
    }

    let typeClass = "path";
    if (type === TILE.GOLD) {
        typeClass = "gold";
    } else if (type === TILE.BASE) {
        typeClass = "base";
    } else if (type === TILE.WORM) {
        typeClass = "worm";
    } else if (type === TILE.WALL) {
        typeClass = "wall"
    }


    return (
        <div style={style} className={`map-tile ${typeClass}`}>
            {contents}
            {bot}
        </div>
    )
}