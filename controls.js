export class Controls{
    constructor(type){
        this.foward = false;
        this.left = false;
        this.right = false;
        this.reversed = false;
        switch(type){
            case "KEYS":
                this.#addListeners();
                break;
            case "DUMMY":
                this.foward = true;
                break;
        }
    }

    // # is a private method
    #addListeners(){
        document.onkeydown = (e) => {
            switch(e.key){
                case 'ArrowUp':
                    this.foward = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'ArrowDown':
                    this.reversed = true;
                    break;
            }
        }
        document.onkeyup = (e) => {
            switch(e.key){
                case 'ArrowUp':
                    this.foward = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'ArrowDown':
                    this.reversed = false;
                    break;
            }
        }
    }
}