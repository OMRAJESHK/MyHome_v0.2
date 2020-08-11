
function transactionCall() {
    let TransactionsList = convertObjectArray(TransactionTypes);
    let TransactionModesList = convertObjectArray(ModeOFPayment);
    let StatusList = convertObjectArray(Status);
    let assetID = sessionStorage.getItem('AssetID');
    let trnFrom = $('#RenderContent').find('#trnFrom').val();
    let trnTo = $('#RenderContent').find('#trnTo').val();
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, (transactions) => {
        $('#tblTransactions tbody').empty();
        let rowItem = '';
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
            rowItem =`<tr><td colspan="9" class="noRecords">No Records</td></tr>`
        }
        $('#RenderContent #tblTransactions tbody').append(rowItem);
    });  
}

