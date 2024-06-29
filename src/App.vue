<script setup>
import { ref, watch } from 'vue';
// import list from '@/components/list';
// import Computed from './components/computeds.vue';
// import baseVue from './components/base.vue';
// import HelloWorld from './components/HelloWorld.vue';
// import formModel from './components/formModel.vue';
// import life from './components/life.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useMouse } from "@/utils/hooks";

const userStore = useUserStore();
// 此时userStore 并不是响应式数据 需要变成响应式的
const { name } = storeToRefs(userStore);
// 方法不需要是响应式的 storeToRefs 不会去处理方法 需要去userStore结构
const { updateName } = userStore;

const type = ref('base');
const message = ref('你好👋');

const {x, y} = useMouse();
watch(type, (newType) => {
  console.log(`type is ${newType}`)
}, {immediate: true})
const userPath = ref('/user/456');

function warn(message, event) {
  console.log('event', event);
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>

<template>
  <!-- <button :class="{ active: type === 'base' }" @click="type = 'base'">base</button>
  <button :class="{ active: type === 'computed' }" @click="type = 'computed'">computed</button>
  <button :class="{ active: type === 'list' }" @click="type = 'list'">list</button>
  <button :class="{ active: type === 'hello' }" @click="type = 'hello'">hello</button>
  <button :class="{ active: type === 'form' }" @click="type = 'form'">form</button>
  <button :class="{ active: type === 'life' }" @click="type = 'life'">life</button> -->

  <!-- <div class="border pd-20">
    <baseVue v-if="type === 'base'" />
    <Computed v-if="type === 'computed'" />
    <list v-if="type === 'list'" />
    <HelloWorld v-if="type === 'hello'" msg="Hello Vue 3 + Vite" :message="message" />
    <formModel v-if="type === 'form'" />
    <life v-if="type === 'life'" />
  </div> -->
  <!-- 
  <button @click="message = '同学们好'">切换 message</button>
  <button @click="event => warn('event事件', event)">获取事件</button> -->

  <!-- <button :class="{ active: type === 'base' }" @click="type = 'base'">
    <RouterLink to="/base">base</RouterLink>
  </button>
  <button :class="{ active: type === 'computed' }" @click="type = 'computed'">
    <RouterLink to="/computed">computed</RouterLink>
  </button>
  <button :class="{ active: type === 'list' }" @click="type = 'list'">
    <RouterLink to="/list">list</RouterLink>
  </button>
  <button :class="{ active: type === 'hello' }" @click="type = 'hello'">
    <router-link to="/hello">hello</router-link>
  </button>
  <button :class="{ active: type === 'form' }" @click="type = 'form'">
    <router-link to="/form">form</router-link>
  </button>
  <button :class="{ active: type === 'life' }" @click="type = 'life'">
    <router-link to="/life">life</router-link>
  </button>
  <button :class="{ active: type === 'user' }" @click="type = 'user'">
    <router-link :to="userPath">user</router-link>
  </button> -->

  <!-- <div class="h-12 md:ml-10 md:pr-4 md:space-x-8 flex justify-center"> -->
    <div class="nav-wrapper">
      <div
        class="mr-10"
        :class="{active: type === item}"
        v-for="(item, index) in ['base', 'computed', 'list', 'hello', 'form', 'life', 'user', 'fa']"
        :key="`nav_${index}`"
        @click="type = item"
      >
        <RouterLink :to="`/${item}`">{{item}}</RouterLink>
      </div>
    </div>
  <!-- </div> -->

  <main>
    <router-view />
  </main>
</template>

<style scoped>
.active {
  color: #ff99cc;
}

.border-black {
  border: #000001 solid px;
}

.pd-20 {
  padding: 20px;
}

.mr-10 {
  display: inline-block;
  margin-right: 10px;
}
.nav-wrapper {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
</style>

