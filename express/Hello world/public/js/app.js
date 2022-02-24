console.log('this iss public ')

const formSearch = document.querySelector('form')
const inputSearch = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


formSearch.addEventListener('submit',(event) => {
    event.preventDefault()
    messageOne.textContent = 'loading ...'
    messageTwo.textContent = ''
    const location = inputSearch.value
    // tao heroku
    fetch('/myname?name=' + location).then((reponse) => {
        reponse.json().then((data) =>{
            if(data.error) {
                console.log(data.error)
            }
            messageOne.textContent = `my name is ${data.name}`
            messageTwo.innerHTML = `my age is ${18}`
        })
    })
    // chua tạo  heroku
    // fetch('http://localhost:3000/myname?name=' + location).then((reponse) => {
    //     reponse.json().then((data) =>{
    //         if(data.error) {
    //             console.log(data.error)
    //         }
    //         messageOne.textContent = `my name is ${data.name}`
    //         messageTwo.innerHTML = `my age is ${18}`
    //     })
    // })
})