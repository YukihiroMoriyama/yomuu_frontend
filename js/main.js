var usrInfo = {};

$(document).on('pageinit', '#reader', function() {
    $.get('./data/neko.txt', function(data){
        var texts = data.split("。");
        var start = 0;
        var end = texts.length;

        showContents();

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', nextContents);

        function nextContents() {
            TweenMax.to($(document).find('.ten'), 1.3, {
                y: "-=500",
                onComplete: function() {
                    if (isNextText()) {
                        var pages = myNavigator.getPages();
                        pages[pages.length - 2].destroy();
                        myNavigator.popPage();
                    }
                    showContents()
                }
            }, 0.1);
        }

        function showContents() {
            var text = ""
            for (var i = 0; i < 5; i++) {
                text += texts[start] + "。";
                start++;
            }
            var num = yomuu.extractTextFeature(text);

            if (isNextText) {
                var contents = yomuu.grantAlignment(text);
            }
            $(document).find("p#contents").html(contents);
        }

        function offEvent() {
            $(document).off('touchstart', 'p', requestTextFeature);
        }

        function isNextText() {
            return start > end;
        }

        // function finishReading() {
        //     var result = "";
        //     tmp = text.split('。');
        //     for (var i = 0; i < tmp.length; i++) {
        //         if (i !== tmp.length - 1) {
        //             result = result + (tmp[i] + "<div class='ten'>。</div>");
        //         }
        //     }

        //     var tmp = result.split('、');
        //     if (tmp.length >= 2) {
        //         result = ""
        //         for (var i = 0; i < tmp.length; i++) {
        //             if (i !== tmp.length - 1) {
        //                 result += (tmp[i] + "<div class='ten'>、</div>");
        //             } else {
        //                 result += tmp[i];
        //             }
        //         }
        //     }

        //     var num = yomuu.extractTextFeature(text);
        //     $(document).find("p#contents").html(result);

        //     return false;
        // }
    });
});
