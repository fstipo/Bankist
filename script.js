'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movs: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movs: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movs: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movs: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containermovs = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  containermovs.innerHTML = '';
  movements.forEach((mov, i) => {
    const isDeposit = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `   
      <div class="movements__row">
        <div class="movements__type movements__type--${isDeposit}">${
      i + 1
    } ${isDeposit.toUpperCase()}</div>
        <div class="movements__value">${mov} </div>
      </div> 
`;
    containermovs.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movs);

const calcDisplayBalance = movements => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

calcDisplayBalance(account1.movs);

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0))
      .join('');
  });
};
createUsernames(accounts);

// Test data 1: [5,2,4,1,15,8,3]
// Test data 2: [16,6,10,5,6,1,4]

// if dogAge <= 2     humanAge = 2* dogAge
// if dogAge > 2     humanAge =16 + dogAge *4

// 2.     >=18 humanAge
// 3.     >=18 humanAge
// 4.  avg >=18

const calcAverageHumanAge = ages => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const isAdult = humanAges.filter(age => age >= 18);
  const avgAge = isAdult.reduce((acc, age, i, arr) => {
    return acc + age / arr.length;
  }, 0);
  return avgAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(parseInt(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])));
