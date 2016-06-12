$(function() {
    $.ajax({
    url:'https://labs.bible.org/api/',
    dataType: 'json',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
    },
    contentType: "application/json; charset=utf-8",
    data: 'passage=random',
    success:function(json) {
        // set text direction
        if (json.direction == 'RTL') {
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr'; 
        }
        // check response type
        if (json.type == 'verse') {
            var output = '';
            	$.each(json.book, function(index, value) {
                	output += '<center><b id="book-name">'+value.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+ direction +' scripture">';
                    $.each(value.chapter, function(index, value) {
                        output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
                        output += value.verse;
                        output += '<br/>';
                    });
                    output += '</p>';
            	});
            $('#verse').html(output);  // <---- this is the div id we update
        } else if (json.type == 'chapter') {
            var output = '<center><b>'+json.book_name+' '+json.chapter_nr+'</b></center><br/><p class="'+direction+'">';
            $.each(json.chapter, function(index, value) {
                output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
                output += value.verse;
                output += '<br/>';
            });
            output += '</p>';
            $('#verse').html(output);  // <---- this is the div id we update
        } else if (json.type == 'book') {
            var output = '';
            $.each(json.book, function(index, value) {
                output += '<center><b>'+json.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+direction+'">';
                $.each(value.chapter, function(index, value) {
                    output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
                    output += value.verse;
                    output += '<br/>';
                });
            output += '</p>';
        });
        if(addTo) {
        	$('#verse').html(output);  // <---- this is the div id we update
        }
    }
    },
    error:function(){
        $('#verse').html('<h2>No scripture was returned, please try again!</h2>'); // <---- this is the div id we update
     },
});  
});