
// Get Emergency Contact Details
const getEmergencyContactList = () => {
    let assetID = sessionStorage.getItem('AssetID');
    let profession = 8;
    ManageAjaxCalls.GetData(ApiDictionary.GetEmergencyContactsByProfession() + `?AssetName=${assetID}&profession=${profession}`, EmergencyContactRes)
}

const EmergencyContactRes = (res) => {
    console.log(res);
    let emcyConResData = res;
    var url = window.rootpath + "Tenent/_emrcyContact";
    $.get(url, function (response) {
        RenderContent.html(response);
        let emergencyHTML = "";
        emcyConResData?.map(itm => {
            emergencyHTML += 
                `<div class="card-header global-bg-primary">
                    <h3 class="mb-0 text-light">${Professions[itm.Profession]} Details</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group flex-fill text-center border-right-2">
                                <div><i class="fas fa-paw fontSize_50 global-text-primary"></i></div>
                                <label for="inputOwnerName" class="font-weight-bold mt-2 h5">Name</label>
                                <div><label for="inputOwnerName">${itm.ContactName}</label></div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group flex-fill text-center">
                                <div><i class="fas fa-phone fontSize_50 global-text-primary"></i></div>
                                <label for="inputOwnerNumber" class="font-weight-bold mt-2 h5">Number</label>
                                <div><label for="inputOwnerNumber">${itm.ContactNumber}</label></div>
                            </div>
                        </div>               
                    </div>
                </div>`;
        })
        RenderContent.find(`#emergencyNumbersList`).html(emergencyHTML);
    });
}