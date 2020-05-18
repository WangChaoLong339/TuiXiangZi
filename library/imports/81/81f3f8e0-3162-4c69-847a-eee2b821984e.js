"use strict";
cc._RF.push(module, '81f3fjgMWJMaYR67uK4IZhO', 'Game');
// resources/scripts/Ui/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        map: cc.Node,
        item: cc.Node
    },

    onLoad: function onLoad() {
        this.maxWidth = this.map.width;
        this.item.active = false;
    },

    onenter: function onenter(info) {
        this.initData(info);
        this.setupTop();
        this.createMap();
        this.updateMap();
    },

    initData: function initData(info) {
        this.moving = false;
        this.mapInfo = info;

        this.current = { x: null, y: null };
        for (var i = 0; i < this.mapInfo.map.length; i++) {
            if (this.mapInfo.map[i] == 5) {
                this.current = { x: i % this.mapInfo.lineCount, y: parseInt(i / this.mapInfo.lineCount) };
                break;
            }
        }
    },

    setupTop: function setupTop() {
        this.title.string = '\u7B2C' + (this.mapInfo.idx + 1) + '\u5173';
    },

    createMap: function createMap() {
        var lineCount = this.mapInfo.lineCount;
        var itemSize = parseInt(this.maxWidth / lineCount);
        this.map.removeAllChildren();
        for (var i = 0; i < this.mapInfo.map.length; i++) {
            var item = cc.instantiate(this.item);
            item.width = itemSize;
            item.height = itemSize;
            item.active = true;
            item.parent = this.map;
        }
    },

    updateMap: function updateMap() {
        for (var i = 0; i < this.map.children.length; i++) {
            var item = this.map.children[i];
            item.PathChild('val').x = 0;
            item.PathChild('val').y = 0;
            item.PathChild('val', 'MultiFrame').setSpriteFrame(this.mapInfo.map[i]);
        }
    },

    tryMoveTo: function tryMoveTo(point) {
        var arrive = null;
        var distance = parseInt(this.maxWidth / this.mapInfo.lineCount);
        var moveBy = { x: 0, y: 0 };
        switch (point) {
            case 0:
                // up
                arrive = { x: this.current.x, y: this.current.y - 1 };
                moveBy = { x: 0, y: distance };
                break;
            case 1:
                // left
                arrive = { x: this.current.x - 1, y: this.current.y };
                moveBy = { x: -distance, y: 0 };
                break;
            case 2:
                // down
                arrive = { x: this.current.x, y: this.current.y + 1 };
                moveBy = { x: 0, y: -distance };
                break;
            case 3:
                // right
                arrive = { x: this.current.x + 1, y: this.current.y };
                moveBy = { x: distance, y: 0 };
                break;
        }
        var arr = this.mapInfo.map[arrive.x + arrive.y * this.mapInfo.lineCount];
        // 目标点是 [空白] 或者 [终点]
        if (arr == 0 || arr == 3) {
            // 人物移动
            this.map.children[this.current.x + this.current.y * this.mapInfo.lineCount].PathChild('val').runAction(cc.moveBy(0.3, cc.v2(moveBy.x, moveBy.y)));
        }
        // // 目标点是 [箱子]
        // if (arr == 2) {
        //     // 箱子移动
        //     this.map.children[arrive.x + arrive.y * this.mapInfo.lineCount].PathChild('val').runAction(cc.sequence(
        //         cc.moveBy(0.3, moveBy),
        //         cc.callFunc(() => { }),
        //     ))
        // }
    },

    btnMove: function btnMove(event, data) {
        if (this.moving) {
            return;
        }
        this.tryMoveTo(parseInt(data));
    },

    btnClose: function btnClose() {
        UiMgr.close(this.node.name);
    }
});

cc._RF.pop();