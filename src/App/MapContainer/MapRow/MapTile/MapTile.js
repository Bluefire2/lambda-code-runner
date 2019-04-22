import React from 'react';
import "../style.css";
import {TILE} from "../../../../util";

export default ({tile, key}) => {
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

    return (
        <div key={key} style={style} className={`map-tile ${type.toLowerCase()}`}>
            {contents}
        </div>
    )
}