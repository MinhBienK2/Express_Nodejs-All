import '@babel/polyfill'  // hỗ trợ trình duyệt cũ
import axios from 'axios'
import {login} from './login'
import {mapBox} from './mapBox'
import {logout} from './login'

const forms = document.querySelector('.form')
const displayMap = document.querySelector('#map')
const logoutBtn = document.querySelector('#logout')

if(displayMap){
    const locationMapBox = JSON.parse(displayMap.dataset.locations)
    mapBox()
}

if(forms)
    forms.addEventListener('submit', (e)=> {
        e.preventDefault()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        console.log(email, password)
        login(email,password)
    })

if(logoutBtn){
    logoutBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        logout()
    })
}