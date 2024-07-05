document.body.addEventListener("keyup",function(event){
    event.preventDefault()
    let selectElem=document.getElementById(event.key.toLocaleUpperCase())
    if(selectElem){
        if(event.key==='CapsLock'){
            let styleElem=getComputedStyle(selectElem)
            if(styleElem.backgroundColor=='rgb(255, 0, 0)')
                selectElem.style.backgroundColor='rgb(255, 40, 127)'
            else
            selectElem.style.backgroundColor='rgb(255, 0, 0)'
        }
        else{
            textiner(event.key)
        selectElem.classList.add('animation')
        selectElem.addEventListener('animationend',function(){
            selectElem.classList.remove('animation')
        }) }
    }})
let text=document.querySelector('.text')
function textiner(event){
    console.log(event)
    if(event==='Backspace' &&text.innerHTML)
     text.innerHTML=text.innerHTML.slice(0,-1)
    else if(event==='Tab')
        text.innerHTML+=' '
    else if(event.length===1)
        text.innerHTML+=event;
}