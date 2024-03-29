﻿var Render_Content = $('#RenderContent');
var Fileurl = '';

async function sendmail() {    
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
    console.log("FormDataObj", formData, files.length);
    $.ajax({
        type: "POST",
        url: ApiDictionary.Sendmail(),
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: async function (message) {
            console.log(message);
            // TO SAVE TO DB
            let MailLogToSave = JSON.stringify({
                AssetName: sessionStorage.getItem('AssetID'),
                MailTo: $('#txtMailTo').val(),
                MailDate: getCurrentDate(),
                Subject: $('#txtSubject').val(),
                Body: $('#txtBody').val(),
                isAttachment: files.length > 0 ? 1 : 0      // 0 - false , 1 - true
            });
            let postMailLogsData = await PostAjax(ApiDictionary.PostMailLogs(), MailLogToSave);
            console.log(postMailLogsData, 'MailLog saved Successfully');
            Render_Content.find('#btnSandMail').attr("disabled", false);
            CustomeToast("Response", "Mail Sent Successfully", "bg-success");
            Render_Content.find('#icnSandMail').removeClass(loadbtnclass).addClass(defaultbtnclass);
            clearTextBoxes();
            Render_Content.find("#imageBrowse").val('');
        },
        error: function (data) {
            console.log(data)
        }
    });
}
function mailFileCheck() {
    let fileInput = $('#imageBrowse');
    let fileSize = fileInput.get(0).files[0].size; // in bytes
    console.log("fileSize", fileSize);
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

async function getMailLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    let getMailData = await GetAjax(ApiDictionary.GetMailLogs() + `?AssetName=${assetID}`);
    $('#tblMailLogs tbody').empty();
    $('#RenderContent #tblMailLogs').DataTable({
        "bLengthChange": false, "bFilter": true, "bInfo": true,
        "bPaginate": true, "bAutoWidth": false,
        "bDestroy": true, "bSort": true, "pageLength": 10,
        language: { search: `` },
        data: getMailData,
        columns: [
            { data: 'MailTo' },
            { data: 'Subject' },
            {
                data: 'Body',
                render: function (data, type, row, meta) {
                    return row["isAttachment"] ?
                        `<div class="d-flex justify-content-between"><span>${data}</span><i class="bx bx-file mt-2 fontSize_20"></i></div>` :
                        `<span>${data} 123</span>`;
                }
            },
            { data: 'MailDate', render: function (data) { return getDisplayDate(data) } },
            {
                data: 'MailId', render: function (data) {
                    return `<div class="d-flex justify-content-center">
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetMailLogDeleteModal(${data})"></i></button></div>`;
                }
            },
        ],
        "initComplete": function () { setTimeout(() => { setScreenLoader(false); }, 500); }
    });
}

// DELETE MailLog TAX
async function MailLogDelete(id) {
    let deleteDocumentData = await DeleteAjax(ApiDictionary.DeleteMailLogs() + `?id=${Number(id)}`);
    console.log('Deleted Successfully', deleteDocumentData);
    CustomeToast("Mail Log", "Mail Log Deleted Successfully", "bg-danger");
    setScreenLoader(true);
    getMailLogs()
}

// DELETE Confirmation Modal
function SetMailLogDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="MailLogDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Mail Logs");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}