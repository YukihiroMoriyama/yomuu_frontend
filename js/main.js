$(document).on('pageinit', '#reader', function() {
    $.get('./data/sample.txt', function(data){
        // var texts = data.split(/\r\n|\r|\n/);
        var texts = data.split("。");
        var text = ""
        var start = 0;
        var end = texts.length;

        showText();

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', requestTextFeature);

        function showText() {
            text = ""
            for (var i = 0; i < 4; i++) {
                text += texts[start] + "。";
                start++;
            }

            var result = "";

            tmp = text.split('。');
            for (var i = 0; i < tmp.length; i++) {
                if (i !== tmp.length - 1) {
                    result = result + (tmp[i] + "<div class='ten'>。</div>");
                }
            }

            var tmp = result.split('、');
            console.log(tmp);
            for (var i = 0; i < tmp.length; i++) {
                if (i !== tmp.length - 1) {
                    result = result + (tmp[i] + "<div class='ten'>、</div>");
                }
            }

            $(document).find("p").html(result);
        }

        function requestTextFeature() {
	    var result = yomuu.extractTextFeature(texts[start]);
	    console.log(result);

            start++;
            if (start >= end) return;

            $(document).find("p").html(texts[start]);
        }

        function offEvent() {
            $(document).off('touchstart', 'p', requestTextFeature);
        }
    });
});
