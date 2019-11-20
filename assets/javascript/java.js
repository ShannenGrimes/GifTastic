  //Create an array of strings, each one related to a topic (emotions). Save it to a variable called topics.
  var topics = ['Sad', 'Happy', 'Angry', 'Funny']
  //Create a variable for the button that the user can create and then click to display gifs from the GIPHY API.
  var emotionBtn;
  //Create variable for gif image.
  var emotionImage;

  function createButtons() {
  //Take topics in array and create buttons in the HTML.
  //Use a loop that appends a button for each string in the array.
  //Dynamically generate buttons for each emotion in array.

  //Deleting the initial emotions so I don't have duplicate buttons.
  $("#emotion-btn-div").empty();

  for (var i=0; i < topics.length; i++) {
    //Create variable for button.
    var emotionBtn = $("<button>");
    //Add emotion's name to button.
    emotionBtn.text(topics[i]);
    //Assign a data attribute to each button.
    emotionBtn.attr("data-name", topics[i]);
    //Add a class of emotion-btn to each button as well as other classes to change the color, padding, and margin of the button.
    emotionBtn.addClass("btn btn-warning p-2 mr-3 mb-2 emotion-btn");
    //Append each button to the emotion-btn-div in the HTML.
    $("#emotion-btn-div").append(emotionBtn);
  }
}

  //When you click an emotion button...
  //displayemotionImages function re-renders the HTML to display the appropriate content
  function displayemotionImages() {
    //Each time an emotion button is clicked and data is retrieved, empty out the columns in the results-div.
    $("#results-div-col1").empty();
    $("#results-div-col2").empty();
    $("#results-div-col3").empty();
    $("#click-to-play-text").empty();

    var emotion = $(this).attr("data-name");
    //Construct our query URL to access and obtain data from the GIPHY API.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=opcXvH1EedAhrs1Wgk3307og6EraPeHR&limit=10";

    //Our jQuery AJAX method. Perform AJAX GET request to the queryURL to get data from GIPHY API.
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      //After the data from the AJAX request comes back.
      .done(function(response) {
        //debugger
        console.log(response);
        var results = response.data;
        //Display text to the user about how to play and pause a gif in the gif search results section.
        $("#click-to-play-text").append("<h4>" + "Click a gif to play. Click again to pause." + "</h4>");

        for (var i = 0; i < results.length; i++) {

          // Only take action if the gif has an appropriate rating. 
          // This should not matter. Did extensive testing on this site and did not find pg-13 or r rated gifs for any of the emotions tested.
          //But, adding this if statement just in case...
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            //Create div element to hold gif image.. 
            var gifDiv = $("<div class='item'>");

            //Save results[i].rating property. Store in rating variable.
            var rating = results[i].rating;

            //Display rating of gif.
            var p = $("<p>").text("Rating: " + rating);

            //Need to give each gif/image some attributes so that the user can play and pause a gif on demand.
            var emotionImage = $("<img>");
            emotionImage.attr("src", results[i].images.fixed_height_still.url);
            emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
            emotionImage.attr("data-animate", results[i].images.fixed_height.url);
            emotionImage.attr("data-state", "still");
            emotionImage.addClass ("img-fluid gif border border-warning");

            //Prepend rating paragraph to the div that was created to hold the gif image.
            gifDiv.prepend(p);
            //Prepend gif image to the div that was created to hold the gif image.
            gifDiv.prepend(emotionImage);

            //Add the first three gifs retrieved from the GIPHY API call to the results-div-col1 column in the HTML.
            if (i >= 0 && i < 3) {
              $("#results-div-col1").append(gifDiv);
            }

            //Then, add the next four gifs retrieved from the GIPHY API call to the results-div-col2 column in the HTML.
            else if (i >= 3 && i < 7) {
              $("#results-div-col2").append(gifDiv);
            }

            //Finally, add the last three gifs retrieved from the GIPHY API call to the results-div-col3 column in the HTML.
            else {
              $("#results-div-col3").append(gifDiv);
            }
          }


        }

        //When the user clicks a gif in the search results section...
        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element.
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } 
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });
}

  //When submit/add button is clicked in the "Add your favorite emotion" section, add emotion-input from the search box to topics array.
  $("#submit-button").on("click", function(event) {

    //The following code prevents the submit/add button from trying to submit the form.
    //Using a form so that the user can press Enter to search instead of clicking the button.
    event.preventDefault();
    //Grab the input from the text box and change the value to lower case.
    var emotionInput = $("#emotion-input").val().toLowerCase();

    //Remove the emotion's name from text box after user clicks add/submit-button.
    $("#emotion-input").val("");

    //If the input from the search box is already in the topics array, alert to the user that the emotion is already available.
    if (topics.indexOf(emotionInput) > -1) {
      alert(emotionInput + " is already already a topic.  Please make another choice");
    }

    //If text box is empty, don't create button. Nothing should happen when user clicks Add icon.
    else if (emotionInput === "" || emotionInput === null) {
      return false;
    }

    //else if the input from the search box is not in the topics array, add emotion to topics array and create button for emotion.
    else if (topics.indexOf(emotionInput) === -1) {
    //add or push emotionInput from text box to topics array.
    topics.push(emotionInput);
    console.log(topics);
    //call createButtons, which handles the processing of topics array.
    createButtons();
    }
  });

  //Call createButtons() to display initial buttons.
  createButtons();

//Create click event for all elements with a class of emotion-btn.
$(document).on("click", ".emotion-btn", displayemotionImages);








