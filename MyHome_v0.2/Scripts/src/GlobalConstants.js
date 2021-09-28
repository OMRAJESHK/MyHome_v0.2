let loadbtnclass = "fa fa-spinner fa-spin";
let defaultbtnclass = "fas fa-share";

const TransactionTypes = {
  "Advance Received": 1,
  "Rent Received": 2,
  "Water Bill Received": 3,
  'Electricity Bill Received': 4,
  "Motor Bill Received":5,
  'Water Tanks Amt Received': 6,
  'Electric Appliances Amt Received': 7,
  "Households Amt Received": 8,
  "Fine Received": 9,
  "Festival Amt Received":10,
  "Miscellanious Amt Received":11,

  "Advance Paid": 101,
  "Rent Paid": 102,
  "Water Bill Paid": 103,
  'Electricity Bill Paid': 104,
  "Motor Bill Paid":105,
  'Water Tanks Amt Paid': 106,
  'Electric Appliances Amt Paid': 107,
  "Households Amt Paid": 108,
  "Fine Paid": 109,
  "Festival Amt Paid": 110,
  "Miscellanious Amt Paid": 111,
};

const ModeOFPayment = {
    CASH: 1,
    ONLINE: 2,
    Other: 3
};

const Status = {
    Paid: 1,
    Unpaid: 2,
    Omit:3
};

const NotificationTypes = {
    "Advance Paid": 1,
    "Advance UnPaid": 2,
    'Rent Paid': 3,
    'Rent Unpaid': 4,
    'Electricity Bill Paid': 5,
    'Electricity Bill Unpaid': 6,
    'Water Bill Paid':7,
    'Water Bill Unpaid':8,
    'Plumbing Households Paid':9,
    'Plumbing Households Unpaid': 10,
    'Electric Households Paid': 11,
    'Electric Households Unpaid': 12,
    'Festival Wishes': 13 ,
    'Miscellanious Unpaid': 14,
    'Miscellanious Paid': 15,
};

const DocumentTypes = {
    "Profile Pic": 1,
    "Tenant Deed Agreement": 2,
    "Electricity Bill": 3,
    'Water Bill': 4,
    'Motor Bill': 5,
    'College ID': 6,
    'Aadhar Card': 7,
    "Drivers License": 8,
    "Signature":9,
    "Miscellanious":10
};

const Distance = { 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10 }

const NotificationLetter = {
    0:"A", 1:"R", 2:"E",  3:'W', 4:"PH", 5:"EH", 6:"F", 7: "M",
}

const Professions = {
    1: "Owner",
    2: "Electricean",
    3: "Plumbing",
    4: "Water Supply",
    5: "Water Tank",
    6: "House Builder",
    7: "House Labour",
    8: "Painter",
    9: "Snake Catcher"
}

const Months = { "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apl", "5": "May", "6": "Jun", "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" }

const ReminderTypes = {
    //"Every Minute": 1, "Every Hour": 2,
    "Every Day": 3, "Every Week": 4, "Every Month": 5, "Every Year": 6
}