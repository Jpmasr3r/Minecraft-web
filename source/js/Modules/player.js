import * as three from "../../libs/three.js-master/src/Three.js";
import textures from "./textures.js";

export class Player {
    x = 0;
    y = 0;
    z = 0;
    player = new three.Mesh(
        new three.BoxGeometry(1,2,1),
        new three.MeshBasicMaterial({
        color: 0x0000ff
    }));
    hand = new three.Mesh(
        new three.BoxGeometry(0.3,0.75,0.3),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(textures.diamond_block)
    }));

    constructor(scene,x = 0,y = 1.5,z = 0) {
        this.setX(x);
        this.setY(y);
        this.setZ(z);

        this.intance(scene);
    }

    //#region Getters
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    getPlayer() {
        return this.player;
    }

    //#endregion
    
    //#region Setters
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setZ(z) {
        this.z = z;
    }

    setPlayer(player) {
        this.player = player;
    }

    //#endregion

    //#region Movers
    move(newX,newZ) {
        this.setX(newX);
        this.setZ(newZ);
        
        this.player.position.x = this.getX();
        this.player.position.y = this.getY();
        this.player.position.z = this.getZ();

        this.hand.position.x = this.getX()+0.5;
        this.hand.position.y = this.getY()+0.05;
        this.hand.position.z = this.getZ()-2;
    }
    //#endregion

    //#region Others
    intance(scene) {
        this.player.position.x = this.getX();
        this.player.position.y = this.getY();
        this.player.position.z = this.getZ();

        this.hand.position.x = this.getX()+0.5;
        this.hand.position.y = this.getY()+0.05;
        this.hand.position.z = this.getZ()-2;
        this.hand.rotateX(43);
        this.hand.rotateY(-5);
        this.hand.rotateZ(10);

        scene.add(this.hand);
        scene.add(this.player);
    }

    placeBlock(newBlock,texture) {
        newBlock(texture,this.getX(),this.getY()-0.5,this.getZ()-3)
    }

    //#endregion
}