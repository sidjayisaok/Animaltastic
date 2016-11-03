//basic array
    let categories =[];

    const giphyReturn = (response)=>{
  	//this part handles the gif logic
                        let APIresults = response.data;
                        let imageUrl = APIresults.image_url;
                        let imageMP4 = APIresults.image_mp4_url
                        let giphyImage = $("<img>");
                        let p = $("<p>");

                       giphyImage.attr('src', imageUrl);
                       giphyImage.attr('alt', 'giphy image');
                       $("#images").empty();
                       $("#images").prepend(p);
                       $('#images').prepend(giphyImage);
                       $('#giphyURL').empty();
                       $('#giphyURL').append(imageUrl);
						//this part handles the MP4 logic
                       $('#images').on('click', 'img', ()=>{
                         let giphyVideo = $("<video>");
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
}

	  //this creates our buttons from search results
      const makeButtons = ()=> {
        $('#buttons').empty();
        for(let i = 0; i < categories.length; i++){
          let buttons = $("<button>");
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
      $('#findGiphy').click(()=>{
          search = $('#giphySearch').val();
          categories.push(search);
          //this returns a button based on the search result
		  makeButtons();
		  //setup the link for the API
          const queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;
		  //AJAX call
          $.ajax({
            url: queryURL,
            method: 'GET'
          }).done((response)=>{
            giphyReturn(response);
          });
              return false;
      });
	  //this removes the search buttons
      $('#clearGiphy').click(()=>{
        categories.remove();
        return false;
      });
	  //this makes the buttons return a gif when clicking them	
      const workButtons = ()=>{
        $('#buttons').unbind().on('click', 'button', ()=>{
             let thisClick = $(this).text();
			 //url for API
             const clickURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + thisClick;

             $('#images').empty();

             $.ajax({url: clickURL,
                     method: 'GET'
             }).done((response)=>{
               giphyReturn(response);
             });
         });
      }
	//function to execute the button
    $(document).on('click', 'input', workButtons);

    makeButtons();