let loadbtnclass = "fa fa-spinner fa-spin";
let defaultbtnclass = "fas fa-share";

const TransactionTypes = {
  "Advance": 1,
  "Rent": 2,
  "Water Bill": 3,
  'Electricity Bill': 4,
  "Motor Bill":5,
  'Water Tanks Amount': 6,
  'Electric Appliances Amount': 7,
  "Households Amount": 8,
  "Fine Amount": 9,
  "Festival Amount":10,
  "Miscellanious Amount":11,

  //"Advance Unpaid": 101,
  //"Rent Unpaid": 102,
  //"Water Bill Unpaid": 103,
  //'Electricity Bill Unpaid': 104,
  //"Motor Bill Unpaid":105,
  //'Water Tanks Amt Unpaid': 106,
  //'Electric Appliances Amt Unpaid': 107,
  //"Households Amt Unpaid": 108,
  //"Fine Unpaid": 109,
  //"Festival Amt Unpaid": 110,
  //"Miscellanious Amt Unpaid": 111,
};

const ModeOFPayment = { CASH: 1, ONLINE: 2, Other: 3 };

const Status = { Paid: 1, Unpaid: 2, Omit: 3, "Partially Paid": 4, "Extra Paid": 5 };

const NotificationTypes = {
    "Advance Paid": 1, "Advance UnPaid": 2, 'Rent Paid': 3, 'Rent Unpaid': 4, 'Electricity Bill Paid': 5,
    'Electricity Bill Unpaid': 6, 'Water Bill Paid':7, 'Water Bill Unpaid':8, 'Plumbing Households Paid':9,
    'Plumbing Households Unpaid': 10, 'Electric Households Paid': 11, 'Electric Households Unpaid': 12,
    'Festival Wishes': 13 , 'Miscellanious Unpaid': 14, 'Miscellanious Paid': 15,
};

const DocumentTypes = {
    "Profile Pic": 1, "Tenant Deed Agreement": 2, "Electricity Bill": 3, 'Water Bill': 4, 'Motor Bill': 5,
    'College ID': 6, 'Aadhar Card': 7, "Drivers License": 8, "Signature":9, "Miscellanious":10
};

const Distance = { "Less than 1KM": 0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10 }

const NotificationLetter = {
    0:"A", 1:"R", 2:"E",  3:'W', 4:"PH", 5:"EH", 6:"F", 7: "M",
}

const Professions = {
    1: "Owner", 2: "Electricean", 3: "Plumbing", 4: "Water Supply", 5: "Water Tank",
    6: "House Builder", 7: "House Labour", 8: "Painter", 9: "Snake Catcher"
}

const Months = { "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apl", "5": "May", "6": "Jun", "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" }

const ReminderTypes = {
    //"Every Minute": 1, "Every Hour": 2,
    "Every Day": 3, "Every Week": 4, "Every Month": 5, "Every Year": 6
}

const Directions = { "North": 1, "North East": 2, "East": 3, "South East": 4, "South": 5, "South West": 6, "West": 7, "North West": 8 }

