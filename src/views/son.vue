<template>
    <h1>我是子页面 我姓{{ $route.query.firstName }}</h1>
    <button @click="router.go(-1)">返回</button>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  // 返回上个页面
  // router.go(-1);
  
  console.log(route.query);
  </script>