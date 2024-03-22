<template>
    <div class="card" :style="{ width: props.width + 'px' }" ref="card">
        <div class="inner">
            <slot></slot>
        </div>

    </div>
</template>


<script lang='ts'>
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        width: {
            type: Number as PropType<number>,
            default: 300 // 设置默认值为 300
        }
    },
    setup(props) {
        // 在此处使用 props.width 将会自动获得默认值
        return {
            props
        };
    }
});
</script>


<style scoped>
.card {
    position: relative;
    border-radius: 8px;
    background-color: rgba(201, 195, 253, 0.6);
    min-width: 300px;
    backdrop-filter: blur(5px);
    box-shadow: 30px 30px 30px -10px rgba(162, 0, 255, .15),
        inset 12px 12px 10px rgba(255, 255, 255, .5),
        -15px -15px 35px rgba(255, 255, 255, .4),
        inset -1px -1px 10px rgba(162, 0, 255, .2);

    .inner {
        height: 100%;
    }
}
</style>