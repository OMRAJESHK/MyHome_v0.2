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
    // TO SEND MAIL 
    ManageAjaxCalls.Post(ApiDictionary.Sendmail(), JSON.stringify(saveObj), (res) => {
        let saveObj = {
            attachment: Fileurl
        }
        // TO DELETE UPLOADED FILE
        ManageAjaxCalls.Post(ApiDictionary.DeleteImg(), JSON.stringify(saveObj), (res) => {
            console.log(res, 'Deleted Successfully');
            // TO SAVE TO DB
            let MailLogToSave = JSON.stringify({
                AssetName: sessionStorage.getItem('AssetID'),
                MailTo: $('#txtMailTo').val(),
                MailDate: getCurrentDate(),
                Subject: $('#txtSubject').val(),
                Body: $('#txtBody').val(),
            });
            ManageAjaxCalls.Post(ApiDictionary.PostMailLogs(), MailLogToSave, (res) => {
                console.log(res, 'MailLog saved Successfully');
            });
        });
    });
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
    });
}

function gotoSendMail() {
    var url = window.rootpath + AdminURLs.SendMail;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}

function getMailLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    ManageAjaxCalls.GetData(ApiDictionary.GetMailLogs() + `?AssetName=${assetID}`, (res) => {
        $('#tblMailLogs tbody').empty();
        let rowItem = '';
        if (res.length > 0) {
            $.each(res, function (key, row) {
                rowItem += '<tr><td>' +row.MailTo + '</td><td>' + row.Subject + '</td><td>' + row.Body + '</td><td>' + getDisplayDate(row.MailDate) + '</td></tr>';
            });
        }
        else {
            rowItem = `<tr><td colspan="9" class="noRecords">No Records</td></tr>`
        }
        $('#RenderContent #tblMailLogs tbody').html(rowItem);
    });
}