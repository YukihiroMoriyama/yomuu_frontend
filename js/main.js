$(document).on('pageinit', '#reader', function() {
    $.get('./data/sample.txt', function(data){
        var texts = data.split(/\r\n|\r|\n/);
        var start = 2;
        var end = texts.length;

        $(document).find('p').html(texts[start]);

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', requestTextFeature);

        function requestTextFeature() {
            var $request = $.ajax({
                type: 'post',
                url: 'https://yomuu-api.herokuapp.com/textFeature',
                data: {
                    'text': texts[start]
                }
            });

            $request.done(function(res) {
                console.log(res);
                start++;
                if (start >= end) return;
                $(document).find("p").html(texts[start]);
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