$('.form').submit(e =>{
    e.preventDefault();
    

    $.fancybox.open({
        src: "#modal",
        type: "inline"
    })
});

$(".app-submit-btn").click(e=>{
    e.preventDefault();

    $.fancybox.close();
})