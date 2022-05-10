console.log(window.location.search)
const containerSearch = document.querySelector('#container-search')

const searchTitle =async () => {
    try{
        let datas
        const {data} = await axios({
            method : 'get',
            url : `/api/v1/posts${window.location.search}`
        })
        datas = data.data.data
        console.log(datas)
        let html = ``
        datas.forEach(el => {
            html += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.description}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
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
        containerSearch.innerHTML = html
        handleClickMenu()
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

searchTitle()