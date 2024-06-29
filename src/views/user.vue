<template>
    <h1>user</h1>
    <div>编号：123</div>
    <div>姓名：张三</div>
    <div>性别：男</div>
    <div>年龄：45</div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = ref(route.params.id);

watchEffect(() => {
  // 请求用户数据
  // fetch(`/user/${userId.value}`).then;
});
</script>