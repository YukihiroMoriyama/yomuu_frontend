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

        start = end - 10;

        showContents();

        $(document).on('touchstart', '#reader ons-back-button', offEvent);
        $(document).on('touchstart', 'p', nextContents);

        function nextContents() {
            TweenMax.to($(document).find('.ten'), 1.3, {
                y: "-=500",
                onComplete: function() {
		    // yomuu.blinkLedN(12, 100);

                    if (isNextText()) {
                        usrInfo['restBooks']--;
                        usrInfo['endBooks']++;
                        $('#read').html(usrInfo['endBooks']);
                        $('#top').attr('src', 'img/tundoku/book2d' + usrInfo['restBooks'] + '.png');

                        if (usrInfo['restBooks'] === 0) {
                            $('#chara').attr('src', 'img/laughmarukunS.gif');
                        }

                        var pages = myNavigator.getPages();
                        pages[pages.length - 2].destroy();
                        myNavigator.popPage();
                    }
                    showContents();
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
            }
            $(document).find("p#contents").html(contents);
        }

        function offEvent() {
            $(document).off('touchstart', 'p', nextContents);
        }

        function isNextText() {
            return start > end;
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
      lines: 12, // The number of lines to draw
      angle: 0.35, // The length of each line
      lineWidth: 0.1, // The line thickness
      pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#000000' // Fill color
      },
      limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
      colorStart: '#6F6EA0',   // Colors
      colorStop: '#C0C0DB',    // just experiment with them
      strokeColor: '#EEEEEE',   // to see which ones work best for you
      generateGradient: true
    };
    var target = document.getElementById('graph'); // your canvas element
    usrInfo["gauge"] = new Donut(target).setOptions(opts); // create sexy gauge!
    usrInfo["gauge"].maxValue = 100; // set max gauge value
    usrInfo["gauge"].animationSpeed = 32; // set animation speed (32 is default value)
    usrInfo["gauge"].set(usrInfo["kutouten"]); // set actual value
});
