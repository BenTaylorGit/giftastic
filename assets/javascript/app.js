// An array that stores the initial topics to append to the screen
var topics = ["Destiny", "Pokemon", "Halo", "Mario", "Luigi", "Borderlands", "Hearthstone", "Overwatch", "Xbox", "PlayStation", "Nintendo"];

//var newButton will hold the data stored in the topics array and be created as a button on the screen with jquery
var newButton;

// variable to hold user search and will be later used to add that search into the topics array
var newGifTopic = "";

// This function is used to create buttons on the screen from the topics array and will be called on initial load and whenever the user searches with the form
var createButton = function (){

	//Empties out the buttonSpawn div on the html doc 
     $("#buttonSpawn").empty();
     
	// For loop to create buttons with jquery and adds Bootstrap class as well as the the text entered into the search box and from the initial array of topics, then appends each button the the screen in the buttonSpawn div
	for(i = 0; i < topics.length; i++) {
		newButton = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn").attr("gifText",topics[i]);
		$("#buttonSpawn").append(newButton);
	};
}


// Click event for when a button is clicked on the page
$("#buttonSpawn").on("click", ".btn", function(){

        //var to store the text that is associated with the button pressed
        var userGif = $(this).attr("gifText");
          
        // var to store the api url and api key and searches for the gif based on the buttons text
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userGif + "&api_key=xeqkOlylcwWU9J1ziZyKj7IGUOGSZ5Bo";


        // AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the response function
  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
              
            //set a variable equal to the data recieved from the API call
          	var results = response.data;

            //for loop to create a new div that will hold the searched for gifs, add the rating of each gif, and add the animate still attributes to each gif, and finally appends and prepends that information to the gifSpawn div on the html doc
          	for (var i = 0; i < results.length; i++) {

	          	var gifDiv = $("<div>");
	 			
	          	// var to store the rating text and to create a new <p> 
	 			var ratingText = $("<p>");
	 			ratingText.text(results[i].rating);
	 			var ratingText = $("<p>").text("Rating: " + results[i].rating);

                // variable to create a new <img> on the page
                var newGifElement = $("<img>");

	 			// Setting the attributes on the new <img> to contain the states, animate or still. 
	 			newGifElement.attr("src", results[i].images.fixed_height_still.url);
	 			newGifElement.attr("gifStill", results[i].images.fixed_height_still.url);
	 			newGifElement.attr("gifAnimate", results[i].images.fixed_height.url)
	 			newGifElement.attr("gifState", "still")
	 			newGifElement.addClass("gif");
	 			
	 			//Append and prepend newly created gifs and ratings to the gifSpawn Div on the html doc
	 			gifDiv.append(newGifElement);
	 			gifDiv.append(ratingText); 			
	 			$("#gifSpawn").prepend(gifDiv);
 			}
  		})
  })


// Click event function to control what state the gifs are in, animte or still
$("#gifSpawn").on("click", ".gif", function(event){
	event.preventDefault();
	
	// variable to get the current state of the selected gif
	var currentState = $(this).attr("gifState");
	
	// logic to play or pause the gif based on its current state 
	if (currentState === "still") {
    $(this).attr("src", $(this).attr("gifAnimate"));
    $(this).attr("gifState", "animate");
  } else {
    $(this).attr("src", $(this).attr("gifStill"));
    $(this).attr("gifState", "still");
  }

})
   
//Click event function to take in what the user has typed into the search box and add a newGifTopic to the topics array. Then it will call the createButton function.
$(".submit").on("click", function(event){
	event.preventDefault();

	// stores the users search 
    newGifTopic = $("#gifSearch").val();
    
	// adds the user search into the array
	topics.push(newGifTopic);

	// Creates the new topic as a button
	createButton();
});


//Initial topic buttons
createButton();