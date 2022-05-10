const containerBlog = document.querySelector('#container-blog')


const callApiPosts = async () => {
    try{
        let datas
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/posts'
        })
        datas = data.data.data
        // console.log(data.data.data)
        let html = ``
        datas.forEach(el => {
            html += `
                <div class="card">
                    <div class="card-body">
                        <img src="/images/posts/${el.photo}" alt="">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `
       })
       containerBlog.innerHTML = html
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

callApiPosts()

