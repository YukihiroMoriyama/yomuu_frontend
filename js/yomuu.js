var yomuu = {};

yomuu.extractTextFeature = function(text) {
    function countRegex(str, regexp) {
	return (str.match(regexp) || []).length;
    }

    var touten = countRegex(text, new RegExp('、', 'g'));
    var kuten  = countRegex(text, new RegExp('。', 'g'));

    return {
	"touten": touten,
	"kuten":  kuten,
	"length": text.length
    };
};

yomuu.grantAlignment = function(text) {
    var result = "";
    tmp = text.split('。');
    for (var i = 0; i < tmp.length; i++) {
        if (i !== tmp.length - 1) {
            result = result + (tmp[i] + "<div class='ten'>。</div>");
        }
    }

    var tmp = result.split('、');
    if (tmp.length >= 2) {
        result = ""
        for (var i = 0; i < tmp.length; i++) {
            if (i !== tmp.length - 1) {
                result += (tmp[i] + "<div class='ten'>、</div>");
            } else {
                result += tmp[i];
            }
        }
    }
    return "<br><br><br><br><br><br>" + result;
}

// var text = '本日は、晴aaaa天なりaaa。、、、、。。';
// console.log(yomuu.extractTextFeature(text));

yomuu.ayatori = new VincluLed(100, 100);

yomuu.blinkLed = function(t) {
    t = typeof t !== 'undefined' ?  t : 100;

    return new Promise(function(resolve, reject) {
	var on = function() {
	    yomuu.ayatori.on();
	};

	var off = function() {
	    yomuu.ayatori.off();
	    resolve();
	};

	on();

	setTimeout(off, t);
    });
};
// yomuu.blinkLed();

yomuu.blinkLedN = function(n, t) {
    t = typeof t !== 'undefined' ?  t : 100;

    var p = yomuu.blinkLed();
    for (var i = 1; i < n; i++) {
	p = p.then(function() {
	    return yomuu.blinkLed(t);
	});
    }
};
