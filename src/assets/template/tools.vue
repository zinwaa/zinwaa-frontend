<template>
    <div class="toolContainer">
        <article class="article">
            <div class="article-header">
                <h1 class="title">
                    <!-- 这是总title -->
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

const domString = '<div>123123</div>';
const sectionData = [{
    id: 'basic', //id 唯一
    title: '工具',
    code: '1231231',
    demo: domString,
}]
</script>


<style scoped>
.toolContainer {
    display: flex;
    width: 100%;
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

        .article-content {
            .title {
                margin: 48px 0 12px;
                color: var(--color-text-1);
                font-weight: 500;
                font-size: 20px;
            }

            .demo {
                margin-top: 24px;
                padding: 48px;
                border: 1px solid var(--color-border);
                border-radius: 2px 2px 0 0;
                display: flex;
                justify-content: center;
                justify-content: space-evenly;
            }

            .code-btn {
                display: flex;
                justify-content: flex-end;
                margin-top: 16px;
            }

            .code {
                overflow-x: auto;
                transition: height .2s;
                margin-top: 16px;
                overflow-y: hidden;

                pre {
                    padding: 28px 48px;
                    transform: translateY(-20px);
                    border-radius: 4px;

                    code {
                        padding: 0;
                        white-space: pre-wrap;
                    }
                }
            }

            .tips {
                line-height: 1.5;
                display: block;
                color: var(--color-text-2);
                font-size: 14px;
            }
        }


        .tool {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
