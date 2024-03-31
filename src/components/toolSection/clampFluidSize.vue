<template>
    <div style="width:clamp(200px,50vw,800px);text-align:center;background-color: aquamarine;">
        300px <= width <=800px </div>
</template>


<script lang='ts'>
export default {
    name: 'clampFluidSize',
    title: '流体尺寸',
    code: `
        <div style="width:clamp(200px,50vw,800px);text-align:center;background-color: aquamarine;">
            300px <=  width  <=800px 
        </div>
    
`,
    topTips: `<p class="tips">
            响应式的页面原理就是根据不同设备大小渲染不同的CSS，而clamp函数也是根据VAL的大小，返回不同的值。
            <br>
            所以可以利用clamp函数来实现响应式布局。clamp可以实现容器宽度自适应，并能控制容器的极限值，这是百分比值没有的控制。
        </p>`,

};
</script>


<style scoped></style>