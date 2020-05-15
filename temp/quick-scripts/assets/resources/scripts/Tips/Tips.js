(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/Tips/Tips.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0939fp3QoVLtptPoq5J7tdX', 'Tips', __filename);
// resources/scripts/Tips/Tips.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        msg: cc.Label,
        button: cc.Node
    },

    onLoad: function onLoad() {},

    onenter: function onenter(msg) {
        var _this = this;

        this.callBacks = [];
        this.title.string = msg.title || '系统提示';
        this.msg.string = msg.msg || '暂无提示';
        this.button.children.forEach(function (it, idx) {
            if (msg.btn[idx]) {
                it.PathChild('val', cc.Label).string = msg.btn[idx].name;
                _this.callBacks.push(msg.btn[idx].func);
                it.active = true;
            } else {
                it.active = false;
            }
        });
    },

    btnButton: function btnButton(event, data) {
        var idx = parseInt(data);
        if (this.callBacks[idx]) {
            this.callBacks[idx]();
        } else {
            UiMgr.hideTips();
        }
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
        //# sourceMappingURL=Tips.js.map
        