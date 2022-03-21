
const login = async (email,password) => {
    const datas = await axios({
        method : 'post',
        url : 'http://127.0.0.1:3000/users/login',
        data : {
            email,
            password
        }
    })
    console.log(datas)
}

document.querySelector('.form').addEventListener('submit', (e)=> {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    login(email,password)
})
