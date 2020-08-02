btnSaveTransaction
// Save and Edit Asset
const saveTransaction = () => {
    let PaymentStatus = $("#ckbPaymentStatus").is(':checked') ? 1 : 0;

    let TransactionToSave = JSON.stringify({
        AssetName: $('#txtAssetName').val(),
        Description: $('#txtDescription').val(),
        TransactionType: $('#txtRegTo').val(),
        Amount: $('#txtAssetAddress').val(),
        Date: Number($('#txtRegTaxAmt').val()),
        TransactionMode: Number($('#txtNumDoors').val()),
        PaidBy: Number($('#txtNumWindows').val()),
        PaidTo: Number($('#txtNumTaps').val()),
        Status: PaymentStatus,
        Remarks: Number($('#txtRemarks').val()),
    });
    let addetID = sessionStorage.getItem('AssetID');
        addetID != null ? ManageAjaxCalls.Put(ApiDictionary.AssetPut() + `?id=${addetID}`, TransactionToSave, assetPostResponse) :
        ManageAjaxCalls.Post(ApiDictionary.AssetPost(), TransactionToSave, assetPostResponse);
}