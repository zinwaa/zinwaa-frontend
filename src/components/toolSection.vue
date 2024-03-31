<!-- css clamp函数 -->
<template>
    <section :id="props.sectionData">
        <h2 class="title">
            {{ component.title }}
        </h2>
        <p class="tips topTips" v-if="component.topTips" v-html="component.topTips"></p>
        <div class="demo">
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
                {{ component.code }}
            </code></pre>
        </div>
        <p class="tips" v-if="component.bottomTips" v-html="component.bottomTips">
        </p>
    </section>
</template>


<script setup lang='ts'>
import Prism from 'prismjs'
import "@/assets/style/prism-base16-ateliersulphurpool.light.css"//高亮主题
import { onMounted, ref, reactive } from 'vue'
import { Message } from '@arco-design/web-vue';

const props = defineProps<{
    sectionData: string,
}>()
const component = reactive<{
    name: string,
    title: string,
    code: string,
    topTips?: string,
    bottomTips?: string,
}>({
    name: '',
    title: '',
    code: '',
    topTips: '',
    bottomTips: '',
})
onMounted(() => {
    const demo = document.getElementById(props.sectionData)?.getElementsByClassName('demo')[0] as HTMLElement
    const importComponent = import(`@/components/toolSection/${props.sectionData}.vue`)
    importComponent.then(res => {
        if (res.default) {
            const { name, title, topTips, bottomTips, code } = res.default
            component.name = res.default
            component.title = title
            component.code = code
            topTips && (component.topTips = topTips)
            bottomTips && (component.bottomTips = bottomTips)

            demo.innerHTML = code
        }
    })
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
        return navigator.clipboard.writeText(component.code);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = component.code;
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
