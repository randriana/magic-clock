var quoteParagraphSelector = document.getElementById('quote-paragraph');
var cite = document.getElementById('cite');
var quoteList = bibleQuotes;
var quoteNr = 0;

var animate = function( words, author ) {
    var maxDelay = 0;
    var maxDuration = 0;

    quoteParagraphSelector.innerHTML = "";
    cite.innerHTML = "";

    for (var i = 0; i < words.length; i++) {
        var spanElement = document.createElement("span");
        spanElement.innerHTML = words[i] + ' ';
        quoteParagraphSelector.appendChild(spanElement);

        var word = spanElement;
        var duration = Math.random() + 1;
        var delay = Math.random() * 0.5;
        var blur = Math.floor(Math.random() * (9)) + 2;

        maxDelay = Math.max(delay, maxDelay);
        maxDuration = Math.max(duration, maxDuration);

        TweenLite.set(word, {
            'webkitFilter': 'blur(' + blur 'px';
        });
        TweenLite.set(word, {
            className:"+=animate",
            transition: `all ${duration}s ease-in ${delay}s`
        })
    }

    cite.innerHTML = `- ${author}`;

    TweenLite.set(cite, {
        className:"+=animate",
        transition: `all ${maxDuration}s ease-in ${maxDelay}s`
    });

    TweenLite.delayedCall((maxDuration + maxDelay), () => {
        var baseDelay = 6.5;
        TweenLite.set(document.getElementsByTagName('span'), { className:"-=animate", delay: baseDelay });
    TweenLite.set(cite, { className:"-=animate", delay: (baseDelay) });


    quoteNr = ++quoteNr % quoteList.length;
    TweenLite.delayedCall((baseDelay + (maxDuration*2)), animate, [quoteList[quoteNr].quote.split(" "), quoteList[quoteNr].author]);

})
};

animate(quoteList[quoteNr].quote.split(" "), quoteList[quoteNr].author);

