//Giphy Search Engine
//By Patrick Hernandez


var gifList = ["Cat", "Dog", "Monkey", "Owl", "Fox", "Fish", "Kangaroo", "Chicken", "Bird","Cow", "Wolf", "Shark", "Turtle"];


function displayGif(){

        $("#gifViews").empty();

        var gif = $(this).attr('data-name');
        var api = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(gif);

    $.ajax({url: api, method: 'GET'}).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var gifDiv = $('<span class="gifinfo">');

            var rating = response.data[i].rating;

            var ratingP = $("<p>").text("Rating: " + rating);

            gifDiv.append(ratingP);
                
            var gifimg = $("<img class='gif'>").attr("src", response.data[i].images.fixed_height.url);

            gifDiv.append(gifimg);

            $("#gifViews").append(gifDiv);

            gifDiv.addClass("gifs")

            //$(".gifs").animate({height: '10%'}, "slow");
            $(".gif").animate({width: '100%'}, 3000);

        }   

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

