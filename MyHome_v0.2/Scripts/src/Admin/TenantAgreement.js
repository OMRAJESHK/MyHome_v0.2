var tenantAgreement=[]
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
        RenderContent.find('#lblJoiningDate').text(res["JoiningDate"]);
        RenderContent.find('#lblIdentityProofs').text(res["IdentityProofs"]);
        RenderContent.find('#lblTenantRemarks').text(res["Remarks"]);
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
    console.log(ApiDictionary.PutProximity() + `?id=${id}`, tenantAgmntToSave)
    ManageAjaxCalls.Put(ApiDictionary.PutTenentAgreement() + `?id=${id}`, tenantAgmntToSave, (res) => {
        console.log('tenantAgmnt Saved', res)
    });
}