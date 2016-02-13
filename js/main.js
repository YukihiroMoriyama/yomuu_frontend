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
            var $request = $.ajax({
                type: 'get',
                url: 'https://yomuu-api.herokuapp.com/textFeature',
                data: {
                    'text': text
                }
            });

            $request.done(function(res) {
                console.log(res);

                TweenMax.staggerTo(".ten", 0.5, {y:200}, 0.5, showText);
                // TweenMax.to(".ten", 0.5, {
                //   y: "+=300"
                // },);

                // $(document).find('.ten').each(function(index.element) {
                //     var offset = $(element).offset();
                //     console.log("left = " + offset.left + ", top = " + offset.top);
                // });
            });

            $request.fail(function(xhr, status, error) {
                console.log(error);
            });

            /* デバック用 */
            // start++;
            // if (start >= end) return;
            // $(document).find("p").html(texts[start]);
        }

        function offEvent() {
            $(document).off('touchstart', 'p', requestTextFeature);
        }
    });
});