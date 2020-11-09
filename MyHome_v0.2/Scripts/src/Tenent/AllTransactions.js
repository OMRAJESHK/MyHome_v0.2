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

    $('#RenderContent #tblTransactions').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": true,
        "bPaginate": true,
        "bAutoWidth": false,
        'bDestroy': true,
        "bSort": true, 
        data: transactions,
        columns: [
            { data: 'Description', },
            {
                data: 'TransactionType',
                render: function (data) {
                    return '<div>' + TransactionsList.filter((x) => x.value == data)[0].name + '</div>';
                }
            },

            { data: 'Amount' },
            { data: 'Date'   },
            {
                data: 'TransactionMode',
                render: function (data) {
                    return TransactionModesList.filter((x) => x.value == data)[0].name
                }
            },
            { data: 'PaidBy' },
            { data: 'PaidTo', },
            {
                data: 'Status', render: function (data) {
                    return StatusList.filter((x) => x.value == data)[0].name
                }},
            { data: 'Remarks'  }
        ],

    });

}; 
function Transactionsearch(val) {
    console.log(val);
    // 1 - Mon, 2 - Tue, 3 - Wed, 4-Thu, 5 - Fri, 6 - Sat, 7 - Sun.    
    let assetID = sessionStorage.getItem('AssetID');
    var date = new Date();
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    if (val == 0) {
        trnTo = trnFrom = getCurrentDate();
    } else if (val == 1) {
        var currdate = String(date.getDate()).padStart(2, '0');
        var currday = date.getDay();
        let diffVal = currday == 1 ? 0 : currday == 2 ? 1 : currday == 3 ? 2 : currday == 4 ? 3 : currday == 5 ? 4 : currday == 6 ? 5 : 6;
        let prevDate = currdate - diffVal;
        trnFrom = dateFormat(prevDate + '/' + mm + '/' + yyyy);
        trnTo = dateFormat(currdate + '/' + mm + '/' + yyyy);
    } else if (val == 2) {
        let first = new Date(date.getFullYear(), date.getMonth(), 1);
        let last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let firstDay = String(first.getDate()).padStart(2, '0');
        let lastDay = String(last.getDate()).padStart(2, '0');
        trnFrom = dateFormat(firstDay + '/' + mm + '/' + yyyy);
        trnTo = dateFormat(lastDay + '/' + mm + '/' + yyyy);
    } else if (val == 3) {
        trnFrom = dateFormat('01/01/' + yyyy);
        trnTo = dateFormat('31/12/' + yyyy);
    }
    if (val != 4) {
        ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, tranRespose)
    }
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