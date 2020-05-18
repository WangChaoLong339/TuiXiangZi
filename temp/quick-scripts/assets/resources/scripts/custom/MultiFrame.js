(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/custom/MultiFrame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '33035zkP/RPMq8GnimooFAI', 'MultiFrame', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MultiFrame.js.map
        