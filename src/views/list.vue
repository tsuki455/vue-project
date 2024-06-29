<template>
  <div class="list-comp">
    <h1>User List</h1>
    <div class="tool-bar">
      <button class='add-btn' type="primary" @click="addUser">新增</button>
    </div>
    <ul>
      <li>
        <span class="No">序号</span> 
        <span class="study-code">学号</span> 
        <span class="name">姓名</span> 
        <span class="year">年龄</span>
        <div class="operation">操作</div>
      </li>
      <li v-for="(item, index) in userList" :key="item.id">
        <span class="No">{{ index + 1 }}</span>
        <span class="study-code">{{ item.id }}</span> 
        <span class="name">{{ item.userName }}</span> 
        <span class="year">{{ item.age }}</span>
        <div class="operation">
          <button @click="deleteUser(index)">删除</button>
          <button @click="editUser(index)">编辑</button>
          <button @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>

    <div class="pop-blank" v-if="showFlag">
      <h3>{{isEdit?'编辑同学':'新增同学'}}</h3>
      <div class="blank-body">
        <div class="blank-item">
          <span>学号</span>
          <input type="text" v-model="studyNum">
        </div>
        <div class="blank-item">
          <span>姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="blank-item">
          <span>年龄</span>
          <input type="text" v-model="year">
        </div>
      </div>  
      
      

      <div class="footer">
        <button type="primary" @click="showFlag=false">取消</button>
        <button type="primary" @click="submitFn()">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,reactive } from 'vue';
import {storeToRefs} from 'pinia';
import {useUserStore} from '@/store/user';

const userStore=useUserStore();
const {userList} = storeToRefs(userStore);
const {setUserList}=userStore;

let showFlag=ref(false);
let isEdit=ref(false);
let curIdx=ref(0);

let studyNum=ref(0);
let name=ref('');  
let year=ref(0);


const deleteUser = index => {
  userStore.userList.splice(index, 1);
};

const addUser=()=>{
  isEdit.value=false;
  showFlag.value=true;
}
const editUser = index => {
  isEdit.value=true;
  curIdx.value=index;
  const item = userStore.userList[index];
//把拿到的item信息，填入对应输入框
  studyNum.value=item.id;
  name.value=item.userName;
  year.value=item.age;
  showFlag.value=true;
};

const checkList=(code)=>{
  for(let index=0;index<userStore.userList.length;index++){
    const element=userStore.userList[index];
    if(Number(code)===element.id){    //code类型为字符串。id类型为num
      return true;
    }
  }
}

const addNum2name=(name)=>{
  //将姓名后面追加最新编号
  let total=0;

  userStore.userList.map(item=>{
    if(item.userName.indexOf(name)!==-1){
      let tempItem=item;   //备份item
      let tempItemName=tempItem.userName.split('');
      tempItemName.splice(0,name.length);

      let checkItem=isNum(tempItemName.join(''));
      if(tempItemName.length===0||checkItem){
        total++;
      }
    }
  })
  return `${name}${total===0 ? '':total}`;
}
const isNum=(val)=>{
  let exg=/^\d+$/;
  if(!exg.test(val)){
   return false;
}
return true;
}
const submitFn = () => {
  //输入内容校验
  let studyNumCheck=isNum(studyNum.value);
  if(!studyNumCheck){
    alert('学号需要纯数字');
    return;
  }

  let tempName= addNum2name(name.value);
  if (isEdit.value) { // 编辑
    userStore.userList.splice(curIdx.value,1);     //删除。然后放在第一条
    tempName=name.value;
  } 

  let isStudyNumExist=checkList(studyNum.value);
  if(isStudyNumExist){
    alert('学号已存在');
    return;
  }

  // 新增

    userStore.userList.unshift({
      id: studyNum.value,
      userName: tempName,
      age: year.value
    })  //尾部追加
    console.log(userStore.userList);
    showFlag.value = false;
}
const getYourName = id => {
  const student = userStore.userList.find(item => item.id === id);
  alert(student.userName);
};
</script>

<style lang="less" scoped>
  .list-comp{
    text-align: left;
  }    
  h1{
      text-align: center;
    }
 

  .tool-bar{
    display: flex;
    justify-content: flex-end;
    .add-btn{
      margin-right:  24px;
      width: 90px;
    }
  }

  ul{
    padding-left:0 ;
    padding: 0 24px;
    text-align: center;
  }

  .pop-blank{
    position: absolute;
    background-color:white;
    border-radius: 8px;
    left:50%;
    top:50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%,-50%) ;
    padding: 24px;
    border: 1px solid rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    h3{
      text-align: center;
    }
    .blank-body{
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .blank-item{
        font-size: 24px;
        display: flex;
        height: 72px;
        span{
          margin-right: 12px;
          width: 60px;
        }
        input{
          height: 36px;
          width: 100%;
          flex-grow: 1;
          flex-shrink:1 ;
          font-size: 16px;
          /*border: 0;*/
          // border-bottom: 1px solid rgba(0,0,0,0.9);
        }
      }
    }
    
    .footer{
     // position: absolute;  //绝对定位不参与文档流
      //bottom:24px;
      width: 100%;
      //width: calc( 100% - 48px );
      display: flex;
      justify-content: flex-end;
      button{
        background-color:rgba(0,0,0,0.7) ;
        color:aliceblue;
      
      }
      & > button:nth-child(1){
        margin-right: 12px;
        background-color: white;
        border: 2px solid rgba(0,0,0,0.7);
        color:rgba(0,0,0,0.7);
      }
    }
  }

  .add-btn{
    float: right;
    background-color: rgba(31, 29, 29, 0.7);
    color:white;
    
  }
  li{
    text-align: center;
    list-style:none;
    display: flex;
    justify-content: flex-start;
    align-items:center;
    height: 64px;
    border-bottom: 2px solid rgba(0,0,0,0.06);
    &:nth-child(1){
      color: aliceblue;
      background-color: rgba(42,46,54,0.4);
    }
    .No{
      
      width: 18%;
    }
    .study-code{
      width: 18%;
    }
    .name{
      width: 18%;
    }
    .year{
      width:18%;
    }
    .operation{
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      & > button{
        background-color: rgba(31, 29, 29, 0.7);
        color: azure;
        width: 90px;
      }
    }
  }
</style>