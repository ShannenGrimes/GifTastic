// Add an event listener
// API and key with a query
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VX622cLsOOgpgoP4s16d5fPVpe2wOAit&q=emotions&limit=10&offset=0&rating=PG&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

// Create a variable of topic
var topics = ['Sad', 'Happy', 'Angry']
// Create button for the user to add a topic

// Dynamically create a button to the html and append new images

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