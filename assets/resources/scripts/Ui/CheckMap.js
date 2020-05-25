cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.scrollView = this.node.PathChild('scrollView', cc.ScrollView)
        this.maxWidth = this.scrollView.node.width
        this.content = this.scrollView.content
        this.item = this.scrollView.node.PathChild('item')
        this.item.active = false
        this.smallItem = this.item.PathChild('layout/smallItem')
        this.smallItem.active = false
    },

    onenter: function () {
        this.allData = GetLocalStorage('TuiXiangZi-info') || []
        this.createItem()
    },

    createItem: function () {
        this.content.removeAllChildren()
        for (let i = 0; i < this.allData.length; i++) {
            let data = this.allData[i]
            let item = cc.instantiate(this.item)
            item.PathChild('title', cc.Label).string = `第${data.idx + 1}关`
            item.width = this.maxWidth
            item.height = this.maxWidth + 50
            item.idx = i
            // 计算小地图item size
            let smallItemSize = 0
            if (data.lineCount >= data.columnCount) {
                smallItemSize = parseInt(item.width / data.lineCount)
            } else if (data.lineCount < data.columnCount) {
                smallItemSize = parseInt(item.width / data.columnCount)
            }
            // 渲染小地图
            for (let j = 0; j < data.map.length; j++) {
                let smallItem = cc.instantiate(this.smallItem)
                SetSpriteFrame(GetPathByType(data.map[j]), smallItem.PathChild('val', cc.Sprite))
                smallItem.width = smallItemSize
                smallItem.height = smallItemSize
                smallItem.active = true
                smallItem.parent = item.PathChild('layout')
                item.PathChild('layout').width = smallItemSize * data.lineCount
                item.PathChild('layout', cc.Layout).updateLayout()
            }
            item.active = true
            item.parent = this.content
        }
        this.content.y = 0
    },

    btnDelete: function (event) {
        let idx = event.target.parent.idx
        for (let i = 0; i < this.content.children.length; i++) {
            let node = this.content.children[i]
            if (idx == node.idx) {
                this.content.removeChild(node)
                break
            }
        }
        this.allData.splice(idx, 1)
        for (let i = idx; i < this.allData.length; i++) {
            this.allData[i].idx -= 1
        }
        SetLocalStorage('TuiXiangZi-info', this.allData)
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
