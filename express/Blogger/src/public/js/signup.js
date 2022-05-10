const name = document.querySelector('#name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const send = document.querySelector('#send')


const callApiSignup = async () => {
    try{
        const sendData = await axios({
            method : 'post',
            url : '/api/v1/users/signup',
            data : {
                name : name.value,
                email : email.value,
                password : password.value,
                confirmPassword : confirmPassword.value
            }
        })
        console.log(sendData.data.token)
        if(sendData.data.status ==='success'){
            window.location.href =  '/';
        }
    }catch(err) {
        alert(err.response.data.message)
        console.log(err.response)
    }
}  

send.addEventListener('click', (e) => {
    callApiSignup()
})