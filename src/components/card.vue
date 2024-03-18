<template>
    <div class="card" :style="{ width: props.width + 'px' }" ref="card">
        <div class="card-slot">
            <slot></slot>
        </div>

    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue';

const props = defineProps<{
    width: number
}>();
const card = ref<HTMLDivElement>();
onMounted(() => {
    document.onmousemove = (e) => {
        const rect = card.value?.getBoundingClientRect() as DOMRect;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.value?.style.setProperty('--x', `${x}px`);
        card.value?.style.setProperty('--y', `${y}px`);
    };
});
</script>


<style scoped>
.card {
    position: relative;
    border-radius: 8px;
    background-color: #fff;
    min-width: 300px;

    .card-slot {
        padding: 15px;
        position: relative;
        height: 98%;
        background-color: #ccc;
        border-radius: inherit;
        display: flex;
        box-sizing: border-box;
    }
}
</style>