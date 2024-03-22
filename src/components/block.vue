<template>
    <div class="cards" ref="cardsRef">
        <!-- 单个卡片区域 -->
        <div class="card" ref="cardRef" v-for="skill in props.skills">
            <!-- 卡片中间内容 -->
            <div class="card-content">{{ skill }}</div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue';
const props = defineProps<{
    skills: string[]
}>()

const cardsRef = ref<HTMLDivElement | null>(null)
/**
 * 发光点移动的操作
 * @param {*} e
 */
function move(e: MouseEvent) {
    if (cardsRef.value) {
        const cardElements = cardsRef.value.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;

        for (let i = 0; i < cardElements.length; i++) {
            let card = cardElements[i];

            let x = e.clientX - card.getBoundingClientRect().left;
            let y = e.clientY - card.getBoundingClientRect().top;

            // 设置每个发光点圆心的位置
            // 给卡片元素统一添加各自的 css 变量，并在 css 中配合使用
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    }
}
onMounted(() => {
    if (cardsRef.value) {
        cardsRef.value.onmousemove = (e) => {
            move(e);
        };
    }
})
</script>


<style scoped>
.cards {
    /* 内部每个卡片铺开展示，换行显示，给个间距 */
    display: flex;
    flex-wrap: wrap;
    gap: 1vmin;

    /* 所有卡片父盒子宽高，控制整体显示大小 */
    width: 100%;
    min-height: 50px;
    justify-content: flex-start;
    align-items: center;

    .card {
        /* 每个卡片的宽高，要减去间距 */
        min-width: 100px;
        height: 100px;
        /* 底层颜色，搭配下面的 inset，隔出来一个边框 */
        background-color: rgba(255, 255, 255, 0.1);
        /* 给个小圆角 */
        border-radius: 1vmin;
        /* 鼠标小手 */
        cursor: pointer;

        position: relative;

        .card-content {
            /* 卡片内容居中显示 */
            display: flex;
            justify-content: center;
            align-items: center;

            /* 卡片中间内容区域，向内挤出一个小一圈的宽高 */
            /* 中间的间隔就是卡片的边框 */
            inset: 2px;
            /* 圆角同上面一样 */
            border-radius: inherit;
            /* 卡片背景颜色 */
            background-color: #151515;
            /* 文字颜色、大小 */
            color: rgba(255, 255, 255, 0.4);
            font-size: 20px;

            /* 定位到中间 */
            position: relative;
            height: calc(100% - 4px);
            width: calc(100% - 4px);
            padding: 20px;

            /* 中间整体的发光颜色 */
            &::before {
                /* 径向渐变 js 动态调整圆心的位置 */
                background: radial-gradient(80px circle at var(--mouse-x) var(--mouse-y),
                        rgba(255, 255, 255, 0.26),
                        transparent);
            }
        }

        /* 卡片层和卡片内容层的发光元素 */
        /* 就是一层在下面做 边框发光颜色 */
        /* 一层在上面做 卡片整体发光颜色 */
        &::before,
        .card-content::before {
            content: "";

            /* 宽高都撑满整个卡片，圆角也同样继承父级 */
            width: 100%;
            height: 100%;
            border-radius: inherit;

            /* 默认不显示发光，鼠标悬停时再显示 */
            opacity: 0;
            /* 简单动画 */
            transition: opacity 0.5s;

            /* 定位叠中间 */
            position: absolute;
        }

        /* 边框的发光颜色 */
        &::before {
            /* 同样 径向渐变 动态调整圆心的位置，颜色更亮一点，光小一点 */
            background: radial-gradient(15vmin circle at var(--mouse-x) var(--mouse-y),
                    rgba(255, 255, 255, 0.4),
                    transparent);
        }
    }

    /* 鼠标放上去的时候才显示发光 */
    &:hover .card::before,
    .card:hover .card-content::before {
        opacity: 1;
    }
}
</style>