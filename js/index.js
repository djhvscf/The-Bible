$(function() {
    $.ajax({
        url:"http://labs.bible.org/api/",
        dataType: "jsonp",
        type: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data: "passage=random&type=json",
        success: function(data) {
            if (data.length > 0) {
                $("#verse").html(data[0].chapter + ":" + data[0].verse + ". " + data[0].text.split("<a")[0]);
                $("#bookname").html(data[0].bookname);
            } else {
                $("#verse").html("<h2>No scripture was returned, please try again!</h2>");
            }
        },
        error:function() {
            $("#verse").html("<h2>No scripture was returned, please try again!</h2>");
        },
    }); 
});