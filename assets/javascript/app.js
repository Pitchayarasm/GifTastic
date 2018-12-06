$(document).ready(function() {

    var topics = ["Moana" , "Frozen", "Coco" , "Wreck-It Ralph" , "Ralph Breaks the Internet" , "Incredibles" , "Zootopia" , "Big Hero 6" , "Finding Dory" , "How to Train Your Dragon" , "Shrek" , "Despicable Me" , "WALL-E" , "Ratatouille" , "Monsters, Inc." , "Ice Age"] 
    var isMoving = false;
    function topicsButton() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var gifButton = $("<button>");
          gifButton.addClass("buttongif");
          gifButton.attr("data-name", topics[i]);
          gifButton.text(topics[i]);
          $("#buttons-view").append(gifButton);
        }
    }
    
    function gifShowing() {
        $("#gif-view").empty();
        var userInput = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=OZvPkvZVvEvGgBa8fQQtx6OwJDqJWQVm"
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response) {
            var giflist = response.data;
            for (i = 0 ; i < 10 ; i++) {
                var template = $("<div>").attr("id", "gifDiv");
                var rating = "<div id='rating'> Rating :  " + giflist[i].rating + " </div>";
                var images = rating + '<img src= " ' + giflist[i].images.downsized_still.url +
                '" data-still="' + giflist[i].images.downsized_still.url +
                '" data-animate="' + giflist[i].images.original.url + '" data-state="still" class="gif" /img>'
                template.append(images);
                $("#gif-view").append(template);
            }
        });
    }
    
    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var animated = $("#gif-input").val().trim();
        if ( animated !== "" && topics.indexOf(animated) === -1 ) {
            topics.push(animated);
        } 
        topicsButton();
      });

    $(document).on("click", ".buttongif", gifShowing);
    $(document).on("click",".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    topicsButton();

});