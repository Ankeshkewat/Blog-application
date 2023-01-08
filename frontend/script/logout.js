

let logout=document.querySelector('header button');
logout.onclick=()=>{
    logoutfun()
}

async function logoutfun(){
    let allCookie=document.cookie;
    console.log(allCookie)
    let res=await fetch('http://localhost:1000/logout',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    let {msg}=await res.json();
   
    alert(msg)
}