$(document).ready(function(){
	document.addEventListener('deviceready',onDeviceReady, false);
});

function onDeviceReady(){
	
	/*//check local storage for channel
	if(localStorage.channel == null || localSotrage.channel == ''){
		//Ask User for Channel
		$('#popupDialog').popup("open");
	} else{
			var channel = localStorage.getItem('channel');
			}

			getPlaylist(channel);

	$(document).on('click','#vidlist li', function(){
		showVideo($(this).attr('videoId'));
	});*/ 


/*('#channelBtnOK').click(function(){
		var channel = $('#channelName').val();
		setChannel(channel);
		getPlaylist(channel);
	});			

	$(document).on('pageinit', '#options', function(e){
		var channel = localStorage.getItem('channel');
		var maxResults = localStorage.getItem('maxResults');
		$('#channelNameOptions').attr('value', channel);
		$('#maxResultsOptions').attr('value', maxResults);
	});

	*/
}

var channel = 'phonegap';

        getPlaylist(channel);

    	$(document).on('click','#vidlist li', function(){
		showVideo($(this).attr('videoId'));
	});

 $('#saveOptions').click(function(){
		saveOptions();
	});

	$('#clearChannel').click(function(){
		clearChannel();
	});
		
	
function getPlaylist(channel){
	$('#vidlist').html('');
	$.get(
		   "https://www.googleapis.com/youtube/v3/channels?",
		   {
		   	part: 'contentDetails',
		   	forUsername: channel,
		   	key:'AIzaSyCIOaQzWS76OiaMZSVDGAeb-_8YilWTDwc'
		   },
		   function(data){
		   	$.each(data.items, function(i, item){
		   	   /*console.log(item);*/
		   	   playlistId = item.contentDetails.relatedPlaylists.uploads;
		   	   getVideos(playlistId, /*localStorage.getItem('maxResults')*/5);
		   	});
		}
)};
	function getVideos(playlistId, maxResults){
	$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems?",
		{
			part: 'snippet',
			maxResults: maxResults,
			playlistId: playlistId,
			key:'AIzaSyCIOaQzWS76OiaMZSVDGAeb-_8YilWTDwc'
		}, function(data){
			console.log(data);
			var output;
			$.each(data.items, function(i, item){
				/*console.log(item);*/
				id = item.snippet.resourceId.videoId;
				title = item.snippet.title;
				thumb = item.snippet.thumbnails.default.url;
				$('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
				$('#vidlist').listview('refresh');

				/*output = '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
				output ='<li>'+title+'</li>';
				$('#results').append(output);*/
				
			});
		}
		);
}

function showVideo(id){
	console.log('Showing Video'+id);
	$('#logo').hide();
	var output = '<iframe width="380" height="300" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
	$('#showVideo').html(output);
}


function setChannel(channel){
localStorage.setItem('channel', channel);
console.log('Channel Set: '+channel);
}

function setMaxResults(maxResults){
localStorage.setItem('maxResults', maxResults);
console.log('Max Results Changed: '+maxResults);
}


function saveOptions(){
	var channel = $('#channelNameOptions').val();
	setChannel(channel);
	var maxResults=$('#maxResultsOptions').val();
	setMaxResults(maxResults);
	$('body').pagecontainer('change', '#main',{options});	
	getPlaylist(channel);
}

function clearChannel(){
	localStorage.removeItem('channel');
	$('body').pagecontainer('change', '#main',{options});
	// CLear list
	$('#vidlist').html('');
	// Show popup
	/*$('#popupDialog').popup('open');*/
}


/*



*/



/*	var channelName = 'youtube'

$(document).ready(function(){
	$.get(
		"https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=youtube&maxResults=5&key=AIzaSyCIOaQzWS76OiaMZSVDGAeb-_8YilWTDwc"),
		   	function(data){
		   	$.each(data.items, function(i, item){
		   	   console.log(item);
		   	   playlistId = item.contentDetails.relatedPlaylists.uploads;
		   	   getVideos(playlistId, localStorage.getItems('maxResults'));
		   	})

		   }	
		

	function getVideos(){
		$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UUBR8-60-B28hp2BmDPdntcQ&key=AIzaSyCIOaQzWS76OiaMZSVDGAeb-_8YilWTDwc"),
		   	function(data){
		   		var output;
			$.each(data.items, function(i, item){
		   	   console.log(item);
		   	  videTitle= item.snippet.title;


		   	  output = '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';

		   	  //Append to results
		   	  $('#results').append(output);
		   	})

		   }	
		


		}
});
*/


