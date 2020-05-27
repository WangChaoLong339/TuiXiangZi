cc.Class({
    extends: cc.Component,

    properties: {
        layout: cc.Node,
        msg: cc.Node,
    },

    onLoad: function () {
        this.layout.removeAllChildren()
    },

    onenter: function (msg) {
        let item = cc.instantiate(this.msg)
        item.getComponent(cc.Label).string = msg
        item.parent = this.layout
        setTimeout(() => {
            this.layout.removeChild(item)
            if (this.layout.children.length == 0) {
                this.node.active = false
            }
        }, 3000)
    },
});
