var detallista=
{
    onReady: function()
    {   
        let url= window.location.href;
        let especieFromUrl= url.split("?")[1];
        let idFromUrl= url.split("?")[2];
        let linkApi="https://api.the"+especieFromUrl+"api.com/v1/images/"+idFromUrl;
        const nodoHtml= $(".especieContent");

        detallista.cargaItem(especieFromUrl,linkApi,nodoHtml);

        $(document).on("click",".adoptar",function(){
                let linkApi= $(this).attr("src");
                let especie= $(this).attr("class").split(/\s+/)[1];
                let foto= $(this).parent().parent().children(".mascotaImg").children("img").attr("src"); 
                let nombre= $(this).parent().parent().children(".mascotaContent").children("h3").text();
                let edad= $(this).parent().parent().children(".mascotaContent").children("p:eq(0)").text();
                let raza= $(this).parent().parent().children(".mascotaContent").children("p:eq(3)").text();

                detallista.solicitoAdopcion(linkApi,especie,foto,nombre,edad,raza);
           }); 
    },

    cargaItem: function(especie,linkApi,nodoHtml)
    {    
        detallista.loader();

        var link = {
            "url":linkApi,
            "method": "GET",
            "timeout": 0
          };
          
        $.ajax(link).done(function (RespuestaApi) {

                if(especie=="dog"){
                    
                    nodoHtml.append(
                        `<div class="mascota" id="${RespuestaApi.id}"> \
                            <div class ="mascotaImg"> \
                                <img src="${RespuestaApi.url}" style="min-width:300px;min-height:250px;width:60%;height:auto;object-fit:cover" alt="mascota" >\
                            </div> \
                            <div class="mascotaContent"> \
                                <h3>${RespuestaApi.breeds[0].breed_group}</h3>\                           
                                <p>Edad : ${RespuestaApi.breeds[0].life_span}.</p>\
                                <p>Peso : ${RespuestaApi.breeds[0].weight.metric} KG.</p>\
                                <p>Altura : ${RespuestaApi.breeds[0].height.metric} CM.</p>\
                                <p>Edad : ${RespuestaApi.breeds[0].life_span}.</p>\
                                <p>Raza: ${RespuestaApi.breeds[0].name}</p>\  
                                <p>Origen de la raza : ${RespuestaApi.breeds[0].origin}.</p>\
                                <p>Temperamento de la raza : ${RespuestaApi.breeds[0].temperament}</p>\ 
                            </div> \
                            <div class="btn-detalle"> \
                                <button src="`+linkApi+`" class="adoptar dog"><i class="fa-solid fa-heart-circle-check"></i>Solicitar Adopción</button> \
                            </div> \
                    </div>`

                    )
                }

                if(especie=="cat"){
                
                    nodoHtml.append(
                        `<div class="mascota" id="${RespuestaApi.id}"> \
                        <div class = "mascotaImg"> \
                            <img src="${RespuestaApi.url}" style="min-width:300px;min-height:250px;width:60%;height:auto;object-fit:cover" alt="mascota" >\
                        </div> \
                        <div class="mascotaContent"> \
                            <h3>${RespuestaApi.breeds[0].id}</h3>\                           
                            <p>Edad : ${RespuestaApi.breeds[0].life_span}.</p>\
                            <p>Peso : ${RespuestaApi.breeds[0].weight.metric} KG.</p>\
                            <p>Edad : ${RespuestaApi.breeds[0].life_span}.</p>\
                            <p>Raza: ${RespuestaApi.breeds[0].name}</p>\  
                            <p>Origen de la raza : ${RespuestaApi.breeds[0].origin}.</p>\
                            <p>Temperamento de la raza : ${RespuestaApi.breeds[0].temperament}</p>\ 
                        </div> \
                        <div class="btn-detalle"> \
                            <button src="`+linkApi+`" class="adoptar cat"><i class="fa-solid fa-heart-circle-check"></i>Solicitar Adopción</button> \
                        </div> \
                    </div>`

                    )
            
                }

        })    

    },

    loader: function(){
        $(".loader").show();
        $(".especieContent").hide();
        setTimeout(loaderHome, 1500);

        function loaderHome() {
            $(".loader").hide();
            $(".especieContent").show();
        }
    },

    solicitoAdopcion: function(linkM,especieM,fotoM,nombreM,edadM,razaM){

        sessionStorage.clear();
        if (typeof(Storage) !== 'undefined') {
            sessionStorage.linkMascota=linkM;
            sessionStorage.especieMascota=especieM;
            sessionStorage.fotoMascota=fotoM;
            sessionStorage.nombreMascota=nombreM;
            sessionStorage.edadMascota=edadM;
            sessionStorage.razaMascota=razaM;
            window.location.href = "./formulario_adopcion.html";
          } else {
           alert("Tu navegador no es compatible con la adopción");
          }
        
    }

    
}
$('document').ready(detallista.onReady);