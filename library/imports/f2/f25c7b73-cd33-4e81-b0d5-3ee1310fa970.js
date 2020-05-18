"use strict";
cc._RF.push(module, 'f25c7tzzTNOgbDVPuExD6lw', 'UiMgr');
// resources/scripts/UiMgr.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        uiRoot: cc.Node,
        tipsRoot: cc.Node
    },

    onLoad: function onLoad() {
        this.model = {
            prefabs: []
        };

        window.UiMgr = this;
    },

    open: function open(name, args) {
        var _this = this;

        // let args = Array.prototype.slice.call(arguments).slice(1)
        if (this.model.prefabs[name]) {
            this.model.prefabs[name].active = true;
            this.model.prefabs[name].getComponent(name).onenter && this.model.prefabs[name].getComponent(name).onenter(args);
            this.openAction(this.model.prefabs[name]);
            return;
        }
        cc.loader.loadRes('ui/' + name, function (err, prefab) {
            if (err) {
                cc.error(err);
                return;
            }
            var pb = cc.instantiate(prefab);
            pb.active = false;
            pb.parent = _this.uiRoot;
            _this.model.prefabs[name] = pb;
            _this.openAction(pb);
            pb.getComponent(name).onenter && pb.getComponent(name).onenter(args);
        });
    },

    close: function close(name) {
        if (this.model.prefabs[name]) {
            this.closeAction(this.model.prefabs[name]);
        }
    },

    showTips: function showTips(msg) {
        var _this2 = this;

        if (this.model.prefabs.tips) {
            this.model.prefabs.tips.active = true;
            this.model.prefabs.tips.getComponent('Tips').onenter && this.model.prefabs.tips.getComponent('Tips').onenter(msg);
            this.openAction(this.model.prefabs.tips);
            return;
        }
        cc.loader.loadRes('tips/Tips', function (err, prefab) {
            if (err) {
                cc.error(err);
                return;
            }
            var pb = cc.instantiate(prefab);
            pb.active = false;
            pb.parent = _this2.tipsRoot;
            _this2.model.prefabs.tips = pb;
            _this2.openAction(pb);
            pb.getComponent('Tips').onenter && pb.getComponent('Tips').onenter(msg);
        });
    },

    hideTips: function hideTips() {
        if (this.model.prefabs.tips) {
            this.closeAction(this.model.prefabs.tips);
        }
    },

    openAction: function openAction(node) {
        node.scaleX = 0;
        node.scaleY = 0;
        node.active = true;
        node.stopAllActions();
        node.runAction(cc.scaleTo(0.3, 1, 1).easing(cc.easeCubicActionOut()));
    },

    closeAction: function closeAction(node) {
        node.stopAllActions();
        node.runAction(cc.sequence(cc.scaleTo(0.3, 0, 0).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
            node.active = false;
            node.scaleX = 1;
            node.scaleY = 1;
        })));
    }
});

cc._RF.pop();