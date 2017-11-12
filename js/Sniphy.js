//basic array
    let categories =[];

    //basic function to handle DRY requests
    const giphyReturn = (response)=> {
  	//this part handles the gif logic
    let APIresults = response.data;
    // let newAPI = APIresults.replace(/http/i, 'https');
    let imageUrl = APIresults.image_url;
    let imageMP4 = APIresults.image_mp4_url;
    //change http to https
    if(!imageUrl.indexOf("https") > -1){
      imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
    }
    else if(!imageMP4.indexOf("https") > -1){
      imageMP4 = imageMP4.replace(/^http:\/\//i, 'https://');
    };
    let giphyImage = $("<img>");
    let p = $("<p>");

    giphyImage.attr('src', imageUrl);
    giphyImage.attr('alt', 'giphy image');
    $("#images").empty();
    $("#images").prepend(p);
    $('#images').prepend(giphyImage);
    $('#giphyURL').empty();
    $('#giphyURL').append("<div><img src=" + imageUrl + " alt='popup'></div>");
		//this part handles the MP4 logic
    $('#images').on('click', 'img', function(){
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
      $('#giphyURL').append("<div><video src=" + imageMP4 + " type='video/MP4' autoplay loop controls></video></div>");
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
      return false;
      }

	  //this executes our basic search via the form and button
      $('#findGiphy').unbind().on('click', function(){
          search = $('#giphySearch').val();
          categories.push(search);
          //this returns a button based on the search result
		      makeButtons();
		      //setup the link for the API
          let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;
		     //AJAX call
          $.ajax({
            url: queryURL,
            method: 'GET'
          }).done((response)=>{
            giphyReturn(response);
          });
          return false;
      });
      //this resets the page
      $('#clearGiphy').on('click', function(){
        location.reload();
        return false;
      });

	  //this makes the buttons return a gif when clicking them
    //for some reason arrow function doesn't work in the callback
      const workButtons = ()=>{
        $('#buttons').unbind().on('click', 'button', function(){
          let thisClick = $(this).text();
			    //url for API
          let clickURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + thisClick;
             $('#images').empty();
             //ajax query
             $.ajax({
               url: clickURL,
               method: 'GET'
             }).done((response)=>{
               giphyReturn(response);
             });
         });
      }
	//function to execute the aggregated button
  $(document).on('click', 'input', workButtons);
  //call to make buttons
  makeButtons();


  //trigger modal
    const param = document.getElementById('popGiphy');
    const closeButton = document.getElementById('close');
    const giphyModal = document.getElementsByClassName('giphy-modal')[0];

    param.onclick = function(){
      giphyModal.style.display = 'block';
    };

    closeButton.onclick = function(){
      giphyModal.style.display = 'none';
    };

    window.onclick = function(){
      if(event.target === giphyModal){
        giphyModal.style.display = 'none';
      }
    };


