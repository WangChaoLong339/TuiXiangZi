(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/scripts/Ui/MapEditor.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe51dfejKJOe65Ppf4Sib7b', 'MapEditor', __filename);
// resources/scripts/Ui/MapEditor.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        top: cc.Node,
        selectTypeRoot: cc.Node,
        bottom: cc.Node,
        map: cc.Node
    },

    onLoad: function onLoad() {
        this.model = {
            select: 0, // 0:黑 1:墙 2:箱 3:终 4:合 5:人
            lineCount: 0,
            columnCount: 0,
            mapData: [],
            maxMapWidth: ViewSize.width,
            maxMapHeight: ViewSize.height
        };
        this.item = this.map.PathChild('item');
        this.map.removeAllChildren();
        this.selected = this.selectTypeRoot.PathChild('selected');
    },

    onenter: function onenter() {
        this.selected.x = this.selectTypeRoot.children[1].x;
        this.selected.stopAllActions();
        this.selected.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.5), cc.fadeIn(0.5), cc.delayTime(0.2))));
    },

    clear: function clear() {
        this.model = {
            select: 0,
            lineCount: 0,
            columnCount: 0,
            mapData: []
        };
        this.map.children.removeAllChildren();
        this.bottom.PathChild('lineEditBox', cc.EditBox).string = '';
        this.bottom.PathChild('columnEditBox', cc.EditBox).string = '';
        this.updateMap();
    },

    updateMap: function updateMap() {
        var _this = this;

        this.map.children.forEach(function (it, idx) {
            SetSpriteFrame(_this.getPathByType(_this.model.mapData[idx]), it.PathChild('fg', cc.Sprite));
        });
    },

    getPathByType: function getPathByType(type) {
        switch (type) {
            case 0:
                return 'picture/pure/color_dark';
            case 1:
                return 'picture/wall/wall_00';
            case 2:
                return 'picture/box/box_00';
            case 3:
                return 'picture/dot/dot_1';
            case 4:
                return 'picture/box/box_01';
            case 5:
                return 'picture/hero/down_00';
            default:
                cc.error('!--无法匹配的类型--!');
        }
    },

    trySaveMap: function trySaveMap(callback) {
        // 请检查箱子数量和目标点数量是否一致?
        var boxCount = GetCountFramArray(this.model.mapData, 2);
        var endCount = GetCountFramArray(this.model.mapData, 3);
        if (boxCount != endCount) {
            UiMgr.showTips({
                title: '警告',
                msg: '请检查箱子数量和目标点数量是否一致?',
                btn: [{ name: '确认', func: UiMgr.hideTips }]
            });
            return;
        }
        // 至少需要一个箱子和目标点!
        if (boxCount <= 0 || endCount <= 0) {
            UiMgr.showTips({
                title: '警告',
                msg: '至少需要一个箱子和目标点!',
                btn: [{ name: '确认', func: UiMgr.hideTips }]
            });
            return;
        }
        // 人物有且只能有一个!
        if (GetCountFramArray(this.model.mapData, 5) != 1) {
            UiMgr.showTips({
                title: '警告',
                msg: '人物有且只能有一个!',
                btn: [{ name: '确认', func: UiMgr.hideTips }]
            });
            return;
        }

        callback();
        UiMgr.showTips({
            title: '提示',
            msg: '保存地图成功',
            btn: [{ name: '确认', func: UiMgr.hideTips }]
        });
    },

    btnItemType: function btnItemType(event, data) {
        this.selected.x = this.selectTypeRoot.children[parseInt(data) + 1].x;
        this.model.select = parseInt(data);
    },

    btnMapItem: function btnMapItem(event) {
        var idx = event.target.idx;
        this.model.mapData[idx] = this.model.select;
        this.updateMap();
    },

    btnComfirm: function btnComfirm() {
        this.model.lineCount = parseInt(this.bottom.PathChild('lineEditBox', cc.EditBox).string) || 0;
        this.model.columnCount = parseInt(this.bottom.PathChild('columnEditBox', cc.EditBox).string) || 0;
        if (this.model.lineCount < 3 || this.model.lineCount > 15 || !this.model.columnCount || this.model.columnCount < 3 || this.model.columnCount > 15) {
            UiMgr.showTips({
                title: '输入错误提示',
                msg: '输入的地图尺寸错误',
                btn: [{ name: '确认', func: UiMgr.hideTips }]
            });
            return;
        }
        var itemSize = null;
        // 横图 || 方形图
        if (this.model.lineCount >= this.model.columnCount) {
            itemSize = parseInt(this.model.maxMapWidth / this.model.lineCount);
            this.map.width = this.model.maxMapWidth;
        }
        // 竖图
        if (this.model.lineCount < this.model.columnCount) {
            itemSize = parseInt(this.model.maxMapWidth / this.model.columnCount);
            this.map.width = this.model.lineCount * itemSize;
        }

        this.map.removeAllChildren();
        this.model.mapData = [];
        for (var i = 0; i < this.model.lineCount * this.model.columnCount; i++) {
            this.model.mapData.push(0);
            var item = cc.instantiate(this.item);
            item.idx = i;
            item.width = itemSize;
            item.height = itemSize;
            item.parent = this.map;
        }
        this.updateMap();
    },

    btnGenerate: function btnGenerate() {
        var _this2 = this;

        this.trySaveMap(function () {
            var localData = GetLocalStorage('TuiXiangZi-info') || [];
            var i = localData.length > 0 ? localData[localData.length - 1].idx + 1 : 0;
            localData.push({ idx: i, lineCount: _this2.model.lineCount, columnCount: _this2.model.columnCount, map: _this2.model.mapData });
            SetLocalStorage('TuiXiangZi-info', localData);
            _this2.clear();
        });
    },

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
        //# sourceMappingURL=MapEditor.js.map
        