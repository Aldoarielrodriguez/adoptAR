var raza=
{
    onReady: function()
    {
        let url= window.location.href;
        let razaFromUrl= url.substring(url.length - 4);

        var gatoRazaLink= "https://api.thecatapi.com/v1/images/search?api_key=live_jxhoDZiNY4wEy8qPIufiaYnL1Gxen0WcVITpgp52B7GhLpJqwyTnRhsGcwX9bJNR&breed_ids="+razaFromUrl;
        const divRazaGatos=$(".razasContainer");

        
        raza.paginador(gatoRazaLink+"&limit=10",divRazaGatos); //le paso link y nodo html al que anexar resultados

        $(".allCatBreeds").on("click",function(){
            raza.loader();
            let gatoRazaLink2="https://api.thecatapi.com/v1/images/search?api_key=live_jxhoDZiNY4wEy8qPIufiaYnL1Gxen0WcVITpgp52B7GhLpJqwyTnRhsGcwX9bJNR&breed_ids="+(window.location.href).substring(url.length - 4)+"&page=2";
            console.log(gatoRazaLink2);
            const divRazaGatos=$(".razasContainer");
            raza.paginador(gatoRazaLink2+"&limit=20",divRazaGatos);  // paginador de ver Todas las razas de gatos , hay 67 razas felinas
            //$(this).parent().hide();
           }); 
    },

    paginador: function(link,divHtml){
        raza.loader();
        var link = {
            "url":link,
            "method": "GET",
            "timeout": 0,
            dataType: "json"
          };

          $.ajax(link).done(function (RespuestaApi) {
            

            let cards = document.getElementsByClassName("cat");

                $.each(RespuestaApi, function(index,value)
                { 
                    if (cards.length==0){
                        divHtml.append(
                            `<div class="card dog" id="${value.id}"> \
                                <div class="cardImage" > \
                                    <img src="${value.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota" >\
                                </div> \
                                <div class="cardContent"> \
                                    <h3>${value.breeds[0].name}</h3>\
                                    <p>${value.breeds[0].description}</p>\
                                    <a href="./detalleMascota.html?cat?${value.id}"><i class="fa-solid fa-eye"></i>Detalles</a> \
                                </div> \
                            </div>`);
                    }
                    
                    else{

                            var idArray = [];
                            $('.cat').each(function () {
                                idArray.push(this.id);
                            });
                        
                            if (!idArray.includes(value.id)){

                                divHtml.append(
                                    `<div class="card dog" id="${value.id}"> \
                                        <div class="cardImage" > \
                                            <img src="${value.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota" >\
                                        </div> \
                                        <div class="cardContent"> \
                                            <h3>${value.breeds[0].name}</h3>\
                                            <p>${value.breeds[0].description}</p>\
                                            <a href="./detalleMascota.html?cat?${value.id}"><i class="fa-solid fa-eye"></i>Detalles</a> \
                                        </div> \
                                    </div>`);
            
                                
                            }                
                        
                    }       
                });
        })
    
    },

    loader: function(){
        $(".loader").show();
        $(".allCatBreeds").hide();
        $(".razasContainer").hide();
        setTimeout(loaderHome, 1500);

        function loaderHome() {
            $(".loader").hide();
            $(".razasContainer").show();
            $(".allCatBreeds").show();
        }
    }
}//finVariable


$('document').ready(raza.onReady);
