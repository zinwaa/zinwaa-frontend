<template>
    <span style="font-size: clamp(12px, 1.5vw, 20px);">
        自适应文字大小，最小值为12px，最大值为20px
    </span>
</template>


<script lang='ts'>
export default {
    name: 'clampBasic',
    title: '基础用法',
    code:
        `
<span style="font-size: clamp(12px, 1.5vw, 20px);">
    自适应文字大小，最小值为12px，最大值为20px
</span>`,

    topTips: `<p class="tips">clamp函数一般情况下用于，需要文字大小能自适应视口，但vw等单位不适用的时候使用。
                        <br>clamp函数的语法为：clamp(min, value, max);<br>
                        其中min为最小值，value为当前值，max为最大值。</p>`,
};
</script>


<style scoped></style>