document.body.style.border = "5px solid red";

function bait_img() {
    let img = document.createElement("img");
    img.setAttribute("src", browser.extension.getURL("icons/bait.png"));
    return img;
}

function yt_bait_score(str) {
    var score = 10;
    var nb_upper = str.length - str.replace(/[A-Z]/g, '').length;
    score += (nb_upper/str.length) * 100;
    if (str.length > 50) {
	/* The title dont even fit x) */
	score += 10;
    }
    if (str.match(/mix/i) && str.match(/music/i)) {
	score -= 10;
    }
    if (str.match(/\d+/) && (str.match(/top/i) || str.match(/best/i) || str.match(/people/i) || str.match(/thing/i))) {
	score += 50;
    }
    if (str.match(/you/i) && (str.match(/must/i) || str.match(/should/))) {
	score += 10;
    }
    if ((str.match(/but/i) || (str.match(/when/i)) && (str.match(/look/i) || str.match(/closer/i) || str.match(/happen/i)))) {
	score += 10;
    }
    if (str.match(/PERFECT/) || str.match(/REFUSED/) || str.match(/EXPOSED/) || str.match(/SCAM/)) {
	score += 10;
    }

    return score;
}


function filter_yt(ytv) {
    for (var i = 0; i < ytv.length; i++) {
	var v = ytv[i];
	var t = v.getElementsByTagName("h3")[0];
	if (t.innerText.match(/BAIT/)) {
	    continue;
	}
	var bs = yt_bait_score(t.innerText);
	if (bs > 50) {
	    t.setAttribute("title", t.innerText)
	    t.innerText = "BAIT (" + bs.toFixed(2) + ")";
	    var a = v.getElementsByClassName('yt-img-shadow');
	    a.img.setAttribute("src", browser.extension.getURL("icons/bait.png"));
	    a.img.setAttribute("alt", "bait");
	    a.img.classList.add('bait');
	}
    }
}

/* add our css */
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", browser.extension.getURL("bait.css"));
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);

var observer = new MutationObserver(function(mutations) {
    filter_yt(document.getElementsByTagName("ytd-grid-video-renderer"));
    filter_yt(document.getElementsByTagName("ytd-compact-video-renderer"));
});

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
