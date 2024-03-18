<template>
    <background>
        <div>
            <div>
                <card :width="300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus at perspiciatis saepe dicta
                    ut labore deleniti exercitationem quasi odio molestias voluptatibus natus a aut voluptatem fugit
                    debitis asperiores, vitae officia.

                </card>
            </div>
            123123
        </div>
    </background>

</template>


<script setup lang='ts'>
import background from '@/components/background.vue'
import card from '@/components/card.vue'
function handleIconUpdate() {
    console.log('具名插槽"icon"的内容已更新');
    // 在这里执行你的逻辑
}
</script>


<style scoped></style>