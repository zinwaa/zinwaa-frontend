<template>
    <div class="page">
        <div class="menu">
            <a-menu mode="pop" showCollapseButton :selected-keys="[projectsMenuKey]">
                <a-menu-item v-for="route in routes" :key="route.name" @click="$router.push(route.path)">
                    <template #icon>
                        <component :is="route.meta.icon" :size="18" v-if="route.meta.icon" />
                        <icon-apps v-else />
                    </template>
                    {{ route.name }}
                </a-menu-item>
            </a-menu>
        </div>
        <router-view />
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';

//-----------------------------------------侧边栏路由处理-----------------------------------------
import { useRoute, useRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

interface MenuItem {
    path: string;
    name: string;
    meta: {
        title: string;
        icon?: string | null;
    };
}

// 声明响应式状态
const projectsMenuKey = ref('sqlCreate');
const routes = ref<MenuItem[]>([]);


// 获取菜单路由
function getMenuRoutes(routesList: RouteRecordRaw[]): MenuItem[] {
    const creativeCenterPageChildren = routesList.find((route) => route.name === 'dashboard')?.children?.find((route) => route.name === 'projects')?.children ?? [];

    return creativeCenterPageChildren
        .filter((route) => route.meta && route.meta.asideMenu)
        .map((route) => ({
            path: route.path,
            name: route.name,
            meta: {
                title: route.meta?.title,
                icon: route.meta?.icon ?? null,
            },
        }) as MenuItem);
}

// 获取当前路由实例
const $route = useRoute();
// 获取全局路由器实例
const router = useRouter();

// 生命周期钩子
onMounted(() => {
    routes.value = getMenuRoutes(Array.from(router.options.routes));
    router.push(`/projects/${projectsMenuKey.value}`);
});

// 监听路由变化
watch(
    $route,
    (newRoute) => {
        if (newRoute.path === '/projects') {
            projectsMenuKey.value = 'sqlCreate';
            router.push(`/projects/${projectsMenuKey.value}`);
        } else {
            projectsMenuKey.value = newRoute.path.split('/')[2];
            router.push(`/projects/${projectsMenuKey.value}`);
        }
    },
    { immediate: true }
);

</script>


<style scoped>
.page {
    display: flex;
    margin-right: 40px;
}

.menu {
    width: 100%;
    height: 600px;
    padding: 40px;
    box-sizing: border-box;
    flex: 0;
}

.menu .arco-menu {
    width: 200px;
    height: 100%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu .arco-menu :deep(.arco-menu-collapse-button) {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.menu .arco-menu:not(.arco-menu-collapsed) :deep(.arco-menu-collapse-button) {
    right: 0;
    bottom: 8px;
    transform: translateX(50%);
}

.menu .arco-menu:not(.arco-menu-collapsed)::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background-color: inherit;
    border-radius: 50%;
    box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
    transform: translateX(50%);
}

.menu .arco-menu.arco-menu-collapsed {
    width: 48px;
    height: auto;
    padding-top: 24px;
    padding-bottom: 138px;
    border-radius: 22px;
}

.menu .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
    right: 8px;
    bottom: 8px;
}
</style>