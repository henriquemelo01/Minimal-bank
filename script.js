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

// Calc accounts balance: Sum all array elements

const calcAccountsBalance = function (arr) {
  let current = 0;
  arr.forEach(function (mov) {
    current += mov;
  });
  return current;
};

// Calculate Summary: Returns an array that contains [deposit,withdraw,interrest]

const calcSummary = function (arr, acc) {
  let deposit = 0;
  let withdraw = 0;
  let interrest = 0;
  arr.forEach(function (value) {
    // identificando quais elementos são maiores que 0 (Deposito - in) e os menores do que 0 (Withdraw)
    if (value > 0) {
      deposit += value;
      console.log(`You Deposited: ${value}`);
    } else {
      withdraw += value;
      console.log(`You withdraw: ${Math.abs(value)} `);
    }
  });

  // Calc Intrrest = in(or deposit) * interestRate/100 .
  interrest = (deposit * acc.interestRate) / 100;

  return [deposit, Math.abs(withdraw), interrest];
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
      labelWelcome.textContent = `Welcome to Minimal Bank, ${acc.owner}`;
      containerApp.style.opacity = 100; // Display App

      // Using calc balance function + display balance

      const accIndex = i; // show which account was acessed
      const accMov = acc.movements;
      const currentBalance = calcAccountsBalance(accMov);
      labelBalance.textContent = `€${currentBalance}`;

      // Using calc summary function + display balance:

      const accSumary = calcSummary(accMov, acc); // [in,out,interrest]
      labelSumIn.textContent = `€${accSumary[0]}`;
      labelSumOut.textContent = `€${accSumary[1]}`;
      labelSumInterest.textContent = `€${accSumary[2]}`;
    }
  });
});

// containerApp.style.opacity = 100;
