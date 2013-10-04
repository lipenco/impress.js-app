$(document).on('click', '.add-picture', function() {
    document.querySelector('input').click();
 
    $(document).on('change', '.photo-input', function() {
        upload(this.files[0]);
    });


    /* imugir img */
    window.ondragover = function(e) {e.preventDefault()}
    window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
    function upload(file) {

        /* Is the file an image? */
        if (!file || !file.type.match(/image.*/)) return;

        /* It is! */
        document.body.className = "uploading";


        var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        fd.append("image", file); // Append the file
        fd.append("key", "6528448c258cff474ca9701c5bab6927"); // Get your own key http://api.imgur.com/
        var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
        xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
        xhr.onload = function() {
            document.querySelector(".link").src = JSON.parse(xhr.responseText).upload.links.original;
            // document.body.className = "uploaded";
        }

        xhr.send(fd);
    }

});

 



