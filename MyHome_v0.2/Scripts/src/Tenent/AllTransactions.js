
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
                TransactionsList.filter((x) => x.value == row.TransactionType)[0].name  + '</td><td>' +
                row.Amount + '</td><td>' +
                row.Date + '</td><td>' +
                TransactionModesList.filter((x) => x.value == row.TransactionMode)[0].name + '</td><td>' +
                row.PaidBy + '</td><td>' +
                row.PaidTo + '</td><td>' +
                StatusList.filter((x) => x.value == row.Status)[0].name + '</td><td>' +
                row.Remarks + '</td></tr>'

        });
        $('#RenderContent #tblTransactions tbody').append(rowItem);
    }
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions(), getTransactionsfn);  

    console.log();

    // Implemented ASSET REGISTRATION POST 

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    url: "/api/AdminData/PostAssetDetails",
    //    data: JSON.stringify({
    //        AssetName: 'Sweet Home13',
    //        RegisteredDate: '2020-02-01',
    //        Address: 'Some Tehee Address',
    //        LandTaxAmount: 9000,
    //        NumberofDoors:3,
    //        NumberofWindows: 3,
    //        NumberofTaps: 3,
    //        NumberofFans: 3,
    //        NumberofBulbs:4,
    //        IsSump: 1,
    //        Remarks: '1000 Balance to give.'
    //    }),
    //    headers: {
    //        'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
    //    },
    //    dataType: "JSON",
    //    success: function (data) {
    //        console.log(data);

    //    },
    //    error: (jqXHR) => {
    //        console.log('something went wrong with the POST...!!!');
    //    }
    //});


     // Implemented Tenent Agreement POST 

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    url: "/api/TenentAgreement/PostTenentAgreement",
    //    data: JSON.stringify({
    //        AssetName: 'Sweet Home12',
    //        ResidentsNumber: 2,
    //        JoiningDate: '2010-11-04',
    //        LeavingDate: '2020-12-21',
    //        ResidentsNames:'rajesh,suresh',
    //        IdentityProofs:'aadhar card,college IDs',
    //        AdvanceAmount: 10000,
    //        RentAmount: 4000,
    //        PercentageIncreased: 2,
    //        ContactNumbers: '9080907066,9070678433',
    //        TenentEmailId:"someone@gmail.com",
    //        TenentPassword:"123456",
    //        Remarks: 'Not Available'
    //    }),
    //    headers: {
    //        'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
    //    },
    //    dataType: "JSON",
    //    success: function (data) {
    //        console.log(data);

    //    },
    //    error: (jqXHR) => {
    //        console.log('something went wrong with the POST...!!!');
    //    }
    //});


     // Implemented TenantAgreement PUT 

    //$.ajax({
    //    type: "PUT",
    //    contentType: "application/json",
    //    url: ApiDictionary.PutTenentAgreement()+'?id=1',
    //    data:JSON.stringify({
    //            AssetName: 'Sweet Home1',
    //            ResidentsNumber: 4,
    //            JoiningDate: '2010-01-12',
    //            LeavingDate: '2010-01-12',
    //            ResidentsNames: 'Rajesh Kumar',
    //            IdentityProofs: 'Voter card,College IDs',
    //            AdvanceAmount: 20000,
    //            RentAmount: 5000,
    //            PercentageIncreased: 4,
    //            ContactNumbers: '9653652344',
    //            TenentEmailId: 'abc@gmail.com',
    //            Remarks: 'Teehee teehee'
    //        }),
        
    //    headers: {
    //        'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
    //    },
    //    dataType: "JSON",
    //    success: function (data) {
    //        console.log(data);
    //    },
    //    error: (jqXHR) => {
    //        console.log('something went wrong with the POST...!!!');
    //    }
    //});

    // Implemented TenantAgreement DELETE 

    //$.ajax({
    //    type: "DELETE",
    //    contentType: "application/json",
    //    url: ApiDictionary.DeleteTenentAgreement() + '?id=4', 
    //    headers: {
    //        'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
    //    },
    //    dataType: "JSON",
    //    success: function (data) {
    //        console.log(data);
    //    },
    //    error: (jqXHR) => {
    //        console.log('something went wrong with the POST...!!!');
    //    }
    //});
}
