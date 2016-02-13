var usrInfo = {};

$(document).on('pageinit', '#reader', function() {
    $.get('./data/sample.txt', function(data){
        // var texts = data.split(/\r\n|\r|\n/);
        var texts = data.split("。");
        var text = ""
        var start = 7475;
        var end = texts.length;
        console.log(end);

        finishReading();

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', requestTextFeature);

        function finishReading() {
            text = ""
            for (var i = 0; i < 4; i++) {
                text += texts[start] + "。";
                start++;
            }

            if (start > end) {
                return true;
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

            var num = yomuu.extractTextFeature(text);
            console.log(num);

            $(document).find("p#contents").html(result);
            return false;
        }

        function requestTextFeature() {
            // var promise = $.when(
            //     $(document).find('.ten').each(function(index, element) {
            //         var offset = $(element).offset();
            //         console.log("left = " + offset.left + ", top = " + offset.top);
            //     })
            // );

            // promise.done(function() {
            //     TweenMax.to($(element), 1, {
            //         y: "+=300"
            //     },
            //     onComplete: function() {

            //     });

            //     if (finishReading()) {
            //         var pages = myNavigator.getPages();
            //         pages[pages.length - 2].destroy();
            //         myNavigator.popPage();
            //         console.log(pages);
            //     }
            // });

            if (finishReading()) {
                var pages = myNavigator.getPages();
                pages[pages.length - 2].destroy();
                myNavigator.popPage();
                console.log(pages);
            }
        }

        function finishedReading() {
            return start > end;
        }

        function offEvent() {
            $(document).off('touchstart', 'p', requestTextFeature);
        }
    });
});
