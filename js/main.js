var usrInfo = {
    restBooks: 5, // 積読数
    endBooks: 0, // 読書数
    kutouten: 0,
};

var bookName = "";
$(document).on('touchstart', '.cover', function(event) {
    bookName = event.target.alt;
});

$(document).on('pageinit', '#reader', function() {
    $.get('./data/' + bookName + '.txt', function(data){
        var texts = data.split("。");
        var start = 0;
        var end = texts.length;

        // デバック
        start = end - 10;

        showContents();

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', nextContents);

        function nextContents() {
            TweenMax.to($(document).find('.ten'), 1.3, {
                y: "-=500",
                onComplete: function() {
		    yomuu.blinkLedN(12, 100);

                    if (!isNextText()) {
                        // デバック
                        usrInfo['restBooks'] -= 5;
                        usrInfo['endBooks'] += 5;
                        $('#read').html(usrInfo['endBooks']);
                        $('#top').attr('src', 'img/tundoku/book2d' + usrInfo['restBooks'] + '.png');

                        if (usrInfo['restBooks'] === 0) {
                            $('#chara').attr('src', 'img/lovemarukun.gif');
                            $('#chara').attr('width', '40%');
                            $('#click').attr('onclick', 'location.href = "http://shopping.yahoo.co.jp/category/10002/recommend?sc_i=shp_pc_top_cate_book_maga_comi:10002:rcmd";');
                        }

                        // デバック
                        start = end - 10;

                        var pages = myNavigator.getPages();
                        pages[pages.length - 2].destroy();
                        myNavigator.popPage();
                    } else {
                        showContents();
                    }
                }
            }, 0.1);
        }

        function showContents() {
            var text = "";
            for (var i = 0; i < 5; i++) {
                text += texts[start] + "。";
                start++;
            }
            var num = yomuu.extractTextFeature(text);
            usrInfo["kutouten"] += (num["touten"] + num["kuten"]);

            if (isNextText) {
                var contents = yomuu.grantAlignment(text);
                $(document).find("p#contents").html(contents);
            }
        }

        function offEvent() {
            $(document).off('touchstart', 'p', nextContents);
        }

        function isNextText() {
            return start < end;
        }
    });
});

$(document).on('pageinit', '#log', function() {
    console.log(usrInfo);
    var total = 22043;

    $('#read').html(usrInfo["endBooks"]);
    $('#tenmaru').html(Math.round( (usrInfo["kutouten"] / 100) * 10 ) / 10 * 100);

    // 円グラフが表示されるサンプルコード
    var opts = {
      lines: 12,
      angle: 0.35,
      lineWidth: 0.1,
      pointer: {
        length: 0.9,
        strokeWidth: 0.035,
        color: '#000000'
      },
      limitMax: 'false',
      colorStart: '#6F6EA0',
      colorStop: '#C0C0DB',
      strokeColor: '#EEEEEE',
      generateGradient: true
    };
    var target = document.getElementById('graph');
    usrInfo["gauge"] = new Donut(target).setOptions(opts);
    usrInfo["gauge"].maxValue = 100;
    usrInfo["gauge"].animationSpeed = 32;
    usrInfo["gauge"].set(usrInfo["kutouten"]);
});
