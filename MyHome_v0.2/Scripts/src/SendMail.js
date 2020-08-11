var Render_Content = $('#RenderContent');
var Fileurl = '';
function selectFile() {
    var File = document.getElementById("imageBrowes").files[0];
    if (File && File[0]) {
        ReadImage(File[0])
    }
}

function sendmail() {
    console.log(Fileurl)
    var file = $("#imageBrowes").get(0).files;
    let mailTo = Render_Content.find('#txtMailTo').val();
    let subject = Render_Content.find('#txtSubject').val();
    let body = Render_Content.find('#txtBody').val();
    var data = new FormData;
    data.append("UploadImg", file[0]);
    let saveObj = {
        mailLog: {
            MailTo: mailTo,
            Subject: subject,
            Body: body
        },
        attachment: Fileurl
    }
    console.log(saveObj)
    $.ajax({
        url: "/SendMail/Sendmail",
        method: 'post',
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        contentType: 'application/json',
        data: JSON.stringify(saveObj),
        success: function (res) {
            console.log(res)
        },
        error: (jqXHR) => {
            console.log('something went wrong...I donno what')
        }
    });


    //$.ajax({
    //    type: "Post",
    //    url: "/SendMail/Sendmail",
    //    data: JSON.stringify(saveObj),
    //    contentType: 'application/json',
    //    //processData: false,
    //    success: function (res) {
    //        console.log(res)
    //    }
    //})

}

function ReadImage(file) {
    var reader = new FileReader;
    var image = new Image;
    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";
            $("#targetImg").attr('src', _file.target.result);
            $("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
            $("#imgPreview").show();

        }
    }
}
function ClearPreview() {
    $("#imageBrowes").val('');
    $("#description").text('');
    $("#imgPreview").hide();


    //data.append("AssetName", "3");
    //data.append("MailTo", "omrajeshk6021@gmail.com");
    //data.append("Subject", "mailSubject");
    //data.append("Body", "mailBody");
    //data.append("MailDate", "2020-09-09")
}
function uploadImage() {
    var file = $("#imageBrowes").get(0).files;
    var data = new FormData;
    data.append("UploadImg", file[0]);
    $.ajax({
        type: "Post",
        url: "/SendMail/ImageUpload",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {
            ClearPreview();
            console.log('resres', res)
            Fileurl = "~/Images/" + res;
            $("#uploadedImage").append('<img src="/Images/' + res + '" class="img-responsive thumbnail"/>');
        }
    })
}