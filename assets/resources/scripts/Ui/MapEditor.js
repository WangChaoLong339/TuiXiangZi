cc.Class({
    extends: cc.Component,

    properties: {
        top: cc.Node,

        mapRoot: cc.Node,
        mapItem: cc.Node,

        typeRoot: cc.Node,
        twinkle: cc.Node,
        typeItem: cc.Node,

        bottom: cc.Node,
    },

    onLoad: function () {
        this.model = {
            types: [
                0, // 空地
                1, // 墙壁
                2, // 箱子
                3, // 目标
                4, // 箱子 + 目标
                5, // 人物
                6, // 人物 + 目标
            ],
            typeIdx: 0,
            lineCount: 0,
            columnCount: 0,
            mapData: [],
            maxMapWidth: ViewSize.width,
            maxMapHeight: ViewSize.height,
        }

        this.model.typeItemSize = parseInt(this.mapRoot.width / this.model.types.length)
        this.model.typeItemSize = this.model.typeItemSize > 100 ? 100 : this.model.typeItemSize
        this.twinkle.width = this.twinkle.height = this.model.typeItemSize

        this.createTypeItem()
    },

    createTypeItem: function () {
        this.typeRoot.removeAllChildren()
        for (let i = 0; i < this.model.types.length; i++) {
            let cloneItem = cc.instantiate(this.typeItem)
            SetSpriteFrame(`${this.getPathByType(this.model.types[i])}`, cloneItem.PathChild('val', cc.Sprite))
            cloneItem.width = this.model.typeItemSize
            cloneItem.height = this.model.typeItemSize
            cloneItem.x = -parseInt(this.model.types.length / 2) * cloneItem.width + i * cloneItem.width
            cloneItem.parent = this.typeRoot
        }
    },

    onenter: function () {
        this.clear()
        this.twinkle.x = this.typeRoot.children[0].x
        this.playTwinkleAction()
    },

    createMapItem: function () {
        this.mapRoot.removeAllChildren()
        for (let i = 0; i < this.model.types; i++) {
        }
    },

    playTwinkleAction: function () {
        this.twinkle.stopAllActions()
        this.twinkle.runAction(cc.repeatForever(cc.sequence(
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.delayTime(0.2),
        )))
    },

    clear: function () {
        // 数据层
        this.model.typeIdx = 0
        this.model.lineCount = 0
        this.model.columnCount = 0
        this.model.mapData = []

        // 界面层
        this.mapRoot.removeAllChildren()
        this.bottom.PathChild('lineEditBox', cc.EditBox).string = ''
        this.bottom.PathChild('columnEditBox', cc.EditBox).string = ''
    },

    updateMap: function () {
        this.mapRoot.children.forEach((it, idx) => {
            SetSpriteFrame(this.getPathByType(this.model.mapData[idx]), it.PathChild('fg', cc.Sprite))
        })
    },

    getPathByType: function (type) {
        switch (type) {
            case 0:
                return 'picture/pure/color_dark'
            case 1:
                return 'picture/wall/wall_00'
            case 2:
                return 'picture/box/box_00'
            case 3:
                return 'picture/dot/dot_1'
            case 4:
                return 'picture/box/box_01'
            case 5:
                return 'picture/hero/down_00'
            case 6:
                return 'picture/dot/dot_3'
            default:
                cc.error('!--无法匹配的类型--!')
        }
    },

    trySaveMap: function (callback) {
        // 请检查箱子数量和目标点数量是否一致?
        let boxCount = GetCountFramArray(this.model.mapData, 2)
        let endCount = GetCountFramArray(this.model.mapData, 3)
        if (boxCount != endCount) {
            UiMgr.showTips({
                title: '警告',
                msg: '请检查箱子数量和目标点数量是否一致?',
                btn: [{ name: '确认', func: UiMgr.hideTips },],
            })
            return
        }
        // 至少需要一个箱子和目标点!
        if (boxCount <= 0 || endCount <= 0) {
            UiMgr.showTips({
                title: '警告',
                msg: '至少需要一个箱子和目标点!',
                btn: [{ name: '确认', func: UiMgr.hideTips },],
            })
            return
        }
        // 人物有且只能有一个!
        if (GetCountFramArray(this.model.mapData, 5) != 1) {
            UiMgr.showTips({
                title: '警告',
                msg: '人物有且只能有一个!',
                btn: [{ name: '确认', func: UiMgr.hideTips },],
            })
            return
        }

        callback()
        UiMgr.showTips({
            title: '提示',
            msg: '保存地图成功',
            btn: [{ name: '确认', func: UiMgr.hideTips },],
        })
    },

    btnItemType: function (event, data) {
        this.twinkle.x = this.typeRoot.children[parseInt(data) + 1].x
        this.model.typeIdx = parseInt(data)
    },

    btnMapItem: function (event) {
        let idx = event.target.idx
        this.model.mapData[idx] = this.model.typeIdx
        this.updateMap()
    },

    btnComfirm: function () {
        this.model.lineCount = parseInt(this.bottom.PathChild('lineEditBox', cc.EditBox).string) || 0
        this.model.columnCount = parseInt(this.bottom.PathChild('columnEditBox', cc.EditBox).string) || 0
        if (this.model.lineCount < 3 || this.model.lineCount > 15 || !this.model.columnCount || this.model.columnCount < 3 || this.model.columnCount > 15) {
            UiMgr.showTips({
                title: '输入错误提示',
                msg: '输入的地图尺寸错误',
                btn: [{ name: '确认', func: UiMgr.hideTips },],
            })
            return
        }
        let itemSize = null
        // 横图 || 方形图
        if (this.model.lineCount >= this.model.columnCount) {
            itemSize = parseInt(this.model.maxMapWidth / this.model.lineCount)
            this.mapRoot.width = this.model.maxMapWidth
        }
        // 竖图
        if (this.model.lineCount < this.model.columnCount) {
            itemSize = parseInt(this.model.maxMapWidth / this.model.columnCount)
            this.mapRoot.width = this.model.lineCount * itemSize
        }

        this.mapRoot.removeAllChildren()
        this.model.mapData = []
        for (let i = 0; i < this.model.lineCount * this.model.columnCount; i++) {
            this.model.mapData.push(0)
            let item = cc.instantiate(this.mapItem)
            item.idx = i
            item.width = itemSize
            item.height = itemSize
            item.parent = this.mapRoot
        }
        this.updateMap()
    },

    btnGenerate: function () {
        this.trySaveMap(() => {
            let localData = GetLocalStorage('TuiXiangZi-info') || []
            let i = localData.length > 0 ? localData[localData.length - 1].idx + 1 : 0
            localData.push({ idx: i, lineCount: this.model.lineCount, columnCount: this.model.columnCount, map: this.model.mapData })
            SetLocalStorage('TuiXiangZi-info', localData)
            this.clear()
        })
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
