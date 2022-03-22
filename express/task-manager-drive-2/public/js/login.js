
const login = async (email,password) => {
    try{
        const data = await axios({
            method : 'POST',
            url : 'http://127.0.0.1:3000/users/login',
            data : {
                email,
                password
            }
        })
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

document.querySelector('.form').addEventListener('submit', (e)=> {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    console.log(email, password)
    login(email,password)
})
