<!-- css clamp函数 -->
<template>
    <div class="toolContainer">
        <article class="article">
            <div class="article-header">
                <h1 class="title">
                    clamp函数 css
                </h1>
            </div>
            <div class="article-content">
                <toolSection v-for="section in sectionData" :key="section.id" :sectionData="section" />
            </div>
        </article>
        <a-affix :offsetTop="120">
            <a-anchor :style="{ backgroundColor: 'var(--color-bg-1)' }">
                <a-anchor-link :href="`#${section.id}`" v-for="section in sectionData">
                    {{ section.title }}
                </a-anchor-link>
            </a-anchor>
        </a-affix>
    </div>
</template>


<script setup lang='ts'>
import toolSection from '@/components/toolSection.vue'
const basicCode = `
<span style="font-size: clamp(12px, 1.5vw, 20px);">
    自适应文字大小，最小值为12px，最大值为20px
</span>
`
const fluidSizeCode = `
<div style="width:clamp(200px,50vw,800px);text-align:center;background-color: aquamarine;" @click="asdf">
    300px <=  width  <=500px 
</div>
`
const sectionData = [
    {
        id: 'basic',
        title: '基础用法',
        code: basicCode,
        topTips: `<p class="tips">
                        clamp函数一般情况下用于，需要文字大小能自适应视口，但vw等单位不适用的时候使用。
                        <br>
                        clamp函数的语法为：clamp(min, value, max);
                        <br>
                        其中min为最小值，value为当前值，max为最大值。
                    </p>`
    }, {
        id: 'fluidSize',
        title: '流体尺寸',
        code: fluidSizeCode,
        topTips: `<p class="tips">
            响应式的页面原理就是根据不同设备大小渲染不同的CSS，而clamp函数也是根据VAL的大小，返回不同的值。
            <br>
            所以可以利用clamp函数来实现响应式布局。clamp可以实现容器宽度自适应，并能控制容器的极限值，这是百分比值没有的控制。
        </p>`
    }
]





</script>


<style scoped>
.toolContainer {
    display: flex;
    justify-content: space-between;

    .article {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 20px;
        flex: 1;
        padding: 0 1%;

        .article-header {
            .title {
                position: relative;
                padding: 36px 0;
                border-bottom: 1px solid var(--color-border);
                margin: 20px 0 12px;
                color: var(--color-text-1);
                font-weight: 500;
                font-size: 36px;
            }
        }
    }
}
</style>
