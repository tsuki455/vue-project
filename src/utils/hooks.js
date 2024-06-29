import {ref,onMounted} from 'vue';
export function useMouse(){
    let x=ref(0);
    let y=ref(0);

    // document.onmousemove=function(e){
    //     e=e?e:window.event;
    //     x=e.screenX;
    //     y=e.creenY;
    // }
    onMounted(()=>window.addEventListener('mousemove',(event)=>{
        x.value=event.pageX;
        y.value=event.pageY;
    }))
    return {x,y};
}
useMouse;