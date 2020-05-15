cc.Class({
    extends: cc.Component,

    properties: {
        uiRoot: cc.Node,
        tipsRoot: cc.Node,
    },

    onLoad: function () {
        this.model = {
            prefabs: [],
        }

        window.UiMgr = this
    },

    open: function (name) {
        let args = Array.prototype.slice.call(arguments).slice(1)
        if (this.model.prefabs[name]) {
            this.model.prefabs[name].active = true
            this.model.prefabs[name].getComponent(name).onenter && this.model.prefabs[name].getComponent(name).onenter(args)
            this.openAction(this.model.prefabs[name])
            return
        }
        cc.loader.loadRes(`ui/${name}`, (err, prefab) => {
            if (err) {
                cc.error(err)
                return
            }
            let pb = cc.instantiate(prefab)
            pb.active = false
            pb.parent = this.uiRoot
            this.model.prefabs[name] = pb
            this.openAction(pb)
            pb.getComponent(name).onenter && pb.getComponent(name).onenter(args)
        })
    },

    close: function (name) {
        if (this.model.prefabs[name]) {
            this.closeAction(this.model.prefabs[name])
        }
    },

    showTips: function (msg) {
        if (this.model.prefabs.tips) {
            this.model.prefabs.tips.active = true
            this.model.prefabs.tips.getComponent('Tips').onenter && this.model.prefabs.tips.getComponent('Tips').onenter(msg)
            this.openAction(this.model.prefabs.tips)
            return
        }
        cc.loader.loadRes(`tips/Tips`, (err, prefab) => {
            if (err) {
                cc.error(err)
                return
            }
            let pb = cc.instantiate(prefab)
            pb.active = false
            pb.parent = this.tipsRoot
            this.model.prefabs.tips = pb
            this.openAction(pb)
            pb.getComponent('Tips').onenter && pb.getComponent('Tips').onenter(msg)
        })
    },

    hideTips: function () {
        if (this.model.prefabs.tips) {
            this.closeAction(this.model.prefabs.tips)
        }
    },

    openAction: function (node) {
        node.scaleX = 0
        node.scaleY = 0
        node.active = true
        node.stopAllActions()
        node.runAction(cc.scaleTo(0.3, 1, 1).easing(cc.easeCubicActionOut()))
    },

    closeAction: function (node) {
        node.stopAllActions()
        node.runAction(cc.sequence(
            cc.scaleTo(0.3, 0, 0).easing(cc.easeCubicActionOut()),
            cc.callFunc(() => {
                node.active = false
                node.scaleX = 1
                node.scaleY = 1
            }),
        ))
    },
});
