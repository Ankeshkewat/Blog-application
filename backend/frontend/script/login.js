

let signUp=document.getElementById('createAcc');
signUp.onclick=()=>{
    createAccout()
}

async function createAccout(){
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let form={email,password};
    let res=await fetch('http://localhost:1000/login',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
            "Content-Type":'application/json',
        }
    })
    let {msg,token,refreshtoken}=await res.json();
    console.log(token,refreshtoken)
    if(token&&refreshtoken){
        document.cookie=`token=${token}`
       document.cookie=`refrestoken=${refreshtoken}`
    }
    alert(msg)
}