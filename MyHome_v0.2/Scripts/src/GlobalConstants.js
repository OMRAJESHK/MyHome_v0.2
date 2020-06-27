const TransactionTypes = {
  Rent: 1,
  'Water Bill': 2,
  'Electricity Bill': 3,
  'Motor Bill': 4,
  'Plumbing': 5,
  'Electric Households': 6,
  'Water Tanks': 7
};

const ModeOFPayment = {
    CASH: 1,
    ONLINE:2
};

const Status = {
    Paid: 1,
    Unpaid: 2
};

const NotificationTypes = {
    'Rent Paid': 1,
    'Electricity Bill Paid': 2,
    'Water Bill Paid': 3,
    'Miscellanious Paid': 4,
    'Rent Unpaid': 5,
    'Electricity Bill Unpaid': 6,
    'Water Bill Unpaid': 7,
    'Miscellanious Unpaid': 8,
    'Plumbing Households Paid': 9,
    'Plumbing Households Unpaid': 10,
    'Electric Households Paid': 11,
    'Electric Households Unpaid': 12,
    'Festival Wishes':13   
};

const convertObjectArray = (object) => {
    const result = [];
    var keys = Object.keys(object);
    var values = Object.values(object);
    for (let index = 0; index < keys.length; index++) {
        result.push({ name: keys[index], value: values[index] });
    }
    return result;
};