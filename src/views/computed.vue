<script setup>
import { ref, computed } from 'vue';

// 定义响应式数据
let originalPrice = ref(100); // 假设原始价格是100
let discountRate = ref(10); // 假设折扣率是10%

// 使用计算属性来派生最终价格
const finalPrice = computed(() => {
  const discount = originalPrice.value * (discountRate.value / 100);
  return originalPrice.value - discount;
});
</script>
<template>
  <div>
    <h1>商品价格计算器</h1>
    <p>原始价格: {{ originalPrice }}</p>
    <input type="number" v-model="originalPrice" placeholder="输入原始价格" />
    <p>折扣率 (%): {{ discountRate }}</p>
    <input type="number" v-model="discountRate" placeholder="输入折扣率" />
    <p>最终价格: {{ finalPrice }}</p>
  </div>
</template>