const quoteParagraphSelector = document.getElementById('quote-paragraph');
const cite = document.getElementById('cite');
const quoteList = bibleQuotes;
let quoteNr = 0;

const animate = ( words, author ) => {
    let maxDelay = 0;
    let maxDuration = 0;

    quoteParagraphSelector.innerHTML = "";
    cite.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        let spanElement = document.createElement("span");
        spanElement.innerHTML = `${words[i]} `;
        quoteParagraphSelector.appendChild(spanElement);

        const word = spanElement;
        const duration = Math.random() + 1;
        const delay = Math.random() * 0.5;
        const blur = Math.floor(Math.random() * (9)) + 2;

        maxDelay = Math.max(delay, maxDelay);
        maxDuration = Math.max(duration, maxDuration);

        TweenLite.set(word, {
            'webkitFilter': `blur(${blur}px)`
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
        const baseDelay = 6.5;
        TweenLite.set(document.getElementsByTagName('span'), { className:"-=animate", delay: baseDelay });
    TweenLite.set(cite, { className:"-=animate", delay: (baseDelay) });


    quoteNr = ++quoteNr % quoteList.length;
    TweenLite.delayedCall((baseDelay + (maxDuration*2)), animate, [quoteList[quoteNr].quote.split(" "), quoteList[quoteNr].author]);

})
};

animate(quoteList[quoteNr].quote.split(" "), quoteList[quoteNr].author);

