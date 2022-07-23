let trnFrom = "";
let trnTo = "";
let transactionsData = [];
let trnisEdit = false;
let trnselectedID = '';
var date = new Date();
var curYr = date.getFullYear();
let rentDay = '';
function betweenDatesTrns() {
    isAdmin() ? AlltransactionsGet() : transactionCall();
}

function GotoSaveTransaction() {
    var url = window.rootpath + AdminURLs.SaveTransaction;
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#trnDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", new Date())
        generateOptions(convertObjectArray(TransactionTypes), "ddlTransactionType","Select Transaction type")
        generateOptions(convertObjectArray(Status), "ddlPaymentStatus", "Select Payment type"); 
        RenderContent.find('#txtpaidTo').val(sessionStorage.getItem("UserName"));
        let assetID = sessionStorage.getItem('AssetID');
        $.when(
            GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetID}`),
        ).done(function (tenentData, lastRentTrn) {
            console.log("tenentData", tenentData);
            globalTenantAgreement = tenentData;
            rentDay = tenentData["RentDueDate"]
            RenderContent.find('#txtpaidFrom').val(tenentData["ResidentsNames"]);
            //RenderContent.find('#txtAmt').val(tenentData["RentAmount"]);
            
            RenderContent.find("#ddlTranDate").val(getCurrentDate().split("-")[1]).change();

        });
    }).catch(err => {
        console.log(err)
    });
}

async function transactionCall() {
    let assetID = sessionStorage.getItem('AssetID');
    trnFrom = dateFormat($('#RenderContent').find('#trnFrom').val());
    trnTo = dateFormat($('#RenderContent').find('#trnTo').val());
    let getTransactionsData = await GetAjax(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}&type=0`);
    tranRespose(getTransactionsData)
}
function tranRespose(transactions) {
    $('#tblTransactions tbody').empty();
    $('#tblTransactions thead').html(`
                   <tr class="global-text-primary tablelight">
                        <th>Description</th><th>Transaction Type</th><th>Amount</th><th>Date</th>
                        <th>Payment Mode</th><th>Paid By</th><th>Paid To</th><th>Status</th><th>Remarks</th>
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
            { data: 'Description' },
            {
                data: 'TransactionType',
                render: function (data) { return '<div>' + TransactionsList.filter((x) => x.value == data)[0].name + '</div>'; }
            },
            {
                data: 'Amount',
                render: function (data) { return `<div class="w-100 text-right">${formatNumber(data)}</div>`; }
            },
            { data: 'Date', render: function (data) { return getDisplayDate(data) } },
            {
                data: 'TransactionMode',
                render: function (data) { return `<div class="w-100 text-center">${TransactionModesList.filter((x) => x.value == data)[0].name}</div>`; }
            },
            { data: 'PaidBy' },
            { data: 'PaidTo' },
            {
                data: 'Status', render: function (data) {
                    if (data == Status.Paid)
                        return `<div class="w-100 text-center badge badge-pill" style="color:#28a745;background-color:#99e6ab;">${StatusList.filter((x) => x.value == data)[0].name}</div>`;
                    if (data == Status.Unpaid)
                        return `<div class="w-100 text-center badge badge-pill" style="color:#dc3545;background-color:#f9939d;">${StatusList.filter((x) => x.value == data)[0].name}</div>`;
                    if (data == Status["Partially Paid"])
                        return `<div class="w-100 text-center badge badge-pill badge-warning" style="color:#dea907;background-color:#fbe194;">${StatusList.filter((x) => x.value == data)[0].name}</div>`
                    if (data == Status["Extra Paid"])
                        return `<div class="w-100 text-center badge badge-pill badge-info" >${StatusList.filter((x) => x.value == data)[0].name}</div>`
                }},
            { data: 'Remarks' },
            //{
            //    data: 'TransactionId', render: function (data, type, row, meta) {
            //        return `<div class="d-flex justify-content-center">
            //                    <button title="Delete" class="btn"><i class="bx bx-file fontSize_20 text-warning" onclick="SetTransactionPreviewModal(${data})"></i></button>
            //                </div>`;
            //    }
            //},
        ],
        "initComplete": function () { setTimeout(() => { setScreenLoader(false); }, 500); }
    });

}; 

// transaction Call
async function AlltransactionsGet() {
    let assetID = sessionStorage.getItem('AssetID');
    trnFrom = dateFormat($('#RenderContent').find('#trnFrom').val());
    trnTo = dateFormat($('#RenderContent').find('#trnTo').val());
    let getTransactionsData = await GetAjax(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}&type=0`);
    tranResponseGet(getTransactionsData);
}
function tranResponseGet(transactions) {
    $('#tblTransactions tbody').empty();
    $('#tblTransactions thead').html(`
                   <tr class="global-text-primary tablelight">
                        <th>Description</th><th>Transaction Type</th><th>Amount</th><th>Date</th><th>Payment Mode</th>
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
                render: function (data) { return '<div>' + TransactionsList.filter((x) => x.value == data)[0]?.name??"N/A" + '</div>'; }
            },
            {
                data: 'Amount',
                render: function (data) { return `<div class="w-100 text-right">${formatNumber(data)}</div>`; }
            },
            { data: 'Date', render: function (data) { return getDisplayDate(data) } },
            {
                data: 'TransactionMode',
                render: function (data) {
                    return `<div class="w-100 text-center">${TransactionModesList.filter((x) => x.value == data)[0]?.name??"N/A"}</div>`;
                }
            },
            { data: 'PaidBy' },
            { data: 'PaidTo' },
            {
                data: 'Status', render: function (data) {
                    if (data == Status.Paid)
                        return `<div class="w-100 text-center badge badge-pill" style="color:#28a745;background-color:#99e6ab;">${StatusList.filter((x) => x.value == data)[0].name}</div>`;
                    if (data == Status.Unpaid)
                        return `<div class="w-100 text-center badge badge-pill" style="color:#dc3545;background-color:#f9939d;">${StatusList.filter((x) => x.value == data)[0].name}</div>`;
                    if (data == Status["Partially Paid"])
                        return `<div class="w-100 text-center badge badge-pill badge-warning" style="color:#dea907;background-color:#fbe194;">${StatusList.filter((x) => x.value == data)[0].name}</div>`
                    if (data == Status["Extra Paid"])
                        return `<div class="w-100 text-center badge badge-pill badge-info" >${StatusList.filter((x) => x.value == data)[0].name}</div>`
                }
            },
            { data: 'Remarks' },
            {
                data: 'TransactionId', render: function (data, type, row, meta) {
                    //  <button title="Delete" class="btn"><i class="bx bx-file fontSize_20 text-warning" onclick="SetTransactionPreviewModal(${data})"></i></button>
                    return `<div class="d-flex justify-content-center">
                                <button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="TransactionEdit(${data})"></i></button>
                              
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetTransactionDeleteModal(${data})"></i></button>
                            </div>`;
                }
            },
        ],
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
        RenderContent.find('#txtAmt').val(globalTenantAgreement["RentAmount"]);
    } else {
        RenderContent.find('#txtAmt').val("");
    }
}

async function Transactionsearch(val) {
    console.log(val);
    // 1 - Mon, 2 - Tue, 3 - Wed, 4-Thu, 5 - Fri, 6 - Sat, 7 - Sun.    
    let assetID = sessionStorage.getItem('AssetID');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    $("#RenderContent .betweenDatesSection").css("display", val == 4 ? "block" : "none");
    if (val == 0) {  // Today
        trnTo = trnFrom = getCurrentDate();
    } else if (val == 1) { // Week
        var currdate = String(date.getDate()).padStart(2, '0');
        var currday = date.getDay();
        let last12 = new Date(date.getFullYear(), date.getMonth(), 0);
        let lastDay = String(last12.getDate()).padStart(2, '0');

        let diffVal = currday == 1 ? 0 : currday == 2 ? 1 : currday == 3 ? 2 : currday == 4 ? 3 : currday == 5 ? 4 : currday == 6 ? 5 : 6;

        let prevDate = currdate - diffVal;
        if (prevDate < 0) {
            trnFrom = dateFormat(`${lastDay - Math.abs(prevDate)}/${mm - 1}/${curYr}`);
        } else {
            trnFrom = dateFormat(prevDate + '/' + mm + '/' + curYr);
        }      
        trnTo = dateFormat(currdate + '/' + mm + '/' + curYr);
    } else if (val == 2) { // Month
        let first = new Date(date.getFullYear(), date.getMonth(), 1);
        let last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let firstDay = String(first.getDate()).padStart(2, '0');
        let lastDay = String(last.getDate()).padStart(2, '0');

        trnFrom = dateFormat(firstDay + '/' + mm + '/' + curYr);
        trnTo = dateFormat(lastDay + '/' + mm + '/' + curYr);
    } else if (val == 3) {
        trnFrom = dateFormat('01/01/' + curYr);
        trnTo = dateFormat('31/12/' + curYr);
    }
    if (val != 4) {
        let getTransactionsData = await GetAjax(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}&type=0`);
        isAdmin() ? tranResponseGet(getTransactionsData) : tranRespose(getTransactionsData);
    }
}

// Save and Edit Asset
async function saveTransaction() {
    let paymentDate  = dateFormat($('#RenderContent').find('#trnDate').val());
    let PaymentStatus = $("#ddlPaymentStatus :selected").val();
    let trnType = $("#ddlTransactionType :selected").val();
    let assetID = sessionStorage.getItem('AssetID');
    let trnAmt = $("#txtAmt").val();
    let dueDate = dateFormat(`${rentDay}/${$("#ddlTranDate :selected").val()}/${curYr}`);
    console.log("getCurrentDate", `${rentDay}/${$("#ddlTranDate :selected").val()}/${curYr}`)

    let TransactionToSave = JSON.stringify({
        AssetName: assetID,
        Description: $('#txtDescription').val(),
        TransactionType: trnType,
        Amount: trnAmt,
        Date: paymentDate,
        TransactionMode: Number($('#ddlTranMode').val()),
        PaidBy: $('#txtpaidFrom').val(),
        PaidTo: $('#txtpaidTo').val(),
        Status: PaymentStatus,
        Remarks: $('#txtRemarks').val(),
        CutOffDate: dueDate 
    });
    trnFrom = dateFormat('01/01/' + curYr);
    trnTo = dateFormat('31/12/' + curYr);
    console.log("TradataafansactionToSave", paymentDate, dueDate)
    console.log("TransactionToSave", TransactionToSave)
    trnisEdit ? (async function () {
        let putTransactionData = await PutAjax(ApiDictionary.PutTransaction() + `?id=${trnselectedID}`, TransactionToSave);
        console.log("Transaction Updated.", putTransactionData);
        CustomeToast("Transaction", "Transaction Modified Successfully", "bg-info");
    }()) :
        (async function () {
            let postTransactionData = await PostAjax(ApiDictionary.PostTransaction(), TransactionToSave);
            console.log(postTransactionData)
            if (postTransactionData) {
                CustomeToast("Transaction", "Transaction Saved Successfully", "bg-success");
            } else if (!postTransactionData) {
                CustomeToast("Transaction", postTransactionData.responseJSON, "bg-danger");
            }
        }());
    trnisEdit = false;
    trnselectedID = '';    
    rentDay = "";
}

// EDIT Transaction
function TransactionEdit(id) {
    var url = window.rootpath + AdminURLs.SaveTransaction;
    trnisEdit = true;
    trnselectedID = id;
    console.log("currentRow[0]", id)

    $.get(url, function (response) {
        RenderContent.html(response);

        generateOptions(convertObjectArray(TransactionTypes), "ddlTransactionType", "Select Transaction type");
        generateOptions(convertObjectArray(Status), "ddlPaymentStatus", "Select Payment type"); 
        let currentRow = transactionsData.filter(x => x.TransactionId === id);
        console.log("currentRow[0]", currentRow[0])

        let trnDate = getDisplayDate(currentRow[0].Date).replace(/-/g, "/");
        RenderContent.find("#trnDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker("setDate", `${trnDate}`)
        RenderContent.find("#ddlTransactionType").val(currentRow[0].TransactionType).change();
        RenderContent.find("#ddlPaymentStatus").val(currentRow[0].Status).change();
        RenderContent.find("#ddlTranDate").val((currentRow[0].Date).split("-")[1]).change();
        
        RenderContent.find("#txtDescription").val(currentRow[0].Description);
        RenderContent.find("#txtAmt").val(currentRow[0].Amount);
        RenderContent.find("#txtpaidFrom").val(currentRow[0].PaidBy);
        RenderContent.find("#txtpaidTo").val(currentRow[0].PaidTo);
        RenderContent.find("#ddlTranMode").val(currentRow[0].TransactionMode).change();
        RenderContent.find("#txtRemarks").val(currentRow[0].Remarks);
        let diff = Number(globalTenantAgreement["RentAmount"]) - Number(currentRow[0].Amount)
        if (currentRow[0].TransactionType == 2 && diff > 0) {
            $("#amtDesc").removeAttr("hidden").html(`The Amount of ${diff} is due for the month`);
        }
    });
}

// DELETE Transaction
async function TransactionDelete(id) {
    let deleteTransactionData = await DeleteAjax(`${ApiDictionary.DeleteTransaction()}?id=${id}`);
    console.log("deleteTransactionData", deleteTransactionData);
    CustomeToast("Transaction", "Transaction Deleted Successfully", "bg-danger");
}

// DELETE Confirmation Modal
function SetTransactionDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="TransactionDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}
// Preview Modal
function SetTransactionPreviewModal(id) {
    let currentRow = transactionsData.filter(x => x.TransactionId === id);

    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">CLose</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Download</button>`;
    $('#previewModal .modal-title').text("Transaction Preview");
    $('#previewModal .modal-footer').html(deleteButtons);
    $('#previewModal #receiptHouseName').html(sessionStorage.getItem("AssetName"));
    $('#previewModal').modal('show');
   
}