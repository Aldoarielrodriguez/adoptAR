//DOGAPIKEY= live_IqF4EFXSRLtCR1FB3DVIxoNKQbb4sbGpuFlnqi72pth58BFacTPnLr6emNIfMmfn
//CATAPIKEY= live_jxhoDZiNY4wEy8qPIufiaYnL1Gxen0WcVITpgp52B7GhLpJqwyTnRhsGcwX9bJNR

//Use it as the 'x-api-key' header when making any request to the API, or by adding 
//as a query string parameter e.g. 
//'api_key=live_jxhoDZiNY4wEy8qPIufiaYnL1Gxen0WcVITpgp52B7GhLpJqwyTnRhsGcwX9bJNR'

var raza=
{
    onReady: function()
    {
        let url= window.location.href;
        let razaFromUrl= url.split("?")[1];

        var perroRazaLink= "https://api.thedogapi.com/v1/images/search?api_key=live_IqF4EFXSRLtCR1FB3DVIxoNKQbb4sbGpuFlnqi72pth58BFacTPnLr6emNIfMmfn&breed_ids="+razaFromUrl;
        const divRazaPerros=$(".razasContainer");

        raza.paginador(perroRazaLink+"&limit=10",divRazaPerros); //le paso link y nodo html al que anexar resultados

        $(".allDogBreeds").on("click",function(){
            raza.loader();
            let perroRazaLink2="https://api.thedogapi.com/v1/images/search?api_key=live_IqF4EFXSRLtCR1FB3DVIxoNKQbb4sbGpuFlnqi72pth58BFacTPnLr6emNIfMmfn&breed_ids="+(window.location.href).split("?")[1];
            console.log(perroRazaLink2);
            const divRazaPerros=$(".razasContainer");
            raza.paginador(perroRazaLink2+"&limit=30",divRazaPerros);  // paginador de ver Todas las razas de gatos , hay 67 razas felinas
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
            

            let cards = document.getElementsByClassName("dog");

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
                                    <p>${value.breeds[0].temperament}</p>\
                                    <a href="./detalleMascota.html?dog?${value.id}"><i class="fa-solid fa-dog"></i></i>Detalles</a> \
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
                                            <p>${value.breeds[0].temperament}</p>\
                                            <a href="./detalleMascota.html?dog?${value.id}"><i class="fa-solid fa-dog"></i>Detalles</a> \
                                        </div> \
                                    </div>`);
            
                                
                            }                
                        
                    }       
                });
        })
    },

    loader: function(){
        $(".loader").show();
        $(".allDogBreeds").hide();
        $(".razasContainer").hide();
        setTimeout(loaderHome, 1500);

        function loaderHome() {
            $(".loader").hide();
            $(".razasContainer").show();
            $(".allDogBreeds").show();
        }
    }
}//finVariable


$('document').ready(raza.onReady);