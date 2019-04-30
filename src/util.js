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

// AAAAAAAAAAAAAAAAAAAAAAAAAAAA
export const arrayBufferToString = buf =>
    String.fromCharCode.apply(null, new Uint16Array(buf));

/**
 * Execute a runMove in a given direction (forwards or backwards), generating the new board state.
 *
 * TODO: do we need to avoid mutating the board?
 *
 * @param board The board state.
 * @param move The runMove to execute.
 * @param forward Whether the runMove should be done forwards or backwards (undo).
 *
 * @return The new board state, after executing the runMove.
 */
export const processMove = (board, move, forward) => {
    const {type, team, handle} = move;
    switch (type) {
        case MOVE.TYPE.MOVE: {
            // move robot
            const {direction} = move,
                robot = board.robots[handle];

            let [dx, dy] = directionToCoordinates(direction),
                [x, y] = robot.xy,
                fromTile = board.map[x][y];

            // if the move is backwards, we invert the co-ordinate changes
            if (!forward) {
                [dx, dy] = [-dx, -dy];
            }

            // update co-ordinates, checking bounds
            if (isBetween(0, board.width - 1, x + dx)
                && isBetween(0, board.height, y + dy)) {
                robot.xy = [x + dx, y + dy];
            }

            let toTile = board.map[robot.xy[0]][robot.xy[1]];

            if (forward) {
                //forward stepping
                if (toTile === TILE.WORM) {
                    //moving towards wormhole
                    //ASSUMPTION: wormhole only leads to paths
                    robot.wormHistory.push(robot.xy); //add wormhole pos to history
                    robot.xy = toTile.out;
                }
                else if (toTile === TILE.BASE) {
                    //moving towards homebase
                    let team = toTile.team;
                    //add robot's gold to the base team
                    board.teams[team] += robot.gold;
                    robot.lastDeposit.push(robot.gold);
                    robot.gold = 0;
                    robot.wormHistory.push([-1,-1]); //not from wormhole
                } else {
                    robot.wormHistory.push([-1,-1]); //not from wormhole
                }
            } else {
                //back stepping
                let lastIsWorm = robot.wormHistory.pop();
                if (lastIsWorm[0] !== -1 && lastIsWorm[1] !== -1) {
                    //back stepping for wormhole
                    robot.xy = [lastIsWorm[0] + dx][lastIsWorm[-1]+dy];
                } else if (fromTile === TILE.BASE) {
                    //stepping back from base
                    let lastDepo = robot.lastDeposit.pop();
                    if (lastDepo !== undefined) {
                        board.teams[fromTile.team] -= lastDepo;
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
                robot = board.robots[handle],
                [x, y] = robot.xy,
                [dx, dy] = directionToCoordinates(direction),
                tile = board.map[x + dx][y + dy];

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
                board.robots[handle] = {
                    team,
                    xy: board.bases[team], // spawn at the home base location
                    gold: 0,
                    lastDeposit: []
                };
            } else {
                // delete existing robot
                delete board.robots[handle];
            }
            break;
        }
        default:
            // aaaaaaaaa
    }
    return board;
};

const isBetween = (lower, upper, x) => lower <= x && x <= upper;

const directionToCoordinates = direction => {
    // [dx, dy]
    switch (direction) {
        case MOVE.DIRECTION.N:
            return [0, 1];
        case MOVE.DIRECTION.NE:
            return [1, 1];
        case MOVE.DIRECTION.NW:
            return [-1, 1];
        case MOVE.DIRECTION.S:
            return [0, -1];
        case MOVE.DIRECTION.SE:
            return [1, -1];
        case MOVE.DIRECTION.SW:
            return [-1, -1];
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