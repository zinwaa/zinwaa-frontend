<template>
    <div class="select-box">
        <input type="select" :onclick="listShow" v-model="selectValue">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
        </svg>
        <div class="select-list" v-show="listIsActive">
            <div v-for="item in list" :key="item" class="select-item">
                <span>{{ item }}</span>
            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { ref, watch } from 'vue'
const Props = defineProps<{
    list: Array<string>
}>()
const list = ref(Props.list)
const listIsActive = ref(false)
const selectValue = ref('')
const close = (e: MouseEvent) => {
    if (document.activeElement !== e.target) {
        let dom = e.target as HTMLElement
        if (dom.className === 'select-item') {
            selectValue.value = dom.innerText
        }
        listIsActive.value = false
        removeEventListener('click', close)
    }
}
const listShow = () => {
    listIsActive.value = true
    addEventListener('click', close)
}
watch(() => selectValue.value, () => {
    list.value = Props.list.filter(function (item) {
        if (item.includes(selectValue.value)) return item
    });
})

</script>


<style scoped lang="scss">
$fontColor: rgba(0, 0, 0, 0.95);

.select-box {
    position: relative;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;

    input {
        color: $fontColor;
        font-size: 14px;
        padding: 4px 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: all .3s;
        flex: 1;

        &:hover {
            border: 1px solid rgb(24, 124, 255);
            $listIsActive: block;
        }

        &:focus-within {
            border: 1px solid rgb(24, 124, 255);
            box-shadow: rgba(24, 124, 255, 0.8) 0px 0px 10px 0px;

        }
    }
    svg {
        height: 100%;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all .3s;

        &:hover {
            color: rgb(24, 124, 255);
        }
    }
    .select-list {
        position: absolute;
        top: 100%;
        left: 0;
        width: calc(100% - 2px);
        background-color: #fff;
        border: 1px solid #ccc;
        border-top: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        z-index: 100;

        .select-item {
            color: $fontColor;
            font-size: 14px;
            padding: 4px 6px;
            cursor: pointer;
            transition: all .1s;
            border-bottom: #ccc 1px solid;

            &:hover {
                background-color: #eee;
            }
        }
    }
}</style>