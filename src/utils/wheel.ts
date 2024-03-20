// 假设有一个全局变量用于存储上一次滚动位置
let lastScrollPosition = 0;

export const handleWheel = (e: WheelEvent, moveDom?: HTMLElement) => {
    e.preventDefault()



    // 移动 moveDomList 中的 DOM 元素
    if (moveDom) {

        // 计算滚动距离
        const scrollDelta = -e.deltaY || 0;
        lastScrollPosition += scrollDelta;

        // 约束滚动位置
        lastScrollPosition = Math.min(0, Math.max(700 - moveDom.offsetHeight, lastScrollPosition));

        // 确保元素具有可变换的定位方式（如 absolute 或 fixed）
        if (moveDom.style.position !== 'absolute' && moveDom.style.position !== 'fixed') {
            moveDom.style.position = 'relative'; // 可根据需求选择 absolute 或 fixed
        }

        // 更新元素的 translateY 值，使其跟随页面滚动
        moveDom.style.transform = `translateY(${lastScrollPosition}px)`;
    }
};