import { reactive } from 'vue';
<template>
  <div id="content" ref="content">{{ context }}</div>
  <button @click="context = 'Hello World'">change</button>
  <div>{{ state.name }}- {{ state.age }} - {{ state.sex }}</div>
  <button @click="state.name = '李雷'">切换名字</button>
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  watch,
  reactive,
  watchEffect
} from 'vue';

const context = ref('Hello Vue 3');
const x = ref(0);
const y = ref(0);

const content = ref(null);
console.log('content', content);

const state = reactive({
  name: '王钢蛋',
  age: 16,
  sex: '男'
});

const state2 = { ...state };

watch(context, (newValue, oldValue) => {
  console.log('watch:', newValue, oldValue);
});

watch([x, y], ([newX, newY], [oldX, oldY]) => {
  console.log('watch:', newX, newY, oldX, oldY);
});

watch(
  state,
  (newValue, oldValue) => {
    console.log('watch:', newValue, state2);
  },
  { deep: true } // 确保能正确监听到 里面所有变化
);

// 内部的状态 只要发生改变 回调函数就会被执行
// 页面初次加载完毕 会被执行一次
watchEffect(() => {
  console.log('watchEffect:', state.name);
});

onBeforeMount(() => {
  console.log('1.组件即将挂载，此时组件的模板已经被编译，但是还没有挂载到 DOM 上。');
  const content = document.getElementById('content');
  console.log(content); // 输出：null
});

onMounted(() => {
  console.log('2.组件已经挂载，此时可以执行 DOM 相关的操作，比如直接访问 DOM 元素。');
  const content = document.getElementById('content');
  console.log(content); // 输出：null
});

onBeforeUpdate(() => {
  console.log('3.组件即将更新，此时组件的状态已经更新，但是 DOM 还未重新渲染。');
});

onUpdated(() => {
  console.log('4.组件已经更新，此时 DOM 已经更新，可以执行依赖于更新后 DOM 的操作。');
});

onBeforeUnmount(() => {
  console.log('5.组件即将卸载，此时组件实例仍然存在。');
  const content = document.getElementById('content');
  console.log(content); // 输出：null
});

onUnmounted(() => {
  console.log('6.组件已经卸载，此时组件实例已经被销毁。');
});

// 请求用户列表
// fetch('/api/user/list')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
</script>
