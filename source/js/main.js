import * as three from "../libs/three.js-master/src/Three.js";
import textures from "./modules/textures.js";
import { Player } from "./modules/player.js";
import { Block } from "./modules/block.js";
import { World } from "./modules/world.js";

const world = new World(1);

const mainScene = new three.Scene();
const mainCamera = new three.PerspectiveCamera(80, innerWidth / innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let sizeWorld = 10;
for (let i = 1; i <= sizeWorld; i++) {
    for (let j = 1; j <= sizeWorld; j++) {
        let selectTexture = textures.grass_side_carrier;
        let selectTexture2 = textures.grass_carrier;

        let block = new Block(mainScene, i - (sizeWorld / 2), 0, j - (sizeWorld / 2), world);
        block.newBlock([
            selectTexture,
            selectTexture,
            selectTexture2,
            selectTexture,
            selectTexture,
            selectTexture,
        ], mainScene);
    }
}
for (let i = 1; i <= sizeWorld * 3; i++) {
    for (let j = 1; j <= sizeWorld * 3; j++) {
        let selectTexture = textures.grass_side_carrier;
        let selectTexture2 = textures.grass_carrier;

        let block = new Block(mainScene, i - sizeWorld, -1, j - sizeWorld, world);
        block.newBlock([
            selectTexture,
            selectTexture,
            selectTexture2,
            selectTexture,
            selectTexture,
            selectTexture,
        ], mainScene);
    }
}

const player = new Player(mainScene, world, 0, 5);
const spd = 1;

//#region Debug
// mainCamera.position.z = 10;
// mainCamera.position.y = 5;
//#endregion


let keyPress = null;
addEventListener("keydown", (key) => {
    keyPress = key.key;
});
addEventListener("keyup", () => {
    keyPress = null;
})


function mainAnimation() {
    requestAnimationFrame(mainAnimation);

    mainCamera.position.x = player.getX();
    mainCamera.position.y = player.getY() + 0.5;
    mainCamera.position.z = player.getZ() - 1;

    switch (keyPress) {
        case "w":
            player.move(player.getX(), player.getZ() - spd);
            keyPress = null;
            break;

        case "s":
            player.move(player.getX(), player.getZ() + spd);
            keyPress = null;
            break;

        case "a":
            player.move(player.getX() - spd, player.getZ());
            keyPress = null;
            break;

        case "d":
            player.move(player.getX() + spd, player.getZ());
            keyPress = null;
            break;

        default:
            break;
    }

    document.addEventListener("click", () => {
        player.placeBlock(textures.diamond_block, mainScene);
    });

    let down = true;
    world.getBlocks().forEach(e => {
        if (
            player.getX() == e.position.x &&
            (
                player.getY() >= e.position.y - 1.5 &&
                player.getY() <= e.position.y + 1.5
            ) &&
            player.getZ() == e.position.z
        ) {
            down = false;
        }
    })

    if (down) {
        player.move(player.getX(), player.getZ(), player.getY() - world.getGrav());
    }

    renderer.render(mainScene, mainCamera);
}

mainAnimation();
