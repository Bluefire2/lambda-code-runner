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
    BASE: "Base",
    WALL: "Wall",
    PATH: "Path",
    GOLD: "Gold"
};


const TAKE_GOLD_AMOUNT = 10; // TODO: what is the actual value of this?

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
                [x, y] = robot.xy;

            // if the move is backwards, we invert the co-ordinate changes
            if (!forward) {
                [dx, dy] = [-dx, -dy];
            }

            // update co-ordinates, checking bounds
            if (isBetween(0, board.width - 1, x + dx)
                && isBetween(0, board.height, y + dy)) {
                robot.xy = [x + dx, y + dy];
            }

            // check if moving to homebase
            for (let i = 0; i < board.teamNames; i++) {
                let currTeam = board.teamNames[i];
                let [baseX, baseY] = board.bases[currTeam];
                if (baseX === robot.xy[0] && baseY === robot.xy[1]) {
                    //moving to base
                    if (forward) {
                        //add robot's gold to the base team
                        board.teams[currTeam] += robot.gold;
                        robot.lastDeposit.push(robot.gold);
                        robot.gold = 0;
                    }
                }
                
                if (baseX === x && baseY === y) {
                    //moving from base
                    if (!forward) {
                        //add gold back to robot
                        let lastDepo = robot.lastDeposit.pop();
                        if (lastDepo !== undefined) {
                            board.teams[currTeam] -= lastDepo;
                            robot.gold += lastDepo;
                        } else {
                            //should not happen
                            console.log("stepping back with undefined last deposit");
                        }
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
            } else {
                // ?????
                // TODO: can we assume that every move is valid
                console.log("invalid move");
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