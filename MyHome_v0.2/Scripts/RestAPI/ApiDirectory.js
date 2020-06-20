class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/Login";
    static GetUserRole = () => sessionStorage.getItem('path')+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') +'/api/TenentData/GetTransactions';
}