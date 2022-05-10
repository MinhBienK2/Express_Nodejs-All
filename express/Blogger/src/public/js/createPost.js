const selectCategory = document.querySelector('#selectCategory')
const create = document.querySelector('#create')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const photo = document.querySelector('#photo')

// Category
const callApiCategory = async () => {
    try{
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/categories'
        })
        let html = ``
        data.data.data.forEach(el => {
            html += `
                <option class="optionCategory" value=${el._id}>${el.name}</option>
            `
       })
    selectCategory.innerHTML = html
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}
callApiCategory()

const handleEvent = () => {
    const callApiCreatePost = async () => {
        try{
            let datas;
            const {data} = await axios({
                method : 'post',
                url : `/api/v1/posts/${selectCategory.value}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data : {
                    title : title.value,
                    description : description.value,
                    photo : photo.files[0]
                }
            })
            if(data.status ==='success'){
                window.location.href =  '/profile/6278cd69ff467bfe9d5e1c95';
            }
        }catch(err) {
            alert(err.response.data.message)
            console.log(err.response)
        }
    }  

    create.addEventListener('click',(e) => {
        callApiCreatePost()
    })
}

handleEvent()