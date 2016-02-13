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
// var text = '本日は、晴aaaa天なりaaa。、、、、。。';
// console.log(yomuu.extractTextFeature(text));

yomuu.blinkLed = function() {
    var ayatori = new VincluLed(100, 100);

    var on = function() {
	ayatori.on();
    };

    var off = function() {
	ayatori.off();
    };

    on();

    setTimeout(off, 10);
};
// yomuu.blinkLed();
