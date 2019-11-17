
// Create an array of emotions/topics
var topics = ['Sad', 'Happy', 'Angry', 'Funny'];
var emotionBtn;
var emotionGif;

function createButtons(){
// Dynamically create a button to the html and append new images
    $("#topicsBtn").empty();
    for (var i=0; i < topics.length; i++) {
        var emotionBtn = $("<button>");
        // Assign name to button
        emotionBtn.text(topics[i]);
        // Assign attributes
        emotionBtn.attr("data-emotion", topics[i]);
        // Add a button class
        emotionBtn.addClass("btn btn-info");
        // Add button to the html
        $("#topicsBtn").append(emotionBtn)         
        }
}
// Create to search query for an emotion
// Display giphy's
function displayEmotions() {
// Clear the area where the gif's are displayed, before showing more
    $('#giphy').empty();
    $("#message").empty();
    
    var emotion = $(this).attr("data-emotion");
    // Display url, API and key
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     emotion + "&api_key=opcXvH1EedAhrs1Wgk3307og6EraPeHR&limit=10";
    // Perform AJAX query to get giphy results
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    // After data comes back from request
      .then(function(response) {
        console.log(queryURL);
        var results = response.data;
        // Adds a message for the user
        $("#message").append("<h4>" + "Click to animate. Click to pause" + "</h4>");
        // Creating logic logic for the rating
        // Creating logic for displaying still images and animatation
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg")  {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").txt("Rating: " + rating);
                var emotionGif = $("<img>");
                emotionGif.attr("src", results[i].images.fixed_height_still.url);
                emotionGif.attr("data-still", results[i].images.fixed_height_still.url);
                emotionGif.attr("data-animate", results[i].images.fixed_height.url);
                emotionGif.attr("data-state", "still");
                emotionGif.addClass ("img-fluid gif border border-primary");
                gifDiv.prepend(p);
                gifDiv.prepend(emotionGif);
                $("#giphy").append(gifDiv);

            }
        }
      })

}

// User inpput button
$("#addGif").on("click", function(event) {
        event.preventDefault();
    // Change values to lower case
    var userInput = $("#userInput").val().toLowerCase();
    // Empty the text box, after submitting
    $("#userInput").val("");
    // This is logic and an alert to the user, if a topic already exists
    if (topics.indexOf(userInput) > -1) {
        alert(userInput + " is already already a topic.  Please make another choice");
      }else if (userInput === "" || userInput === null){
        return false;
      }else if  (topics.indexOf(userInput) === -1) {
          topics.push(userInput);
          console.log(topics);
      }
});

createButtons();

// This is an event listener to create a new topic button
$(document).on("click", ".topicsBtn", displayEmotions);




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