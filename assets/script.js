// initial source of topics for gifs
var topics = ['Donald Trump', 'Barack Obama', 'George W. Bush', 'Bill Clinton', 'George H.W. Bush', 'Ronald Reagan', 'Jimmy Carter'];
      // variable to hold the search term
var president;
      // api key plus search term
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      		president + "&api_key=dc6zaTOxFJmzC&limit=10";
 // initializes the gif search buttons
function renderButtons() {
 	$("#gifButton").empty();
 	// array is sorted through to get the val of each button generated
    for (var i = 0; i < topics.length; i++) {
     	var a = $(" <button> ");
    	a.addClass("topics");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#gifButton").append(a);
    	}
	}
	// initializes all the action when the page is fully rendered
 $(document).ready(function(){
 	// Calls the function to make the buttons for the search
	renderButtons();
	// starts the ajax search of the gif api when pressed
	$(document).on("click", ".topics", function() {
	event.preventDefault();
	president = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       		president + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
    	url: queryURL,
        method: "GET"
      	})
    // waits for the ajax call to get a response and then begins moving on
      	.done(function(response) {
    		var results = response.data;
    		// for each gif result, this adds 5 dif attributes 
          	for (var s = 0; s < results.length; s++) {
            	var gifDiv = $("<div class='item' id='fixed'>");
            	// gets rating from api response
            	var rating = results[s].rating;
            	// creates a paragraph tag to hold the ratings
            	var p = $("<p>").text("Rating: " + rating);
            	// creates an image tag and sets up the img attributes
            	var personImage = $("<img>");
            	// initial src as still
            	personImage.attr("src", results[s].images.fixed_height_still.url);
            	// clicked src as animated
            	personImage.attr("data-animate", results[s].images.fixed_height.url);
            	// clicked src as still
            	personImage.attr("data-still", results[s].images.fixed_height_still.url);
            	// sets data-state to still to begin a toggle when gif is clicked
            	personImage.attr("data-state", "still");
            	// sets class of gif to gif
            	personImage.attr("class", "gif");
            	// puts the gifs and ratings on the page
            	gifDiv.prepend(p);
            	gifDiv.prepend(personImage);
            	$("#gifSpace").prepend(gifDiv);
          		} 
       		});
  		});
	// add a president button
	$("#addAPrezButton").on("click", function(event) {
		event.preventDefault();
		// grabs the text value from the text input 
		var newPrez = $("#addAPrez").val().trim();
        // adds new input to topics array	
        topics.push(newPrez);
        //renders all new buttons adding the new array item
        renderButtons();
	 	});	
	// sets gifs to clickable
	$(document).on("click", ".gif", function() {
   		var state = $(this).attr("data-state");
   		// if the gif is still, change to animate
   		if (state === "still") {
        	$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
        	// if the gif is animated, change to still
			} else {
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
      		}
      
    	});
	});

      

	
      	    
      