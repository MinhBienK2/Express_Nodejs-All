import axios from 'axios'

export const login = async (email,password) => {
    try{
        const useLogin = await axios({
            method : 'POST',
            url : 'http://127.0.0.1:3000/users/login',
            data : {
                email,
                password
            }
        })
        console.log(useLogin.data)
    }catch(err){
        console.log(err.response)
        console.log(err.toJSON())
        console.log(err.response.data)
    }
}

export const logout = async ()=> {
    try{
        const data = await axios({
            method : 'GET',
            url : 'http://127.0.0.1:3000/users/logout'
        })
        if(data.status ==='success')
            location.reload(true)
    } catch (err){
        console.log(err.response)
    }
}
