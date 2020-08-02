class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static gotoAdminLogin = () => "UserAccount/Login";
    static GetUserRole = () => sessionStorage.getItem('path')+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') + '/api/Transactions/GetTransactions';
    static GetTenantAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/GetTenentAgreement';
    static PutTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/PutTenentAgreement';
    static DeleteTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/DeleteTenentAgreement';
    static AssetPost = () => sessionStorage.getItem('path') + "/api/Asset/PostAssetDetails";
    static AssetPut = () => sessionStorage.getItem('path') + "/api/Asset/PutAsset";
    static DeleteAsset = () => sessionStorage.getItem('path') + "/api/Asset/DeleteAsset";
    static GetAssetName = () => sessionStorage.getItem('path') + '/api/Asset/GetAssetName';
    static GetProximity = () => sessionStorage.getItem('path') + '/api/Proximities/GetProximity';
}
const Admin = 'Admin/';
const Client = 'tenent/';
const AdminURLs = {
    Dashboard:Admin + '_AdminDashboard',
    Asset: Admin + '_AssetRegistration',
    TenantDeed: Admin + '_TenantDeedRegistration',
    SaveTransaction: Admin + '_SaveTransactions',
    SaveNotification: Admin + '_SaveNotifications',
    selectAsset: Admin + '_SelectAsset',
}
const TenantURLs = {
    Dashboard: Client + '_tenentDashboard',
}