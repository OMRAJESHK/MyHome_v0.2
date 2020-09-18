let trnFrom = "";
let trnTo = "";

function transactionCall() {
    let assetID = sessionStorage.getItem('AssetID');
    trnFrom = dateFormat($('#RenderContent').find('#trnFrom').val());
    trnTo = dateFormat($('#RenderContent').find('#trnTo').val());
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, tranRespose)
}
function tranRespose(transactions) {
    $('#tblTransactions tbody').empty();
    let rowItem = '';
    let TransactionsList = convertObjectArray(TransactionTypes);
    let TransactionModesList = convertObjectArray(ModeOFPayment);
    let StatusList = convertObjectArray(Status);
    if (transactions.length > 0) {
        $.each(transactions, function (key, row) {
            rowItem = '<tr><td>' +
                row.Description + '</td><td>' +
                TransactionsList.filter((x) => x.value == row.TransactionType)[0].name + '</td><td>' +
                row.Amount + '</td><td>' +
                row.Date + '</td><td>' +
                TransactionModesList.filter((x) => x.value == row.TransactionMode)[0].name + '</td><td>' +
                row.PaidBy + '</td><td>' +
                row.PaidTo + '</td><td>' +
                StatusList.filter((x) => x.value == row.Status)[0].name + '</td><td>' +
                row.Remarks + '</td></tr>';
        });
    }
    else {
        rowItem = `<tr><td colspan="9" class="noRecords">No Records</td></tr>`
    }
    $('#RenderContent #tblTransactions tbody').append(rowItem);
}; 
function Transactionsearch(val) {

    // 1 - Mon, 2 - Tue, 3 - Wed, 4-Thu, 5 - Fri, 6 - Sat, 7 - Sun.    
    let assetID = sessionStorage.getItem('AssetID');
    if (val == 1) {
        var today = new Date();
        var currdate = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        var currday = today.getDay();
        let diffVal = currday == 1 ? 0 : currday == 2 ? 1 : currday == 3 ? 2 : currday == 4 ? 3 : currday == 5 ? 4 : currday == 6 ? 5 : 6;
        let prevDate = currdate - diffVal;
        trnFrom = dateFormat(prevDate + '/' + mm + '/' + yyyy);
        trnTo = dateFormat(currdate + '/' + mm + '/' + yyyy);
    }
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, tranRespose)

}

// Save and Edit Asset
function saveTransaction() {
    let PaymentStatus = $("#ckbPaymentStatus").is(':checked') ? 1 : 0;
    let assetID = sessionStorage.getItem('AssetID')
    console.log($('#ddlTransactionType').val(), $('#ddlTranMode').val())
    let TransactionToSave = JSON.stringify({
        AssetName: assetID,
        Description: $('#txtDescription').val(),
        TransactionType: Number($('#ddlTransactionType').val()),
        Amount: $('#txtAmt').val(),
        Date: getCurrentDate(),
        TransactionMode: Number($('#ddlTranMode').val()),
        PaidBy: $('#txtpaidFrom').val(),
        PaidTo: $('#txtpaidTo').val(),
        Status: PaymentStatus,
        Remarks: $('#txtRemarks').val(),
    });

    ManageAjaxCalls.Post(ApiDictionary.PostTransaction(), TransactionToSave, (res) => {
    })
    //ManageAjaxCalls.Put(ApiDictionary.AssetPut() + `?id=${assetID}`, TransactionToSave, assetPostResponse) :
        
}