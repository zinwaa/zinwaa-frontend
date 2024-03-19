<template>
    <background>
        <div class="containers">
            <div class="zinwaaInfo">
                <card>
                    <div class="info">
                        <a-avatar :image-url="data.info.avatarUrl" :size="80" />
                        <div>
                            <span>ZinWaa</span>
                        </div>
                    </div>
                    <newhr :text="'Follow Me'" style="padding: 30px 0;" />
                    <div class="contact">
                        <div class="contact-item">
                            <a href="">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    class="arco-icon arco-icon-github" stroke-width="4" stroke-linecap="butt"
                                    stroke-linejoin="miter">
                                    <path
                                        d="M.056 24.618c0 10.454 6.7 19.344 16.038 22.608 1.259.32 1.067-.582 1.067-1.19v-4.148c-7.265.853-7.553-3.957-8.043-4.758-.987-1.686-3.312-2.112-2.62-2.912 1.654-.853 3.34.213 5.291 3.1 1.413 2.09 4.166 1.738 5.562 1.385a6.777 6.777 0 0 1 1.856-3.253C11.687 34.112 8.55 29.519 8.55 24.057c0-2.646.874-5.082 2.586-7.045-1.088-3.243.102-6.01.26-6.422 3.11-.282 6.337 2.225 6.587 2.421 1.766-.474 3.782-.73 6.038-.73 2.266 0 4.293.26 6.069.74.603-.458 3.6-2.608 6.49-2.345.155.41 1.317 3.12.294 6.315 1.734 1.968 2.62 4.422 2.62 7.077 0 5.472-3.158 10.07-10.699 11.397a6.82 6.82 0 0 1 2.037 4.875v6.02c.042.48 0 .96.806.96 9.477-3.194 16.299-12.15 16.299-22.697C47.938 11.396 37.218.68 23.996.68 10.77.675.055 11.391.055 24.617l.001.001Z"
                                        stroke="none"></path>
                                </svg>
                            </a>

                        </div>
                    </div>
                    <div></div>
                </card>
            </div>
            <div class="main">

            </div>
            <div class="others">

            </div>
        </div>

    </background>
</template>


<script setup lang='ts'>
import background from '@/components/background.vue'
import card from '@/components/card.vue'
import newhr from '@/components/newhr.vue'
import { reactive } from 'vue'
const data = reactive({
    info: {
        avatarUrl: '/src/assets/img/avatar.png'
    }
})
</script>


<style scoped lang="less">
.containers {
    width: 1460px;
    margin: 35px auto 0 auto;

    .zinwaaInfo {
        width: 100%;
        height: 300px;

        .info {
            display: flex;
            padding-top: 41px;
            justify-content: center;
            gap: 50px;

            span {
                line-height: 20px;
                font-size: 30px;
                font-weight: 300;
                font-family: 'SourceHanSans', Arial, sans-serif;
                text-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
                position: relative;
                top: 50px;
            }
        }

        .contact {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .contact-item {
                width: 30px;
                height: 30px;
                border-radius: 6px;
                background-color: #c9d5e0;
                box-shadow: 3px 3px 3px -1px rgba(0, 0, 0, .15),
                    inset 1.2px 1.2px 1px rgba(255, 255, 255, .5),
                    -1.5px -1.5px 3.5px rgba(255, 255, 255, .4),
                    inset -.1px -.1px 1px rgba(0, 0, 0, .2);

                svg {
                    width: 100%;
                    height: 100%;

                    path {
                        fill: rgb(94, 105, 255);
                    }
                }


            }
        }
    }
}
</style>@/components/hr.vue