class  fullMenu{
    constructor(selector) {
        this.menu = document.querySelector(selector)

        document.addEventListener('click', (e) =>{
            e.preventDefault();
            const target = e.target.closest("[data-menu]")

            console.log(e.target.closest("[data-menu]"))
            if (target) {
                const event = target.dataset.menu
                this[event]()
            }
        })
    } 
    open(){
        this.menu.classList.add('open')
    }
    close(){
        this.menu.classList.remove('open')
    }
}

var menu = new fullMenu('#full-menu')

class Slider{
    constructor(selector, settings ={}) {
        this.settings = settings
        this.slider = document.querySelector(selector)
        this.init()
        this.slides = this.slider.children.length
        
    }

    next() {
        if (this.current < this.slides){
            this.current++
            
        } 

        if (this.current == this.slides){
            this.slider.dispatchEvent(new Event('lastSlide'))
        }
        this.translate()
    }

    prev(){
        if (this.current > 1){
            this.current--
            
        }

        if (this.current == 1){
            this.slider.dispatchEvent(new Event('firstSlide'))
        }
        this.translate()
    }

    translate(index, cb){
        if (index) this.current = index
        this.slider.style.transform = `translateX(-${(this.current -1)*100}%)`

        setTimeout(() =>{
            if (cb) cb()
        }, 10)
        
    }

    init(){
        if(this.settings.loop) {
            const cloneFirst = this.slider.firstElementChild.cloneNode(true);
            const cloneLast = this.slider.lastElementChild.cloneNode(true);

            this.slider.appendChild(cloneFirst)
            this.slider.prepend(cloneLast)

            this.translate(2)

            this.slider.addEventListener('lastSlide', () =>{
                setTimeout(() =>{
                    this.slider.style.transition = null
                    this.translate(2, () =>{
                        this.slider.style.transition = `${this.settings.transition}ms`
                    })
                }, this.settings.transition)
            })

            this.slider.addEventListener('firstSlide', () =>{
                setTimeout(() =>{
                    this.slider.style.transition = null
                    this.translate(this.slides - 1, () =>{
                        this.slider.style.transition = `${this.settings.transition}ms`
                    })
                }, this.settings.transition)
            })
        } else {
            this.current = 1
        }

        if (this.settings.transition){
            setTimeout(() =>{
                this.slider.style.transition = `${this.settings.transition}ms`
            }, 0)
        }
    }

   
}

const slider = new Slider (`#slider`, {
    transition: 1000,
    loop: true
})


$('#prev-arrow').on('click', ()=>{
    slider.prev()
})

$('#next-arrow').on('click', ()=>{
    slider.next()
})

