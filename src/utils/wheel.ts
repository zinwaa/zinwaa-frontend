//处理滚轮事件
export const handleWheel = (e: WheelEvent, notMoveDomList?: HTMLElement[], moveDomList?: HTMLElement[]) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY > 0 ? 1 : -1

    // 获取视口高度和滚动前的滚动位置
    const windowHeight = window.innerHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    // 获取需要保持位置的 DOM 元素的高度总和
    let fixedHeight = 0
    if (notMoveDomList && notMoveDomList.length > 0) {
        notMoveDomList.forEach(dom => {
            fixedHeight += dom.offsetHeight
        })
    }

    // 根据滚动方向和滚动位置，计算新的滚动位置
    let newScrollTop = scrollTop
    if (delta === 1) {
        newScrollTop += delta * windowHeight
    } else {
        newScrollTop -= delta * windowHeight
    }

    // 确保新的滚动位置不超出页面内容的高度
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    newScrollTop = Math.min(newScrollTop, documentHeight - windowHeight)
    newScrollTop = Math.max(newScrollTop, fixedHeight)

    // 设置新的滚动位置
    window.scrollTo(0, newScrollTop)

    // TODO: 移动 moveDomList 中的 DOM 元素，以实现随着滚轮滚动而移动的效果
}