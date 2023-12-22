<template>
    <div class="emptyBox">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" />
            <path d="M13 3v6h6" />
        </svg>
        <span>{{ emptyData }}</span>
    </div>
</template>


<script setup lang='ts'>
import { onMounted } from 'vue'
withDefaults(defineProps<{
    emptyData?: string
}>(), {
    emptyData: '暂无数据'
})

onMounted(() => {
    const emptyDom = document.getElementsByClassName('emptyBox')[0] as HTMLDivElement
    let emptyWidth = emptyDom.offsetWidth
    let emptyHeight = emptyDom.offsetHeight
    emptyDom.style.flexDirection = emptyWidth > emptyHeight ? 'row' : 'column'
})
</script>


<style scoped lang="scss">
.emptyBox {

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        $size: 30%;
        width: $size;
        height: $size;
        stroke-width: 5%;
        stroke: #333;
    }

    span {
        display: block;
        font-size: clamp(0.625rem, 0.489rem + 0.68vw, 1rem);
        color: rgba(0, 0, 0, 0.8);
    }
}
</style>