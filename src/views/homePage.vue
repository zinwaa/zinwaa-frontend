<template>
    <background />
    <div class="containers" ref="container">
        <a-affix class="zinwaaInfo" :offset-top="35">
            <card>
                <div class="info">
                    <a-avatar :image-url="data.info.avatarUrl" :size="80" />
                    <div>
                        <span>ZinWaa</span>
                    </div>
                </div>
                <newhr :text="'Contact Me'" style="padding: 30px 0;" />
                <div class="contact">
                    <div class="contact-item">
                        <a href="https://github.com/zinwaa" class="item">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                class="arco-icon arco-icon-github" stroke-width="4" stroke-linecap="butt"
                                stroke-linejoin="miter">
                                <path
                                    d="M.056 24.618c0 10.454 6.7 19.344 16.038 22.608 1.259.32 1.067-.582 1.067-1.19v-4.148c-7.265.853-7.553-3.957-8.043-4.758-.987-1.686-3.312-2.112-2.62-2.912 1.654-.853 3.34.213 5.291 3.1 1.413 2.09 4.166 1.738 5.562 1.385a6.777 6.777 0 0 1 1.856-3.253C11.687 34.112 8.55 29.519 8.55 24.057c0-2.646.874-5.082 2.586-7.045-1.088-3.243.102-6.01.26-6.422 3.11-.282 6.337 2.225 6.587 2.421 1.766-.474 3.782-.73 6.038-.73 2.266 0 4.293.26 6.069.74.603-.458 3.6-2.608 6.49-2.345.155.41 1.317 3.12.294 6.315 1.734 1.968 2.62 4.422 2.62 7.077 0 5.472-3.158 10.07-10.699 11.397a6.82 6.82 0 0 1 2.037 4.875v6.02c.042.48 0 .96.806.96 9.477-3.194 16.299-12.15 16.299-22.697C47.938 11.396 37.218.68 23.996.68 10.77.675.055 11.391.055 24.617l.001.001Z"
                                    stroke="none"></path>
                            </svg>
                            <span>Github 主页</span>
                        </a>
                    </div>
                    <div class="contact-item">
                        <div class="item">
                            <svg data-v-23ac1662="" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                class="arco-icon arco-icon-qq" stroke-width="4" stroke-linecap="butt"
                                stroke-linejoin="miter">
                                <path
                                    d="M7.85 32.825s1.153 3.136 3.264 5.955c0 0-3.779 1.281-3.458 4.61 0 0-.128 3.714 8.069 3.458 0 0 5.764-.45 7.494-2.88h1.52c1.73 2.432 7.494 2.88 7.494 2.88 8.193.256 8.068-3.457 8.068-3.457.318-3.33-3.458-4.611-3.458-4.611 2.11-2.82 3.264-5.955 3.264-5.955 5.122 8.259 4.611-1.154 4.611-1.154-.96-5.57-4.995-9.221-4.995-9.221.576-5.058-1.537-5.955-1.537-5.955C37.742.844 24.26 1.12 23.978 1.126 23.694 1.12 10.21.846 9.767 16.495c0 0-2.113.897-1.537 5.955 0 0-4.034 3.65-4.995 9.221.005 0-.51 9.413 4.615 1.154Z"
                                    stroke="none"></path>
                            </svg>
                            <span>2211942823</span>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="item">
                            <svg data-v-23ac1662="" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                class="arco-icon arco-icon-wechat" stroke-width="4" stroke-linecap="butt"
                                stroke-linejoin="miter">
                                <path
                                    d="M32.09 16.362a14.39 14.39 0 0 0-6.927 1.716 13.087 13.087 0 0 0-5.008 4.676 11.936 11.936 0 0 0-1.856 6.473c.01 1.137.185 2.273.517 3.36h-1.505a26.653 26.653 0 0 1-4.766-.593l-.925-.166-5.665 2.93 1.55-4.848C3.179 26.783 1.018 23.077 1 18.792a11.951 11.951 0 0 1 2.188-6.927 14.943 14.943 0 0 1 5.938-5.027 18.579 18.579 0 0 1 8.248-1.837A18.82 18.82 0 0 1 24.8 6.506a16.863 16.863 0 0 1 5.893 4.128 11.963 11.963 0 0 1 2.992 5.817 17.922 17.922 0 0 0-1.595-.09Zm-20.152-.414a2.167 2.167 0 0 0 1.505-.471c.405-.378.62-.908.593-1.46a1.881 1.881 0 0 0-.592-1.46 2.025 2.025 0 0 0-1.506-.535 2.778 2.778 0 0 0-1.67.535c-.454.323-.728.849-.728 1.401a1.708 1.708 0 0 0 .727 1.523 2.925 2.925 0 0 0 1.671.467ZM47 28.99a9.573 9.573 0 0 1-1.59 5.193c-1.128 1.6-2.52 3-4.129 4.128l1.258 4.129-4.51-2.413h-.243a20.758 20.758 0 0 1-4.6.76 15.538 15.538 0 0 1-7.03-1.59 13.089 13.089 0 0 1-5.008-4.313 10.501 10.501 0 0 1-1.838-5.939 10.29 10.29 0 0 1 1.838-5.92c1.266-1.847 3-3.334 5.008-4.313a15.579 15.579 0 0 1 7.03-1.59 14.919 14.919 0 0 1 6.761 1.59 13.286 13.286 0 0 1 5.09 4.312 10.004 10.004 0 0 1 1.94 5.966H47ZM23.407 11.955a2.77 2.77 0 0 0-1.747.534 1.65 1.65 0 0 0-.76 1.46c-.017.584.27 1.146.76 1.46.498.36 1.1.544 1.716.535a2.083 2.083 0 0 0 1.505-.472c.368-.404.561-.925.534-1.46a1.834 1.834 0 0 0-.534-1.532 1.887 1.887 0 0 0-1.532-.534h.063v.009h-.005Zm5.256 15.03a2.016 2.016 0 0 0 1.46-.498c.332-.288.525-.7.534-1.137a1.612 1.612 0 0 0-.534-1.136 2.062 2.062 0 0 0-1.46-.499 1.58 1.58 0 0 0-1.092.499c-.305.296-.49.71-.498 1.136.009.427.184.84.498 1.137.288.305.679.48 1.092.499Zm8.953 0a2.016 2.016 0 0 0 1.46-.498c.332-.288.525-.7.534-1.137a1.558 1.558 0 0 0-.593-1.136 2.12 2.12 0 0 0-1.401-.499 1.493 1.493 0 0 0-1.092.499c-.305.296-.49.71-.498 1.136.009.427.184.84.498 1.137.279.305.674.49 1.092.499Z"
                                    stroke="none"></path>
                            </svg>
                            <span>li13702407250</span>
                        </div>
                    </div>
                </div>
                <hr style="margin-bottom: 30px;">
                <div class="jump">
                    <a-button type="dashed" status="success" @click="handleBackTop">返回顶点</a-button>
                    <a-button type="dashed" status="success" @click="handleSkills">跳转skills</a-button>
                    <a-button type="dashed" status="success" @click="handleProjects">跳转项目</a-button>
                    <a-button type="dashed" status="success" @click="handleTools">跳转工具</a-button>
                </div>
            </card>
        </a-affix>
        <div class="main">
            <div class="present">
                <div class="left">
                    <span class="welcome">HI MY NEW FRIEND!</span>
                    <div class="welcome">
                        <div class="avatar">
                            <a-avatar :image-url="data.info.avatarUrl" :size="130" />
                        </div>
                        <div>
                            <span class="title">HELLO</span>
                            <span class="title">I'M ZinWaa</span>
                        </div>
                    </div>
                </div>
                <ghost :size="50" style="margin-right: 30px;" />
            </div>
            <span class="title" ref="skill"><icon-code />Skills</span>
            <card :width="1000">
                <div class="skill">
                    <block :skills="data.skills" class="skillCards" />
                </div>
            </card>
            <span class="title" ref="project"><icon-layers />Projects</span>
            <div class="projects">
                <div v-for="item in data.projects">
                    <card :width="490" style="height: 100%">
                        <div class="project">
                            <div class="top">
                                <div class="projectImg">
                                    <a-avatar :image-url="item.img" v-if="item.img" :size="80" />
                                    <a-avatar v-else :size="80" :style="{ backgroundColor: '#14a9f8' }">{{ item.name
                                        }}</a-avatar>
                                </div>
                                <div class="projectName">
                                    <span>{{ item.name }}</span>
                                </div>
                            </div>
                            <div class="projectDescription">
                                <span>项目简介：</span>
                                <span>{{ item.description }}</span>
                            </div>
                            <div class="projectLink">
                                <a-link icon :hoverable="false" @click="">体验一下</a-link>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
            <span class="title" ref="tool"><icon-tool />Tools</span>
            <div class="tools">
                <card :width="490" style="height: 100%">
                    <div class="tool" v-for="item in data.tools">
                        <div class="toolName">
                            <span>{{ item.name }} :</span>
                        </div>
                        <div class="toolDescription">
                            <span>{{ item.description }}</span>
                        </div>
                        <div class="toolLink">
                            <a-link href="link" icon :hoverable="false">体验一下</a-link>
                        </div>
                    </div>
                </card>
            </div>
            <div class="footer" style="height: 100px;">
            </div>
        </div>


    </div>
</template>


<script setup lang='ts'>
import background from '@/components/background.vue'
import card from '@/components/card.vue'
import newhr from '@/components/newhr.vue'
import { reactive, ref } from 'vue'
import ghost from '@/components/ghost.vue'
import block from '@/components/block.vue'


const container = ref<HTMLElement | null>(null)
const skill = ref<HTMLElement | null>(null)
const tool = ref<HTMLElement | null>(null)
const project = ref<HTMLElement | null>(null)
const data = reactive({
    info: {
        avatarUrl: '/src/assets/img/avatar.png'
    },
    skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Vue3',
        'Less',
        'Sass',
        'TypeScript',
        'Element-UI',
        'ArcoDesign',
        'Vite',
    ],
    projects: [
        {
            name: '项目1',
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'https://www.baidu.com'
        },
        {
            name: '项目2',
            description: '项目2描述',
            img: '/src/assets/img/project2.png',
            link: 'https://www.baidu.com'
        },
        {
            name: '项目3',
            description: '项目2描述',
            img: '/src/assets/img/project2.png',
            link: 'https://www.baidu.com'
        },
        {
            name: '项目1',
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'https://www.baidu.com'
        },
    ],
    tools: [
        {
            name: '项目1',
            description: '项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述项目1描述',
            link: 'https://www.baidu.com'
        },
    ]
})

// -----------------------------------跳转-------------------------------------
const handleBackTop = () => {
    container.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
const handleSkills = () => {
    skill.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
const handleProjects = () => {
    project.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
const handleTools = () => {
    tool.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}
</script>


<style scoped lang="less">
.containers {

    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    margin: 35px min(calc(100vw - 1330px), 0);
    width: 100%;

    &>div {
        position: absolute;
        z-index: 5;
    }

    .zinwaaInfo {
        position: fixed;
        margin-right: 1030px;

        .info {
            display: flex;
            padding-top: 41px;
            justify-content: center;
            gap: 30px;

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
            gap: 20px;
            padding-bottom: 30px;

            .contact-item {
                padding: 5px;
                border-radius: 6px;
                background-color: #c9d5e0;
                box-shadow: 3px 3px 3px -1px rgba(162, 0, 255, .15),
                    inset 1.2px 1.2px 1px rgba(255, 255, 255, .5),
                    -1.5px -1.5px 3.5px rgba(255, 255, 255, .4),
                    inset -.1px -.1px 1px rgba(162, 0, 255, .2);
                transition: all 0.3s;

                .item {
                    align-items: center;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    color: #c9d5e0;

                    span {
                        display: none;
                    }

                    svg {
                        width: 30px;
                        height: 30px;
                        transition: all 0.3s;

                        path {
                            fill: rgb(94, 105, 255);
                        }
                    }
                }

                &:hover {
                    transform: scale(2);

                    svg {
                        width: 40px;
                        height: 40px;
                        transform: translateY(-15px);
                    }

                    a,
                    span {
                        color: #004b0a;
                    }

                    span {
                        display: inline;
                        height: 0px;
                        font-size: 10px;
                        transform: translateY(-14px);
                    }
                }
            }
        }

        .jump {
            display: flex;
            margin: 0 38px;
            flex-direction: row;
            flex-wrap: wrap;
            row-gap: 10px;
            justify-content: center;
            justify-content: space-evenly;
            padding-bottom: 30px;
        }
    }

    .main {
        transition: all .5s;
        margin-left: 330px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 1000px;


        .present {
            display: flex;
            justify-content: space-between;

            .left {
                display: flex;
                flex-direction: column;
                gap: 20px;

                .welcome {
                    display: flex;
                    flex-direction: row;
                    gap: 20px;

                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;

                        .title {
                            margin-left: 10px;
                            font-size: 30px;
                            font-family: 'Calibri';
                            font-weight: 600;
                            letter-spacing: 2px;
                        }
                    }
                }


            }
        }

        &>.title {
            font-size: 28px;
            font-weight: 400;
            letter-spacing: 2px;
            padding-left: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
            text-shadow: #91caff 3px 4px 4px;
            margin-top: 50px;
        }

        .skill {
            .skillCards {
                padding: 10px 40px;
                margin: 30px 0;
            }
        }

        .projects,
        .tools {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 20px;

            .project,
            .tool {
                padding: 20px;
                display: flex;
                flex-direction: column;
                height: 100%;
                justify-content: space-between;

                .top {
                    display: flex;
                    gap: 20px;
                    align-items: flex-end;
                    margin: 0 0 10px 20px;


                }

                .projectName,
                .toolName {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                .projectDescription,
                .toolDescription {
                    line-height: 18px;
                    font-size: 14px;
                    letter-spacing: 1px;
                }

                .projectLink,
                .toolLink {
                    display: flex;
                    align-self: flex-end;
                }
            }
        }
    }
}
</style>