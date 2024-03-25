<!-- svg描边动画 -->
<!-- svgAnimation -->
<template>
    <div class="toolContainer">
        <article class="article">
            <div class="article-header">
                <h1 class="title">
                    svg描边动画 SvgAnimation
                </h1>
            </div>
            <div class="article-content">
                <section id="basic">
                    <h2 class="title">基础用法</h2>
                    <div class="demo">
                        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" class="icon" ref="icon">
                            <path d="m11.4 2 H30 L28 8 L11 24 H22.6 L20.6 30 H2 L4 24 L21 8 H9 z"
                                stroke="rgb(36, 156, 255)" fill="none" />
                        </svg>
                        <a-button type="primary" @click="replay">重放</a-button>
                    </div>
                    <a-space class="code-btn">
                        <a-tooltip :content="isShow ? '隐藏代码' : '显示代码'" popup-container=".btn">
                            <a-button type="outline" shape="circle" @click="codeShow"><icon-code /></a-button>
                        </a-tooltip>
                        <a-tooltip content="复制代码" popup-container=".btn">
                            <a-button type="outline" shape="circle" @click="codeCopy"><icon-code /></a-button>
                        </a-tooltip>
                    </a-space>
                    <div class="code" ref="code" style="height: 0px;">
                        <pre><code class="language-css language-html language-ts">{{ toolsCode }}</code></pre>
                    </div>
                </section>
            </div>
        </article>
        <a-affix :offsetTop="120">
            <a-anchor :style="{ backgroundColor: 'var(--color-bg-1)' }">
                <a-anchor-link href="#basic">Basic</a-anchor-link>
            </a-anchor>
        </a-affix>
    </div>

</template>


<script setup lang='ts'>
import Prism from 'prismjs'
import "@/assets/style/prism-base16-ateliersulphurpool.light.css"//高亮主题
import { onMounted, ref } from 'vue'
import { Message } from '@arco-design/web-vue';

//tips
const tips = (status: 'success' | 'warning', message = '') => {
    switch (status) {
        case 'success':
            Message.success({
                content: message || '成功生成',
                position: "top",
            })
            break;
        case 'warning':
            Message.warning({
                content: message || '请输入必填字段',
                position: "top",
            })
            break;
    }
}
const code = ref<HTMLDivElement | null>(null)
const icon = ref<SVGSVGElement | null>(null)
const isShow = ref(false)
const codeShow = () => {
    if (code.value) {
        isShow.value = !isShow.value
        let height = code.value.children[0].clientHeight
        code.value && (code.value.style.height = code.value.style.height === "0px" ? `${height}px` : "0px")
    }
}
const replay = () => {
    icon.value?.classList.remove("icon");
    setTimeout(() => {
        icon.value?.classList.add("icon");
    }, 100)
}
const codeCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        tips('success', 'SQL 语句已复制到剪贴板')
        return navigator.clipboard.writeText(toolsCode);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = toolsCode;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = '0';
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            tips('success', 'SQL 语句已复制到剪贴板')
            document.execCommand('copy') ? res(null) : rej();
            textArea.remove();
        });
    }
}
onMounted(() => {
    Prism.highlightAll();
    setTimeout(() => Prism.highlightAll(), 100)
})
const toolsCode =
    `
<template>
    <div class="demo">
            <svg width="32" height="32" class="icon" ref="icon" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="m11.4 2 H30 L28 8 L11 24 H22.6 L20.6 30 H2 L4 24 L21 8 H9 z"
                    stroke="rgb(36, 156, 255)" fill="none" />
            </svg>
        <a-button type="primary" @click="replay">重放</a-button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const icon = ref<SVGSVGElement | null>(null)
const replay = () => {
    icon.value?.classList.remove("icon");
    setTimeout(() => {
        icon.value?.classList.add("icon");
    }, 100)
}
<\/script>
<style scoped>
@keyframes icon {
    to {
        stroke-dashoffset: 0;
        fill: rgb(36, 156, 255);
    }
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

.icon>path {
    stroke-dasharray: 650;
    stroke-dashoffset: 650;
    stroke: rgb(36, 156, 255);
    fill: white;
    animation: icon 3s forwards linear;
}
</style>
`
</script>


<style scoped lang="less">
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
        }


        .tool {
            display: flex;
            flex-direction: column;
        }
    }
}


@keyframes icon {
    to {
        stroke-dashoffset: 0;
        fill: rgb(36, 156, 255);
    }
}

.icon>path {
    stroke-dasharray: 650;
    stroke-dashoffset: 650;
    stroke: rgb(36, 156, 255);
    fill: white;
    animation: icon 3s forwards linear;
}
</style>