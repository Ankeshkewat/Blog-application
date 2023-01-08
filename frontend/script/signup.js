

let signUp=document.getElementById('createAcc');
signUp.onclick=()=>{
    createAccout()
}
let otp;
async function createAccout(){
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let role=document.getElementById('role').value
    let form={email,password,role};
    let res=await fetch('http://localhost:1000/signup',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
            "Content-Type":'application/json'
        }
    })
    let data=await res.json();
    console.log(data)
    
    if(data.msg=='Otp Sent Successfully'){
        alert(data.msg)
        // document.cookie=`token=${data.token}`
        // document.cookie=`refrestoken=${data.refreshtoken}`
        // localStorage.setItem('token',data.token)
        localStorage.setItem('email',data.email)
        window.location.href='otp.html'
       
    }else{
        alert(data.msg)
    }
}

let googleButton=document.getElementById('google')
googleButton.onclick=()=>{
    signupBygoogle()
}
async function signupBygoogle(){
    
     window.open('http://localhost:1000/auth/google');
   
}