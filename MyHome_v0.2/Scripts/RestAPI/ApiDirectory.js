class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static gotoAdminLogin = () => "UserAccount/Login";
    static GetUserRole = () => sessionStorage.getItem('path')+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') + '/api/Transactions/GetTransactions';
    static GetTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/GetTenentAgreement';
    static PutTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/PutTenentAgreement';
    static DeleteTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/DeleteTenentAgreement';
}
const Admin = 'Admin/';
const Client = 'tenent/';
const AdminURLs = {
    Dashboard:Admin + '_AdminDashboard',
    Asset: Admin + '_AssetRegistration',
    TenantDeed: Admin + '_TenantDeedRegistration',
    SaveTransaction: Admin + '_SaveTransactions',
    SaveNotification: Admin +'_SaveNotifications',
}
const TenantURLs = {
    Dashboard: Client + '_tenentDashboard',

}