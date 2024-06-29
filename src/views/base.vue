<template>
  <h1 :class="'text-' + age" class="font-size-20">
    {{ name }} - {{ age === 16 ? '少年' : '成年人' }} - {{ sex(0) }}
  </h1>

  <h1 v-bind="obj">{{ name }} - {{ age === 16 ? '少年' : '成年人' }} - {{ sex(0) }}</h1>

  <h1 v-if="hasBro">有弟弟：王钢蛋</h1>
  <h2 v-if="hasBro">{{ state.name }} - {{ state.age }} - {{ state.sex }}</h2>
  <h1 v-else>没有弟弟</h1>
  <button @click="isBro">疑问？</button>
  <button @click="change">切换</button>

  <h1 :class="[isActive ? 'active' : '']">李四</h1>
  <button @click="isActive = !isActive">选中李四</button>

  <h1 :style="{ color: fontColor }">李四</h1>
  <div v-if="type === 1">1</div>
  <div v-else-if="type === 2">2</div>
  <div v-else-if="type === 3">3</div>
  <div v-else>4</div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const name = ref('铁锤妹妹🔨');
const age = ref(18);
function sex(sex) {
  return sex === 1 ? '男' : '女';
}

const obj = {
  class: 'text-16',
  id: 'font-size-24'
};

let hasBro = ref(false);
console.log(hasBro);

function isBro() {
  alert('到底有没有？');
  console.log(age);
}

const state = reactive({
  name: '王钢蛋',
  age: 16,
  sex: '男'
});

const change = () => {
  hasBro.value = !hasBro.value;
  console.log(hasBro);
  state.age = 17;
  console.log(state);
};

console.log(state);
const isActive = ref(true);

const fontColor = ref('red');

const type = ref(5);
</script>

<style scoped>
.text-16 {
  color: red;
}

.text-18 {
  color: blue;
}

.font-size-20 {
  font-size: 20px;
}

#font-size-24 {
  font-size: 24px;
}

.active {
  color: green;
}

.text-gray {
  color: gray;
}
</style>
