'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
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
        <div class="movements__value">${mov}€ </div>
      </div> 
`;
    containermovs.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  console.log(acc);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(deposit => deposit > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter(int => int >= 1) // 1.2% on deposit
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};

let currentAccount;
//Event handlers
btnLogin.addEventListener('click', event => {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;

    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Transfer money
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    // Add a negative movement to current user
    currentAccount.movements.push(-amount);
    // Add a positive movement to recipient
    receiverAcc.movements.push(amount);

    // Update UI: display movements,balance,summary
    updateUI(currentAccount);
  }
});

// // const calcAverageHumanAge = ages =>
// //   ages
// //     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
// //     .filter(age => age >= 18)
// //     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// // console.log(avg1);
// // console.log(avg2);

// const movments = [200, -200, 340, -300, -20, 50, 400, -460];

// const firstWithdrawal = movments.find(mov => mov < 0);
// console.log(firstWithdrawal);
// console.log(movments);

// const account = accounts.find(acc => acc.owner === 'Sarah Smith');
// console.log(account);

// for (let account of accounts) {
//   if (account.owner === 'Sarah Smith') console.log(account);
// }
