import {myp5} from "../index";

export const gameObj = {
    floorPos_y : myp5.height * 3 / 4,
    lives: 3,
    isPlummeting: false,
    gameChar_x: 80,
    gameChar_y: myp5.height * 3 / 4,
    gameChar_world_x: 80,
    scrollPos: 0,
    isLeft: false,
    isRight: false,
    isFalling : false,
    platforms: [],
    enemies: [],
    collectable: [],
    game_score: 0,
    flagpole: {isReached: false, x_pos: 3800},
    reset: false,
    clear: false
};