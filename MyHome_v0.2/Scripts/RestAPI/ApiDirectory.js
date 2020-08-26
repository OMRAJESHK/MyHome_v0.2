const path = sessionStorage.getItem('path');
const Admin = 'Admin/';
const Client = 'tenent/';
class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static gotoAdminLogin = () => "UserAccount/Login";
    static GetUserRole = () => path+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') + '/api/Transactions/GetTransaction';
    static GetTenantAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/GetTenentAgreement';
    static PutTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/PutTenentAgreement';
    static DeleteTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/DeleteTenentAgreement';
    static AssetPost = () => sessionStorage.getItem('path') + "/api/Asset/PostAssetDetails";
    static AssetPut = () => sessionStorage.getItem('path') + "/api/Asset/PutAsset";
    static DeleteAsset = () => sessionStorage.getItem('path') + "/api/Asset/DeleteAsset";
    static GetAssetName = () => sessionStorage.getItem('path') + '/api/Asset/GetAssetName';
    static GetProximity = () => sessionStorage.getItem('path') + '/api/Proximities/GetProximity';
    static PostProximity = () => sessionStorage.getItem('path') + '/api/Proximities/PostProximity';
    static PutProximity = () => sessionStorage.getItem('path') + '/api/Proximities/PutProximity';
    static GetRequest = () => sessionStorage.getItem('path') + '/api/Request/GetRequestsByID';
    static PostRequest = () => sessionStorage.getItem('path') + "/api/Request/PostRequest";
    static GetNotification = () => sessionStorage.getItem('path') + "/api/Notifications/GetNotification";
    static GetNotification = () => sessionStorage.getItem('path') + "/api/Notifications/GetNotification";
    static PostNotification = () => path + "/api/Notifications/PostNotification";
    static PutNotification = () => path + "/api/Notifications/PutNotification";
    static DeleteNotification = () => path + "/api/Notifications/DeleteNotification";

}

const AdminURLs = {
    Dashboard:Admin + '_AdminDashboard',
    Asset: Admin + '_AssetRegistration',
    TenantDeed: Admin + '_TenantDeedRegistration',
    SaveTransaction: Admin + '_SaveTransactions',
    SaveProximity: Admin + '_SaveProximities',
    SaveNotification: Admin + '_SaveNotifications',
    selectAsset: Admin + '_SelectAsset',
}

const TenantURLs = {
    Dashboard: Client + '_tenentDashboard',
    saveRequest: Client + '_saveRequest',
    Transactions: Client +'_allTransactions'
}