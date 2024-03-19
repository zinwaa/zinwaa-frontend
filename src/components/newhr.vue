<template>
    <div class="hrDiv" ref="hrDivDom">
        <hr ref="hrLiftDom">
        <span ref="textDom">{{ props.text }}</span>
        <hr ref="hrRightDom">
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue';

const props = defineProps<{
    text?: String,
}>()
const textDom = ref<HTMLSpanElement | null>(null)
const hrLiftDom = ref<HTMLHRElement | null>(null)
const hrRightDom = ref<HTMLHRElement | null>(null)
const hrDivDom = ref<HTMLDivElement | null>(null)
onMounted(() => {
    if (props.text && textDom.value && hrLiftDom.value && hrRightDom.value && hrDivDom.value) {
        hrLiftDom.value.style.width = hrRightDom.value.style.width = `${(hrDivDom.value.offsetWidth - textDom.value.offsetWidth - 20) / 2}px`
        hrLiftDom.value.style.marginBottom = hrRightDom.value.style.marginBottom = `${(hrDivDom.value.offsetHeight / 2) - 35}px`
    }
})
</script>


<style scoped>
hr {
    display: inline-block;
}

span {
    margin: 0 8px;
    font-family: 'SourceHanSans', Arial, sans-serif;
    font-size: 14px;
}
</style>