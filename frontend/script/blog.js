let button = document.getElementById('post');
    button.onclick = () => {
        post()
    }
    async function post() {
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;
        let form = { title, content };

        let res = await fetch('http://localhost:1000/blog', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        let { msg } = await res.json();
        alert(msg)
    }

    window.onload=()=>{
       get()
    }


    async function get(){
        let res=await fetch('http://localhost:1000/get',{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        let {blog}=await res.json();
        blog.forEach((el)=>{
            let div=document.createElement('div');
            div.className='blog_card'
            let h2=document.createElement('h2');
            h2.innerText=el.title;
            let p=document.createElement('p');
            p.innerText=el.content
            div.append(h2,p)
            document.getElementById('blog_div').append(div)

            
        })
    }