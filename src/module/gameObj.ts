import {Enemy} from "./game_assets/enemy";
import {Collectable} from "./game_assets/collectable";
import {Platforms} from "./game_assets/platforms";

interface GameObj {
    floorPos_y: number,
    lives: number,
    isPlummeting: boolean,
    gameChar_x: number,
    gameChar_y: number,
    gameChar_world_x: number,
    scrollPos: number,
    isLeft: boolean,
    isRight: boolean,
    isFalling: boolean,
    platforms: Array<Platforms>,
    enemies: Array<Enemy>,
    collectable: Array<Collectable>,
    game_score: number,
    flagpole: {
        isReached: boolean,
        x_pos: number
    },
    reset: boolean,
    clear: boolean
}

export const gameObj : GameObj = {
    floorPos_y : 0,
    lives: 3,
    isPlummeting: false,
    gameChar_x: 80,
    gameChar_y: 0,
    gameChar_world_x: 80,
    scrollPos: 0,
    isLeft: false,
    isRight: false,
    isFalling : false,
    platforms: [],
    enemies: [],
    collectable: [],
    game_score: 0,
    flagpole: {
        isReached: false,
        x_pos: 3800,
    },
    reset: false,
    clear: false
};