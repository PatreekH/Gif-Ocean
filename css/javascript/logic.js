//Gif Ocean
//By Patrick Hernandez


//FREE RUNNER
//by Patrick Hernandez

var box = $('.box');
var boxPos = {width: 30, height: 30};

var boxTop = $('#boxTop');
var boxSide = $('#boxSide');
var boxTopArea = {width: 5, height: 8.62188720703125};
var boxSideArea = {width: 19, height: 22};

var hurdleTopArea = {width: 5, height: 8.62188720703125};
var hurdleSideArea = {width: 15, height: 22};

var hurdlePos = {width: 30, height: 30};
var coinPos = {width: 30, height: 30};

var s = 0;
var p = 0;
var t = 0;

var score = 0;

/*$('#highscoreDiv').hide();*/

//Testing purposes only
var name = "patrick";

//Tracks the hurdle to delete when animation is complete
var lane1hurdlesPassed = 0;
var lane2hurdlesPassed = 0;
var lane3hurdlesPassed = 0;
var lane4hurdlesPassed = 0;
var lane5hurdlesPassed = 0;

var launch = false;
var lane = 1;

var h1counter = 0;
var h2counter = 0;
var h3counter = 0;
var h4counter = 0;
var h5counter = 0;
var coinCounter = 0;

var coinsCollected = 0;


//Tracks navbar dropdowns (0 = closed, 1 = open)
var profileStatus = 0;
var shopStatus = 0;

//Window measurments for responsive gameplay
var windowSize = $(window).height();
console.log(windowSize);
var onePercent = windowSize / 100;
console.log(onePercent);

$(document).keydown(function(e) {
    switch (e.which) {
    case 40:
        down();
        break;
    case 38:
        up();
        break;
    case 83:
        start();
        break;
    case 32:
        jump();
        break;
    case 80:
        /*pause();*/
        break;
    }
});

function start(){
    if (launch == false){
        $('#start').remove();
        $('#ledge-pic').animate({
            left: "-=550px"
        }, 3000);
        $('#ledge-block').animate({
            left: "-=550px"
        }, 3000);
        $('#ledge-block2').animate({
            left: "-=550px"
        }, 3000);

        createHerd();
        startCoinGenerator();
        startScore();

        launch = true;

        $('#profileDiv').animate({
            top: "-=150px"
        }, 500);
        profileStatus = 0;

        $('#shopDiv').animate({
            top: "-150px"
        }, 500);
        shopStatus = 0;

        var laneCheck = setInterval(function(){
            if (lane == 1){
                $('.h1z').css("z-index", "4");
                $('.h2z').css("z-index", "5");
            } else if (lane == 2){
                $('.h1z').css("z-index", "3");
                $('.h2z').css("z-index", "4");
                $('.h3z').css("z-index", "5");
            } else if (lane == 3){
                $('.h1z').css("z-index", "2");
                $('.h2z').css("z-index", "3");
                $('.h3z').css("z-index", "4");
                $('.h4z').css("z-index", "5");
            } else if (lane == 4){
                $('.h2z').css("z-index", "2");
                $('.h3z').css("z-index", "3");
                $('.h4z').css("z-index", "4");
                $('.h5z').css("z-index", "5");
            } else if (lane == 5){
                $('.h4z').css("z-index", "3");
                $('.h5z').css("z-index", "4");
            }
        }, 1);
    } else {
        console.log("Game already started!");
    }
}

function pause(){
    alert("PAUSE")
}

function jump(){
    $('.box').animate({
        top: '-=100'
    }, 1100);
    fall()
}

function fall(){
    $('.box').animate({
        top: '+=100'
    }, 1100); 
}

function up(){
    var pos = boxSide.position();
    console.log(pos.top);
    var laneTop = parseFloat(onePercent * 43);
    console.log(laneTop);

    if (pos.top <= parseFloat(laneTop) && launch == true && lane == 1) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top > laneTop && launch == true) {
        $('#boxSide').animate({
            top: '-=22',
            left: '+=22'
        }, 150, 'linear'); 
    }

    if (lane <= 1){
        console.log("Fall");
    } else {
        lane--;
        console.log("lane: " + lane);
    }
}

function down(){
    var pos = boxSide.position();
    console.log(pos.top);
    var laneBottom = parseFloat(onePercent * 51.53);
    console.log(laneBottom);
    if (pos.top >= laneBottom && launch == true && lane == 5) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top < laneBottom && launch == true) {
        $('#boxSide').animate({
            top: '+=22',
            left: '-=22'
        }, 150, 'linear');  
    }

    if (lane >= 5){
        console.log("Fall");
    } else {
        lane++;
        console.log("lane: " + lane);
    }
}

//Code for Score

function startScore(){
    /*$("#scoreDiv").html('<h3>Score: <span id="score"></span></h3>')*/
    var scoreInt = setInterval(function(){
        score += 1;
        /*$('#score').html(score);*/
    }, 10);
}

//Code for Coins

function startCoinGenerator(){
    var coinsGenerated = 0;
    var generateCoins = setInterval(function(){
        coinsGenerated += 1;
        console.log("Coins generated: " + coinsGenerated);
        coinGenerator();
    }, 1800); 
}

function coinGenerator(){
    //Time until next coin
    var nextCoin = Math.floor(Math.random() * (5000 - 2500)) + 2500;
    console.log(nextCoin);

    //Picks random lane
    var coinLane = Math.floor(Math.random() * (5 - 1)) + 1;
    console.log(coinLane);

        var nextCoinTimer = setTimeout(function(){

            coinCounter++;

            if (coinLane == 1){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 2){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 3){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 4){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 5){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            }
            
            $('#coin-' + coinCounter).animate({
                left: '-=120%'
            }, 10000, 'linear');

            var coin = $('#coin-' + coinCounter);

            var updateCoin = setInterval(function(){

                var newCoin = coin.position();

                newBoxTopPos = boxTop.position();
                newBoxSidePos = boxSide.position();

                if (newBoxTopPos.top < newCoin.top + coinPos.width && newBoxTopPos.top + boxTopArea.width > newCoin.top && newBoxTopPos.left < newCoin.left + coinPos.height && boxTopArea.height + newBoxTopPos.left > newCoin.left && lane == coinLane || 
                newBoxSidePos.top < newCoin.top + coinPos.width && newBoxSidePos.top + boxSideArea.width > newCoin.top && newBoxSidePos.left < newCoin.left + coinPos.height && boxTopArea.height + newBoxSidePos.left > newCoin.left && lane == coinLane){
                    coin.remove();
                    coinsCollected += 1;
                    score += 100;
                }

            }, 1);
        }, nextCoin);
}

//Code for Hurdles

function createHerd(){
    var herd = 0;
    /*var herdInterval = Math.floor(Math.random() * (2500 - 1200)) + 1200;*/
    var createHerdOfHurdles = setInterval(function(){
        herd += 1;
        console.log("===== Herd: " + herd + "=====")
        createHurdles();
    }, 1800); 
}

function deleteHurdles(){
    var deleteHurdle = 
            lane1thurdlesPassed++;
            $('#hurdle1-' + hurdlesPassed).remove();
            console.log("#hurdle1-" + hurdlesPassed + " is gone!");
}

function createHurdles(){

    var interval1 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval2 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval3 = Math.floor(Math.random() * (2700 - 1500)) + 1200;
    var interval4 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval5 = Math.floor(Math.random() * (3700 - 1500)) + 1200;

    console.log("Int1: " + interval1);
    console.log("Int2: " + interval2);
    console.log("Int3: " + interval3);
    console.log("Int4: " + interval4);
    console.log("Int5: " + interval5);
    console.log("=============");

    //rate of speed per 1 second for 130% of window width /10000
    //algo for box position from top

//DELETE?v
    var newBoxPos = box.position();

    var newBoxTopPos = boxTop.position();
    var newBoxSidePos = boxSide.position();

var newHurdle1 = setTimeout(function(){

        h1counter++;

        $('.lane').append('<div class="hurdleTop" id="hurdle1Top-' + h1counter + '" style="position:fixed;left:108.80%;top:38.60%;">' + '</div><div class="hurdleSide" id="hurdle1Side-' + h1counter + '" style="position:fixed;left:110%;top:41%;"></div>' + '<div class="h1z hurdle" id="hurdle1-' + h1counter + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle1-' + h1counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            lane1hurdlesPassed++;
            $('#hurdle1-' + lane1hurdlesPassed).remove();
            console.log("#hurdle1-" + lane1hurdlesPassed + " is gone!");
        });

        $('#hurdle1Top-' + h1counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle1Top-' + lane1hurdlesPassed).remove();
            console.log("#hurdle1Top-" + lane1hurdlesPassed + " is gone!");
        });

        $('#hurdle1Side-' + h1counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle1Side-' + lane1hurdlesPassed).remove();
            console.log("#hurdle1Side-" + lane1hurdlesPassed + " is gone!");
        });

        /*var hurdle1 = $('#hurdle1-' + h1counter);*/
        var hurdle1Top = $('#hurdle1Top-' + h1counter);
        var hurdle1Side =  $('#hurdle1Side-' + h1counter);

        console.log('boxTopPos: ' + hurdle1Top.height() + ' boxSidePos: ' + hurdle1Top.width());

        var update1 = setInterval(function(){

            /*var newHurdlePos1 = hurdle1.position();*/

            var newHurdle1TopPos = hurdle1Top.position();
            var newHurdle1SidePos = hurdle1Side.position();

            /*newBoxPos = box.position();*/
            newBoxTopPos = boxTop.position();
            newBoxSidePos = boxSide.position();

             if (newBoxTopPos.top < newHurdle1TopPos.top + hurdleTopArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle1TopPos.top && newBoxTopPos.left < newHurdle1TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle1TopPos.left && lane == 1 || 
                newBoxTopPos.top < newHurdle1SidePos.top + hurdleSideArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle1SidePos.top && newBoxTopPos.left < newHurdle1SidePos.left + hurdleSideArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle1SidePos.left && lane == 1 || 
                newBoxSidePos.top < newHurdle1TopPos.top + hurdleTopArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle1TopPos.top && newBoxSidePos.left < newHurdle1TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxSidePos.left > newHurdle1TopPos.left && lane == 1 || 
                newBoxSidePos.top < newHurdle1SidePos.top + hurdleSideArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle1SidePos.top && newBoxSidePos.left < newHurdle1SidePos.left + hurdleSideArea.height && boxSideArea.height + newBoxSidePos.left > newHurdle1SidePos.left && lane == 1){
                clearInterval(update1);
                alert("WORKED lane 1");
                location.reload();
             }

        }, 1);

    }, interval1);

    var newHurdle2 = setTimeout(function(){

        h2counter++;

        $('.lane').append('<div class="hurdleTop" id="hurdle2Top-' + h2counter + '" style="position:fixed;left:106.80%;top:41.60%;">' + '</div><div class="hurdleSide" id="hurdle2Side-' + h2counter + '" style="position:fixed;left:108%;top:44%;"></div>' + '<div class="h2z hurdle" id="hurdle2-' + h2counter + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2-' + h2counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            lane2hurdlesPassed++;
            $('#hurdle2-' + lane2hurdlesPassed).remove();
            console.log("#hurdle2-" + lane2hurdlesPassed + " is gone!");
        });

        $('#hurdle2Top-' + h2counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle2Top-' + lane2hurdlesPassed).remove();
            console.log("#hurdle2Top-" + lane2hurdlesPassed + " is gone!");
        });

        $('#hurdle2Side-' + h2counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle2Side-' + lane2hurdlesPassed).remove();
            console.log("#hurdle2Side-" + lane2hurdlesPassed + " is gone!");
        });

        /*var hurdle2 = $('#hurdle2-' + h2counter);*/
        var hurdle2Top = $('#hurdle2Top-' + h2counter);
        var hurdle2Side =  $('#hurdle2Side-' + h2counter);

        var update2 = setInterval(function(){

            /*var newHurdlePos2 = hurdle2.position();*/

            var newHurdle2TopPos = hurdle2Top.position();
            var newHurdle2SidePos = hurdle2Side.position();

            /*newBoxPos = box.position();*/
            newBoxTopPos = boxTop.position();
            newBoxSidePos = boxSide.position();

             if (newBoxTopPos.top < newHurdle2TopPos.top + hurdleTopArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle2TopPos.top && newBoxTopPos.left < newHurdle2TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle2TopPos.left && lane == 2 || 
                newBoxTopPos.top < newHurdle2SidePos.top + hurdleSideArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle2SidePos.top && newBoxTopPos.left < newHurdle2SidePos.left + hurdleSideArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle2SidePos.left && lane == 2 || 
                newBoxSidePos.top < newHurdle2TopPos.top + hurdleTopArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle2TopPos.top && newBoxSidePos.left < newHurdle2TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxSidePos.left > newHurdle2TopPos.left && lane == 2 || 
                newBoxSidePos.top < newHurdle2SidePos.top + hurdleSideArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle2SidePos.top && newBoxSidePos.left < newHurdle2SidePos.left + hurdleSideArea.height && boxSideArea.height + newBoxSidePos.left > newHurdle2SidePos.left && lane == 2){
                clearInterval(update2);
                alert("WORKED lane 2");
                location.reload();
             }

        }, 1);

    }, interval2);

    var newHurdle3 = setTimeout(function(){

        h3counter++;

        $('.lane').append('<div class="hurdleTop" id="hurdle3Top-' + h3counter + '" style="position:fixed;left:104.80%;top:44.60%;">' + '</div><div class="hurdleSide" id="hurdle3Side-' + h3counter + '" style="position:fixed;left:106%;top:47%;"></div>' + '<div class="h3z hurdle" id="hurdle3-' + h3counter + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle3-' + h3counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            lane3hurdlesPassed++;
            $('#hurdle3-' + lane3hurdlesPassed).remove();
            console.log("#hurdle3-" + lane3hurdlesPassed + " is gone!");
        });

        $('#hurdle3Top-' + h3counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle3Top-' + lane3hurdlesPassed).remove();
            console.log("#hurdle3Top-" + lane3hurdlesPassed + " is gone!");
        });

        $('#hurdle3Side-' + h3counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle3Side-' + lane3hurdlesPassed).remove();
            console.log("#hurdle3Side-" + lane3hurdlesPassed + " is gone!");
        });

        /*var hurdle3 = $('#hurdle3-' + h3counter);*/
        var hurdle3Top = $('#hurdle3Top-' + h3counter);
        var hurdle3Side =  $('#hurdle3Side-' + h3counter);

        var update3 = setInterval(function(){

            /*var newHurdlePos3 = hurdle3.position();*/

            var newHurdle3TopPos = hurdle3Top.position();
            var newHurdle3SidePos = hurdle3Side.position();

            /*newBoxPos = box.position();*/
            newBoxTopPos = boxTop.position();
            newBoxSidePos = boxSide.position();

             if (newBoxTopPos.top < newHurdle3TopPos.top + hurdleTopArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle3TopPos.top && newBoxTopPos.left < newHurdle3TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle3TopPos.left && lane == 3 || 
                newBoxTopPos.top < newHurdle3SidePos.top + hurdleSideArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle3SidePos.top && newBoxTopPos.left < newHurdle3SidePos.left + hurdleSideArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle3SidePos.left && lane == 3 || 
                newBoxSidePos.top < newHurdle3TopPos.top + hurdleTopArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle3TopPos.top && newBoxSidePos.left < newHurdle3TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxSidePos.left > newHurdle3TopPos.left && lane == 3 || 
                newBoxSidePos.top < newHurdle3SidePos.top + hurdleSideArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle3SidePos.top && newBoxSidePos.left < newHurdle3SidePos.left + hurdleSideArea.height && boxSideArea.height + newBoxSidePos.left > newHurdle3SidePos.left && lane == 3){
                clearInterval(update3);
                alert("WORKED lane 3");
                location.reload();
             }

        }, 1);

    }, interval3);

    var newHurdle4 = setTimeout(function(){

        h4counter++;

        $('.lane').append('<div class="hurdleTop" id="hurdle4Top-' + h4counter + '" style="position:fixed;left:102.80%;top:47.60%;">' + '</div><div class="hurdleSide" id="hurdle4Side-' + h4counter + '" style="position:fixed;left:104%;top:50%;"></div>' + '<div class="h4z hurdle" id="hurdle4-' + h4counter + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle4-' + h4counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            lane4hurdlesPassed++;
            $('#hurdle4-' + lane4hurdlesPassed).remove();
            console.log("#hurdle4-" + lane4hurdlesPassed + " is gone!");
        });

        $('#hurdle4Top-' + h4counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle4Top-' + lane4hurdlesPassed).remove();
            console.log("#hurdle4Top-" + lane4hurdlesPassed + " is gone!");
        });

        $('#hurdle4Side-' + h4counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle4Side-' + lane4hurdlesPassed).remove();
            console.log("#hurdle4Side-" + lane4hurdlesPassed + " is gone!");
        });

        /*var hurdle4 = $('#hurdle4-' + h4counter);*/
        var hurdle4Top = $('#hurdle4Top-' + h4counter);
        var hurdle4Side =  $('#hurdle4Side-' + h4counter);

        var update4 = setInterval(function(){

            /*var newHurdlePos4 = hurdle4.position();*/

            var newHurdle4TopPos = hurdle4Top.position();
            var newHurdle4SidePos = hurdle4Side.position();

            /*newBoxPos = box.position();*/
            newBoxTopPos = boxTop.position();
            newBoxSidePos = boxSide.position();

             if (newBoxTopPos.top < newHurdle4TopPos.top + hurdleTopArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle4TopPos.top && newBoxTopPos.left < newHurdle4TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle4TopPos.left && lane == 4 || 
                newBoxTopPos.top < newHurdle4SidePos.top + hurdleSideArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle4SidePos.top && newBoxTopPos.left < newHurdle4SidePos.left + hurdleSideArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle4SidePos.left && lane == 4 || 
                newBoxSidePos.top < newHurdle4TopPos.top + hurdleTopArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle4TopPos.top && newBoxSidePos.left < newHurdle4TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxSidePos.left > newHurdle4TopPos.left && lane == 4 || 
                newBoxSidePos.top < newHurdle4SidePos.top + hurdleSideArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle4SidePos.top && newBoxSidePos.left < newHurdle4SidePos.left + hurdleSideArea.height && boxSideArea.height + newBoxSidePos.left > newHurdle4SidePos.left && lane == 4){
                clearInterval(update4);
                alert("WORKED lane 4");
                location.reload();
             }

        }, 1);

    }, interval4);

    var newHurdle5 = setTimeout(function(){

        h5counter++;

        $('.lane').append('<div class="hurdleTop" id="hurdle5Top-' + h5counter + '" style="position:fixed;left:100.80%;top:50.60%;">' + '</div><div class="hurdleSide" id="hurdle5Side-' + h5counter + '" style="position:fixed;left:102%;top:53%;"></div>' + '<div class="h5z hurdle" id="hurdle5-' + h5counter + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle5-' + h5counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            lane5hurdlesPassed++;
            $('#hurdle5-' + lane5hurdlesPassed).remove();
            console.log("#hurdle5-" + lane5hurdlesPassed + " is gone!");
        });

        $('#hurdle5Top-' + h5counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle5Top-' + lane5hurdlesPassed).remove();
            console.log("#hurdle5Top-" + lane5hurdlesPassed + " is gone!");
        });

        $('#hurdle5Side-' + h5counter).animate({
            left: '-=120%'
        }, 10000, 'linear', function(){
            $('#hurdle5Side-' + lane5hurdlesPassed).remove();
            console.log("#hurdle5Side-" + lane5hurdlesPassed + " is gone!");
        });

        /*var hurdle5 = $('#hurdle5-' + h5counter);*/
        var hurdle5Top = $('#hurdle5Top-' + h5counter);
        var hurdle5Side =  $('#hurdle5Side-' + h5counter);

        var update5 = setInterval(function(){

            /*var newHurdlePos5 = hurdle5.position();*/

            var newHurdle5TopPos = hurdle5Top.position();
            var newHurdle5SidePos = hurdle5Side.position();

            /*newBoxPos = box.position();*/
            newBoxTopPos = boxTop.position();
            newBoxSidePos = boxSide.position();

             if (newBoxTopPos.top < newHurdle5TopPos.top + hurdleTopArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle5TopPos.top && newBoxTopPos.left < newHurdle5TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle5TopPos.left && lane == 5 || 
                newBoxTopPos.top < newHurdle5SidePos.top + hurdleSideArea.width && newBoxTopPos.top + boxTopArea.width > newHurdle5SidePos.top && newBoxTopPos.left < newHurdle5SidePos.left + hurdleSideArea.height && boxTopArea.height + newBoxTopPos.left > newHurdle5SidePos.left && lane == 5 || 
                newBoxSidePos.top < newHurdle5TopPos.top + hurdleTopArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle5TopPos.top && newBoxSidePos.left < newHurdle5TopPos.left + hurdleTopArea.height && boxTopArea.height + newBoxSidePos.left > newHurdle5TopPos.left && lane == 5 || 
                newBoxSidePos.top < newHurdle5SidePos.top + hurdleSideArea.width && newBoxSidePos.top + boxSideArea.width > newHurdle5SidePos.top && newBoxSidePos.left < newHurdle5SidePos.left + hurdleSideArea.height && boxSideArea.height + newBoxSidePos.left > newHurdle5SidePos.left && lane == 5){
                clearInterval(update5);
                alert("WORKED lane 5");
                location.reload();
             }

        }, 1);

    }, interval5);

}