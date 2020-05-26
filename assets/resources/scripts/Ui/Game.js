cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        map: cc.Node,
        item: cc.Node,
        hero: cc.Node,
        win: cc.Node,
    },

    onLoad: function () {
        this.model = {}
        this.item.active = false
        this.heroCanPassType = [0, 2, 3, 4]
        this.boxCanPassType = [0, 3]
        this.maxWidth = cc.winSize.width - 50
        window.game = this
    },

    onenter: function (info) {
        this.initData(info)
        // 隐藏胜利节点
        this.win.active = false
        // 创建 地图 和 英雄
        this.create()
    },

    initData: function (info) {
        this.model.info = Clone(info)
        this.model.map = info.map
        this.model.lineCount = info.lineCount
        this.model.columnCount = info.columnCount
        // 动态算取 item 的尺寸
        let size = null
        if (info.lineCount >= info.columnCount) {
            size = parseInt(this.maxWidth / info.lineCount)
        } else if (info.lineCount < info.columnCount) {
            size = parseInt(this.maxWidth / info.columnCount)
        }
        this.model.itemSize = size
        this.model.point = 0 // 下 右 上 左
        this.model.heroIdx = null
    },

    create: function () {
        // 创建地图
        this.map.removeAllChildren()
        this.map.width = this.model.itemSize * this.model.lineCount
        this.map.height = this.model.itemSize * this.model.columnCount
        for (let i = 0; i < this.model.map.length; i++) {
            let cloneItem = cc.instantiate(this.item)
            let t = this.model.map[i]
            // 人物点 显示 空
            if (t == 5) { t = 0; this.model.heroIdx = i }
            // 人物目标点 显示 目标
            if (t == 6) { t = 3; this.model.heroIdx = i }
            SetSpriteFrame(GetPathByType(t), cloneItem.PathChild('val', cc.Sprite))
            cloneItem.width = cloneItem.height = this.model.itemSize
            cloneItem.x = -this.map.width / 2 + (i % this.model.lineCount) * this.model.itemSize + cloneItem.width / 2
            cloneItem.y = -parseInt(i / this.model.lineCount) * this.model.itemSize - this.model.itemSize / 2
            cloneItem.active = true
            cloneItem.parent = this.map
        }

        // 创建英雄
        this.hero.PathChild('val', 'MultiFrame').setSpriteFrame(this.model.point)
        this.hero.PathChild('val').width = this.hero.PathChild('val').height = this.model.itemSize
        this.hero.parent = this.map
        this.hero.setPosition(this.map.children[this.model.heroIdx].getPosition())
    },

    tryToEndTheGame: function () {
        // 判定地图上是否还存在箱子
        if (this.model.map.indexOf(2) != -1) {
            return
        }
        this.win.active = true
        this.win.PathChild('particle0', cc.ParticleSystem).resetSystem
        this.win.PathChild('particle1', cc.ParticleSystem).resetSystem
        this.win.PathChild('particle2', cc.ParticleSystem).resetSystem
        setTimeout(() => {
            this.win.PathChild('particle0', cc.ParticleSystem).stopSystem
            this.win.PathChild('particle1', cc.ParticleSystem).stopSystem
            this.win.PathChild('particle2', cc.ParticleSystem).stopSystem
            this.win.active = false
            this.onenter(this.model.info)
        }, 8000)
    },

    updateMap: function () {
        for (let i = 0; i < this.map.children.length - 1; i++) {
            let t = this.model.map[i]
            t = (t == 5 || t == 6) ? 0 : t
            let item = this.map.children[i]
            SetSpriteFrame(GetPathByType(t), item.PathChild('val', cc.Sprite))
        }
        this.hero.setPosition(this.map.children[this.model.heroIdx].getPosition())
    },

    btnMove: function (event, data) {
        this.model.point = parseInt(data)
        this.hero.PathChild('val', 'MultiFrame').setSpriteFrame(this.model.point)
        let fromIdx = this.model.heroIdx
        let toIdx = null
        let thirdIdx = null
        switch (this.model.point) {
            case 0: // 下
                if (fromIdx + this.model.lineCount < this.model.map.length) {
                    toIdx = fromIdx + this.model.lineCount
                    if (toIdx + this.model.lineCount < this.model.map.length) {
                        thirdIdx = toIdx + this.model.lineCount
                    }
                }
                break
            case 1: // 右
                if ((fromIdx + 1) % this.model.lineCount != 0) {
                    toIdx = fromIdx + 1
                    if ((toIdx + 1) % this.model.lineCount != 0) {
                        thirdIdx = toIdx + 1
                    }
                }
                break
            case 2: // 上
                if (fromIdx - this.model.lineCount > 0) {
                    toIdx = fromIdx - this.model.lineCount
                    if (toIdx - this.model.lineCount > 0) {
                        thirdIdx = toIdx - this.model.lineCount
                    }
                }
                break
            case 3: // 左
                if (fromIdx % this.model.lineCount != 0) {
                    toIdx = fromIdx - 1
                    if (toIdx % this.model.lineCount != 0) {
                        thirdIdx = toIdx - 1
                    }
                }
                break
        }
        // 人物 -> 空地
        if (this.model.map[toIdx] == 0) {
            this.model.map[toIdx] = 5
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        // 人物 -> 目标
        if (this.model.map[toIdx] == 3) {
            this.model.map[toIdx] = 6
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        // 人物 -> 箱子 -> 空地
        if (this.model.map[toIdx] == 2 && this.model.map[thirdIdx] == 0) {
            this.model.map[thirdIdx] = 2
            this.model.map[toIdx] = 5
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        // 人物 -> 箱子 -> 目标
        if (this.model.map[toIdx] == 2 && this.model.map[thirdIdx] == 3) {
            this.model.map[thirdIdx] = 4
            this.model.map[toIdx] = 5
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        // 人物 -> 箱子+目标 -> 空地
        if (this.model.map[toIdx] == 4 && this.model.map[thirdIdx] == 0) {
            this.model.map[thirdIdx] = 2
            this.model.map[toIdx] = 6
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        // 人物 -> 箱子+目标 -> 目标
        if (this.model.map[toIdx] == 4 && this.model.map[thirdIdx] == 3) {
            this.model.map[thirdIdx] = 4
            this.model.map[toIdx] = 6
            this.model.map[fromIdx] = this.model.map[fromIdx] == 5 ? 0 : 3
            this.model.heroIdx = toIdx
        }
        this.updateMap()
        this.tryToEndTheGame()
    },

    btnReset: function () {
        this.onenter(this.model.info)
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
