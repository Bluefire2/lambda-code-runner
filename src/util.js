export const DIRECTION = {
    FORWARD: "FORWARD",
    BACKWARD: "BACKWARD"
};

export const MOVE = {
    TYPE: {
        TAKE: "take",
        MOVE: "move",
        SPAWN: "spawn"
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
        case MOVE.TYPE.MOVE:
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
            break;
        case MOVE.TYPE.TAKE:
            // take gold
            // TODO
            break;
        case MOVE.TYPE.SPAWN:
            if (forward) {
                // spawn new robot
                board.robots[handle] = {
                    team,
                    xy: [0, 0] // TODO: spawn on the team's home base
                };
            } else {
                // delete existing robot
                delete board.robots[handle];
            }
            break;
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