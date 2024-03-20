<template>
    <div class="menu-demo" ref="menuDom">
        <a-menu mode="horizontal" :default-selected-keys="defaultSelectedKeys">
            <a-menu-item key="0" disabled style="color: #000000;padding: 0;margin-right: 38px;">
                <div class="title">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path d="m11.4 2 H30 L28 8 L11 24 H22.6 L20.6 30 H2 L4 24 L21 8 H9 z" stroke="rgb(36, 156, 255)"
                            fill="none" />
                    </svg>
                    <span>inWaa 的个人主页</span>
                </div>
            </a-menu-item>
            <a-menu-item v-for="route in routes" :key="route.name" @click="$router.push(route.path)">{{
            route.meta.title
        }}</a-menu-item>
        </a-menu>
    </div>
    <div class="PageBody">
        <router-view />
    </div>

</template>
<script lang="ts">
import _ from 'lodash'
import { defineComponent, onMounted, ref } from 'vue'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'

interface MenuItem {
    path: string
    name: string
    meta: {
        title: string
    }
}
export default defineComponent({
    name: 'App',
    components: {},
    data() {
        return {
            defaultSelectedKeys: [] as RouteRecordName[],
            routes: [] as MenuItem[]
        }
    },
    created() {
        this.routes = this.getMenuRoutes(_.find(this.$router.options.routes, (item: any) => item.path == '/dashboard')!.children || [])
        this.defaultSelectedKeys = [this.$route.matched[1]?.name as RouteRecordName]
    },
    methods: {
        getMenuRoutes(routes: Readonly<RouteRecordRaw[]>): MenuItem[] {
            return routes
                .filter((route) => route.meta && route.meta.headMenu !== false)
                .map((route) => ({
                    path: route.path,
                    name: route.name,
                    meta: route.meta as {
                        title: string
                    }
                })) as MenuItem[]
        },
    }
})
</script>
<style scoped lang="less">
.menu-demo {
    z-index: 100;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid var(--color-fill-3);
}

.PageBody {
    height: 100%;
    background-color: var(--color-neutral-2);
    min-height: 100vh;
    height: auto;
    padding-top: 58px;
    position: relative;
    z-index: -10;
}

.title {
    height: 30px;
    cursor: pointer;
    display: flex;
    transform: translateY(-2px);

    &>span {
        height: 100%;
        font-size: 16px;
        transform: translate(3px, 7px);
        color: rgba(0, 0, 0, 0.8);
        font-weight: 600;
    }

    @keyframes icon {
        to {
            stroke-dashoffset: 0;
            fill: rgb(36, 156, 255);
        }
    }

    .icon>path {
        stroke-dasharray: 650;
        stroke-dashoffset: 650;
        stroke: rgb(36, 156, 255);
        fill: white;
        animation: icon 3s forwards linear;
    }
}
</style>