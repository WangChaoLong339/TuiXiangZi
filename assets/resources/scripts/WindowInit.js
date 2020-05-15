cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        cc.Node.prototype.PathChild = function (path, componentName) {
            let names = path.split('/')
            let nd = null
            for (let i = 0; i < names.length; i++) {
                if (nd) {
                    nd = nd.getChildByName(names[i])
                } else {
                    nd = this.getChildByName(names[i])
                }
            }
            if (componentName) {
                return nd.getComponent(componentName)
            } else {
                return nd
            }
        }

        // 记录一个进入游戏的时间
        window.EnterGameTime = new Date().getTime() / 1000

        // 记录屏幕Size
        window.ViewSize = cc.winSize

        window.GetCountFramArray = function (arr, elmt) {
            let count = 0
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == elmt) {
                    count++
                }
            }
            return count
        }

        window.SetLocalStorage = function (key, data) {
            cc.sys.localStorage.setItem(key, JSON.stringify(data))
        }

        window.GetLocalStorage = function (key) {
            let data = cc.sys.localStorage.getItem(key)
            if (data) {
                return JSON.parse(data)
            }
            return null
        }

        window.SetSpriteFrame = function (path, sprite) {
            if (!path) {
                sprite.spriteFrame = null
                return
            }
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    cc.error(err)
                    return
                }
                sprite.spriteFrame = spriteFrame
            })
        }
    },
});
