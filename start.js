

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if(!isChrome){
    $('#iframeAudio').remove()
}
else{
    $('#playAudio').remove() //agar tdk 2x audio
}