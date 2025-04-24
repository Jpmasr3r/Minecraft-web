export class World {
    blocks = [];
    grav;
    constructor(grav) {
        this.blocks = [];
        this.setGrav(grav);
    }

    setBlock(block) {
        this.blocks.push(block);
    }

    getBlocks() {
        return this.blocks;
    }

    setGrav(grav) {
        this.grav = grav/10;
    }

    getGrav() {
        return this.grav;
    }
}