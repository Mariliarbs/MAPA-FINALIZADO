//globals variables
//variaveis globais

var map;
var marker;
var markers = [];

//var textWindow = "test";

//locations variable, I will use this global for all my code
//variavel de localização, vou usar ele para todo o meu codigo

var locations = [{
    title: "Sea World",
    address: "7007 Sea World Dr, Orlando, FL 32821, EUA.",
    location: {lat: 28.4112553, lng: -81.4617849},
    newIcon: "img/sea.png",
    attractionA: "Kraken Unleashed",
    websiteA: "http://www.google.com",
    attractionB: "Mako",
    websiteB:"",
    attractionC: "Manta",
    websiteC:"",
    fsID:"4b058692f964a520536622e3"
},
{
    title: "Disney's Hollywood Studios",
    address: "351 S Studio Dr, Lake Buena Vista, FL 32830, EUA.",
    location: {lat: 28.3556323, lng: -81.5586424},
    newIcon: "img/hollywood.png",
    attractionA: "Rock 'n' Roller Coaster Starring Aerosmith",
    websiteA:"",
    attractionB: "Star Tours – The Adventures Continue",
    websiteB:"",
    attractionC: "The Twilight Zone Tower of Terror",
    websiteC:"",
    fsID:"4acb60d2f964a52094c320e3"
},
{
    title: "Magic Kingdom",
    address: "1180 Seven Seas Dr, Lake Buena Vista, FL 32830, EUA.",
    location: {lat: 28.4034863, lng: -81.5843829},
    newIcon: "img/magic.png",
    attractionA: "Cinderella Castle",
    websiteA:"",
    attractionB: "Dumbo the flying elephant",
    websiteB:"",
    attractionC: "Haunted mansion",
    websiteC:"",
    fsID:"4b11d311f964a520758523e3"
},
{
    title: "Animal Kingdom",
    address: "2901 Osceola Pkwy, Orlando, FL 32830, EUA.",
    location: {lat: 28.3508244, lng: -81.5967868},
    newIcon: "img/animal.png",
    attractionA: "Expedition Everest",
    websiteA:"",
    attractionB: "Kilimanjaro Safaris",
    websiteB:"",
    attractionC: "Na'vi River Journey",
    websiteC:"",
    fsID:"4b058693f964a5206e6622e3"
},
{
    title: "Universal Studios",
    address: "6000 Universal Blvd, Orlando, FL 32819, EUA.",
    location: {lat: 28.4730859, lng: -81.4660287},
    newIcon: "img/universal.png",
    attractionA: "Harry Potter and the Escape from Gringotts",
    websiteA:"",
    attractionB: "Jurassic Park River Adventure",
    websiteB:"",
    attractionC: "Harry Potter and the Forbidden Journey",
    websiteC:"",
    fsID:"4ad62c90f964a5208c0521e3"
}
];



//foursquare API --------------------------------------------- foursquare API

var telefone;
var website;
var twitter;
var facebook;
var endereco;
var instagram;
function agenda(marker){

//  console.log(marker.fsID);
//    for (var i = 0; i < locations.length; i++) {
//        var venueId = locations[i].fsID;
//        console.log(venueId);
//    }

 var id = "&client_id=VZKGEHW3VEZ5H4S1LLUSWPV5UFBBYD0KROIQ1ISFMZAKYKIP";
 var secret = "&client_secret=15BNMJCPGJ0QGEOAQCSWI2PFXC5JJSM3MCP1QMNWGXWOYEMU";
 var fsUrl = 'https://api.foursquare.com/v2/venues/' + marker.fsID + '?v=20180715&' + id + secret;

   $.ajax(fsUrl).done(function(resultado) {
      telefone = resultado.response.venue.contact.formattedPhone;

        website = resultado.response.venue.url;
        endereco = resultado.response.venue.location.formattedAddress;
        twitter = resultado.response.venue.contact.twitter;
        facebook = resultado.response.venue.contact.facebookUsername;
        instagram = resultado.response.venue.contact.instagram;
      console.log(telefone);
       //marker.fsID = telefone;
       marker.telefone = telefone;
marker.website = website;
marker.twitter = twitter;
marker.facebook = facebook;
marker.instagram = instagram;
marker.endereco = endereco;

}).fail(function(error) {
    alert('Foursquare isn´t load, please try tomorrow after 24h');

  });
};



//function ViewModel ------------------------------------------- function ViewModel

function viewModel() {
    var self = this;

    var infosWin = new google.maps.InfoWindow();
    var infoWindow;
    //self.titleMarker = [];
    //alert("teste");

    //I store all my array locations in my new self.orlandoLocals, this will be a observableArray (ko)
    //Vou guardar toda a minha array locations em um novo chamado self.irlandoLocals, vai ser uma observableArray (ko).

     self.orlandoLocals = ko.observableArray(locations);



    //Add Markers and each marker will be your own image
    //Vamos adicionar os markers e cada um vai ter sua própria imagem.


    // alert("teste");

  for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var address = locations[i].address;
        var newIcon = locations[i].newIcon;
        var attractionA = locations[i].attractionA;
        var websiteA = locations[i].websiteA;
        var attractionB = locations[i].attractionB;
        var websiteB = locations[i].websiteB;
        var attractionC = locations[i].attractionC;
        var websiteC = locations[i].websiteC;
        var fsID = locations[i].fsID;
        var telefone = telefone;
        var website = website;
        var twitter = twitter;
        var instagram = instagram;
        var facebook = facebook;
        var endereco = endereco;
        //console.log(title);
        //alert("teste"); Passed 5 times, its OK
        marker = new google.maps.Marker({

            position: position,
            map: map,
            title: title,
            icon: newIcon,
            address: address,
            attractionA: attractionA,
            websiteA: websiteA,
            attractionB: attractionB,
            websiteB: websiteB,
            attractionC: attractionC,
            websiteC: websiteC,
            fsID: fsID,
            telefone: telefone,
            website: website,
            twitter: twitter,
            instagram: instagram,
            facebook: facebook,
            endereco: endereco,
            animation: google.maps.Animation.DROP
    });
//alert("teste"); passed 5 times, loop is ok
      //call foursquare datas ------------------------------------- call foursquare --------------
       agenda(marker);
       locations[i].marker = marker;
        markers.push(marker);
        marker.addListener('click', function() {
            preencherInfo(this, infosWin);
            //infosWin.open(map, marker);
   });




 //Animation in each icon
 //fonte: https://developers.google.com/maps/documentation/javascript/examples/marker-animations

        marker.addListener('click', function(){
        var self = this;
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
        self.setAnimation(null);
        }, 2000);
	});

//     console.log(websiteA);
//        self.openSite = function() {
//
//      window.location.href= marker.websiteA;
//    };

  //function to click in park name and show in the map the location and infowindow
  self.clickPark = function(teste) {
      //console.log(markers[0].title);
      //console.log(teste.title);

       map.setZoom(13);
       map.panTo(teste.location);

      if(teste.title == markers[0].title){
          google.maps.event.trigger(markers[0], 'click');
      }
      if(teste.title == markers[1].title){
          google.maps.event.trigger(markers[1], 'click');
      }
      if(teste.title == markers[2].title){
          google.maps.event.trigger(markers[2], 'click');
      }
      if(teste.title == markers[3].title){
          google.maps.event.trigger(markers[3], 'click');
      }
      if(teste.title == markers[4].title){
          google.maps.event.trigger(markers[4], 'click');
      }


    };
    }
 //END OF FOR LOOP ------------------------------ END FOR LOOP ---------------------
   // console.log(self.orlandoLocals());

    function preencherInfo(marker, infowindow) {
       // console.log(marker);
       // alert("teste");
    if (infowindow.marker != marker) {

        infowindow.marker = marker;
       infowindow.setContent('<div><b>' + marker.title + '</b></div>' +'<div>' + '<b>' + "Address: " + '</b>' + marker.endereco + '</div>' + '<div>' + '<b>' + "Website: " + '</b>' + '<a href="' + marker.website + '" target="text"> ' + marker.title + '</a>' + '</div>' + '<div>' +'<b>' + "Telefone: " + '</b>' + marker.telefone + '</div>' + '<div>' + '<b>' + "Facebook: " + '</b>' + '<a href="https://www.facebook.com/' + marker.facebook + '" target="text"> ' + marker.facebook + '</a>' + '</div>'+ '<div>' + '<b>' + "Twitter: " + '</b>' + '<a href="https://www.twitter.com/' + marker.twitter + '" target="text"> ' + marker.twitter + '</a>'+ '</div>'+ '<div>' + '<b>' + "Instagram: " + '</b>' + '<a href="https://www.instagram.com/' + marker.instagram + '" target="text"> ' + marker.instagram + '</a>' + '</div>');

        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    };
        infowindow.open(map, marker);
    };

    //FILTER --------------------------------- FILTER LIST ----------------------

    self.filtroAtual = ko.observable('');
    self.search = ko.computed(function() {
        return ko.utils.arrayFilter(locations, function(local) {
            if (local.title.toLowerCase().indexOf(self.filtroAtual().toLowerCase()) >= 0){
                //console.log(local.marker);
                local.marker.setVisible(true);
                return true;
            }else{
                //console.log(local.marker);
                local.marker.setVisible(false);
            }
        });
  });


// mapError = function() {
//     alert("MAP NO LOAD, TRY AGAIN");
// };

}
// End of ViewModel -------------------------------------- End of ViewModel -----------------------
//correcao solicitada pela udacity
mapError = function() {
    alert("MAP NO LOAD, TRY AGAIN");
};


//Function initMap --------------------------------------------- function initMap-----------
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:28.4034863, lng: -81.5843829},
        zoom: 12,

    });

  ko.applyBindings(new viewModel());
}
// end of initMap --------------------------------------- end of initMap --------------------


// navbar button -------------------------------------- navbar button -----------------------

document.getElementById('show-btn').addEventListener('click', toggleSidebar);

function toggleSidebar() {
  var navBar = document.getElementById('nav');
  if (navBar.style.display === "none") {
    navBar.style.display = "block";
  } else {
    navBar.style.display = "none";
  }
}
