<template>
    <div class="loadingBox">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>


<script setup lang='ts'>

</script>


<style scoped lang="scss">
$color: #000000;
$number: 3;
$alpha: 1/$number;
$delay: -0.9s;


.loadingBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: loading 1s infinite;

        @for $i from 1 through $number {
            &:nth-child(#{$i}) {
                animation-delay: calc($delay * #{$i - 1});
                background-color: rgba($color, calc($alpha * #{$i}));
            }
        }
    }


}

@keyframes loading {

    0%,
    100% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }
}
</style>