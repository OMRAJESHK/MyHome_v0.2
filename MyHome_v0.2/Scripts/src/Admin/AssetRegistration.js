
let assetIsEdit = false;
let assetSelectedID = '';

function btngotoSaveAsset() {
    sessionStorage.removeItem("AssetID");
    mainContent.find('#modSelectAsset').modal('hide');
    gotoAssetSave();
}

// Save and Edit Asset
const saveAsset = () => {
    let IsRent = $("#ckbIsRent").is(':checked') ? 1 : 0;
    let IsSump = $("#ckbIsSump").is(':checked') ? 1 : 0;
    let asset = {
        name: $('#txtAssetName').val(), regDate: $('#txtRegDate').val()
    }
    let assetToSave = JSON.stringify({
        AssetName: asset.name,
        RegisteredDate: asset.regDate,
        RegusteredTo: $('#txtRegTo').val(),
        Address: $('#txtAssetAddress').val(),
        LandTaxAmount: Number($('#txtRegTaxAmt').val()),
        NumberofDoors: Number($('#txtNumDoors').val()),
        NumberofWindows: Number($('#txtNumWindows').val()),
        NumberofTaps: Number($('#txtNumTaps').val()),
        NumberofFans: Number($('#txtNumFans').val()),
        NumberofBulbs: Number($('#txtNumBulbs').val()),
        IsSump: IsSump,
        IsRent: IsRent,
        Remarks: $('#txtAssetRegRemarks').val()
    });
    let addetID = sessionStorage.getItem('AssetID');
    assetIsEdit ? ManageAjaxCalls.Put(ApiDictionary.AssetPut() + `?id=${addetID}`, assetToSave, assetPutResponse) :
        ManageAjaxCalls.Post(ApiDictionary.AssetPost(), assetToSave, assetPostResponse);
    $('#lblAssetName, #lblAssetNamehdr').text(asset.name);
    assetIsEdit = false;

}
// Delete Asset 
const deleteAsset = (id) => {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteAsset() + `?id=${Number(id)}`, assetDeleteResponse);
}
// ASSET POST 
const assetPostResponse = (res) => {
    console.log(res);
    sessionStorage.setItem('AssetID', res.AssetId);
    CustomeToast("Asset Registration", "Asset Saved Successfully", "bg-success");
    clearTextBoxes();
}
// ASSET PUT 
const assetPutResponse = (res) => {
    console.log(res);
    CustomeToast("Asset Modify", "Asset Modified Successfully", "bg-warning")
}
const assetDeleteResponse = (res) => {
    console.log('delete', res);
    CustomeToast("Asset Modify", "Asset Deleted Successfully", "bg-danger");
    getAssetsList();
}
const clearTextBoxes = () => {
    $("#ckbIsRent, #ckbIsSump").prop('checked', false);
    $('.main-content').find('.form-control').val('');
    $('.main-content').find('input[type="file"]').val('')
}

const getTransactionList = () => {
    let TransactionsList = convertObjectArray(TransactionTypes);
    var optionList = '';
    TransactionsList.map((list, index) => {
        if (list.value != 0) {
            optionList += `<option id=${index+1} value=${list.value}>${list.name}</option>`
        }
    });
    return optionList;
}

const AssetEdit = (id) => {
    assetIsEdit = true;
    if (AssetList.length > 0) {
        var url = window.rootpath + AdminURLs.Asset;
        let TransactionsList = convertObjectArray(TransactionTypes);
        $.get(url, function (response) {
            RenderContent.html(response);
            RenderContent.find("#txtRegDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
            let Asset = AssetList.filter(data => data.AssetId == id);
            $('#txtAssetName').text(Asset[0].AssetName);
            sessionStorage.setItem('AssetID', Asset[0].AssetId)
            $('#txtAssetName').val(Asset[0].AssetName);
            $('#txtRegDate').val(getDateOnly(Asset[0].RegisteredDate));
            $('#txtRegTo').val(Asset[0].RegusteredTo);
            $('#txtAssetAddress').val(Asset[0].Address);
            $('#txtRegTaxAmt').val(Asset[0].LandTaxAmount);
            $('#txtNumDoors').val(Asset[0].NumberofDoors);
            $('#txtNumWindows').val(Asset[0].NumberofWindows);
            $('#txtNumTaps').val(Asset[0].NumberofTaps);
            $('#txtNumFans').val(Asset[0].NumberofFans);
            $('#txtNumBulbs').val(Asset[0].NumberofBulbs);
            $("#ckbIsRent").attr('checked', Asset[0].IsRent == 1 ? true : false);
            $("#ckbIsSump").attr('checked', Asset[0].IsSump == 1 ? true : false);
            $('#txtAssetRegRemarks').val(Asset[0].Remarks);
        });
    }
    mainContent.find('#modSelectAsset').modal('hide');
}