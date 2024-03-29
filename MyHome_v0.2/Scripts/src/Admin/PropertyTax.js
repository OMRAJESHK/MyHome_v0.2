﻿let propertyTaxList = [];
let isEdit = false;
let selectedID = '';

async function getPropertyTaxLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    let StatusList = convertObjectArray(Status);
    let getPropertyTaxesData = await GetAjax(ApiDictionary.GetPropertyTaxes() + `?AssetName=${assetID}`);
    console.log("getPropertyTaxesData", getPropertyTaxesData)
    $('#tblPropertyTaxLogs tbody').empty();
    if (getPropertyTaxesData?.length > 0) {
        propertyTaxList = getPropertyTaxesData;
        $('#RenderContent #tblPropertyTaxLogs').DataTable({
            "bLengthChange": false, "bFilter": true,
            "bInfo": true, "bPaginate": true, "bAutoWidth": false,
            "bDestroy": true, "bSort": true,
            language: { search: `` },
            data: getPropertyTaxesData,
            columns: [
                { data: 'TaxDate', render: function (data) { return getDisplayDate(data); } },
                { data: 'TaxAmount', },
                { data: 'Status', render: function (data) { return StatusList.filter(x => x.value === data)[0].name } },
                { data: 'Remarks', },
                {
                    data: 'PropertyID', render: function (data) {
                        ;
                        return `<div class="d-flex justify-content-center">
                                <button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="propertyTaxEdit(${data})"></i></button>
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetPropertyTaxDeleteModal(${data})"></i></button></div>`;
                    }
                },
            ],
            "initComplete": function () {
                setTimeout(() => {
                    setScreenLoader(false);
                }, 500);
            }
        });

    } else if (getPropertyTaxesData?.length === 0){
        setTimeout(() => {
            setScreenLoader(false);
        }, 500);}
    
}

function gotoPropertyTax() {
    var url = window.rootpath + AdminURLs.propertyTaxLogs;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        setScreenLoader(true);
        getPropertyTaxLogs();
    });
}

function gotoSavePropertyTax() {
    var url = window.rootpath + AdminURLs.SavePropertyTax;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}

// SAVE Property Contacts
function savePropertyDetails() {
    let PropertyTaxToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        TaxDate: getCurrentDate(),
        TaxAmount: Number($('#txtTaxAmt').val()),
        Status: 1,
        Remarks: $('#txtTaxRemarks').val(),
    });
    console.log('isEdit', isEdit)
    isEdit ? (async function () {
        let putPropertyTaxesData = await PutAjax(ApiDictionary.PutPropertyTaxes() + '?id=' + selectedID, PropertyTaxToSave);
        console.log('putPropertyTaxesData modified', putPropertyTaxesData);
        CustomeToast("Property Tax", "Property Tax Modified Successfully", "bg-info");
    }()) : (async function () {
            let postPropertyTaxesData = await PostAjax(ApiDictionary.PostPropertyTaxes(), PropertyTaxToSave);
            console.log('res', postPropertyTaxesData);
            CustomeToast("Property Tax", "Property Tax Saved Successfully", "bg-success");
        }())
    isEdit = false;
    selectedID = "";
}
// EDIT PROPERTY TAX
function propertyTaxEdit(id) {
    var url = window.rootpath + AdminURLs.SavePropertyTax;
    isEdit = true;
    selectedID = id;
    $.get(url, function (response) {
        RenderContent.html(response);
        let currentRow = propertyTaxList.filter(x => x.PropertyID === id);
        RenderContent.find('#txtTaxAmt').val(currentRow[0].TaxAmount);
        RenderContent.find('#txtTaxRemarks').val(currentRow[0].Remarks);
    });
}

// DELETE PROPERTY TAX
async function propertyTaxDelete(id) {
    let deletePropertyTaxesData = await DeleteAjax(`${ApiDictionary.DeletePropertyTaxes()}?id=${id}`);
    console.log('Deleted Successfully', deletePropertyTaxesData);
    CustomeToast("Property Tax", "Property Tax Deleted Successfully", "bg-danger");
    getPropertyTaxLogs();
}

// DELETE Confirmation Modal
function SetPropertyTaxDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                         <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="propertyTaxDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}