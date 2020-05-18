cc.Class({
    extends: cc.Component,

    properties: {
    },

    btnStartGame: function () {
        let allData = GetLocalStorage('TuiXiangZi-info') || []
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
