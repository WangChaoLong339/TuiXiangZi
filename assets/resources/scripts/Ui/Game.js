cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        map: cc.Node,
        item: cc.Node,
        hero: cc.Node,
    },

    onLoad: function () {
        this.model = {}
        this.maxWidth = this.map.width
        this.item.active = false
    },

    onenter: function (info) {
        this.model.map = info.map
        this.createPrefab()
    },

    createPrefab: function () {
    },

    btnMove: function (event, data) {
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
