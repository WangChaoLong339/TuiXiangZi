(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/Ui/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '81f3fjgMWJMaYR67uK4IZhO', 'Game', __filename);
// resources/scripts/Ui/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        map: cc.Node,
        item: cc.Node,
        hero: cc.Node
    },

    onLoad: function onLoad() {
        this.model = {};
        this.maxWidth = this.map.width;
        this.item.active = false;
    },

    onenter: function onenter(info) {
        this.model.map = info.map;
        this.createPrefab();
    },

    createPrefab: function createPrefab() {},

    btnMove: function btnMove(event, data) {},

    btnClose: function btnClose() {
        UiMgr.close(this.node.name);
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
        //# sourceMappingURL=Game.js.map
        