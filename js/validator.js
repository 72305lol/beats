const form = document.querySelector('#order_form')
const phone = document.querySelector('#phone')
const sendBtn = document.querySelector('#send-button')

phone.addEventListener('keydown', (e) =>{
    try {
    let isDigit = false
    let isPlus = false
    let isDash = false
    let isAction = false

    if(e.key >= 0 || e.key <= 9){
        isDigit = true
    }
    if (e.key =='+'){
        isPlus = true
    }
    if (e.key =='-'){
        isDash = true
    }
    if (
    e.key =='ArrowRight' ||
    e.key =='ArrowLeft'  ||
    e.key == 'Backspace'
    ) {
        isAction = true
    }

    if(!isDigit && !isPlus &&!isDash  && !isAction){
      //  e.preventDefault()
      throw new Error('Можно вводить только цифры, =, -')
    }
        e.target.nextElementSibling.textContent = ''
        e.target.classList.remove('form__input-error')
    } catch (error){
        e.target.nextElementSibling.textContent = error.message
        e.target.classList.add('form__input-error')
        e.preventDefault()
    }
})

sendBtn.addEventListener('click', (e) =>{
    e.preventDefault()

    if(isFormValid(form)){
        console.log('отправляем на сервер')

        const data = {
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            comment: form.elements.comment.value,
            to: form.elements.to.value,
        };

        console.log(data);

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load',() =>{
            console.log(xhr.response);
        })
        
    } else (
        console.log('не отправляем, т.к. фрма не валидна')
    )
})

function isFormValid(form){
    let isValid = true

    if(!validation(form.elements.name)){
        isValid = false
    }
    if(!validation(form.elements.phone)){
        isValid = false
    }
    if(!validation(form.elements.comment)){
        isValid = false
    }

    return isValid
}

function validation(element){
    if(!element.checkValidity()){
        element.nextElementSibling.textContent = element.validationMessage
        element.classList.add('form__input-error')
        return false
    } else {
        element.nextElementSibling.textContent = ''
        element.classList.remove('form__input-error')
        return true
    }
}


// const loadButton = document.querySelector('#send-button');
// const result = document.querySelector('result');

// loadButton.addEventListener('click', ()=>{
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.addEventListener('load',()=>{
//         if (xhr.response.status) {
//             console.log('все ок');
//         }
//     });
// })