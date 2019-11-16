
 // Create to search query for an emotion
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        topics + "&api_key=VX622cLsOOgpgoP4s16d5fPVpe2wOAit&q=emotions&limit=10&offset=0&rating=PG&lang=en";

// API and key with a query




// Create an array of emotions/topics
var topics = ['Sad', 'Happy', 'Angry', 'Funny'];
var emotionBtn;
var emotionImage;

function createButtons(){
// Dynamically create a button to the html and append new images
    $("#topicsBtn").empty();
    for (var i=0; i < topics.length; i++) {
        var emotionBtn = $("<button>");
        // Assign name to button
        emotionBtn.text(topics[i]);
        // Assign attributes
        emotionBtn.attr("data-name", topics[i]);
        // Add a button class
        emotionBtn.addClass("btn btn-info");
        // Add button to the html
        $("#topicsBtn").append(emotionBtn)   
        
    }
}

// Display giphy's
function displayEmotions() {
    var emotion = $(this).attr("data-name");
    // Clear the area where the gif's are displayed, before showing more
    $('#giphy').empty();
    // Display url, API and key
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    topics + "&api_key=VX622cLsOOgpgoP4s16d5fPVpe2wOAit&q=emotions&limit=10&offset=0&rating=PG&lang=en";
    // Perform AJAX query to get giphy results
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
            console.log(respopnse);
            var results = response.data;
            // Adds a message for the user
            $("#message").append("<h4>" + "Click to animate. Click to pause" + "</h4>");
            // Creating logic logic for the rating
            // Creating logic for displaying still images and animatation
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg")  {
                    var gifDiv = $("div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").txt("Rating: " + rating);
                    var emotionImage = $("<img");
                    emotionImage.attr("src", results[i].images.fixed_height_still.url);
                    emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
                    emotionImage.attr("data-animate", results[i].images.fixed_height.url);
                    emotionImage.attr("data-state", "still");
                    emotionImage.addClass ("img-fluid gif border border-primary");
                    gifDiv.prepend(p);
                    gifDiv.prepend(emotionImage)
                    $("#giphy").append(gifDiv)

                }
            }
      })

}

// User inpput button
$("addGif").on("click", function(event) {
    event.preventDefault();
    // Change values to lower case
    var userInput = $("#userInput").val().toLowerCase();
    // Empty the text box, after submitting
    $("#userInput").val("");
    // This is an alert to the user, if a topic already exists
    if (topics.indexOf(userInput) > -1) {
        alert(userInput + " is already already a topic.  Please make another choice");
      }
})



// Create a variable for the gif images

// Grab API key & Link.  Also change url.



// The array should create buttons in the HTML for each topic
// Use a loop that appends a button for each string in the array

// When the user clicks on a button, the page should grab 10, non-animated gif images

// When the user clicks on one of the still images, the gif should animate.
// If the user clicks again, the animation should stop

// Under every gif, display it's rating (PG, etc) *****Test before next step

// Add a form to the page that takes user input-box and adds to the 'topic' array

// Make a function call that takes each topic in the array & makes a button on the page

// Done