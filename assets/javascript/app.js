$("#searchButton").on("click", function() {
    event.preventDefault();
    var addItem = $("#searchInput").val().trim();
    if (addItem != "") {
        var buttonDiv = $("<button>");
        buttonDiv.attr("value", addItem);
        buttonDiv.text(addItem);
        buttonDiv.addClass("buttons")
        $("#button").prepend(buttonDiv);


    } else {
        alert("add something but hitting search");
    }
    // clear text field after any input
    $("#searchInput").val("");

});
$(document).on("click", ".buttons", function() {
    event.preventDefault();
    //clear old gif if any
    if ($("#gifs-appear-here img").length >= 10) {
        $("#gifs-appear-here").empty();
    }
    //getting name from the button click
    var person = $(this).attr("value");
    console.log(person);
    //assigin queryURL to api and the api has a limit of 10 giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    //get info from the api
    $.ajax({
            url: queryURL,
            method: "GET"
                //waiting for a response then run code
        })
        .then(function(response) {
            //get all 10 gif info.
            var results = response.data;
            // running loop until all 10 gif adding rating and img to #gif-appear-here id.
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
});