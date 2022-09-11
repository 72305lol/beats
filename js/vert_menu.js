const mesureWidth = (item) =>{
    let reqItemsWidth = 0;
    const screenWidth = $(window).width()*0.95;
    const container = item.closest(".colors__menu");
    const titlesBlocks = container.find(".colors__item-title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".colors__item-text");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));
    

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if(isMobile) {
        reqItemsWidth = screenWidth - titlesWidth;
    } else {
        reqItemsWidth = 500;
    }

    return {
        container: reqItemsWidth,
        textContainer: reqItemsWidth - paddingRight - paddingLeft
    }

};

const closeEveryItemsInContainer = (container) =>{

    const items = container.find(".colors__item");
    const content = container.find(".colors__item-content")

    items.removeClass("active");
    content.width(0);
}

const openItems = item =>{
    
    const hiddenContent = item.find(".colors__item-content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".colors__item-text");
    
    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}



$(".colors__item-title").on("click", e=>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".colors__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".colors__menu");

    if (itemOpened){
        closeEveryItemsInContainer(container)
    } else {
        closeEveryItemsInContainer(container)
        openItems(item);
    }
});