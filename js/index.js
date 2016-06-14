var sprintf = function (str) {
    var args = arguments,
        flag = true,
        i = 1;

    str = str.replace(/%s/g, function () {
        var arg = args[i++];

        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
};

var getScriptures = function (random) {
    $("#bookname").html("");
    $("#verse").html("Loading verse...");
    
    $.ajax({
        url:"http://labs.bible.org/api/",
        dataType: "jsonp",
        type: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data: sprintf("passage=%s&type=json", random ? "random" : "votd"),
        success: function(data) {
            if (data.length > 0) {
                $("#verse").html(sprintf("<b>%s:%s</b> %s", data[0].chapter, data[0].verse, data[0].text.split("<a")[0]));
                $("#bookname").html(data[0].bookname);
            } else {
                $("#verse").html(sprintf("<h2>%s</h2>", "No scripture was returned, please try again!"));
                $("#bookname").html("");
            }
        },
        error:function() {
            $("#verse").html(sprintf("<h2>%s</h2>", "No scripture was returned, please try again!"));
            $("#bookname").html("");
        },
    });
};

$(function() {
    getScriptures(true);

    $("#daily-verse").click(function () {
        getScriptures(false);
    });

    $("#random-verse").click(function () {
        getScriptures(true);
    });
});