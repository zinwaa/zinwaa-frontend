<template>
  <div class="main">
    <welcomeVue />
    <Menu />
  </div>
</template>


<script setup lang='ts'>
import welcomeVue from './components/welcome.vue';
import Menu from './components/menu.vue';
import { ref } from 'vue';
const backgroundAngle = ref('270deg')
addEventListener('mousemove', (e) => {
  const xCenter = window.innerWidth / 2;
  const yCenter = window.innerHeight / 2;
  const x = e.clientX - xCenter;
  const y = e.clientY - yCenter;
  const angle = Math.atan2(y, x) * 180 / Math.PI;
  backgroundAngle.value = Math.round(angle) + 90 + 'deg';
});
</script>


<style scoped lang='scss'>
.main {
  height: 100%;
  width: 100vw;
  position: fixed;
  background: #005AA7;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(calc(v-bind(backgroundAngle)), #00B4DB, #005AA7);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(calc(v-bind(backgroundAngle)), #00B4DB, #005AA7, #002f58);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>