import {reactive, ref} from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',()=>{
    // let userName=ref('XXXX');
    let userList=reactive([
        {
            id:220812022,
            userName:'刘淑文',
            age:18
        },
        {
            id:220812021,
            userName:'蔡欣怡',
            age:18
        },
        {
            id:220812020,
            userName:'龙依',
            age:18
        },
    ])

    // const setUserName=(newName)=>{
    //     userName.value=newName;
    // };

    const setUserList=(newList)=>{
        userList=newList;
    };
    return{
        //userName,
        userList,
        //setUserName,
        setUserList
    };
});