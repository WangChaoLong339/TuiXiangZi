"use strict";
cc._RF.push(module, '33035zkP/RPMq8GnimooFAI', 'MultiFrame');
// resources/scripts/custom/MultiFrame.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        sprites: [cc.SpriteFrame]
    },

    setSpriteFrame: function setSpriteFrame(idx) {
        cc.assert(idx <= this.sprites.length);
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprites[idx];
    }
});

cc._RF.pop();