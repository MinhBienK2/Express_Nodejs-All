const containerBlog = document.querySelector('#container-blog')

const callApiPosts = async () => {
    try{
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/posts'
        })

        console.log(data.data.data)
        let html = ``
    //     data.data.data.forEach(el => {
    //         html += `
    //         `
    //    })
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

callApiPosts()