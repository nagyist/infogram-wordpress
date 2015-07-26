jQuery(function($){
	// call popup
	$('#call_infogr_popup').click(function(){
		$('#infogr_media_popup').fadeIn(300);
	});
	// close popup
	$('#close_infogr_popup').click(function(){
		$('#infogr_media_popup').fadeOut(300);
		$('#infogr_add_embed').val('');
		err_remove();

	});
	// on click on text field remove error
	$('#infogr_add_embed').on('input propertychange paste click', function(){
		err_remove();
	})
	// input graphics with link
	$('#infogr_embed').submit(function(){
		var check = ['https://infogr.am/','https://e.infogr.am/','?src=embed','/'];
		
		var link = $('#infogr_add_embed').val();
		
		if(link.indexOf(check[0])+1) {
			link = link.replace(check[0], '');
			if(link.indexOf(check[3])+1) {
				inforg_error( true );
				return false;
			}
			else {
				err_remove();
			}
		}
		else if(link.indexOf(check[1])+1) {
			if(link.indexOf(check[2])+1) {
				link = link.replace(check[1], '');	
				link = link.replace(check[2], '');	
			} else {
				link = link.replace(check[1], '');					
			}
			if(link.indexOf(check[3])+1) {
				inforg_error( true );
				return false;
			}
			else{
				err_remove();
			}
		}
		else {
			inforg_error( true );
			return false;
		}
		
		inforg_error( false );
		err_remove();
		
		infogr_generate_shortcode( link );
		$('#infogr_add_embed').val('');
		
		return false;
	});
	// show error
	function inforg_error( show ) {
		if( show ) {
			if(!$('span').is('.infogr_error')) {
				$('#infogr_embed').append('<span class="infogr_error">Please use a valid infogr.am URL that contains an infographic.</span>')
								  .addClass('infogr_error');
			}
		} else {
			if($('span').is('.infogr_error')) {
				$('span.infogr_error').remove();
				$('#infogr_embed').removeClass('infogr_error');
			}
		}
	}
	// remove error
	function err_remove() {
		if($('span').is('.infogr_error')) {
				$('span.infogr_error').remove();
				$('#infogr_embed').removeClass('infogr_error');
			}
	}
	// Generate the shortcode
	function infogr_generate_shortcode( embed, code ) {
		var shortcode = '[infogram';
	
		if ( embed )
			shortcode = shortcode + ' id="' + embed + '"';
		if ( code )
			shortcode = shortcode + ' prefix="' + code + '"';

		shortcode = shortcode + ']';
		window.send_to_editor( shortcode );
		$('#close_infogr_popup').click();		
	}
	// Generate the shortcode
	$('.infographic').click(function(){
		var embed = $(this).attr('data-embed');
		var code = $(this).attr('data-code');
		infogr_generate_shortcode( embed, code );
	});
	// Nice scroll
	if($(".container_infographic").length)
		$(".container_infographic").niceScroll({cursorborder:"",cursorcolor:"#656565"});
});