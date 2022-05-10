const containerBlog = document.querySelector('#container-blog')
const updateProfile = document.querySelector('#updateProfile')
const CreatePost = document.querySelector('#CreatePost')


const callApiPosts = async () => {
    const paramArray = window.location.href.split('/').slice(-1)[0]
    try{
        let datas
        const {data} = await axios({
            method : 'get',
            url : `/api/v1/posts/me/${paramArray}`
        })
        datas = data.data
        // console.log(data.data)
        let html = ``
        datas.forEach(el => {
            html += `
                <div class="card">
                    <div class="card-body">
                        <img src="/images/posts/${el.photo}" alt="">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.description}</p>
                        <p>${el.createdAt}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `
       })
       if(html.length === 0){
        containerBlog.innerHTML = `
            <br>
            <h3>not exists Posts</h3>
        `
       }else{
        containerBlog.innerHTML = html
       }
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

callApiPosts()

CreatePost.addEventListener('click',(e) => {
    window.location.href =  '/create-post'
})
