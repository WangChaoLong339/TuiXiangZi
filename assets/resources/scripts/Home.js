cc.Class({
    extends: cc.Component,

    properties: {
    },

    btnStartGame: function () {
        let allData = GetLocalStorage('TuiXiangZi-info') || []
        if (allData.length == 0) {
            UiMgr.showTipsAutoHide('暂无可用地图,请创建新的地图')
            return
        }
        UiMgr.open('Game', allData[0])
    },

    btnCheckMap: function () {
        UiMgr.open('CheckMap')
    },

    btnMapEditor: function () {
        UiMgr.open('MapEditor')
    },

    btnExitGame: function () {
        cc.director.end()
    },
});
