﻿let documentsData = [];
let docTypes = convertObjectArray(DocumentTypes);
let docBase64 = "";
const gotoSaveDocument = () => {
    var url = window.rootpath + AdminURLs.SaveDocument;
    $.get(url, function (response) {
        RenderContent.html(response);
        $('#documentPreview').attr('src', "").hide();
        $('#NoDoc_Text').text("No Preview");
        let DocumentsArray = convertObjectArray(DocumentTypes).filter(x => x.value != 1);
        generateOptions(DocumentsArray, "ddlDocumentTitle");
        RenderContent.find("#txtDocumentDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", new Date())
    });
}

function getDocSrc(input, imgContainer) {
    var filename = input.files[0].name;
    let fileSize = input.files[0].size; // in bytes
    let fileExtension = filename.split('.').pop();
    if (["png", "jpeg", "jpg"].includes(fileExtension)) {
        if (fileSize < 5000000) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#' + imgContainer).attr('src', e.target.result);
                    docBase64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                };
                reader.readAsDataURL(input.files[0]);
                $('#NoDoc_Text').text("");
                $('#' + imgContainer).show();
            }
        } else {
            CustomeToast("Document", "Image File Size is Too Big. Please select image with size less that 5 MB", "bg-danger");
        }
    } else {
        CustomeToast("Document Upload", "Please Select Image File", "bg-danger");
        document.getElementById("documentBrowse").value = "";
    }

    
}

function clearPreview() {
    document.getElementById("documentBrowse").value = "";
    document.getElementById("imageBrowse").value = "";

    $('#documentPreview').attr('src', "").hide();
    $('#NoDoc_Text').text("No Preview");
}

async function getDocuments() {
    setScreenLoader(true);
    $('#documentPreview').attr('src', "").hide();
    $('#NoDoc_Text').text("No Preview");
    let assetID = sessionStorage.getItem('AssetID');
    let getDocumentData = await GetAjax(ApiDictionary.GetDocument() + `?AssetName=${assetID}`);
    let docsHTML = ``;
    documentsData = getDocumentData;
    getDocumentData && getDocumentData.length > 0 ? getDocumentData.map((itm) => {
        if (itm.ImgTitle != 1) {
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
            $("#downloadDoc").removeClass("disabled");
        } else {
            docsHTML = `<span class="text-center" style="width: 100%;font-size: 14px;font-weight: 500;">No Documents Available</span>`;
        }
    }) : (function () {
        docsHTML = `<span class="text-center" style="width: 100%;font-size: 14px;font-weight: 500;">No Documents Available</span>`;
        $("#downloadDoc").addClass("disabled");
    }());
    $("#DocumentList").html(docsHTML);
    setTimeout(() => { setScreenLoader(false); }, 600);
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
async function DocumentDelete(id) {
    let deleteDocumentData = await DeleteAjax(ApiDictionary.DeleteDocument() + `?id=${Number(id)}`);
    console.log('Deleted Successfully', deleteDocumentData);
    CustomeToast("Document", 'Deleted Successfully', "bg-danger");
    getDocuments();
}

async function saveDocument() {
    let docTitle = $('#ddlDocumentTitle :selected').val();
    let docDesc = $('#txtDocumentDescription').val();
    let docDate = dateFormat($('#RenderContent').find('#txtDocumentDate').val())
    //var docBase64 = getBase64Image(document.getElementById("documentPreview"));
    //console.log("docBase64", docBase64);
    let assetID = sessionStorage.getItem('AssetID');

    let DocumentToSave = JSON.stringify({
        ImgTitle: docTitle,
        ImgEncode: docBase64,
        ImgDescription: docDesc,
        ImgDate: docDate,
        AssetName: assetID,
        isAdmin: 0             // 0 - Tenant , 1 - Admin
    });
    let postDocumentData = await PostAjax(ApiDictionary.PostDocument(), DocumentToSave);
    if (postDocumentData.status == 201) {
        CustomeToast("Document", 'Saved Successfully', "bg-success");
    } else if (postDocumentData.status == 405) {
        CustomeToast("Document", postDocumentData.responseJSON, "bg-danger");
    }
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