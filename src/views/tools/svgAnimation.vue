<!-- svg描边动画 -->
<!-- svgAnimation -->
<template>
    <div>
        svg描边动画
    </div>
    <div>
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="m11.4 2 H30 L28 8 L11 24 H22.6 L20.6 30 H2 L4 24 L21 8 H9 z" stroke="rgb(36, 156, 255)"
                fill="none" />
        </svg>
        <pre>
            <code class="language-html">
                {{ code }}
            </code>
        </pre>
    </div>
</template>


<script setup lang='ts'>
import Prism from 'prismjs'
import { onMounted } from 'vue'
onMounted(() => {
    Prism.highlightAll()
})
const code =
    `
<template>
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="m11.4 2 H30 L28 8 L11 24 H22.6 L20.6 30 H2 L4 24 L21 8 H9 z" stroke="rgb(36, 156, 255)"
            fill="none" />
    </svg>
</template>
<style>
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
`
</script>


<style scoped>
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