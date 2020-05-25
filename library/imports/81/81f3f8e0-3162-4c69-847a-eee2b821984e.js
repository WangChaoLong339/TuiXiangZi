"use strict";
cc._RF.push(module, '81f3fjgMWJMaYR67uK4IZhO', 'Game');
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