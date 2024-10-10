const cacheKeys = {
    wechatPath: 'WeChat_Path',
    wechatNum: 2,
}


const weChatPathChooser = document.getElementById('wechat-path-chooser')
const weChatOpenBtn = document.getElementById('wechat-open-btn')
const weCahtNum = document.getElementById('wechat-num')

weChatPathChooser.addEventListener('click', async () => {
    const path = await electronAPI.openFile()
    if (path) {
        localStorage.setItem(cacheKeys.wechatPath, path)
    }
})

//load old num
window.addEventListener('load', () => {
    const num = localStorage.getItem(cacheKeys.wechatNum)
    try {
        if (isNaN(parseInt(num))) {
            return
        }
    } catch (e) {
        localStorage.setItem(cacheKeys.wechatNum, 0)
    }
    weCahtNum.value = num
})

weCahtNum.addEventListener('change', () => {
    localStorage.setItem(cacheKeys.wechatNum, weCahtNum?.value)
})

weChatOpenBtn.addEventListener('click', async () => {
    const path = localStorage.getItem(cacheKeys.wechatPath)

    if (!path) {
        return alert('请选择正确的文件路径！！！')
    }
    const num = weCahtNum?.value ? parseInt(weCahtNum.value) : 0
    if (Number.isNaN(num) || num <= 0 || num >= 50) {
        return alert('请输入正确的启动数量！')
    }

    electronAPI.openWechat(path, num)
})