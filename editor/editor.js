$(function() {
	var settings = {
			indentUnit: 4,
			lineNumbers: true,
			matchBrackets: true,
			onKeyEvent: function( editor, event ) {
				// cmd+s -> build preview
				if ( event.type === "keydown" && event.metaKey && event.keyCode === 83 ) {
					buildPreview( event );
				}
				// cmd+d -> delete line
				if ( event.type === "keydown" && event.metaKey && event.keyCode === 68 ) {
					editor.removeLine( editor.coordsChar( editor.cursorCoords() ).line );
					event.stop();
				}
			}
		},
		editors = {
			page: { mode: "htmlmixed" },
			html: { mode: "htmlmixed" },
			js: { mode: "javascript" }
		};

	function buildPreview( event ) {
		event.stop();

		$( "#preview iframe" ).remove();
		var preview = $( "<iframe>" ).appendTo( "#preview" )[0].contentDocument,
			page = editors.page.getValue(),
			html = editors.html.getValue(),
			js = editors.js.getValue();

		preview.open();
		preview.write( page.replace( "{{html}}", html ).replace( "{{js}}", js ) );
		preview.close();
	}

	$.each( editors, function( name, editorSettings ) {
		editors[ name ] = CodeMirror.fromTextArea(
			$( "#" + name + "-editor" )[0],
			$.extend( {}, settings, editorSettings ) );

		var editorElement = $( editors[ name ].getWrapperElement() );
		$( "<h1>", { text: name + " editor", "class": "clickable" } )
			.click(function() {
				editorElement.slideToggle();
			})
			.insertBefore( editorElement );
	});

	window.onbeforeunload = function() {
		return "";
	};
});