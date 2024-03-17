import * as three from "../libs/three.js-master/src/Three.js";
import textures from "./Modules/textures.js";
import { Player } from "./modules/player.js";

const mainScene = new three.Scene();
const mainCamera = new three.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const blockBase = new three.BoxGeometry(1, 1, 1);
function newBlock(texture, x, y, z) {
    const block = new three.Mesh(
        blockBase,
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture)
        })
    );
    block.position.set(x, y, z);
    mainScene.add(block);
}

function newBlockTwoTextures(texture1,texture2, x, y, z) {
    const block = new three.Mesh(
        blockBase,
        [new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture1)
        }),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture1)
        }),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture2)
        }),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture1)
        }),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture1)
        }),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(texture1)
        })]
    );
    block.position.set(x, y, z);
    mainScene.add(block);
}

let sizeWorld = 10;
for (let i = 0; i <= sizeWorld; i++) {
    for (let j = 0; j <= sizeWorld; j++) {
        let selectTexture = textures.grass_side_carrier;
        let selectTexture2 = textures.grass_carrier;
        newBlockTwoTextures(selectTexture,selectTexture2, i, 0, j);
        newBlockTwoTextures(selectTexture,selectTexture2, i, 0, j * -1);
        newBlockTwoTextures(selectTexture,selectTexture2, i * -1, 0, j * -1);
        newBlockTwoTextures(selectTexture,selectTexture2, i * -1, 0, j);
    }
}

const player = new Player(mainScene);
const spd = 0.1;


// mainCamera.position.z = 10;
// mainCamera.position.y = 5;

let keyPress = null;
let mousePress = null
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

    if(keyPress == "u") {
        player.placeBlock(newBlock,textures.diamond_block);
    }
    

    renderer.render(mainScene, mainCamera);
}

mainAnimation();
