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
        this.item.active = false
        this.canPassType = [0, 2, 3, 4]
        this.maxWidth = cc.winSize.width - 50
        window.game = this
    },

    onenter: function (info) {
        this.initData(info)

        // 创建 地图 和 英雄
        this.create()
    },

    initData: function (info) {
        this.model.map = info.map
        this.model.lineCount = info.lineCount
        // 动态算取 item 的尺寸
        let size = null
        if (info.lineCount >= info.columnCount) {
            size = parseInt(this.maxWidth / info.lineCount)
        } else if (info.lineCount < info.columnCount) {
            size = parseInt(this.maxWidth / info.columnCount)
        }
        this.model.itemSize = size
        this.model.point = 0 // 下 右 上 左
        this.model.heroRelativeIdx = null
    },

    create: function () {
        // 创建地图
        this.map.removeAllChildren()
        for (let i = 0; i < this.model.map.length; i++) {
            let cloneItem = cc.instantiate(this.item)
            let t = this.model.map[i]
            // 人物点 显示 空
            if (t == 5) {
                t = 0
                this.model.heroRelativeIdx = i
            }
            // 人物目标点 显示 目标
            if (t == 6) {
                t = 3
                this.model.heroRelativeIdx = i
            }
            SetSpriteFrame(GetPathByType(t), cloneItem.PathChild('val', cc.Sprite))
            cloneItem.width = cloneItem.height = this.model.itemSize
            cloneItem.active = true
            cloneItem.parent = this.map
        }
        this.map.getComponent(cc.Layout).updateLayout()

        // 创建英雄
        this.hero.getComponent('MultiFrame').setSpriteFrame(this.model.point)
        this.hero.width = this.hero.height = this.model.itemSize
        this.hero.setPosition(this.map.children[this.model.heroRelativeIdx].getPosition())
    },

    btnMove: function (event, data) {
        this.model.point = parseInt(data)
        this.hero.getComponent('MultiFrame').setSpriteFrame(this.model.point)
        let fromIdx = this.model.heroRelativeIdx
        let toIdx = null
        switch (this.model.point) {
            case 0: // 下
                if (typeof this.model.map[fromIdx + this.model.lineCount] != 'undefined' && this.canPassType.indexOf(this.model.map[fromIdx + this.model.lineCount]) != -1) {
                    toIdx = fromIdx + this.model.lineCount
                }
                break
            case 1: // 右
                if ((fromIdx + 1) % this.model.lineCount != 0 && typeof this.model.map[fromIdx + 1] != 'undefined' && this.canPassType.indexOf(this.model.map[fromIdx + 1]) != -1) {
                    toIdx = fromIdx + 1
                }
                break
            case 2: // 上
                if (typeof this.model.map[fromIdx - this.model.lineCount] != 'undefined' && this.canPassType.indexOf(this.model.map[fromIdx - this.model.lineCount]) != -1) {
                    toIdx = fromIdx - this.model.lineCount
                }
                break
            case 3: // 左
                if (fromIdx % this.model.lineCount != 0 && typeof this.model.map[fromIdx - 1] != 'undefined' && this.canPassType.indexOf(this.model.map[fromIdx - 1]) != -1) {
                    toIdx = fromIdx - 1
                }
                break
        }
        // 是否可以移动
        if (toIdx != null) {
            // 是否推动箱子

            // 英雄移动
            this.hero.stopAllActions()
            this.hero.runAction(cc.sequence(
                cc.moveTo(0.1, this.map.children[toIdx].getPosition()),
                cc.callFunc(() => {
                    this.model.heroRelativeIdx = toIdx
                    // 是否踩在目标点上 ? 目标点 : 否空地
                    this.model.map[fromIdx] = this.model.map[fromIdx] == 6 ? 3 : 0
                    // 是否是目标点 ? 人物+目标点 : 人物
                    this.model.map[toIdx] = this.model.map[toIdx] == 3 ? 6 : 5
                }),
            ))
        }
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
