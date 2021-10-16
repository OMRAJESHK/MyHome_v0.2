let trnFrom = "";
let trnTo = "";
let transactionsData = [];
let trnisEdit = false;
let trnselectedID = '';

function betweenDatesTrns() {
    isAdmin() ? AlltransactionsGet() : transactionCall();
}

function GotoSaveTransaction() {
    var url = window.rootpath + AdminURLs.SaveTransaction;
    let TransactionsList = convertObjectArray(TransactionTypes);
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#trnDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", new Date())
        let options = `<option value="">None</option>`;
        options += TransactionsList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlTransactionType').html(options);
        RenderContent.find('#txtpaidTo').val(sessionStorage.getItem("UserName"));
        let assetID = sessionStorage.getItem('AssetID');
        $.when(
            GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetID}`),
        ).done(function (tenentData) {
            globalTenantAgreement = tenentData;
            RenderContent.find('#txtpaidFrom').val(tenentData["ResidentsNames"]);
            
        });
    }).catch(err => {
        console.log(err)
    });
}

function transactionCall() {
    let assetID = sessionStorage.getItem('AssetID');
    trnFrom = dateFormat($('#RenderContent').find('#trnFrom').val());
    trnTo = dateFormat($('#RenderContent').find('#trnTo').val()); 
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, tranRespose)
}
function tranRespose(transactions) {
    $('#tblTransactions tbody').empty();
    $('#tblTransactions thead').html(`
                   <tr class="global-text-primary tablelight">
                        <th>Description</th><th>Transaction Type</th><th>Amount</th><th>Date</th>
                        <th>Transaction Mode</th><th>Paid By</th><th>Paid To</th><th>Status</th><th>Remarks</th> 
                   </tr>`);
    let rowItem = '';
    let TransactionsList = convertObjectArray(TransactionTypes);
    let TransactionModesList = convertObjectArray(ModeOFPayment);
    let StatusList = convertObjectArray(Status);
    transactionsData = transactions;
    console.log("datdatadataa", transactions)
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
                render: function (data) { return '<div>' + TransactionsList.filter((x) => x.value == data)[0].name + '</div>'; }
            },

            { data: 'Amount' },
            { data: 'Date', render: function (data) { return getDisplayDate(data) } },
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
        "initComplete": function () { setTimeout(() => { setScreenLoader(false); }, 500); }
    });

}; 

// transaction Call
function AlltransactionsGet() {
    let assetID = sessionStorage.getItem('AssetID');
    trnFrom = dateFormat($('#RenderContent').find('#trnFrom').val());
    trnTo = dateFormat($('#RenderContent').find('#trnTo').val());
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, tranResponseGet)
}
function tranResponseGet(transactions) {
    $('#tblTransactions tbody').empty();
    $('#tblTransactions thead').html(`
                   <tr class="global-text-primary tablelight">
                        <th>Description</th><th>Transaction Type</th><th>Amount</th><th>Date</th><th>Transaction Mode</th>
                        <th>Paid By</th><th>Paid To</th><th>Status</th><th>Remarks</th><th>Action</th>
                    </tr>`);
    let rowItem = '';
    let TransactionsList = convertObjectArray(TransactionTypes);
    let TransactionModesList = convertObjectArray(ModeOFPayment);
    let StatusList = convertObjectArray(Status);
    transactionsData = transactions;
    $('#RenderContent #tblTransactions').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": true,
        "bPaginate": true,
        "bAutoWidth": false,
        'bDestroy': true,
        "bSort": true,
        //language: { search: `<span><i class="fa fa-filter global-text-primary" aria-hidden="true"></i></span>` },
        language: { search: `` },
        data: transactions,
        columns: [
            { data: 'Description', },
            {
                data: 'TransactionType',
                render: function (data) { return '<div>' + TransactionsList.filter((x) => x.value == data)[0].name + '</div>'; }
            },

            { data: 'Amount' },
            { data: 'Date', render: function (data) { return getDisplayDate(data) } },
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
                }
            },
            { data: 'Remarks' },
            {
                data: 'TransactionId', render: function (data) {
                    return `<div class="d-flex justify-content-center">
                                <button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="TransactionEdit(${data})"></i></button>
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetTransactionDeleteModal(${data})"></i></button></div>`;
                }
            },
        ],
        //"drawCallback": function (settings) {
            
        //    $("#scrLoaderModal").modal("hide");
        //},
        "initComplete": function () {
            setTimeout(() => {
                setScreenLoader(false);
            }, 500);
        }
    });

};
function handleTrnTypeChange() {
    let trnType = $("#ddlTransactionType :selected").val();
    if (trnType == 2) {
        console.log("globalTenantAgreement", globalTenantAgreement, trnType)
        RenderContent.find('#txtAmt').val(globalTenantAgreement["RentAmount"]).prop("disabled", true);
    } else {
        RenderContent.find('#txtAmt').prop("disabled", false);

    }
}

function Transactionsearch(val) {
    
    console.log(val);
    // 1 - Mon, 2 - Tue, 3 - Wed, 4-Thu, 5 - Fri, 6 - Sat, 7 - Sun.    
    let assetID = sessionStorage.getItem('AssetID');
    var date = new Date();
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    $("#RenderContent .betweenDatesSection").css("display", val == 4 ? "block" : "none");
    if (val == 0) {
        trnTo = trnFrom = getCurrentDate();
    } else if (val == 1) {
        var currdate = String(date.getDate()).padStart(2, '0');
        var currday = date.getDay();
        let last12 = new Date(date.getFullYear(), date.getMonth(), 0);
        let lastDay = String(last12.getDate()).padStart(2, '0');

        let diffVal = currday == 1 ? 0 : currday == 2 ? 1 : currday == 3 ? 2 : currday == 4 ? 3 : currday == 5 ? 4 : currday == 6 ? 5 : 6;

        let prevDate = currdate - diffVal;
        if (prevDate < 0) {
            trnFrom = dateFormat(`${lastDay - Math.abs(prevDate)}/${mm - 1}/${yyyy}`);
        } else {
            trnFrom = dateFormat(prevDate + '/' + mm + '/' + yyyy);
        }      
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
        ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`,
            (res) => {
                isAdmin() ? tranResponseGet(res) : tranRespose(res);
            })
    }
}

// Save and Edit Asset
function saveTransaction() {
    let trnDate = trnFrom = dateFormat($('#RenderContent').find('#trnDate').val());
    let PaymentStatus = $("#ckbPaymentStatus").is(':checked') ? 1 : 2;
    let trnType = $("#ddlTransactionType :selected").val();
    let assetID = sessionStorage.getItem('AssetID');
    let trnAmt = $("#txtAmt").val();

    let TransactionToSave = JSON.stringify({
        AssetName: assetID,
        Description: $('#txtDescription').val(),
        TransactionType: trnType,
        Amount: trnAmt,
        Date: getCurrentDate(),
        TransactionMode: Number($('#ddlTranMode').val()),
        PaidBy: $('#txtpaidFrom').val(),
        PaidTo: $('#txtpaidTo').val(),
        Status: PaymentStatus,
        Remarks: $('#txtRemarks').val(),
        CutOffDate: trnDate
    });
    if (trnType == 2) {
        ManageAjaxCalls.Put(ApiDictionary.PutTransaction() + `?id=${trnselectedID}`, TransactionToSave, () => {
            if (res.status == 201) {
                CustomeToast("Transaction", 'Modified Successfully', "bg-info");
            } else if (res.status == 405) {
                CustomeToast("Transaction", res.responseJSON, "bg-danger");
            }
        })
    } else {
        trnisEdit ?
            ManageAjaxCalls.Put(ApiDictionary.PutTransaction() + `?id=${trnselectedID}`, TransactionToSave, () => { console.log("Transaction Updated.") }) :
            ManageAjaxCalls.Post(ApiDictionary.PostTransaction(), TransactionToSave, (res) => {
                console.log(res)
                if (res.status == 201) {
                    CustomeToast("Transaction", 'Saved Successfully', "bg-success");
                } else if (res.status == 405) {
                    CustomeToast("Transaction", res.responseJSON, "bg-danger");
                }
            });
    }

    trnisEdit = false;
    trnselectedID = '';    
}

// EDIT Transaction
function TransactionEdit(id) {
    var url = window.rootpath + AdminURLs.SaveTransaction;
    let TransactionsList = convertObjectArray(TransactionTypes);
    trnisEdit = true;
    trnselectedID = id;

    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += TransactionsList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlTransactionType').html(options);
      
        let currentRow = transactionsData.filter(x => x.TransactionId === id);
        let trnDate = getDisplayDate(currentRow[0].Date).replace(/-/g, "/");
        RenderContent.find("#trnDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", `${trnDate}`)
        RenderContent.find("#ddlTransactionType").val(currentRow[0].TransactionType).change();
        RenderContent.find("#txtDescription").val(currentRow[0].Description);
        RenderContent.find("#txtAmt").val(currentRow[0].Amount);
        RenderContent.find("#txtpaidFrom").val(currentRow[0].PaidBy);
        RenderContent.find("#txtpaidTo").val(currentRow[0].PaidTo);
        RenderContent.find("#ddlTranMode").val(currentRow[0].TransactionMode).change();
        RenderContent.find("#ckbPaymentStatus").attr('checked', currentRow[0].Status == 1 ? true : false);
        RenderContent.find("#txtRemarks").val(currentRow[0].Remarks);
    });
}

// DELETE Transaction
function TransactionDelete(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteTransaction() + '?id=' + id, (res) => {
        CustomeToast("Transaction", 'Deleted Successfully', "bg-danger");
    });
}

// DELETE Confirmation Modal
function SetTransactionDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="TransactionDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}