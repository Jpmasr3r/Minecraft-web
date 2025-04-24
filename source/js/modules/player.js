import * as three from "../../libs/three.js-master/src/Three.js";
import textures from "./textures.js";
import { Block } from "./block.js";

export class Player {
    x = 0;
    y = 0;
    z = 0;
    you;
    world;
    player = new three.Mesh(
        new three.BoxGeometry(1, 2, 1),
        new three.MeshBasicMaterial({
            color: 0x0000ff
        }));
    hand = new three.Mesh(
        new three.BoxGeometry(0.3, 0.75, 0.3),
        new three.MeshBasicMaterial({
            map: new three.TextureLoader().load(textures.diamond_block)
        }));
    hotbar = [];
    hotbarInstance = [];

    constructor(you,scene, world, x = 0, y = 1.5, z = 0) {
        this.setX(x);
        this.setY(y);
        this.setZ(z);
        this.setYou(you);
        this.setWorld(world);

        for (let i = 1; i <= 9; i++) {
            this.hotbar[i] = {
                blockTexture: null,
            }
        }

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

    getYou() {
        return this.you;
    }

    getPlayer() {
        return this.player;
    }

    getWorld() {
        return this.world;
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

    setYou(you) {
        this.you = you;
    } 

    setPlayer(player) {
        this.player = player;
    }

    setWorld(world) {
        this.world = world;
    }

    //#endregion

    //#region Movers
    move(newX = this.getX(), newZ = this.getZ(), newY = this.getY()) {
        let move = true;
        this.getWorld().getBlocks().forEach(e => {
            if (
                (
                    newX >= e.position.x - 0.5 &&
                    newX <= e.position.x + 0.5 
                ) &&
                (
                    newY >= e.position.y &&
                    newY <= e.position.y + 1.5
                ) &&
                (
                    newZ >= e.position.z - 0.5 &&
                    newZ <= e.position.z + 0.5
                )
            ) {
                move = false;
            }
        })

        if (move) {
            this.setX(newX);
            this.setY(newY);
            this.setZ(newZ);
    
            this.player.position.x = this.getX();
            this.player.position.y = this.getY();
            this.player.position.z = this.getZ();
    
            this.hand.position.x = this.getX() + 0.5;
            this.hand.position.y = this.getY() + 0.05;
            this.hand.position.z = this.getZ() - 2;
    
            this.hotbarInstance.forEach((e, i) => {
                e.position.x = this.getX() + 0.5 - (i * 0.1),
                    e.position.y = this.getY() + 0.30
                e.position.z = this.getZ() - 1.45
            });   
        }
    }
    //#endregion

    //#region Others
    intance(scene) {
        this.player.position.x = this.getX();
        this.player.position.y = this.getY();
        this.player.position.z = this.getZ();

        this.hand.position.x = this.getX() + 0.5;
        this.hand.position.y = this.getY() + 0.05;
        this.hand.position.z = this.getZ() - 2;
        this.hand.rotateX(43);
        this.hand.rotateY(-5);
        this.hand.rotateZ(10);

        for (let i = 1; i <= 9; i++) {
            const blockBase = new three.BoxGeometry(0.1, 0.1, 0.1);
            const materials = [
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar),
                    }
                ).alphaMap = 0,
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar),
                    }
                ).alphaMap = 0,
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar),

                    }
                ).alphaMap = 0,
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar)
                    }
                ).alphaMap = 0,
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar)
                    }
                ),
                new three.MeshBasicMaterial(
                    {
                        map: new three.TextureLoader().load(textures.hotbar)
                    }
                ).alphaMap = 0,
            ]

            const hotbarInstance = new three.Mesh(blockBase, materials);
            hotbarInstance.position.set(this.getX() + 0.5 - (i * 0.1), this.getY() + 0.30, this.getZ() - 1.45);
            this.hotbarInstance[i] = hotbarInstance;
            scene.add(hotbarInstance);
        }

        scene.add(this.hand);
        scene.add(this.player);
    }

    placeBlock(texture, scene) {
        const block = new Block(scene, this.getX(), this.getY() - 0.5, this.getZ() - 3, this.getWorld());
        block.newBlock([texture], scene, 1, 1, 1, true);
    }

    //#endregion
}