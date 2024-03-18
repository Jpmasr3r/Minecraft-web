import * as three from "../libs/three.js-master/src/Three.js";
import textures from "./modules/textures.js";
import { Player } from "./modules/player.js";
import { Block } from "./modules/block.js";
import { World } from "./modules/world.js";

const world = new World();

const mainScene = new three.Scene();
const mainCamera = new three.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 1000);

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

        let block = new Block(mainScene,i-(sizeWorld/2),0,j-(sizeWorld/2),world);
        block.newBlock([
            selectTexture,
            selectTexture,
            selectTexture2,
            selectTexture,
            selectTexture,
            selectTexture,
        ],mainScene);
    }
}

const player = new Player(mainScene);
const spd = 0.1;

//#region Debug
// mainCamera.position.z = 10;
// mainCamera.position.y = 5;
//#endregion


let keyPress = null;
addEventListener("keydown",(key) => {
    keyPress = key.key; 
});
addEventListener("keyup", () => {
    keyPress = null;
})


function mainAnimation() {
    requestAnimationFrame(mainAnimation);

    mainCamera.position.x = player.getX();
    mainCamera.position.y = player.getY()+0.5;
    mainCamera.position.z = player.getZ()-1;

    if(keyPress == "w") {
        player.move(player.getX(),player.getZ()-spd);
    } 
    if(keyPress == "s") {
        player.move(player.getX(),player.getZ()+spd);
    } 
    if(keyPress == "a") {
        player.move(player.getX()-spd,player.getZ());
    } 
    if(keyPress == "d") {
        player.move(player.getX()+spd,player.getZ());
    } 

    document.addEventListener("click",() => {
        player.placeBlock(textures.diamond_block,mainScene);
    });

    if(keyPress == "u") {
        console.log(world.blocks);
    }

    renderer.render(mainScene, mainCamera);
}

mainAnimation();
