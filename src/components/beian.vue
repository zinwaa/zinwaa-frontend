<template>
    <div class="footer">
        <div>
            <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2024222385号</a>
        </div>
    </div>
</template>


<script setup lang='ts'>

</script>


<style scoped lang="less">
.footer {
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    height: 100px;

    div {
        flex: 1;
        text-align: center;

        a {
            color: #0b65af;
            text-decoration: none;
            font-size: 14px;
        }
    }
}
</style>