import '@babel/polyfill'  // hỗ trợ trình duyệt cũ
import axios from 'axios'
import {login,logout} from './login'
import {mapBox} from './mapBox'
import {bookTour} from './stripe'

const forms = document.querySelector('.form')
const displayMap = document.querySelector('#map')
const logoutBtn = document.querySelector('#logout')
const btnTour = document.querySelectorAll('.btnTour')

if(displayMap){
    const locationMapBox = JSON.parse(displayMap.dataset.locations)
    mapBox()
}

if(forms)
    forms.addEventListener('submit', (e)=> {
        e.preventDefault()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        login(email,password)
    })

if(logoutBtn){
    logoutBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        logout()
    })
}

if(btnTour){
    btnTour.forEach(ele => {
        ele.addEventListener('click', (e)=>{
            e.preventDefault()
            e.target.content = 'Loading ...'
            const tourId = e.target.dataset.tourId
            bookTour(tourId)
        })
    })
}