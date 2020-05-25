"use strict";
cc._RF.push(module, '47735ZNMNdOqJSlE9smolAU', 'CheckMap');
// resources/scripts/Ui/CheckMap.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.scrollView = this.node.PathChild('scrollView', cc.ScrollView);
        this.maxWidth = this.scrollView.node.width;
        this.content = this.scrollView.content;
        this.item = this.scrollView.node.PathChild('item');
        this.item.active = false;
        this.smallItem = this.item.PathChild('layout/smallItem');
        this.smallItem.active = false;
    },

    onenter: function onenter() {
        this.allData = GetLocalStorage('TuiXiangZi-info') || [];
        this.createItem();
    },

    createItem: function createItem() {
        this.content.removeAllChildren();
        for (var i = 0; i < this.allData.length; i++) {
            var data = this.allData[i];
            var item = cc.instantiate(this.item);
            item.PathChild('title', cc.Label).string = '\u7B2C' + (data.idx + 1) + '\u5173';
            item.width = this.maxWidth;
            item.height = this.maxWidth + 50;
            item.idx = i;
            // 计算小地图item size
            var smallItemSize = 0;
            if (data.lineCount >= data.columnCount) {
                smallItemSize = parseInt(item.width / data.lineCount);
            } else if (data.lineCount < data.columnCount) {
                smallItemSize = parseInt(item.width / data.columnCount);
            }
            // 渲染小地图
            for (var j = 0; j < data.map.length; j++) {
                var smallItem = cc.instantiate(this.smallItem);
                SetSpriteFrame(GetPathByType(data.map[j]), smallItem.PathChild('val', cc.Sprite));
                smallItem.width = smallItemSize;
                smallItem.height = smallItemSize;
                smallItem.active = true;
                smallItem.parent = item.PathChild('layout');
                item.PathChild('layout').width = smallItemSize * data.lineCount;
                item.PathChild('layout', cc.Layout).updateLayout();
            }
            item.active = true;
            item.parent = this.content;
        }
        this.content.y = 0;
    },

    btnDelete: function btnDelete(event) {
        var idx = event.target.parent.idx;
        for (var i = 0; i < this.content.children.length; i++) {
            var node = this.content.children[i];
            if (idx == node.idx) {
                this.content.removeChild(node);
                break;
            }
        }
        this.allData.splice(idx, 1);
        for (var _i = idx; _i < this.allData.length; _i++) {
            this.allData[_i].idx -= 1;
        }
        SetLocalStorage('TuiXiangZi-info', this.allData);
    },

    btnClose: function btnClose() {
        UiMgr.close(this.node.name);
    }
});

cc._RF.pop();