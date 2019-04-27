import React, {Component} from "react";
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import {TILE} from "../../util";
import classNames from 'classnames';
import "./style.css";

class EditorGrid extends Component {
    constructor (props) {
        super(props);

        this.state = {
            width: 30,
            height: 5,
            cells: this.initCells(30, 5), 
            selectedItem: "gold",
            grid: this.initGrids(30, 5),
            lastgrid: this.initGrids(30,5),
            editTile: null,
            max_gold: 10,
            max_bots: 4,
            vision: 2,
        }
    }

    changeWidth = (w) => {
        let newCells = this.initCells(w, this.state.height);
        let newGrids = this.initGrids(w, this.state.height);
        this.setState({
            width: w,
            cells: newCells,
            grid: newGrids,
            lastgrid: newGrids
        });
    }

    changeHeight = (h) => {
        let newCells = this.initCells(this.state.width, h);
        let newGrids = this.initGrids(this.state.width, h);
        this.setState({
            height: h,
            cells: newCells,
            grid: newGrids,
            lastgrid: newGrids
        })
    }

    initCells(w, h) {
        var cells = [];
        for (var y = 0; y < h; y++) {
            var row = []
            for (var x = 0; x < w; x++) {
                row.push(false);
            }
            cells.push(row);
        }
        return cells;
    }

    initGrids(w, h) {
        var cells = [];
        for (var y = 0; y < h; y++) {
            var row = []
            for (var x = 0; x < w; x++) {
                row.push({
                    type: TILE.PATH,
                    cost: 10
                });
            }
            cells.push(row);
        }
        return cells;
    }

    generateTable(cells) {
        let width = cells[0].length;
        let height = cells.length;
        let table = []
        for (var y = 0; y < height; y++) {
            let row = []
            for (var x = 0; x < width; x++) {
                let currx = x;
                let curry = y;
                let cell = this.state.grid[curry][currx];
                if (cell.type === TILE.PATH) {
                    row.push(
                        <td className={classNames('grid', 'path')}
                         key={currx + "|" + curry}>
                        {cell.cost}
                        </td>
                    );
                } else if (cell.type === TILE.WALL) {
                    row.push(
                        <td className={classNames('grid', 'wall')}
                         key={currx + "|" + curry}>
                        </td>
                    );
                } else if (cell.type === TILE.GOLD) {
                    row.push(
                        <td className={classNames('grid', 'gold')}
                         key={currx + "|" + curry}>
                         {cell.amount}
                        </td>
                    );
                } else if (cell.type === TILE.WORM) {
                    row.push(
                        <td className={classNames('grid', 'worm')}
                         key={currx + "|" + curry}>
                        </td>
                    );
                } else if (cell.type === TILE.BASE) {
                    row.push(
                        <td className={
                            classNames('grid', 
                            cell.team === "Blue" ? 'base-blue' : 'base-red')}
                         key={currx + "|" + curry}>
                        </td>
                    );
                } 
                
            }
            table.push(<tr key={y}>{row}</tr>);
        }
        return table;
    }

    updateEditResult = (pos, field, newValue) => {
        let newGrid = this.state.grid;
        let x = pos[0];
        let y = pos[1];
        if (field === 'cost') {
            newGrid[y][x] = {
                type: TILE.PATH,
                cost: newValue
            }
        } else if (field === 'amount') {
            newGrid[y][x] = {
                type: TILE.GOLD,
                cost: newValue
            }
        } else if (field === 'x') {
            let outy = newGrid[y][x].out[1];
            newGrid[y][x] = {
                type: TILE.WORM,
                out: [newValue, outy]
            }
        } else if (field === 'y') {
            let outx = newGrid[y][x].out[0];
            newGrid[y][x] = {
                type: TILE.WORM,
                out: [outx, newValue]
            }
        }

        this.setState({
            grid: newGrid
        })
        
    }

    generateEditItem = () => {
        const pos = this.state.editTile;
        let form = "";
        if (pos !== null && pos !== undefined) {
            console.log(pos);
            const tile = this.state.grid[pos[1]][pos[0]];
            if (tile.type === TILE.PATH) {
                form = 
                    <div className="edit-item">
                    <div className="edit-item-label">Cost: </div>
                    <input 
                    key={0}
                    type="number" 
                    value={this.state.grid[pos[1]][pos[0]].cost}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'cost',
                        Number(e.target.value))}
                    />
                    </div>
            } else if (tile.type === TILE.GOLD) {
                form = 
                    <div className="edit-item">
                    <div className="edit-item-label">Amount: </div>
                    <input 
                    key={1}
                    type="number" 
                    value={this.state.grid[pos[1]][pos[0]].amount}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'amount',
                        Number(e.target.value))}
                    />
                    </div>
            } else if (tile.type === TILE.WORM) {
                form = 
                    <div className="edit-item">
                    <div className="edit-item-label">To Position X: </div>
                    <input 
                    type="number" 
                    value={this.state.grid[pos[1]][pos[0]].out[0]}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'x',
                        Number(e.target.value))} />
                    <div className="edit-item-label">Y: </div>
                    <input 
                    type="number" 
                    value={this.state.grid[pos[1]][pos[0]].out[1]}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'y',
                        Number(e.target.value))} />
                    </div>
            }
        }
        return form;
        
    }

    reset = () => {
        var init_cells = this.initCells(this.state.width, this.state.height);
        this.setState({
            cells: init_cells, 
            lastgrid: this.state.grid
        })
    }

    changeSelectedItem = (type) => {
        this.reset();
        this.setState({
            selectedItem: type
        })
    }

    generateToolBox = () => {
        let lst = [];
        let items = ["path", "wall", "base-red", "base-blue", "worm", "gold", "edit", "done"];
        for (var i = 0; i < items.length; i++) {
            let type = items[i];
            lst.push(
                <div 
                key={i}
                className={classNames(
                    type,
                    "tool-item",
                    this.state.selectedItem === items[i] ? "selected" : "not-selected"
                )}
                onClick={(e) => this.changeSelectedItem(type)}></div>
            );
        }
        return lst;
    }

    updateGrid = (cells) => {
        var newGrids = this.state.grid;
        for (var y = 0; y < cells.length; y++) {
            for (var x = 0; x < cells[y].length; x++) {
                if (cells[y][x] === true) {
                    if (this.state.selectedItem === "path") {
                        newGrids[y][x] = {
                            type: TILE.PATH,
                            cost: 10,
                        }
                    } else if (this.state.selectedItem === "wall") {
                        newGrids[y][x] = {
                            type: TILE.WALL,
                        }
                    } else if (this.state.selectedItem === "base-red") {
                        newGrids[y][x] = {
                            type: TILE.BASE,
                            team: "Red"
                        }
                    } else if (this.state.selectedItem === "base-blue") {
                        newGrids[y][x] = {
                            type: TILE.BASE,
                            team: "Blue"
                        }
                    } else if (this.state.selectedItem === "worm") {
                        newGrids[y][x] = {
                            type: TILE.WORM,
                            out: [0,0]
                        }
                    } else if (this.state.selectedItem === "gold") {
                        newGrids[y][x] = {
                            type: TILE.GOLD,
                            amount: 10
                        }
                    } else if (this.state.selectedItem === "edit") {
                        //edit
                        this.setState({
                            editTile: [x,y]
                        })
                    } else if (this.state.selectedItem === "done") {
                        this.setState({
                            editTile: null,
                            selectedItem: null
                        });
                    }
                } else {
                    newGrids[y][x] = this.state.lastgrid[y][x];
                }
            }
        }
        this.setState({
            cells: cells,
            grid: newGrids,
        });

    }

    tileToJson(tile) {
        if (tile.type === TILE.WORM) {
            return {
                type: 'Wormhole',
                out: [tile.out[0], this.state.height - tile.out[1] - 1]
            }
        } else if (tile.type === TILE.PATH) {
            return {
                type: 'Path',
                cost: tile.cost
            };
        } else if (tile.type === TILE.GOLD) {
            return {
                type: 'Gold',
                amount: tile.amount
            }
        } else if (tile.type === TILE.WALL) {
            return {
                type: 'Wall'
            }
        } else if (tile.type === TILE.BASE) {
            return {
                type: 'Base',
                team: tile.team
            }
        }
    }


    export = () => {
        let map = [];
        for (var x = 0; x < this.state.width; x++) {
            for (var y = (this.state.height-1); y >= 0; y--) {
                console.log(this.state.grid);
                console.log(y);
                map.push(this.tileToJson(this.state.grid[y][x]));
            }
        }

        let obj = {
            width: this.state.width,
            height: this.state.height,
            max_gold: this.state.max_gold,
            max_bots: this.state.max_bots,
            teams: ["Blue", "Red"],
            vision: 2,
            map: map
        }

        var text = JSON.stringify(obj);
        var filename = "map.json";
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    render() {
        return (
            <div id="editorContainer">
                <div id="editorHeader">
                    <input 
                    type="number" name="width" 
                    value={this.state.width} 
                    onChange={(e) => this.changeWidth(Number(e.target.value))}></input>
                    <input 
                    type="number" name="height" 
                    value={this.state.height}
                    onChange={(e) => this.changeHeight(Number(e.target.value))}></input>
                </div>
                <TableDragSelect
                value={this.state.cells}
                onChange={cells => this.updateGrid(cells)}
                >
                {this.generateTable(this.state.cells)}
                </TableDragSelect>
                <br/>
                <div id="toolBox">
                    <div className="label">Tools: </div>
                    {this.generateToolBox()}</div>
                <div id="editorBox">
                    <div className="label">Edit: </div>
                    {this.generateEditItem()}</div>
                <div id="export">
                <button onClick={(e) => this.export()}>Export</button>
                </div>
            </div>
        );
    }
}

export default EditorGrid;