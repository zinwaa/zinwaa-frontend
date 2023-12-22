<template>
    <div class='wrapper' v-if="welcomeShow">
        <span><img src="../../public/favicon.svg" alt=""></span>
        <span style="font-weight: 200;z-index: 1000;"> | </span>
        <span style="z-index: 1000;">{{ welcomeText }}</span>
    </div>
</template>


<script setup lang='ts'>
import { ref, onMounted } from 'vue';
const welcomeText = ref('');
const welcomeWillShow = 'Welcome to ZinWaa World!';
const welcomeShow = ref(true);
onMounted(() => {
    const welcomeDom = document.querySelector('.wrapper') as HTMLDivElement;
    const icon = welcomeDom.children[0] as HTMLSpanElement;
    const welcomeTextDom = welcomeDom.children[2] as HTMLSpanElement;
    setTimeout(() => {
        welcomeDom.style.opacity = '0';
        setTimeout(() => {
            welcomeShow.value = false;
        }, 500);
    }, 3000);
    let fontSize = Number(window.getComputedStyle(welcomeTextDom).fontSize.replace('px', '')) * 0.585;
    welcomeTextDom.style.width = fontSize * welcomeWillShow.length + 'px';
})


//模拟 /chat 的数据
/**
 * 模拟打字机数据
 * @param {String} context 
 * @returns {String} result
 */
const addTxt = function (context: string) {
    let i = 0;
    let interval: number = -1;
    let str = ""
    if (i <= context.length) {
        interval = setInterval(() => {
            i++;
            str = context.substring(0, i);
            if (i >= context.length) {
                welcomeText.value = str
                clearInterval(interval)
            } else {
                welcomeText.value = str
            }
        }, 100)
    } else {
        clearInterval(interval);
    }
}
addTxt(welcomeWillShow);

</script>


<style scoped lang='scss'>
.wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    transition: all 0.5s ease-out;
    opacity: 1;
    background-color: #fff;

    span {
        font-size: 5vw;
        font-weight: bold;
        color: #000;
        background-color: #fff;
        padding: 0 10px;

        img {
            width: 5vw;
            top: 1vw;
            position: relative;
            transition: all 0.5s;
            animation: show 1s forwards;

            @keyframes show {
                0% {
                    opacity: 0;
                    left: calc(100%);
                }

                100% {
                    opacity: 1;
                    left: 0;
                }
            }
        }

    }
}</style>