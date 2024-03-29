<!-- css clamp函数 -->
<template>
    <section :id="props.sectionData.id">
        <h2 class="title">
            {{ props.sectionData.title }}
        </h2>
        <p class="tips topTips" v-if="props.sectionData.topTips">{{ props.sectionData.topTips }}</p>
        <div class="demo">
            <!-- 展示 -->
        </div>
        <a-space class="code-btn">
            <a-tooltip :content="isShow ? '隐藏代码' : '显示代码'" popup-container=".btn">
                <a-button type="outline" shape="circle" @click="codeShow" class="btn"><icon-code /></a-button>
            </a-tooltip>
            <a-tooltip content="复制代码" popup-container=".btn">
                <a-button type="outline" shape="circle" @click="codeCopy" class="btn"><icon-copy /></a-button>
            </a-tooltip>
        </a-space>
        <div class="code" ref="code" style="height: 0px;">
            <pre><code class="language-html">
                {{ props.sectionData.code }}
            </code></pre>
        </div>
        <p class="tips" v-if="props.sectionData.bottomTips">
            {{ props.sectionData.bottomTips }}
        </p>
    </section>
</template>


<script setup lang='ts'>
import Prism from 'prismjs'
import "@/assets/style/prism-base16-ateliersulphurpool.light.css"//高亮主题
import { onMounted, ref } from 'vue'
import { Message } from '@arco-design/web-vue';
const props = defineProps<{
    sectionData: {
        id: string,
        code: string,
        title: string,
        topTips?: string,
        bottomTips?: string,
    }
}>()
onMounted(() => {
    let demo = document.getElementById(props.sectionData.id)?.getElementsByClassName('demo')[0] as HTMLElement
    let topTips = document.getElementById(props.sectionData.id)?.getElementsByClassName('topTips')[0] as HTMLElement
    let bottomTips = document.getElementById(props.sectionData.id)?.getElementsByClassName('bottomTips')[0] as HTMLElement
    demo.innerHTML = props.sectionData.code
    props.sectionData.topTips && (topTips.innerHTML = props.sectionData.topTips)
    props.sectionData.bottomTips && (bottomTips.innerHTML = props.sectionData.bottomTips)

})

const isShow = ref(false)
const code = ref<HTMLDivElement | null>(null)

const codeShow = () => {
    if (code.value) {
        isShow.value = !isShow.value
        let height = code.value.children[0].clientHeight
        code.value && (code.value.style.height = code.value.style.height === "0px" ? `${height}px` : "0px")
    }
}

//tips
const tips = (status: 'success', message = '') => {
    switch (status) {
        case 'success':
            Message.success({
                content: message || '成功生成',
                position: "top",
            })
            break;
    }
}
const codeCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        tips('success', '复制成功')
        return navigator.clipboard.writeText(props.sectionData.code);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = props.sectionData.code;
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
            tips('success', '复制成功')
            document.execCommand('copy') ? res(null) : rej();
            textArea.remove();
        });
    }
}
onMounted(() => {
    Prism.highlightAll();
    setTimeout(() => Prism.highlightAll(), 100)
})

</script>


<style scoped>
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
        padding: 0px 48px;
        transform: translateY(-20px);
        border-radius: 4px;


    }
}

.tips {
    line-height: 1.5;
    display: block;
    color: var(--color-text-2);
    font-size: 14px;
}



.tool {
    display: flex;
    flex-direction: column;
}
</style>
