cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        msg: cc.Label,
        button: cc.Node,
    },

    onLoad: function () {
    },

    onenter: function (msg) {
        this.callBacks = []
        this.title.string = msg.title || '系统提示'
        this.msg.string = msg.msg || '暂无提示'
        this.button.children.forEach((it, idx) => {
            if (msg.btn[idx]) {
                it.PathChild('val', cc.Label).string = msg.btn[idx].name
                this.callBacks.push(msg.btn[idx].func)
                it.active = true
            } else {
                it.active = false
            }
        })
    },

    btnButton: function (event, data) {
        let idx = parseInt(data)
        if (this.callBacks[idx]) {
            this.callBacks[idx]()
        } else {
            UiMgr.hideTips()
        }
    },
});
