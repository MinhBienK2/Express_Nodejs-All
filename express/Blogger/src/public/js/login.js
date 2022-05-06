const email = document.querySelector('#email')
const password = document.querySelector('#password')
const submit = document.querySelector('#submit')

const callApiLogin = async () => {
    try{
        const sendData = await axios({
            method : 'post',
            url : '/api/v1/users/login',
            data : {
                email : email.value,
                password : password.value
            }
        })
        console.log(sendData.data)
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}  

submit.addEventListener('click', (e) => {
    callApiLogin()
})