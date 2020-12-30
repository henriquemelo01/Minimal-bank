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
  username: 'js',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  username: 'jd',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  username: 'st',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  username: 'ss',
};

const account5 = {
  owner: 'Henrique Moraes',
  movements: [2500, -750, 3500, 250, -200, -50, 1000],
  interestRate: 1,
  pin: 1234,
  username: 'hm',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

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

// Calc accounts balance: Return an array that contains all accounts balance.

const calcAccountsBalance = function (accIndex) {
  let balance = 0;
  let arrMov = [];
  accounts.forEach(function (acc, i) {
    acc.movements.forEach(function (mov, i) {
      balance += mov;
    });

    arrMov.push(balance);
  });

  return arrMov[accIndex];
};

// * Comparing credentials:

// - Geting input values when login button is click:

btnLogin.addEventListener('click', function () {
  // Check credentials:

  // Reading input values:
  const userId = inputLoginUsername.value;
  const userPin = Number(inputLoginPin.value);

  // Cycles through an arrays that contain the all account data objects.

  accounts.forEach(function (acc, i) {
    const checkPin = acc.pin === userPin ? true : false;

    const checkUser = acc.username === userId ? true : false;

    if (checkPin && checkUser) {
      // Displaying UI and Welcome msg
      labelWelcome.textContent = `Welcome, ${acc.owner}`;
      containerApp.style.opacity = 100; // Display App

      // Using calc balance function + display balance

      const accIndex = i; // show which account was acessed
      const currentBalance = calcAccountsBalance(accIndex);
      console.log(accIndex, currentBalance);
      labelBalance.textContent = `€${currentBalance}`;
    }
  });
});

//containerApp.style.opacity = 100;
