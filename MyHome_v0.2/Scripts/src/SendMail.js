var Render_Content = $('#RenderContent');
var Fileurl = '';

function sendmail() {
    let loadclass = "fa fa-spinner fa-spin";
    let defaultbtnclass = "fas fa-share";
    
    Render_Content.find('#btnSandMail').attr("disabled", true);
    Render_Content.find('#icnSandMail').removeClass(defaultbtnclass).addClass(loadclass)
    let mailTo = Render_Content.find('#txtMailTo').val();
    let subject = Render_Content.find('#txtSubject').val();
    let body = Render_Content.find('#txtBody').val();
    var formData = new FormData;
    var fileUpload = $("#imageBrowse").get(0);
    var files = fileUpload.files;

    formData.append('To_Ids', mailTo);
    formData.append('Cc_Ids', $('#txtMailTo').val());
    formData.append('Bcc_Ids', $('#txtMailTo').val());
    formData.append('Subject', subject);
    formData.append('Message', body);
    formData.append('From', "omrajeshk6021@gmail.com");
    formData.append('Password', "lakshminarasimha");
    formData.append('Host', "smtp.gmail.com");
    formData.append('IsSSl', true);
    formData.append('PortNo', 587);
    
    for (var i = 0; i < files.length; i++) {
        formData.append(files[i].name, files[i]);
    }
    console.log("FormDataObj", formData);
    $.ajax({
        type: "POST",
        url: ApiDictionary.Sendmail(),
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (message) {
            console.log(message);
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
                Render_Content.find('#btnSandMail').attr("disabled", false);
                CustomeToast("Response", "Mail Sent Successfully", "bg-success");
                Render_Content.find('#icnSandMail').removeClass(loadclass).addClass(defaultbtnclass);
                clearTextBoxes();
                Render_Content.find("#imageBrowse").val('');
            });
        },
        error: function (data) {
            console.log(data)
        }
    });
}

//function selectFile() {
//    var File = document.getElementById("imageBrowse").files[0];
//    if (File && File[0]) {
//        ReadImage(File[0])
//    }
//}
//function ReadImage(file) {
//    var reader = new FileReader;
//    var image = new Image;
//    reader.readAsDataURL(file);
//    reader.onload = function (_file) {
//        image.src = _file.target.result;
//        image.onload = function () {
//            var height = this.height;
//            var width = this.width;
//            var type = file.type;
//            var size = ~~(file.size / 1024) + "KB";
//            $("#targetImg").attr('src', _file.target.result);
//            $("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
//            $("#imgPreview").show();
//        }
//    }
//}

//function uploadImage() {
//    var file = $("#imageBrowse").get(0).files;
//    var data = new FormData;
//    data.append("UploadImg", file[0]);
//    $.ajax({
//        type: "Post",
//        url: "/SendMail/ImageUpload",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (res) {
//            ClearPreview();
//            console.log('resres', res)
//            Fileurl = "~/Images/" + res;
//            $("#uploadedImage").append('<img src="/Images/' + res + '" class="img-responsive thumbnail"/>');
//        }
//    });
//}

function gotoSendMail() {
    var url = window.rootpath + AdminURLs.SendMail;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}

function getMailLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    assetID && ManageAjaxCalls.GetData(ApiDictionary.GetMailLogs() + `?AssetName=${assetID}`, (res) => {
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