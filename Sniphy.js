//basic array
var categories =[];

	  //this creates our buttons from search results	
      function makeButtons(){
        $('#buttons').empty();
        for(var i=0; i < categories.length; i++){
          var buttons = $("<button>");
          buttons.addClass('letter letter-button-color');
          buttons.data('let', categories[i]);
          buttons.text(categories[i]);
          $("#buttons").append(buttons);
				
		  //this limits the amount of buttons to 25	 	
          if(i > 25){
            buttons.remove();
          }
      };
      }

	  //this executes our basic search via the form and button
      $('#findGiphy').click(function(){

          search = $('#giphySearch').val();
          categories.push(search);
          //this returns a button based on the search result
		  makeButtons();
		  //setup the link for the API		
          var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;
		  //AJAX call	
          $.ajax({
            url: queryURL,
            method: 'GET'
          })
			  //this adds a random gif/mp4 based on the search parameter	
              .done(function(response) {
                  var imageUrl = response.data.image_url;
                  var imageMP4 = response.data.image_mp4_url
                  var giphyImage = $("<img>");
                  var p = $("<p>");
                  giphyImage.attr('src', imageUrl);
                  giphyImage.attr('alt', 'giphy image');
                  $("#images").empty();
                  $("#images").prepend(p);
                  $('#images').prepend(giphyImage);
                  $('#giphyURL').empty();
                  $('#giphyURL').append(imageUrl);
				  //this part handles the mp4 when the image is clicked
                  $('#images').on('click', 'img', function(){
                    var giphyVideo = $("<video>");
                    giphyVideo.attr('src', imageMP4);
                    giphyVideo.attr('type', 'video/MP4');
                    giphyVideo.prop('autoplay', true);
                    giphyVideo.prop('loop', true);
                    giphyVideo.prop('controls', true);
                    $("#images").empty();
                    $("#images").prepend(p);
                    $('#images').prepend(giphyVideo);
                    $('#giphyURL').empty();
                    $('#giphyURL').append(imageMP4);
                  });
              });
              return false;
      });
	  //this removes the search buttons	
      $('#clearGiphy').click(function(){
        categories.remove();
        return false;
      });
	  //this makes the buttons return a gif when clicking them	
      function workButtons(){
        $('#buttons').unbind().on('click', 'button', function(){
             var thisClick = $(this).text();
             console.log(thisClick);
			 //url for API
             var clickURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + thisClick;

             $('#images').empty();

             $.ajax({url: clickURL,
                     method: 'GET'
             })
					//this part handles the gif logic
                   .done(function(response){
                     var APIresults = response.data;
                       var imageUrl = APIresults.image_url;
                       var imageMP4 = APIresults.image_mp4_url
                       var giphyImage = $("<img>");
                       var p = $("<p>");
                       giphyImage.attr('src', imageUrl);
                       giphyImage.attr('alt', 'giphy image');
                       $("#images").empty();
                       $("#images").prepend(p);
                       $('#images').prepend(giphyImage);
                       $('#giphyURL').empty();
                       $('#giphyURL').append(imageUrl);
						//this part handles the MP4 logic
                       $('#images').on('click', 'img', function(){
                         var giphyVideo = $("<video>");
                         giphyVideo.attr('src', imageMP4);
                         giphyVideo.attr('type', 'video/MP4');
                         giphyVideo.prop('autoplay', true);
                         giphyVideo.prop('loop', true);
                         giphyVideo.prop('controls', true);
                         $("#images").empty();
                         $("#images").prepend(p);
                         $('#images').prepend(giphyVideo);
                         $('#giphyURL').empty();
                         $('#giphyURL').append(imageMP4);
                       });
                   });
         });
      }
	//function to execute the button
    $(document).on('click', 'input', workButtons);

    makeButtons();