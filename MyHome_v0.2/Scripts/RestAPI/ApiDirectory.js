class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static GetUserRole = () => sessionStorage.getItem('path')+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') + '/api/Transactions/GetTransactions';
    static GetTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/GetTenentAgreement';
}