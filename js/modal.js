$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name ='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find("modal__content");

    modal.removeClass("error-modal");

    [name,phone,comment,to].forEach(field=>{
        field.removeClass("input-error");
        if(field.val().trim()==""){
            field.addClass("input-error");
        }
    })
    
    const errorFields = form.find(".input-error");

    if (errorFields.length == 0) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            
        });
        request.done((data) => {
            console.log(data);
            content.text(data.message)
                
        });
        request.fail((data) =>{
                console.log(data);
                const message = data.responseJSON.message;
                content.text(message);
                modal.addClass("error-modal");
            
            });
        request.always(() =>{
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            });
        });
    }

    $(".app-submit-btn").click(e =>{
    e.preventDefault();

    $.fancybox.close();

    })
})

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