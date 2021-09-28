let documentsData = [];
let docTypes = convertObjectArray(DocumentTypes);

const gotoSaveDocument = () => {
    var url = window.rootpath + AdminURLs.SaveDocument;
    $.get(url, function (response) {
        RenderContent.html(response);
        $('#documentPreview').attr('src', "").hide();
        $('#NoDoc_Text').text("No Preview");
        generateOptions(convertObjectArray(DocumentTypes), "ddlDocumentTitle");
        RenderContent.find("#txtDocumentDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", new Date())
    });
}
let docBase64 = "";
function getDocSrc(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("endocestuff", e.target.result);
            $('#documentPreview').attr('src', e.target.result);
            docBase64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        };
        reader.readAsDataURL(input.files[0]);
        $('#NoDoc_Text').text("");
        $('#documentPreview').show();
    }
}

function clearPreview() {
    document.getElementById("documentBrowse").value = "";
    document.getElementById("imageBrowse").value = "";
    document.getElementById("profileBrowse").value = "";

    $('#documentPreview').attr('src', "").hide();
    $('#NoDoc_Text').text("No Preview");
}

function getDocuments() {
    $('#documentPreview').attr('src', "").hide();
    $('#NoDoc_Text').text("No Preview");
    let assetID = sessionStorage.getItem('AssetID');
    ManageAjaxCalls.GetData(ApiDictionary.GetDocument() + `?AssetName=${assetID}`, (res) => {
        console.log("documentData", res);
        let docsHTML = ``;
        documentsData = res;
        res.map((itm)=> {
            docsHTML += `<div class="col col-6" onclick="handleDocClick(${itm.ImgID});">
                            <div class="card assetCards">
                                <div class="card-body cursor-pointer" style="min-width:200px;height:200px;position: relative;">
                                    <div class="d-flex justify-content-between mb-1 border-bottom">
                                         <div class="h6 global-text-primary font-weight-bold" style="white-space:nowrap">
                                              <i class="fas fa-image fontSize_18" aria-hidden="true"></i> ${docTypes.filter(x => x.value == itm.ImgTitle)[0].name}
                                         </div>
                                         <button title="Delete" class="btn p-0">
                                            <i class="fas fa-trash-alt fontSize_18 text-danger" onclick="SetDocumentDeleteModal(${itm.ImgID})"></i>
                                         </button>
                                    </div>
                                    <div class="h6 global-text-primary py-3">${dateFormat(getDateOnly(itm.ImgDate))}</div>
                                    <div class="h6 global-text-primary">${itm.ImgDescription}</div>
                                </div>
                            </div>
                        </div>`
        });
        $("#DocumentList").html(docsHTML);
    })

}

// DELETE Confirmation Modal
function SetDocumentDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="DocumentDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Document");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE PROPERTY TAX
function DocumentDelete(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteDocument() + '?id=' + id, (res) => {
        console.log('Deleted Successfully', res);
        CustomeToast("Document", 'Deleted Successfully', "bg-danger");
        getDocuments();
    });
}

function saveDocument() {
    let docTitle = $('#ddlDocumentTitle :selected').val();
    let docDesc = $('#txtDocumentDescription').val();
    let docDate = dateFormat($('#RenderContent').find('#txtDocumentDate').val())
    //var docBase64 = getBase64Image(document.getElementById("documentPreview"));
    //console.log("docBase64", docBase64);
    //let assetID = sessionStorage.getItem('AssetID');
    let assetID = 3;

    let DocumentToSave = JSON.stringify({
        ImgTitle: docTitle,
        ImgEncode: docBase64,
        ImgDescription: docDesc,
        ImgDate: docDate,
        AssetName: assetID,
    });
    ManageAjaxCalls.Post(ApiDictionary.PostDocument(), DocumentToSave, (res) => {
        console.log(res)
        if (res.status == 201) {
            CustomeToast("Document", 'Saved Successfully', "bg-success");
        } else if (res.status == 405) {
            CustomeToast("Document", res.responseJSON, "bg-danger");
        }
    })

}

function handleDocClick(ID) {
    let row = documentsData.filter(x => x.ImgID == ID);
    document.getElementById('documentView').setAttribute('src', 'data:image/png|jpg;base64,' + row[0].ImgEncode);
    document.getElementById('downloadDoc').setAttribute('href', 'data:image/png|jpg;base64,' + row[0].ImgEncode);
    document.getElementById('downloadDoc').setAttribute('download', docTypes.filter(x => x.value == row[0].ImgTitle)[0].name + ".jpg");
    $('#documentPreview').show();
    $('#NoDoc_Text').text("");
}

// Alternative
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}