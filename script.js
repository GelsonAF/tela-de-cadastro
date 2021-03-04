let B7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault(); //define para não enviar formulario até atingir a condição
        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for(let i=0;i<inputs.length;i++) { // vare os input buscando requisitos
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if(check !== true) { // verifica se o label tem "required"
                send = false;
                B7Validator.showError(input, check); // chama função para criar div de erro
            }
        } 

        if(send) {
            form.submit(); // apos validações envia para proxima pagina
        }
    }, 
    checkInput:(input) => { //valida requisitos definidos nos input
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|'); //separa as regras caso tenha mais de uma
            for(let k in rules){
                let rDtails = rules[k].split('='); // pega o caracter depois do =
                switch(rDtails[0]){ // regras...
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDtails[1]) {
                            return 'Campo precisa ter ao menos '+rDtails[1]+' caracteres.'
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não válido!'
                            }
                        }
                    break;
                }

            }
        }
        return true;
    },
    showError:(input, error) =>{
        input.style.borderColor = '#FF0000'; // coloca borda vermelha no input
        let errorElement = document.createElement('div'); // cria uma div com a informação de erro
        errorElement.classList.add('error'); // 
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling); //parenteElement volta um elemento no DOM para o insertBefore inserir antes do input, ElementSibling para inserir depois do input

    },

    clearErrors:() =>{ //remover div de erro que foram criadas em showError
        let inputs = form.querySelectorAll('input'); // limpa style borda
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error'); // limpa div vermelha de erro
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }

};


let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);


