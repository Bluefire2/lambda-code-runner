import produce from 'immer';

export const DIRECTION = {
    FORWARD: "FORWARD",
    BACKWARD: "BACKWARD"
};

export const MOVE = {
    TYPE: {
        TAKE: "Take",
        MOVE: "Move",
        SPAWN: "Spawn"
    },
    DIRECTION: {
        N: "N",
        NE: "NE",
        NW: "NW",
        S: "S",
        SE: "SE",
        SW: "SW",
        E: "E",
        W: "W"
    }
};

export const TILE = {
    BASE: "B",
    WALL: "W",
    PATH: "P",
    GOLD: "G",
    WORM: "Worm"
};

export const pending = name => name + "_PENDING";
export const fulfilled = name => name + "_FULFILLED";
export const rejected = name => name + "_REJECTED";


const isBetween = (lower, upper, x) => lower <= x && x <= upper;

// AAAAAAAAAAAAAAAAAAAAAAAAAAAA
export const arrayBufferToString = buf =>
    String.fromCharCode.apply(null, new Uint16Array(buf));

/**
 * Execute a runMove in a given direction (forwards or backwards), generating the new board state.
 *
 * @param board The board state.
 * @param move The runMove to execute.
 * @param forward Whether the runMove should be done forwards or backwards (undo).
 *
 * @return {*} The new board state, after executing the runMove.
 */
export const processMove = (board, move, forward) => {
    return produce(board, newBoard => {
        const {command: type, team, handle} = move;
        switch (type) {
            case MOVE.TYPE.MOVE: {
                // move robot

                const {direction} = move,
                    robot = newBoard.robots.find(bot => bot.handle === handle);

                let [dx, dy] = directionToCoordinates(direction),
                    [x, y] = robot.xy,
                    fromTile = newBoard.map[y][x];

                // if the move is backwards, we invert the co-ordinate changes
                if (!forward) {
                    [dx, dy] = [-dx, -dy];
                }

                // update co-ordinates, checking bounds
                if (isBetween(0, newBoard.width - 1, x + dx)
                    && isBetween(0, newBoard.height, y + dy)) {
                    robot.xy = [x + dx, y + dy];
                }

                let toTile = newBoard.map[robot.xy[1]][robot.xy[0]];

                if (forward) {
                    //forward stepping
                    if (toTile.type === TILE.WORM) {
                        //moving towards wormhole
                        //ASSUMPTION: wormhole only leads to paths
                        robot.wormHistory.push(robot.xy); //add wormhole pos to history
                        robot.xy = toTile.out;
                    } else if (toTile.type === TILE.BASE && toTile.team === team) {
                        //moving towards homebase
                        let team = toTile.team;
                        //add robot's gold to the base team
                        newBoard.teams[team] += robot.gold;
                        robot.lastDeposit.push(robot.gold);
                        robot.gold = 0;
                        robot.wormHistory.push([-1, -1]); //not from wormhole
                    } else {
                        robot.wormHistory.push([-1, -1]); //not from wormhole
                    }
                } else {
                    //back stepping
                    let lastIsWorm = robot.wormHistory.pop();
                    if (lastIsWorm[0] !== -1 && lastIsWorm[1] !== -1) {
                        //back stepping for wormhole
                        robot.xy = [lastIsWorm[0] + dx][lastIsWorm[-1] + dy];
                    } else if (fromTile.type === TILE.BASE && fromTile.team === team) {
                        //stepping back from base
                        console.log('stepping back from base.');
                        let lastDepo = robot.lastDeposit.pop();
                        console.log(lastDepo);
                        if (lastDepo !== undefined) {
                            newBoard.teams[fromTile.team] -= lastDepo;
                            robot.gold += lastDepo;
                        } else {
                            //should not happen
                            console.log("stepping back with undefined last deposit");
                        }
                    }
                }

                break;
            }
            case MOVE.TYPE.TAKE: {
                // take/return gold
                const {direction, amount} = move,
                robot = newBoard.robots.find(bot => bot.handle === handle),
                    [x, y] = robot.xy,
                    [dx, dy] = directionToCoordinates(direction),
                    tile = newBoard.map[y + dy][x + dx];

                if (tile.type === TILE.GOLD) {
                    if (forward) {
                        // take some gold from the pile, if there's any left
                        if (amount > 0) {
                            // move gold from pile into the team's score counter
                            tile.amount -= amount;
                            robot.gold += amount;
                        }
                    } else {
                        // return gold to pile
                        tile.amount += amount;
                        robot.gold -= amount;
                    }
                }
                break;
            }
            case MOVE.TYPE.SPAWN: {
                if (forward) {
                    // spawn new robot
                    newBoard.robots = [...newBoard.robots, {
                        handle,
                        team,
                        xy: newBoard.bases[team], // spawn at the home base location
                        gold: 0,
                        lastDeposit: [],
                        wormHistory: []
                    }]
                } else {
                    // delete existing robot
                    newBoard.robots = newBoard.robots.filter(robot => robot.handle !== handle);
                }
                break;
            }
            default:
            // aaaaaaaaa
        }
    });
};

const directionToCoordinates = direction => {
    // [dx, dy]
    switch (direction) {
        case MOVE.DIRECTION.N:
            return [0, -1];
        case MOVE.DIRECTION.NE:
            return [1, -1];
        case MOVE.DIRECTION.NW:
            return [-1, -1];
        case MOVE.DIRECTION.S:
            return [0, 1];
        case MOVE.DIRECTION.SE:
            return [1, 1];
        case MOVE.DIRECTION.SW:
            return [-1, 1];
        case MOVE.DIRECTION.E:
            return [1, 0];
        case MOVE.DIRECTION.W:
            return [-1, 0];
        default:
            return [0, 0]; // ??????
    }
};

/**
 * Convert a board move to a *concise* string representation that can be shown to the user.
 *
 * @param move The move data.
 * @return {string} The string representation.
 */
export const moveToString = move => JSON.stringify(move); // TODO: implement this

export const adjustXY = (width, height) => {
    return ([x, y]) => [];
};