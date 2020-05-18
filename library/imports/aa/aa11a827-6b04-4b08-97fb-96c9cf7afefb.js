"use strict";
cc._RF.push(module, 'aa11agnawRLCJf7lsnPev77', 'Home');
// resources/scripts/Home.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    btnStartGame: function btnStartGame() {
        var allData = GetLocalStorage('TuiXiangZi-info') || [];
        UiMgr.open('Game', allData[0]);
    },

    btnCheckMap: function btnCheckMap() {
        UiMgr.open('CheckMap');
    },

    btnMapEditor: function btnMapEditor() {
        UiMgr.open('MapEditor');
    },

    btnExitGame: function btnExitGame() {
        cc.director.end();
    }
});

cc._RF.pop();