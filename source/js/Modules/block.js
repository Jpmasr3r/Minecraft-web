import * as three from "../../libs/three.js-master/src/Three.js";

export class Block {
    x = 0;
    y = 0;
    z = 0;
    block = null;
    world;
    constructor(scene, x, y, z, world) {
        this.setX(x);
        this.setY(y);
        this.setZ(z);
        this.setWorld(world);
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

    getBlock() {
        return this.block;
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

    setBlock(block) {
        this.block = block;
    }

    setWorld(world) {
        this.world = world;
    }
    //#endregion

    //#region Create Blocks
    newBlock(textures = [], scene, sizeX = 1, sizeY = 1, sizeZ = 1,verify = false) {
        let failPlace = false;
        if(verify) {
            this.getWorld().getBlocks().forEach(e => {
                if(
                    e.position.x == this.getX() &&
                    e.position.y == this.getY() &&
                    e.position.z == this.getZ()
                ) {
                    failPlace = true;
                }
            });
        }

        if (!failPlace) {
            if (textures.length == 1) {
                const blockBase = new three.BoxGeometry(sizeX, sizeY, sizeZ);
                const material = new three.MeshBasicMaterial({ map: new three.TextureLoader().load(textures[0]) });
                const block = new three.Mesh(blockBase, material);

                block.position.set(this.getX(), this.getY(), this.getZ());
                scene.add(block);
                this.setBlock(block);
                this.getWorld().setBlock(block);
            } else {
                const blockBase = new three.BoxGeometry(sizeX, sizeY, sizeZ);
                const materials = [
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[0]),
                        }
                    ),
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[1]),
                        }
                    ),
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[2])
                        }
                    ),
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[3])
                        }
                    ),
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[4])
                        }
                    ),
                    new three.MeshBasicMaterial(
                        {
                            map: new three.TextureLoader().load(textures[5])
                        }
                    ),
                ]

                const block = new three.Mesh(blockBase, materials);

                block.position.set(this.getX(), this.getY(), this.getZ());
                scene.add(block);
                this.setBlock(block);
                this.getWorld().setBlock(block);
                console.log("Bloco sucesso");
            }
        }else {
            console.log("Bloco falho");
        }
    }
    //#endregion
}