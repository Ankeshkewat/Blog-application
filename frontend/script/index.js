// app.js

const postsContainer = document.getElementById("posts");

// const posts = [
//   {
//     title: "My First Blog Post",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     title: "My Second Blog Post",
//     content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     title: "My Third Blog Post",
//     content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
// ];

window.onload=()=>{
  get()
}


async function get(){
   let res=await fetch('http://localhost:1000/get/all',{
       method:"GET",
       headers:{
           'Content-Type':'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`
       }
   })
   let data=await res.json();
   data.forEach((el)=>{
       let div=document.createElement('div');
       div.className='blog_card'
       let h2=document.createElement('h2');
       h2.innerText=el.title;
       let p=document.createElement('p');
       p.innerText=el.content

       let commentBox=document.createElement('div');
       commentBox.className='commentBox'

       let inputBox=document.createElement('input');
       inputBox.placeholder='Write comment'
       inputBox.className='inputBox';

       let postBtn=document.createElement('button');
       postBtn.innerText="post"

       div.append(h2,p,commentBox,inputBox,postBtn)
       document.getElementById('posts').append(div)

       
   })
}