

let signUp=document.getElementById('createAcc');
signUp.onclick=()=>{
    createAccout()
}

async function createAccout(){
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let form={email,password};
    let res=await fetch('http://localhost:1000/signup',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
            "Content-Type":'application/json'
        }
    })
    let data=await res.json();
    console.log(data)
    alert(data.msg)
}

let googleButton=document.getElementById('google')
googleButton.onclick=()=>{
    signupBygoogle()
}
async function signupBygoogle(){
    
     window.open('http://localhost:1000/auth/google');
   
}