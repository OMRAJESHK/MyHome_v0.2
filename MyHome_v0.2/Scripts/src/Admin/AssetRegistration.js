﻿
// Implemented ASSET REGISTRATION POST
$('.main-content').on('click', '#btnSaveAsset', () => {
});

const clearTextBoxes = () => {
    $("#ckbIsRent, #ckbIsSump").prop('checked', false);
    $('.main-content').find('.form-control').val('')
}
const saveAsset = () => {
    let IsRent = $("#ckbIsRent").is(':checked') ? 1 : 0;
    let IsSump = $("#ckbIsSump").is(':checked') ? 1 : 0;
    let assetToSave = JSON.stringify({
        AssetName: $('#txtAssetName').val(),
        RegisteredDate: $('#txtRegDate').val(),
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
    addetID != null ? ManageAjaxCalls.Put(ApiDictionary.AssetPut() + `?id=${addetID}`, assetToSave, assetPostResponse) :
    ManageAjaxCalls.Post(ApiDictionary.AssetPost(), assetToSave, assetPostResponse);
}
const assetPostResponse = (res) => {
    console.log(res);
}
const assetDeleteResponse = (res) => {
    console.log('delete',res);
}
const deleteAsset = (id) => {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteAsset() + `?id=${Number(id)}`, assetDeleteResponse);
}