
$(document).ready(function() {
    $('#summernote').summernote({
        placeholder: 'Hello Bootstrap 4',
        tabsize: 2,
        height: 500,
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true,                  // set focus to editable area after initializing summe
        lang: 'ko-KR', // default: 'en-US'
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ],
            callbacks: {                                        
                onImageUpload : function(file, editor, welEditable) {
                    console.log(file)
                    sendFile(file[0], editor, welEditable);
                }
            }
    });

    function sendFile(file,editor,welEditable) {
        data = new FormData();
        data.append("photo", file);
        $.ajax({
            data: data,
            type: "POST",
            url: "/upload-file",
            cache: false,
            contentType: false,
            processData: false,
            success: function(url) {
                console.log(url)
                editor.insertImage(welEditable, url);
            }
        });
    }
  });


$('#test').click(function() {
    var markupStr = $('#summernote').summernote(('code'));
    console.log(markupStr);
    
})