cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
    },

    onenter: function () {
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
