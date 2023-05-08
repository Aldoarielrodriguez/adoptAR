var adoptar= 
{
    onReady:function(){

        let arrayPerros= JSON.parse(localStorage.getItem("dogadoptar"));
        let divRazaPerros=$(".razasContainer:first");
        adoptar.perrosFromLStorage(arrayPerros,divRazaPerros);
        
        let arrayGatos= JSON.parse(localStorage.getItem("catadoptar"));
        let divRazaGatos=$(".razasContainer").not(':first');
        adoptar.gatosFromLStorage(arrayGatos,divRazaGatos);
    },

    perrosFromLStorage: function(arrayP,divHtml){
        if(arrayP!==null)
        {
            arrayP.forEach(function(link) {
                var link = {
                    "url":link,
                    "method": "GET",
                    "timeout": 0,
                    dataType: "json"
                };
                
                $.ajax(link).done(function (value) {

                    divHtml.append(
                    `<div class="card dog" id="${value.id}"> \
                            <div class="cardImage" > \
                                <img src="${value.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota" >\
                            </div> \
                            <div class="cardContent"> \
                                <h3>${value.breeds[0].name}</h3>\
                                <p>${value.breeds[0].temperament}</p>\
                                <a href="./detalleMascota.html?dog?${value.id}"><i class="fa-solid fa-dog"></i></i>Detalles</a> \
                            </div> \
                        </div>`);
                })


            });
        }
        else{
            divHtml.append(`<h2><i class="fa-solid fa-face-sad-tear"></i>Usted no posee adopciones caninas en curso.<i class="fa-solid fa-face-sad-cry"></i><h2>`);
        }
    },

    gatosFromLStorage: function(arrayG,divHtml){
        if(arrayG!==null)
        {
            arrayG.forEach(function(link) {
                var link = {
                    "url":link,
                    "method": "GET",
                    "timeout": 0,
                    dataType: "json"
                  };
                
                $.ajax(link).done(function (value) {
    
                    divHtml.append(
                       `<div class="card cat" id="${value.id}"> \
                            <div class="cardImage" > \
                                <img src="${value.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota" >\
                            </div> \
                            <div class="cardContent"> \
                                <h3>${value.breeds[0].name}</h3>\
                                <p>${value.breeds[0].temperament}</p>\
                                <a href="./detalleMascota.html?cat?${value.id}"><i class="fa-solid fa-cat"></i></i>Detalles</a> \
                            </div> \
                        </div>`);
                })
    
    
            });
        }
        else{
            divHtml.append(`<h2><i class="fa-solid fa-face-sad-tear"></i>Usted no posee adopciones felinas en curso.<i class="fa-solid fa-face-sad-cry"></i><h2>`);
        }
    }

}

$('document').ready(adoptar.onReady);