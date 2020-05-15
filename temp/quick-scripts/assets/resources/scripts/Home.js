(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/Home.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aa11agnawRLCJf7lsnPev77', 'Home', __filename);
// resources/scripts/Home.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    btnStartGame: function btnStartGame() {
        var allData = GetLocalStorage('TuiXiangZi-info') || [];
        UiMgr.open('Game');
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
        //# sourceMappingURL=Home.js.map
        