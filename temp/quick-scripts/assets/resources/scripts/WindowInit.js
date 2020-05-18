(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/WindowInit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0c8aek8oOJGEpphA+tlqaQH', 'WindowInit', __filename);
// resources/scripts/WindowInit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        cc.Node.prototype.PathChild = function (path, componentName) {
            var names = path.split('/');
            var nd = null;
            for (var i = 0; i < names.length; i++) {
                if (nd) {
                    nd = nd.getChildByName(names[i]);
                } else {
                    nd = this.getChildByName(names[i]);
                }
            }
            if (componentName) {
                return nd.getComponent(componentName);
            } else {
                return nd;
            }
        };

        // 记录一个进入游戏的时间
        window.EnterGameTime = new Date().getTime() / 1000;

        // 记录屏幕Size
        window.ViewSize = cc.winSize;

        window.GetCountFramArray = function (arr, elmt) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == elmt) {
                    count++;
                }
            }
            return count;
        };

        window.SetLocalStorage = function (key, data) {
            cc.sys.localStorage.setItem(key, JSON.stringify(data));
        };

        window.GetLocalStorage = function (key) {
            var data = cc.sys.localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            return null;
        };

        window.SetSpriteFrame = function (path, sprite) {
            if (!path) {
                sprite.spriteFrame = null;
                return;
            }
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    cc.error(err);
                    return;
                }
                sprite.spriteFrame = spriteFrame;
            });
        };
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
        //# sourceMappingURL=WindowInit.js.map
        