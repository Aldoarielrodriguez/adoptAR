var racista=
{
    onReady: function()
    {
        // CANINOS
      const perroRazaLink= "https://api.thedogapi.com/v1/breeds";
      const divRazaPerros=$(".razasContainer:first");

      racista.paginadorPerros(0,10,perroRazaLink,divRazaPerros); //le paso index inicio, index fin, link y nodo html al que anexar resultados
      racista.filtraRazaPerros();    

      $(".allDogBreeds").on("click",function(){
        racista.loader();
        racista.paginadorPerros(10,172,perroRazaLink,divRazaPerros);  // paginador de ver Todas las razas de Perros , hay 172 razas caninas
        $(this).parent().hide();
      });  

      const gatoRazaLink= "https://api.thecatapi.com/v1/breeds";
      const gatoImgLink= "https://api.thecatapi.com/v1/images/search?breed_ids="
      const divRazaGatos=$(".razasContainer").not(':first');
 
      
      racista.paginadorGatos(0,10,gatoRazaLink,gatoImgLink,divRazaGatos); //le paso index inicio, index fin, link data razas, link img´s raza y nodo html al que anexar resultados
      racista.filtraRazaGatos();

      $(".allCatBreeds").on("click",function(){
        racista.loader();
        racista.paginadorGatos(10,67,gatoRazaLink,gatoImgLink,divRazaGatos);  // paginador de ver Todas las razas de gatos , hay 67 razas felinas
        $(this).parent().hide();
       }); 
  
    },

    paginadorPerros: function(base,limite,link,divHtml){
        racista.loader();
        var link = {
            "url":link,
            "method": "GET",
            "timeout": 0,
          };

          $.ajax(link).done(function (RespuestaApi) {

                $.each(RespuestaApi, function(index,value)
                { 
                  if(index>=base && index<limite)
                  {
                    var idRaza = value.name.replace(/ /g,"_");
                    divHtml.append(
                        `<div class="card dog" id=`+idRaza+`> \
                            <div class="cardImage" > \
                                <img src="${value.image.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota" >\
                            </div> \
                            <div class="cardContent"> \
                                <h3>${value.name}</h3>\
                                <a href="./razaPerro.html?${value.id}">Ver raza <i class="fa-solid fa-dog"></i> </a>  \
                            </div> \
                        </div>`);
                  }
                });
        })
    },

    paginadorGatos: function(base,limite,linkRaza,linkImgs,divHtml){
        racista.loader();
        var linkR = {
            "url":linkRaza,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(linkR).done(function (RespuestaApi)
        {

            $.each(RespuestaApi, function(index,value)
            { 

                if(index>=base && index<limite)
                {   
                    var linkI = {
                        "url":linkImgs+value.id,
                        "method": "GET",
                        "timeout": 0,
                    };

                    /*var idRaza = value.name.replace(/ /g,"_");*/
                    $.ajax(linkI).done(function (RespuestaApiImg)
                    {    
                        $.each(RespuestaApiImg, function(indexImg,valueImg){
                            divHtml.append(
                            `<div class="card cat" id=${value.id}> \
                                <div class="cardImage" > \
                                    <img src="${valueImg.url}" style="width:260px;height:240px;object-fit:cover" alt="mascota">\
                                </div> \
                                <div class="cardContent"> \
                                    <h3>${value.name}</h3>\
                                    <a href="./razaGato.html?${value.id}">Ver raza<i class="fa-solid fa-cat"></i></a> \
                                </div> \
                            </div>`);
                        })
                    });
                }
            })
        })
    },    

    filtraRazaPerros: function(){

        let busqueda = document.querySelector('#searchDog');
           
        let cards = document.getElementsByClassName("dog");
        
        busqueda.addEventListener('keyup', function() {
            let palabraBuscada= this.value.toLowerCase();   

            for (i =0 ; i < cards.length ; i++ ){
                let raza= cards[i].id.toLowerCase();
               
                if (!raza.includes(palabraBuscada)){

                    cards[i].style.display="none";
                }

                else{
                    console.log(raza+" contiene?:True ");
                    cards[i].style.display="block";
                }
            }

        });
    },

filtraRazaGatos: function(){

        let busqueda = document.querySelector('#searchCat');
           
        let cards = document.getElementsByClassName("cat");
        
        busqueda.addEventListener('keyup', function() {
            let palabraBuscada= this.value.toLowerCase();   

            for (i =0 ; i < cards.length ; i++ ){

                let raza= cards[i].id.toLowerCase();
               
                if (!raza.includes(palabraBuscada)){

                    cards[i].style.display="none";
                }

                else{
                    console.log(raza+" contiene?:True ");
                    cards[i].style.display="block";
                }
            }

        });
    },

    loader: function(){
        $(".loader").show();
        $(".allDogBreeds").hide();
        $(".allCatBreeds").hide();
        $(".razasContainer").hide();
        setTimeout(loaderHome, 1500);

        function loaderHome() {
        $(".loader").hide();
        $(".razasContainer").show();
        $(".allDogBreeds").show();
        $(".allCatBreeds").show();
        }
    }
    
    
};


$('document').ready(racista.onReady);
