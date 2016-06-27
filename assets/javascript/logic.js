//Gif Ocean
//By Patrick Hernandez


var gifList = ["Cat", "Dog", "Monkey", "Owl", "Fox", "Fish", "Kangaroo", "Chicken", "Bird", "Cow", "Wolf", "Turtle"];


function displayGif(){

        $("#gifViews").empty();

        var gif = $(this).attr('data-name');
        var api = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=15";

        console.log(gif);

    $.ajax({url: api, method: 'GET'}).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var gifDiv = $('<div class="gifpic">');
                
            var gifimg = $("<img class='gif'>");

            gifimg.attr({
                src: response.data[i].images.fixed_height_still.url,
                "data-still": response.data[i].images.fixed_height_still.url,
                "data-animate": response.data[i].images.fixed_height.url,
                "data-state": "still",
            });

            gifDiv.append(gifimg);

            $("#gifViews").append(gifDiv);

            gifDiv.addClass("gifs");

            var rating = response.data[i].rating;

            var ratingP = $("<p id='info'>").text("Rating: " + rating);

            $(gifDiv).prepend(ratingP);


        }


            $(".gif").on("click", function(){
                var infoDiv = $("<div id='infoDiv'>");
                var state = $(this).attr('data-state'); 
                if (state == 'still'){
                    $("#infoDiv").animate({height: '0px'}, 1000);
                    $("#infoDiv").animate({width: '0px'}, 1000);
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                    $(this).prepend(infoDiv);
                    infoDiv.animate({height: '50px'}, 1000);
                    infoDiv.animate({width: '220px'}, 1000);
                }
            })


    });

};


function renderButtons(){

    $('#buttonsView').empty();

    for (var i = 0; i < gifList.length; i++){

        var newSubj = $("<button>")
        newSubj.addClass("gifinfo")
        newSubj.attr("data-name", gifList[i]);
        newSubj.text(gifList[i]);
        $("#buttonsView").append(newSubj);
    }

}

$("#addGif").on('click', function(){

    var newgif = $('#gif-input').val().trim();

    gifList.push(newgif);


    renderButtons();

    return false;
})

$(document).on('click', '.gifinfo', displayGif);

renderButtons();
createWave();

function createWave(){
    var windowSize = $(window).width();
    var sideBarSize = windowSize / 100 * 15;
    var waveCount = (windowSize - sideBarSize) / 20;
    var regWaveCount = parseInt(waveCount);
    var lastWave = parseInt((waveCount % regWaveCount) * 20);

    console.log(windowSize);
    console.log(sideBarSize);
    console.log(regWaveCount);
    console.log(lastWave);
    //$('<style>').text('.blue { background: blue }').appendTo('head');
    for (i = 1; i <= regWaveCount; i++){
        $("<style type='text/css'> .a" + i + " {animation-delay: 0.0s; float:left;} </style>").appendTo("head");
        var delay = 0.0;
        var addDelay = 0.1;
        var newDelay = parseFloat(delay) + parseFloat(addDelay);
        $(".waveContainer").append("<span class='a" + i +  "'></span>");
        //var waveClass = $(".a" + i);
        //console.log(newDelay); 
        //waveClass.css("animation-delay", parseFloat(newDelay) + "s");
    }

}