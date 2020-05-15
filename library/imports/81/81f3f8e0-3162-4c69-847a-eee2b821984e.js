"use strict";
cc._RF.push(module, '81f3fjgMWJMaYR67uK4IZhO', 'Game');
// resources/scripts/Ui/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},

    onenter: function onenter() {},

    btnClose: function btnClose() {
        UiMgr.close(this.node.name);
    }
});

cc._RF.pop();