Navigator.getUserMedia({
    Video: true
}, onSuccess, onFail);

const onSucces = stream => {
    const video = document.querySelector('video');
    Video.src = URL.createObjectURL(stream);
    Video.onloadedmetadata = function(e) {}
}