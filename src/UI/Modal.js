export default class Modal{
    constructor(contentId, fallBackText){
        this.modalTemplateEl = document.getElementById('modal-template');
        this.contentTemplateEl = document.getElementById(contentId);
        this.fallBackText = fallBackText;
    }

    show = () =>{
        if('content' in document.createElement('template')){
            const modalElements = document.importNode(this.modalTemplateEl.content, true);
            const contentElement = document.importNode(this.contentTemplateEl.content, true);

            this.modal = modalElements.querySelector('.modal');
            this.backdrop = modalElements.querySelector('.backdrop');

            this.modal.appendChild(contentElement);

            document.body.insertAdjacentElement('afterbegin', this.modal);
            document.body.insertAdjacentElement('afterbegin', this.backdrop);
        }else{
            this.fallBackElement = document.createElement('h3').textContent(this.fallBackText);
            document.body.insertAdjacentElement("afterbegin",this.fallBackElement);
        }
    }

    hide = () =>{
        if(this.modal && this.backdrop){
            this.modal.remove();
            this.backdrop.remove();
        }else{
            this.fallBackElement.remove();
        }
    }
}