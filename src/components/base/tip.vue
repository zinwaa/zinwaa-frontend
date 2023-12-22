<template>
    <div class="tipBoxDom" :class="props.type" v-show="tipShow">
        <slot>
            {{ props.tipData }}
        </slot>
    </div>
</template>


<script setup lang="ts">
import { watch,onMounted } from 'vue'
interface Props {
    type: 'error' | 'success' | 'warning',
    tipData: string,
    tipShow: boolean,
    tipTime?: number
}
interface Emits {
    (event: 'close'): void
}
const props = withDefaults(defineProps<Props>(), {
    tipTime: 2000
})
const emit = defineEmits<Emits>()
onMounted(() => {
    const tipDom = document.getElementsByClassName('tipBoxDom')[0] as HTMLDivElement
    tipDom.style.animationDuration = '2000ms'
    watch(()=>props.tipTime,(val)=>{
        tipDom.style.animationDuration = `${val}ms`
    })
})
watch(() => props.tipShow, (val) => {
    if (val) {
        setTimeout(() => {
            emit('close')
        }, props.tipTime)
    }
})
</script>


<style scoped lang="scss">
.tipBoxDom {
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s;
    background-color: #fff;
    text-align: center;
    font-size: 0.8rem;
    border-radius: 6px;
    padding: 6px 10px;
    opacity: 0;
    animation: inout linear;
    z-index: 9999999;
}

$success: #00AAFF;
$error: #ff3131;
$warning: #ff9900;
$type: (
    success $success),
    (error $error),
    (warning $warning
);

@each $item in $type {
    .#{nth($item, 1)} {
        border: 1px solid nth($item, 2);
        box-shadow: 1px 1px 8px 1px nth($item, 2);
        color: nth($item, 2);
    }
}

@keyframes inout {

    10%,
    90% {
        transform: translate(-50%, 20px);
        opacity: 1;
    }
}</style>