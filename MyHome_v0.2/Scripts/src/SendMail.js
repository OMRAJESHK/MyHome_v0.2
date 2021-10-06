var Render_Content = $('#RenderContent');
var Fileurl = '';

function sendmail() {    
    Render_Content.find('#btnSandMail').attr("disabled", true);
    Render_Content.find('#icnSandMail').removeClass(defaultbtnclass).addClass(loadbtnclass);
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
    //formData.append('From', "omrajeshk6021@gmail.com");
    //formData.append('Password', "lakshminarasimha");
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
                Render_Content.find('#icnSandMail').removeClass(loadbtnclass).addClass(defaultbtnclass);
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
        $('#RenderContent #tblMailLogs').DataTable({
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": true,
            "bPaginate": true,
            "bAutoWidth": false,
            'bDestroy': true,
            "bSort": true,
            "pageLength": 10,
            language: { search: `` },
            data: res,
            columns: [
                { data: 'MailTo' },
                { data: 'Subject' },
                { data: 'Body' },
                { data: 'MailDate', render: function (data) { return getDisplayDate(data) }},
                {
                    data: 'MailId', render: function (data) {
                        return `<div class="d-flex justify-content-center">
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetMailLogDeleteModal(${data})"></i></button></div>`;
                    }
                },
            ],
            "initComplete": function () {
                setTimeout(() => {
                    setScreenLoader(false)
                }, 500);
            }

        });
    });
}

// DELETE MailLog TAX
function MailLogTaxDelete(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteMailLogs() + '?id=' + id, (res) => {
        console.log('DEleted Successfully', res);
        setScreenLoader(true);
        getMailLogs()
    });
}

// DELETE Confirmation Modal
function SetMailLogDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="MailLogTaxDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Mail Logs");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}