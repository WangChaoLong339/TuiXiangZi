cc.Class({
    extends: cc.Component,

    properties: {
        sprites: [cc.SpriteFrame],
    },

    setSpriteFrame: function (idx) {
        cc.assert(idx <= this.sprites.length)
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprites[idx]
    },
});
