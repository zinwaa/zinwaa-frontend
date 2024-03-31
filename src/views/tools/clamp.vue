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
                <toolSection v-for="section in sectionData" :key="section.id" :sectionData="section.id" />
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

const sectionData = [
    {
        id: 'clampBasic',
        title: '基础用法',
    }, {
        id: 'clampFluidSize',
        title: '流体尺寸',
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
