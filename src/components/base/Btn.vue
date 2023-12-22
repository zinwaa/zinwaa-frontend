<template>
    <button type="button">{{text}}</button>
</template>


<script setup lang='ts'>
const Props = withDefaults(defineProps<{
    text: string
    btnType?:'specialty' | 'default'
}>(),{
    btnType: 'default'
}) 
</script>


<style scoped lang='scss'>
button {
    background: #fff;
    color: #00AAFF;
    border: 1px solid #00AAFF;
    cursor: pointer;
    padding: 5px 20px;
    border-radius: 5px;
    transition: all .2s;
    &:hover {
        background: #00AAFF;
        color: #fff;
    }
    &:active {
        background: #00AAFF;
        color: #fff;
        box-shadow: rgba(42, 152, 255, 0.8) 0px 0px 10px 0px;
    }
}
</style>