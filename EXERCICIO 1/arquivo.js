const input = document.querySelector("#main-input")
const paragrafo = document.querySelector("#texto-digitado")
function cliqueiNoBotao(){
   alert("Botão clicado com sucesso!")
}

function digiteiNoInput(){
    paragrafo.innerText = input.value
}