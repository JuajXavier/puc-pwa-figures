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
            let htmlContent = "";

            for(let i = 0; i<jsonData.length; i++) {

               htmlContent += `<div class="row"><div class="col-12"><h2><span></span>${jsonData[i].categoria}</h2></div></div>`
                
               if (jsonData[i].figures.length == 0) {
                    htmlContent += '<div class="row"><div class="col-12"><div class="alert alert-warning" role="alert">Desculpe! Não há figures nesta categoria.</div></div></div>'
               } else {

                   htmlContent += '<div class="row">';

                    for(let j = 0; j<jsonData[i].figures.length; j++) {

                    const figuresInfo = jsonData[i].figures[j];

                    const figureParams = {
                        nome: figuresInfo.nome,
                        imagem: figuresInfo.imagem,
                        valor: figuresInfo.valor,
                        whatsapp: figuresInfo.whatsapp,
                    }

                    htmlContent += figureCard(figureParams);
                }
                    htmlContent += '</div>';
               }
            }

            content.innerHTML = htmlContent;
        }
    }
}

//Template do card

var figureCard = function({nome, imagem, valor, whatsapp}) {
    return  '<div class="col-lg-6">'+
                '<div class="card">'+
                    `<img src=${imagem} class="card-img-top" alt="Chopper">`+
                    '<div class="card-body">'+
                        `<h5 class="card-title">${nome}</h5>`+
                        `<p class="card-text"><strong>Valor: </strong>${valor}</p>`+
                        '<div class="d-grid gap-2">'+
                            `<a href="https://api.whatsapp.com/send?phone=55${whatsapp}&text=Olá, gostaria de infos sobre a figure: ${nome}" target="_blank" class="btn btn-warning">Contato do proprietário</a>`+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
}