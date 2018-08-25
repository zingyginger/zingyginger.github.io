/* Credits: http://www.alistapart.com/articles/alternate/ */

var currentFontSize = 1;

function resetFontSize(){
    currentFontSize = 1;
    changeFontSize(0);
}

function changeFontSize(sizeDifference){

    currentFontSize = parseFloat(currentFontSize) + parseFloat(sizeDifference);
        if(currentFontSize > 2.5){
            currentFontSize = 2.5;
        }else if(currentFontSize < .5){
            currentFontSize = .5;
        }

    setFontSize(currentFontSize);
}

function setFontSize(fontSize){
    var elements = document.getElementsByClassName('rich-text');
    for (var i = 0; i < elements.length; i++) {
        var stObj = elements[i];
        stObj.style.fontSize = fontSize + 'em';
    }
}

function setActiveStyleSheet(title) {  
    console.log("setActiveStyleSheet()");
    var i, a, main;  
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {    
        if ($(a).attr("rel").indexOf("style") != -1  && typeof($(a).attr("title")) != 'undefined') {
            if ($(a).attr("title") == title) {
                $(a).prop('disabled',false);
            }
        }
        if ($(a).attr("rel").indexOf("alternate") == -1  && typeof($(a).attr("title")) != 'undefined') {
            if ($(a).attr("title") == title) {
                $(a).prop('disabled',false);
            }
        }
    }
}

function getActiveStyleSheet() {
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) { 
        if ($(a).attr("rel").indexOf("style") != -1  && typeof($(a).attr("title")) != 'undefined') {
            return $(a).attr("title");
        }
    }
    return null;
}

function getPreferredStyleSheet() {  
    var i, a;  
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {    
        if ($(a).attr("rel").indexOf("style") != -1  && $(a).attr("rel").indexOf("alt") == -1  && typeof($(a).attr("title")) != 'undefined') {
            return $(a).attr("title");
        }
    }  
    return null;
}

function createCookie(name,value,days) {  
    console.log("createCookie()");
    if (days) {    
        var date = new Date();    
        date.setTime(date.getTime() + (days*24*60*60*1000));    
        var expires = "; expires=" + date.toGMTString();  
    }  
    else 
        expires = ""; 
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {  
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];    
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }  
    return null;
}

$(document).ready(function() {
    var cookie = readCookie("fontSizeSetting");
    var currentFontSize =  cookie ? cookie : 1;
    setFontSize(currentFontSize);
    
    var cookie = readCookie("style");
    var title = cookie ? cookie : getPreferredStyleSheet();
    setActiveStyleSheet(title);
});

$(window).on('beforeunload',function() {
    createCookie("fontSizeSetting", currentFontSize, 7)
});

$(document).ready(function() {
    var title = getActiveStyleSheet();
    createCookie("style", title, 7);
});
