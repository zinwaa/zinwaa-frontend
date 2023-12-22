<template>
    <div>
        {{ msg }}
        {{ tip.name }}
        <button @click="tip.name = 'lzh'">click</button>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';

const {msg} = withDefaults(defineProps<{
    msg?: string
}>(),{
    msg: 'world'
}) 
interface Tip {
    name: string
    age: number
}
const tip:Tip = reactive({name: 'zzzz', age: 18})
const arr:number[] = [1,2,3]
console.log(...arr);



</script>


<style scoped></style>