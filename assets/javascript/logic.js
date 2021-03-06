//Gif Ocean
//By Patrick Hernandez


var gifList = ["Cat", "Dog", "Monkey", "Owl", "Fox", "Fish", "Kangaroo", "Chicken", "Bird", "Cow", "Wolf", "Turtle"];

$(window).width();

//Size of the current browser window
var windowSize = $(window).width();
console.log("Window size: " + windowSize);

//Size of the sidebar (15% of the page);
var sideBarSize = windowSize / 100 * 15;
console.log("Sidebar size: " + sideBarSize);

//Wave Count including lastWave
var waveCount = (windowSize - sideBarSize) / 20;
console.log("Total spans needed including the last span: " + waveCount);

//Wave Count not including lastWave
var regWaveCount = parseInt(waveCount);
console.log("Total spans needed: " + regWaveCount);

//Calculates lastWave px size
var lastWave = parseFloat((waveCount % regWaveCount) * 20);
console.log("Last span pixel size: " + lastWave);

//required amount of groups of 20 needed for the page
var requiredGroupCount = parseInt(regWaveCount / 20);
console.log("Number of times a group (20) can go into the page: " + requiredGroupCount);

//required amount of groups with decimal
var reqGroupCountFloat = regWaveCount / 20;
console.log("Required groups with decimal: " + reqGroupCountFloat);

//calculates remaining spans left after grouping
var finalGroup = (reqGroupCountFloat % requiredGroupCount) * 20 - 1;
console.log("Spans needed after grouping (-1) : " + finalGroup);

//current wave groups on the page
var currentGroups = 0;

var interval;


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
});



$("#resetWave").on('click', function(){

    $('.waveContainer').empty();

    createWave();

    return false;
})

$(document).on('click', '.gifinfo', displayGif);

renderButtons();
createWave();


var windowSizeCheck = setInterval(function() {
    var newWindowSize = $(window).width();
    if(newWindowSize != windowSize){
        $('.waveContainer').empty();
        createWave();
        windowSize = newWindowSize;
        /*clearInterval(windowSizeCheck);*/
    }
}, 1);


//Have algo calculate fixed width for side bar and not 15%
//Have top words not overlap with logo
//Have rating and details pop out above as originally planned
//change animals to fish

function createWave(){

    $(window).width();

    //Size of the current browser window
    windowSize = $(window).width();

    //Size of the sidebar (15% of the page);
    sideBarSize = windowSize / 100 * 15;

    //Wave Count including lastWave
    if (windowSize < 997){
        waveCount = windowSize / 20;
    } else {
        waveCount = (windowSize - sideBarSize) / 20;
    }

    //Wave Count not including lastWave
    regWaveCount = parseInt(waveCount);

    //Calculates lastWave px size
    lastWave = parseFloat((waveCount % regWaveCount) * 20);

    //required amount of groups of 20 needed for the page
    requiredGroupCount = parseInt(regWaveCount / 20);

    //required amount of groups with decimal
    reqGroupCountFloat = regWaveCount / 20;

    //calculates remaining spans left after grouping
    finalGroup = (reqGroupCountFloat % requiredGroupCount) * 20 - 1;

    //current wave groups on the page
    currentGroups = 0;

    formWaveGroup();
    addWaveGroup();
}

function formWaveGroup(){
        var delay = "0.0"
    for (i = 0; i <= 9; i++){
        var style = document.createElement('style');
        style.type = 'text/css';
        delay = "0." + i;
        style.innerHTML = '.a' + i +  ' { animation-delay:' + parseFloat(delay) + 's; float:left; }';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    for (i = 0; i <= 9; i++){
        var style = document.createElement('style');
        style.type = 'text/css';
        delay = "1." + i;
        style.innerHTML = '.b' + i +  ' { animation-delay:' + parseFloat(delay) + 's; float:left; }';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

function addWaveGroup(){
    for (i = 0; i <= 9; i++){
        $(".waveContainer").append("<span class='a" + i + "'></span>");
    }
    for (i = 0; i <= 9; i++){
        $(".waveContainer").append("<span class='b" + i + "'></span>");
    }
    checkGroups();
}

function checkGroups(){
    currentGroups++;
    if (currentGroups < requiredGroupCount){
        addWaveGroup();
    } else if (requiredGroupCount == reqGroupCountFloat) {
        interval = 0.0;
        CreateFinalWave();
    } else {
        formFinalGroup();
    }
}

function formFinalGroup(){
    var rounded = Math.round(finalGroup);
    if (rounded <= 9){
        for (i = 0; i <= rounded; i++){
            var style = document.createElement('style');
            style.type = 'text/css';
            interval = "0." + i;
            style.innerHTML = '.a' + i +  ' { animation-delay:' + parseFloat(interval) + 's; float:left; }';
            document.getElementsByTagName('head')[0].appendChild(style);
            $(".waveContainer").append("<span class='a" + i + "'></span>");
        }
        CreateFinalWave();
    } else if (rounded > 9){
        var remainingOver10 = rounded - 10;
        for (i = 0; i <= 9; i++){
            var style = document.createElement('style');
            style.type = 'text/css';
            $(".waveContainer").append("<span class='a" + i + "'></span>");
        }
        for (i = 0; i <= remainingOver10; i++){
            var style = document.createElement('style');
            style.type = 'text/css';
            interval = "1." + i;
            $(".waveContainer").append("<span class='b" + i + "'></span>");
        }
        CreateFinalWave()
    } 
  
}

//parseFloat(lastWave)
//If lastWave size under 5-3px add it on to last span
//When certain small size is reached, move search bar and button above the waves.

function CreateFinalWave() {
    var style = document.createElement('style');
    style.type = 'text/css';
    //lastWave = Math.round(lastWave);
    if (interval == 0){
        style.innerHTML = '.lastWave { animation-delay:' + parseFloat(interval) + 's; float:left; width:' + lastWave + 'px;}';
        document.getElementsByTagName('head')[0].appendChild(style);
        $(".waveContainer").append("<span class='lastWave'></span>");
    } else if (interval < 0.9){
        var interval1 = parseFloat(interval) + 0.1;
        style.innerHTML = '.lastWave { animation-delay:' + parseFloat(interval1) + 's; float:left; width:' + lastWave + 'px;}';
        document.getElementsByTagName('head')[0].appendChild(style);
        $(".waveContainer").append("<span class='lastWave'></span>");
    } else if (1.0 <= interval){
        var interval2 = parseFloat(interval) + 0.1;
        style.innerHTML = '.lastWave { animation-delay:' + parseFloat(interval2) + 's; float:left; width:' + lastWave + 'px;}';
        document.getElementsByTagName('head')[0].appendChild(style);
        $(".waveContainer").append("<span class='lastWave'></span>");
    } else if (interval == 0.9){
        var interval3 = "1.0";
        style.innerHTML = '.lastWave { animation-delay:' + parseFloat(interval3) + 's; float:left; width:' + lastWave + 'px;}';
        document.getElementsByTagName('head')[0].appendChild(style);
        $(".waveContainer").append("<span class='lastWave'></span>");
    } 
}