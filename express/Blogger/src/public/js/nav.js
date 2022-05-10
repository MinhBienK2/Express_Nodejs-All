const menu = document.querySelector('#menu')
const logout = document.querySelector('#logout')
const buttonSearch = document.querySelector('#button-search')
const inputSearch = document.querySelector('#inputSearch')
const profile = document.querySelector('#profile')
const signup = document.querySelector('#signup')

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
callApiCategory()

//logout
const callApiLogout = async () => {
    try{
        const {data} = await axios({
            method : 'get',
            url : '/api/v1/users/logout',
        })
        // console.log(data)
        if(data){
            // location.reload();
            // location.reload();
            window.location.reload(true);
        }
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}

if(logout){
    logout.addEventListener('click',(e) => {
        callApiLogout()
    })
}

//search
buttonSearch.addEventListener('click',e => {
    // window.location.href = `/search?name=${inputSearch.value}`;
    window.location.href = `/search?title=${inputSearch.value}`;
})

//profile
if(profile){
    profile.addEventListener('click',(e) => {
        window.location.href = `/profile/${profile.dataset.userId}`;
    })
}

if(signup){
    profile.addEventListener('click',(e) => {
        window.location.href = `/signup`;
    })
}


