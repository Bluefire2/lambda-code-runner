import React, {Component} from "react";
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import {TILE} from "../../util";
import classNames from 'classnames';
import "./style.css";
import { saveAs } from 'file-saver';

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
            show: false,
            end_goal: 50,
            max_moves: 300
        }
    }

    showEditor = () => {
        this.setState({
            show: !this.state.show
        })
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
                this.setState({
                    width: newValue,
                    cells: newCells,
                    grid: this.initGrids(newValue, this.state.height),
                    lastgrid: this.initGrids(newValue, this.state.height)
                });
                this.forceUpdate()
            } else if (field === 'height') {
                let newCells = this.initCells(this.state.width, newValue);
                this.setState({
                    height: newValue,
                    cells: newCells,
                    grid: this.initGrids(this.state.width, newValue),
                    lastgrid: this.initGrids(this.state.width, newValue)
                })
                this.forceUpdate();
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
            } else if (field === 'end_goal') {
                this.setState({
                    end_goal: newValue
                })
            } else if (field === 'max_moves') {
                this.setState({
                    max_moves: newValue
                })
            }
        }
    }

    initCells(w, h) {
        let cells = [];
        for (let y = 0; y < h; y++) {
            let row = []
            for (let x = 0; x < w; x++) {
                row.push(false);
            }
            cells.push(row);
        }
        return cells;
    }

    initGrids(w, h) {
        let cells = [];
        for (let y = 0; y < h; y++) {
            let row = []
            for (let x = 0; x < w; x++) {
                row.push({
                    type: TILE.PATH,
                    cost: 5
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
        for (let y = 0; y < height; y++) {
            let row = []
            for (let x = 0; x < width; x++) {
                let currx = x;
                let curry = y;
                let cell = this.state.grid[curry][currx];
                if (cell.type === TILE.PATH) {
                    row.push(
                        <td className={classNames('grid', 'path')}
                         key={currx + "|" + curry}>
                        {/* {this.state.grid[curry][currx].cost} */}
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
        } else if (field === 'amount' && newValue < 10 && newValue > 0) {
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
        let form = <p>This tile is not editable.</p>;
        if (pos !== null && pos !== undefined && this.inBounds(pos)) {
            const tile = this.state.grid[pos[1]][pos[0]];
            // if (tile.type === TILE.PATH) {
            //     form = 
            //         <div className="edit-item">
            //         <div className="edit-item-label">Cost: </div>
            //         <input 
            //         key={0}
            //         type="number" 
            //         value={this.state.grid[pos[1]][pos[0]].cost}
            //         onChange={(e)=>this.updateEditResult(
            //             pos, 'cost',
            //             Number(e.target.value))}
            //         />
            //         </div>
            // } else 
            if (tile.type === TILE.GOLD) {
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
                    <p>Note: Gold tiles can only have amounts between 1 ~ 9</p>
                    </div>
            } 
            // else if (tile.type === TILE.WORM) {
            //     form = 
            //         <div className="edit-item">
            //         <div className="edit-item-label">To Position X: </div>
            //         <input 
            //         type="number" 
            //         key={2}
            //         value={this.state.grid[pos[1]][pos[0]].out[0]}
            //         onChange={(e)=>this.updateEditResult(
            //             pos, 'x',
            //             Number(e.target.value))} />
            //         <div className="edit-item-label">Y: </div>
            //         <input 
            //         type="number" 
            //         key={3}
            //         value={this.state.grid[pos[1]][pos[0]].out[1]}
            //         onChange={(e)=>this.updateEditResult(
            //             pos, 'y',
            //             Number(e.target.value))} />
            //         <p>Note: Bottom left grid is (0,0)</p>
            //         <p>Out position must be a Path.</p>
            //         </div>
            // }
        }
        return form;
        
    }

    reset = () => {
        let init_cells = this.initCells(this.state.width, this.state.height);
        let newLastGrid = this.state.grid.map(arr => arr.slice(0));
        this.setState({
            cells: init_cells, 
            lastgrid: newLastGrid
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
        let items = ["path", "base-blue", "base-red", "gold", "edit", "done"];
        // let items = ["path", "wall", "base-red", "base-blue", "worm", "gold", "edit", "done"];
        for (let i = 0; i < items.length; i++) {
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
        for (let y = 0; y < this.state.height; y++) {
            for (let x = 0; x < this.state.width; x++) {
                if (cells1[y][x] !== cells2[y][x]) {
                    newCells[y][x] = true;
                    break;
                }
            }
        }
        return newCells;
    }


    updateGrid = (cells) => {
        let newGrids = this.state.grid;
        if (this.state.selectedItem === 'edit') {
            cells = this.getDifference(cells, this.state.cells);
        }

        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x] === true) {
                    if (this.state.selectedItem === "path") {
                        newGrids[y][x] = {
                            type: TILE.PATH,
                            cost: 10,
                        }
                    } else if (this.state.selectedItem === "wall") {
                        newGrids[y][x] = {
                            type: TILE.WALL
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
                            amount: 9
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
                type: tile.Type,
                out: [tile.out[0], this.state.height - tile.out[1] - 1]
            }
        } else if (tile.type === TILE.PATH) {
            return {
                type: tile.type,
                cost: tile.cost
            };
        } else if (tile.type === TILE.GOLD) {
            return {
                type: tile.type,
                amount: tile.amount
            }
        } else if (tile.type === TILE.WALL) {
            return {
                type: tile.type
            }
        } else if (tile.type === TILE.BASE) {
            return {
                type: tile.type,
                team: tile.team
            }
        }
    }


    export = () => {
        let map = [];
        let redBaseFlag = 0;
        let blueBaseFlag = 0;
        for (let x = 0; x < this.state.width; x++) {
            for (let y = 0; y <this.state.height; y++) {
                let tile = this.state.grid[y][x]
                map.push(this.tileToJson(tile));
                if (tile.type === TILE.BASE) {
                    if (tile.team === 'Red') {
                        redBaseFlag += 1;
                    } else if (tile.team === 'Blue') {
                        blueBaseFlag += 1;
                    }
                }
                
            }
        }

        if (redBaseFlag !== 1 || blueBaseFlag !== 1) {
            //missing bases
            console.log(redBaseFlag, blueBaseFlag);
            alert('Each team must have exactly one homebase.');
            return;
        }

        let obj = {
            width: this.state.width,
            height: this.state.height,
            max_gold: this.state.max_gold,
            max_bots: this.state.max_bots,
            end_goal: this.state.end_goal,
            max_moves: this.state.max_moves,
            teams: ["Blue", "Red"],
            vision: 2,
            map: map,
            moves: []
        }

        
        var fileName = 'map.json';
        
        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(obj)], {
            type: 'application/json',
            name: fileName
        });
        
        // Save the file
        saveAs(fileToSave, fileName);
    }


    render() {
        return (
            <div id="editorContainer">
                <div 
                id="editContainerContent" 
                className={this.state.show ? 'editorContent' : 'disabled'}>
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
                        <div className='input-item'>
                            <div className="label">End Goal: </div>
                            <input 
                            type="number" name="end_goal" 
                            value={this.state.end_goal}
                            onChange={(e) => this.changeParams('end_goal',Number(e.target.value))}></input>
                        </div>
                        <div className='input-item'>
                            <div className="label">Max Moves: </div>
                            <input 
                            type="number" name="max_moves" 
                            value={this.state.max_moves}
                            onChange={(e) => this.changeParams('max_moves',Number(e.target.value))}></input>
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
                        {this.generateToolBox()}
                    </div>
                    <br />
                    <div id="editorBox" className={this.state.editTile === null ? 'disabled' : 'not-disabled'}>
                        <div className="label">Edit: </div>
                        {this.generateEditItem()}
                    </div>
                    <br />
                    <div id="export">
                    <button onClick={(e) => this.export()}>Export</button>
                    </div>
                </div>
                <br/>
                <button onClick={(e) => this.showEditor()}>
                {this.state.show ? 'Hide Editor' : 'Show Editor'}
                </button>
            </div>
        );
    }
}

export default EditorGrid;