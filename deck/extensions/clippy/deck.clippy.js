(function( $ ) {

function clippyHtml( text ) {
	var swf = "deck/extensions/clippy/clippy.swf?text=" + encodeURIComponent( text );
	return "<object type='application/x-shockwave-flash'" +
		"data='" + swf + "' class='clippy'>" +
		"<param name='movie' value='" + swf + "'></object>";
}

$( document ).bind( "deck.init", function() {
	$.each( $.deck( "getSlides" ), function( i, $slide ) {
		$slide.find( "[data-copy]" ).each(function() {
			$( clippyHtml( $( this ).text() ) ).appendTo( this );
		});
	});
});

})( jQuery );
