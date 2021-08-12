var tenantAgreement = [];
let agreemntIsEdit = false;
let agreemntSelectedID = '';
function getTenantAgreementLogs() {
    let assetId = Number(sessionStorage.getItem('AssetID'));
    ManageAjaxCalls.GetData(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`, (res) => {
        tenantAgreement = res;
        RenderContent.find('#lblNumOfRecidents').text(res["ResidentsNumber"]);
        RenderContent.find('#lblResidentsNames').text(res["ResidentsNames"]);
        RenderContent.find('#lblResidentContactNumber').text(res["ContactNumbers"]);
        RenderContent.find('#lblAdvAmt').text(res["AdvanceAmount"]);
        RenderContent.find('#lblRentAmt').text(res["RentAmount"]);
        RenderContent.find('#lblPercInc').text(res["PercentageIncreased"]);
        RenderContent.find('#lblJoiningDate').text(getDisplayDate(res["JoiningDate"]));
        RenderContent.find('#lblIdentityProofs').text(res["IdentityProofs"]);
        RenderContent.find('#lblTenantRemarks').text(res["Remarks"]);
    }, () => {
            //alert("No Tenant Available");
            CustomeToast("", "No Tenant Available", "bg-danger");
    });
}
function gotoEditAgreement() {
    var url = window.rootpath + AdminURLs.TenantDeed;
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#txtJoiningDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
        RenderContent.find('#txtNumOfRecidents').val(tenantAgreement["ResidentsNumber"]);
        RenderContent.find('#txtResidentsNames').val(tenantAgreement["ResidentsNames"]);
        RenderContent.find('#txtResidentContactNumber').val(tenantAgreement["ContactNumbers"]);
        RenderContent.find('#txtAdvAmt').val(tenantAgreement["AdvanceAmount"]);
        RenderContent.find('#txtRentAmt').val(tenantAgreement["RentAmount"]);
        RenderContent.find('#txtPercInc').val(tenantAgreement["PercentageIncreased"]);
        RenderContent.find('#txtJoiningDate').val(tenantAgreement["JoiningDate"]);
        RenderContent.find('#txtIdentityProofs').val(tenantAgreement["IdentityProofs"]);
        RenderContent.find('#txtTenantRemarks').val(tenantAgreement["Remarks"]);
        agreemntIsEdit = true;
    });
}
function gotoAddAgreement() {
    var url = window.rootpath + AdminURLs.TenantDeed;
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#txtJoiningDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
        agreemntIsEdit = false;

    });
}

function saveTenantAgreement() {
    let tenantAgmntToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        ResidentsNumber: getValue('#txtNumOfRecidents'),
        JoiningDate: dateFormat(getValue('#txtJoiningDate')),
        LeavingDate: dateFormat(getValue('#txtJoiningDate')),
        ResidentsNames: getValue('#txtResidentsNames'),
        IdentityProofs: getValue('#txtIdentityProofs'),
        AdvanceAmount: getValue('#txtAdvAmt'),
        RentAmount: getValue('#txtRentAmt'),
        PercentageIncreased: getValue('#txtPercInc'),
        ContactNumbers: getValue('#txtResidentContactNumber'),
        Remarks: getValue('#txtTenantRemarks'),
    });
    let id = tenantAgreement.AgreementId;
    console.log(`?id=${id}`, {
        AssetName: sessionStorage.getItem('AssetID'),
        ResidentsNumber: getValue('#txtNumOfRecidents'),
        JoiningDate: dateFormat(getValue('#txtJoiningDate')),
        LeavingDate: dateFormat(getValue('#txtJoiningDate')),
        ResidentsNames: getValue('#txtResidentsNames'),
        IdentityProofs: getValue('#txtIdentityProofs'),
        AdvanceAmount: getValue('#txtAdvAmt'),
        RentAmount: getValue('#txtRentAmt'),
        PercentageIncreased: getValue('#txtPercInc'),
        ContactNumbers: getValue('#txtResidentContactNumber'),
        Remarks: getValue('#txtTenantRemarks'),
    })
    agreemntIsEdit ? ManageAjaxCalls.Put(ApiDictionary.PutTenentAgreement() + `?id=${id}`, tenantAgmntToSave, (res) => {
        console.log('tenantAgmnt Modified', res)
    }):
    ManageAjaxCalls.Post(ApiDictionary.PostTenentAgreement(), tenantAgmntToSave, (res) => {
        console.log('tenantAgmnt Saved', res);
        CustomeToast("Tenant Agreement", "Tenant Agreement Saved", "bg-success");
    });
}


// DELETE Confirmation Modal
function SetTenantAgreementDeleteModal() {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="TenantAgreementDelete()">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE PROPERTY TAX
function TenantAgreementDelete() {
    let id = sessionStorage.getItem("AssetID")
    ManageAjaxCalls.Delete(ApiDictionary.DeleteTenentAgreement() + '?id=' + id, (res) => {
        console.log('DEleted Successfully', res);
        CustomeToast("Tenant Agreement", "Tenant Agreement Deleted Successfully", "bg-danger");
    });
}