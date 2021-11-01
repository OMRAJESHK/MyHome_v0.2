var tenantAgreement = [];
let agreemntIsEdit = false;
let agreemntSelectedID = '';
async function getTenantAgreementLogs() {
    try {
        let assetId = Number(sessionStorage.getItem('AssetID'));
        let getTenentAgreementData = await GetAjax(ApiDictionary.GetPropertyTaxes() + `?AssetName=${assetId}`);
        tenantAgreement = getTenentAgreementData;
        if (isAdmin()) {
            if (getTenentAgreementData.constructor === Object) {
                mainContent.find('#btnEditAgreement').show();
                mainContent.find('#btnAddAgreement').hide()
            }
        } else
            mainContent.find('#btnEditAgreement').hide();
        RenderContent.find('#lblNumOfRecidents').text(getTenentAgreementData["ResidentsNumber"]);
        RenderContent.find('#lblResidentsNames').text(getTenentAgreementData["ResidentsNames"]);
        RenderContent.find('#lblResidentContactNumber').text(getTenentAgreementData["ContactNumbers"]);
        RenderContent.find('#lblAdvAmt').text(getTenentAgreementData["AdvanceAmount"]);
        RenderContent.find('#lblRentAmt').text(getTenentAgreementData["RentAmount"]);
        RenderContent.find('#lblPercInc').text(getTenentAgreementData["PercentageIncreased"]);
        RenderContent.find('#lblJoiningDate').text(getDisplayDate(getTenentAgreementData["JoiningDate"]));
        RenderContent.find('#lblIdentityProofs').text(getTenentAgreementData["IdentityProofs"]);
        RenderContent.find('#lblTenantRemarks').text(getTenentAgreementData["Remarks"]);
        setTimeout(() => { setScreenLoader(false); }, 500);
    } catch (err) {
        mainContent.find('#btnEditAgreement').hide();
        mainContent.find('#btnAddAgreement').show()
        CustomeToast("", "No Tenant Available", "bg-danger");
    }
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
    agreemntIsEdit ? (async function () {
        let putTenentAgreementData = await PutAjax(ApiDictionary.PutTenentAgreement() + `?id=${id}`, tenantAgmntToSave);
        console.log('tenantAgmnt Modified', putTenentAgreementData);
        CustomeToast("Tenent Agreement", "Tenent Deed Agreement Modified Successfully", "bg-info");
    }()) : (async function () {
        let postTenentAgreementData = await PostAjax(ApiDictionary.PostTenentAgreement(), tenantAgmntToSave);
        console.log('tenantAgmnt Saved', postTenentAgreementData);
        CustomeToast("Tenant Agreement", "Tenant Agreement Saved", "bg-success");
    }());
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
async function TenantAgreementDelete() {
    let id = sessionStorage.getItem("AssetID");
    let deleteTenentAgreementData = await DeleteAjax(`${ApiDictionary.DeleteTenentAgreement()}?id=${id}`);
    console.log('Deleted Successfully', deleteTenentAgreementData);
    CustomeToast("Tenant Agreement", "Tenant Agreement Deleted Successfully", "bg-danger");
}