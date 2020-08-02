
function transactionCall() {
    let TransactionsList = convertObjectArray(TransactionTypes);
    let TransactionModesList = convertObjectArray(ModeOFPayment);
    let StatusList = convertObjectArray(Status);
    const getTransactionsfn=(transactions)=> {
        $('#tblTransactions tbody').empty();
        let rowItem = '';
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
        $('#RenderContent #tblTransactions tbody').append(rowItem);
    }
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions(), getTransactionsfn);  
}
