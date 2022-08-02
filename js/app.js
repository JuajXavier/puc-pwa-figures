// Carregamento AJAX
let ajax = new XMLHttpRequest();

// true é para dizer que é assíncrono
ajax.open("GET", "./data.json", true);

ajax.send();

// Monitorar o retorno
ajax.onreadystatechange = function() {
    // Especificar o container que recebe o conteudo gerado neste arquivo
    const content = document.getElementById("content");

    if (this.readyState === 4 && this.status === 200) {
        
        const jsonData = JSON.parse(ajax.responseText);
        console.log(jsonData)

        if(jsonData.length === 0) {

          content.innerHTML = '<div class="alert alert-warning" role="alert">Desculpe! Não há figures cadastradas.</div>'
        } else {
            // let htmlContent = "";
            // for(let i = 0; i<jsonData.length; i++) {
            //    htmlContent += `<div class="row"><div class="col-12"><h2><span></span>${jsonData[i].categoria}</h2></div></div>`
            // }
            // content.innerHTML = htmlContent;
        }
    }
}