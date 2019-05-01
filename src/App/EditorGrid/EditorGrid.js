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

    inBounds(pos) {
        if (pos[0] >= 0 && pos[0] < this.state.width && 
            pos[1] >= 0 && pos[1] < this.state.height) {
            return true;
        }
        return false;
    }

    changeParams = (field, newValue) => {
        if (newValue > 0) {
            if (field === 'width') {
                let newCells = this.initCells(newValue, this.state.height);
                let newGrids = this.initGrids(newValue, this.state.height);
                this.setState({
                    width: newValue,
                    cells: newCells,
                    grid: newGrids,
                    lastgrid: newGrids
                });
            } else if (field === 'height') {
                let newCells = this.initCells(this.state.width, newValue);
                let newGrids = this.initGrids(this.state.width, newValue);
                this.setState({
                    height: newValue,
                    cells: newCells,
                    grid: newGrids,
                    lastgrid: newGrids
                })
            } else if (field === 'vision') {
                this.setState({
                    vision: newValue
                })
            } else if (field === 'max_gold') {
                this.setState({
                    max_gold: newValue
                })
            } else if (field === 'max_bots') {
                this.setState({
                    max_bots: newValue
                })
            }
        }
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
        console.log("generate table");
        console.log(this.state.grid);
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
                    // console.log('render');
                    // console.log(cell.cost);
                    row.push(
                        <td className={classNames('grid', 'path')}
                         key={currx + "|" + curry}>
                        {this.state.grid[curry][currx].cost}
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
                         {this.state.grid[curry][currx].amount}
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
                amount: newValue
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
        });

        
    }

    generateEditItem = () => {
        const pos = this.state.editTile;
        let form = "";
        if (pos !== null && pos !== undefined && this.inBounds(pos)) {
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
                    key={2}
                    value={this.state.grid[pos[1]][pos[0]].out[0]}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'x',
                        Number(e.target.value))} />
                    <div className="edit-item-label">Y: </div>
                    <input 
                    type="number" 
                    key={3}
                    value={this.state.grid[pos[1]][pos[0]].out[1]}
                    onChange={(e)=>this.updateEditResult(
                        pos, 'y',
                        Number(e.target.value))} />
                    <p>Note: Bottom left grid is (0,0)</p>
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
            selectedItem: type,
            editTile: null
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

    getDifference = (cells1, cells2) => {
        let newCells = this.initCells(this.state.width, this.state.height);
        for (var y = 0; y < this.state.height; y++) {
            for (var x = 0; x < this.state.width; x++) {
                if (cells1[y][x] !== cells2[y][x]) {
                    newCells[y][x] = true;
                    break;
                }
            }
        }
        console.log(newCells);
        return newCells;
    }

    updateGrid = (cells) => {
        var newGrids = this.state.grid;

        if (this.state.selectedItem === 'edit') {
            cells = this.getDifference(cells, this.state.cells);
        }

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
                        console.log("gold");
                        newGrids[y][x] = {
                            type: TILE.GOLD,
                            amount: 10,
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
        let redBaseFlag = false;
        let blueBaseFlag = true;
        for (var x = 0; x < this.state.width; x++) {
            for (var y = (this.state.height-1); y >= 0; y--) {
                let tile = this.state.grid[y][x]
                map.push(this.tileToJson(tile));
                if (tile.type === TILE.BASE) {
                    if (tile.team === 'Red') {
                        redBaseFlag = true;
                    } else if (tile.team === 'Blue') {
                        blueBaseFlag = true;
                    }
                }
                
            }
        }

        if (!redBaseFlag || !blueBaseFlag) {
            //missing bases
            alert('Missing Home Base');
            return;
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
        console.log("render");
        return (
            <div id="editorContainer">
                <div id="editorHeader">
                    <div className='input-item'>
                        <div className="label">Width: </div>
                        <input 
                        type="number" name="width" 
                        value={this.state.width} 
                        onChange={(e) => this.changeParams('width',Number(e.target.value))}></input>
                    </div>
                    <div className='input-item'>
                        <div className="label">Height: </div>
                        <input 
                        type="number" name="height" 
                        value={this.state.height}
                        onChange={(e) => this.changeParams('height',Number(e.target.value))}></input>
                    </div>
                    <div className='input-item'>
                        <div className="label">Vision: </div>
                        <input 
                        type="number" name="vision" 
                        value={this.state.vision}
                        onChange={(e) => this.changeParams('vision',Number(e.target.value))}></input>
                    </div>
                    <div className='input-item'>
                        <div className="label">Gold Cap: </div>
                        <input 
                        type="number" name="max_gold" 
                        value={this.state.max_gold}
                        onChange={(e) => this.changeParams('max_gold',Number(e.target.value))}></input>
                    </div>
                    <div className='input-item'>
                        <div className="label">Bot Cap: </div>
                        <input 
                        type="number" name="max_bots" 
                        value={this.state.max_bots}
                        onChange={(e) => this.changeParams('max_bots',Number(e.target.value))}></input>
                    </div>
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