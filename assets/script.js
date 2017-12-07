//source of the gifs

      
      var topics = ['Donald Trump', 'Barack Obama', 'George W. Bush', 'Bill Clinton', 'George H.W. Bush', 'Ronald Reagan', 'Jimmy Carter'];
      var president;
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      		president + "&api_key=dc6zaTOxFJmzC&limit=10";
      //var person = "taylor swift";
      //var i;
 
     

 function renderButtons() {

 	$("#gifButton").empty();
    for (var i = 0; i < topics.length; i++) {
     	var a = $("<button>");
    	a.addClass("topics");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#gifButton").append(a);
        console.log(topics[i]);
    	}
	}
 $(document).ready(function(){
	renderButtons();
	// $("button").click(function() {
	$(document).on("click", ".topics", function() {
	event.preventDefault();
	president = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       		president + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(president);
    $.ajax({
    	url: queryURL,
        method: "GET"
      	})
      	.done(function(response) {
      		console.log(response)
    		var results = response.data;

          	for (var s = 0; s < results.length; s++) {
            	var gifDiv = $("<div class='item' id='fixed'>");

            	var rating = results[s].rating;

            	var p = $("<p>").text("Rating: " + rating);

            	var personImage = $("<img>");
            	personImage.attr("src", results[s].images.fixed_height_still.url);
            	personImage.attr("animate", results[s].images.fixed_height.url);

            	gifDiv.prepend(p);
            	gifDiv.prepend(personImage);

            	$("#gifSpace").prepend(gifDiv);
          		} 
       		});
  		});
	$("#addAPrezButton").on("click", function(event) {
		event.preventDefault();
		var newPrez = $("#addAPrez").val().trim();
        	
        topics.push(newPrez);
        console.log(topics);
        renderButtons();
	 	});	
	$(document).on("click", ".item", function() {
	//$(".fixed").on("click", function() {
		
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
   var state = $(this).attr("id");
   if (state === "fixed") {
   	console.log('holla')
   	$(this).attr("src", $(this).attr("animate"));
   		
   }
   		
      //   $(this).attr("src", $(this).attr("data-animate"));
      //   $(this).attr("data-state", "animate");
      // } else {
      //   $(this).attr("src", $(this).attr("data-still"));
      //   $(this).attr("data-state", "still");
      // }
    });
	});

      

	
      	    
      