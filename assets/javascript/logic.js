//Giphy Search Engine
//By Patrick Hernandez



    $('.gifList').on('click', function() {

    var animal = $(this).data('animal');
    var api = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: api, method: 'GET'})

            .done(function(response) {

                userpick = response.data;

                console.log(userpick);

                for (var i = 0; i < userpick.length; i++){

                    var gifDiv = $("<div>");

                    var gifUrl = userpick[i].images.fixed_height.url;
                    var gifimg = $("<img>");
                    gifimg.attr('src', gifUrl);

                    var ratingtext = userpick[i].rating;
                    var rating = $("<p>").text("Rating: " + ratingtext);
                    //var ratingspan = $("<span>").text(ratingtext);

                    gifDiv.append(gifimg);
                    gifDiv.append(rating)

                    $("#images").prepend(gifDiv);


                };

            });
    });