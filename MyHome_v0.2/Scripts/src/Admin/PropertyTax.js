let propertyTaxList = [];
let isEdit = false;
let selectedID = '';

function getPropertyTaxLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    let StatusList = convertObjectArray(Status);
    ManageAjaxCalls.GetData(ApiDictionary.GetPropertyTaxes() + `?AssetName=${assetID}`, (res) => {
        $('#tblPropertyTaxLogs tbody').empty();
        let rowItem = '';
        if (res.length > 0) {
            propertyTaxList = res;
            $.each(res, function (key, row) {
                rowItem += '<tr><td>' +
                    getDisplayDate(row.TaxDate) + '</td><td>' +
                    row.TaxAmount + '</td><td>' +
                    StatusList.filter(x => x.value === row.Status)[0].name + '</td><td>' +
                    row.Remarks + '</td><td>'+
                    '<div class="d-flex justify-content-center">'+
                    '<button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="propertyTaxEdit(' + row.PropertyID+')"></i></button>'+
                    '<button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="propertyTaxDelete(' + row.PropertyID +')"></i></button>'+
                    '</div></td></tr > ';
            });
        }
        else {
            rowItem = `<tr><td colspan="9" class="noRecords">No Records</td></tr>`
        }
        $('#RenderContent #tblPropertyTaxLogs tbody').html(rowItem);
    });
}

function gotoPropertyTax() {
    var url = window.rootpath + AdminURLs.propertyTaxLogs;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        getPropertyTaxLogs();
    });
}

function gotoSavePropertyTax() {
    var url = window.rootpath + AdminURLs.SavePropertyTax;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}
function savePropertyDetails() {
    let PropertyTaxToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        TaxDate: getCurrentDate(),
        TaxAmount: Number($('#txtTaxAmt').val()),
        Status: 1,
        Remarks: $('#txtTaxRemarks').val(),
    });
    console.log('isEdit', isEdit)
    isEdit ?
        ManageAjaxCalls.Put(ApiDictionary.PutPropertyTaxes() + '?id=' + selectedID, PropertyTaxToSave, (res) => {
            console.log('modified', res)}) :
        ManageAjaxCalls.Post(ApiDictionary.PostPropertyTaxes(), PropertyTaxToSave, (res) => {
            console.log('res', res)
        });       
    isEdit = false;
    selectedID = '';
}
// EDIT PROPERTY TAX
function propertyTaxEdit(id) {
    var url = window.rootpath + AdminURLs.SavePropertyTax;
    isEdit = true;
    selectedID = id;
    $.get(url, function (response) {
        RenderContent.html(response);
        let currentRow=propertyTaxList.filter(x => x.PropertyID === id);
        RenderContent.find('#txtTaxAmt').val(currentRow[0].TaxAmount);
        RenderContent.find('#txtTaxRemarks').val(currentRow[0].Remarks);
    });
}

// DELETE PROPERTY TAX
function propertyTaxDelete(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeletePropertyTaxes() + '?id=' +id, (res) => {
        console.log('DEleted Successfully', res)
    });
}