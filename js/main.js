$(document).on('pageinit', '#reader', function() {
    $.get('./data/sample.txt', function(data){
        var texts = data.split(/\r\n|\r|\n/);
        var start = 2;
        var end = texts.length;

        $(document).find('p').html(texts[start]);
        $(document).on('touchstart', 'p', function() {
            console.log("左スワイプが検知されました");

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
        });
    });
});