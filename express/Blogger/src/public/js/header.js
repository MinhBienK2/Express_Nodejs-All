const menu = document.querySelector('#menu')

const callApiCategory = async () => {
    try{
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/categories'
        })

        // console.log(data.data.data)
        let html = ``
        data.data.data.forEach(el => {
            html += `
                <li class="nav-item" data-category-id=${el._id}>
                    <a class="nav-link " aria-current="page" href="${el.name}" data-category-id=${el._id}>${el.name}</a>
                </li>
            `
       })

       const handleClickMenu = () => {
            const menulLi = document.querySelectorAll('.nav-item')
            menulLi.forEach(el => {
                el.addEventListener('click',() => {
                    console.log(el.dataset.categoryId)            
                })
                
            })

       }

       menu.innerHTML = html
       handleClickMenu()
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

const callApiPost = async () => {
    try{
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/posts',
        })
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}  


callApiCategory()