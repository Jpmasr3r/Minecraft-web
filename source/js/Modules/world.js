export class World {
    blocks = [];
    constructor() {
        this.blocks = [];
    }

    setBlock(block) {
        this.blocks.push(block);
    }

    getBlocks() {
        return this.blocks;
    }
}