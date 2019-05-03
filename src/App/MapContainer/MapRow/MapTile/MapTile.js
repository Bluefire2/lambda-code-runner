import React from 'react';
import "../style.css";
import {TILE} from "../../../../util";

import redBot from '../red_robot_128.svg';
import blueBot from '../blue_robot_128.svg';

export default ({tile, robots}) => {
    const style = {};
    
    let type = tile.type;
    if (type === TILE.BASE) {
        style["border"] = `1px solid ${tile.team.toLowerCase()}`; // TODO make this nicer!
    }

    let contents = "";
    if (type === TILE.GOLD) {
        if (tile.amount === 0) {
            //no gold left, switch to path
            tile = {
                type: TILE.PATH,
                cost: 10
            };
            type = TILE.PATH;
        } else {
            contents = tile.amount;
        }
        
    }
    
    if (type === TILE.PATH) {
        contents = tile.cost;
    }

    const bots = robots.map(({team, handle}) => {
        if (team === "Red") {
            return <img key={'red'+handle} className="bot-img" src={redBot} alt="RBot" />;
        } else if (team === "Blue") {
            return <img key={'blue'+handle} className="bot-img" src={blueBot} alt="BBot" />;
        } else {
            return null; // >:(
        }
    });

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
            {bots}
        </div>
    )
}