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

// Current Date:
let date = new Date();
let today = date.toLocaleDateString();
let time = date.toLocaleTimeString();

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
  let numDep = 0;
  let withdraw = 0;
  let numWithdraw = 0;
  let interrest = 0;
  arr.forEach(function (value) {
    // identificando quais elementos são maiores que 0 (Deposito - in) e os menores do que 0 (Withdraw)
    if (value > 0) {
      numDep++;
      addNewMovRow('deposit', value);
      deposit += value;
      console.log(`You Deposited: ${value}`);
    } else {
      numWithdraw++;
      addNewMovRow('withdraw', value);
      withdraw += value;
      console.log(`You withdraw: ${Math.abs(value)} `);
    }
  });

  // Calc Intrrest = in(or deposit) * interestRate/100 .
  interrest = (deposit * acc.interestRate) / 100;

  return [deposit, Math.abs(withdraw), interrest, numDep, numWithdraw];
};

// * Comparing credentials:

// - Geting input values when login button is click:
let currentAcc;
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
      currentAcc = acc;
      // Displaying UI and Welcome msg
      labelWelcome.textContent = `Welcome to Minimal Bank, ${acc.owner}`;
      labelDate.textContent = today;
      containerApp.style.opacity = 100; // Display App

      // Using calc balance function + display balance

      const accIndex = i; // show which account was acessed
      const accMov = acc.movements;
      const currentBalance = calcAccountsBalance(accMov);
      labelBalance.textContent = `€${currentBalance}`;

      // Remove movements :
      const movRows = document.querySelectorAll('.movements__row');
      movRows.forEach(function (row) {
        row.remove();
      });

      // Using calc summary function + display balance:

      const accSumary = calcSummary(accMov, acc); // [in,out,interrest]
      labelSumIn.textContent = `€${accSumary[0]}`;
      labelSumOut.textContent = `€${accSumary[1]}`;
      labelSumInterest.textContent = `€${accSumary[2]}`;
    }
  });
});

// Display app:

containerApp.style.opacity = 100;

// Display movements

/* 
- How to create an DOM element? https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
- Create an DOM element running the array that contains movements (acc.movements).=
- Where insert the elements? div movements -> div movements row -> movements__type--deposit or movements__type--withdrawal /
movements__date / movements__value 
*/

function addNewMovRow(typeOfMov, value) {
  // Create a new mov row element
  const newMovRow = document.createElement('div');
  newMovRow.className = 'movements__row';
  containerMovements.insertBefore(newMovRow, containerMovements.childNodes[0]);

  if (typeOfMov === 'deposit') {
    // Create div deposit inside movement row:
    const newDepositDiv = document.createElement('div');
    newMovRow.appendChild(newDepositDiv).className =
      'movements__type movements__type--deposit';
    newDepositDiv.textContent = '1 DEPOSIT'; // Quantidades de depositos executados no dia (Var)
  } else if (typeOfMov === 'withdraw') {
    const newWithDrawaltDiv = document.createElement('div');
    newMovRow.appendChild(newWithDrawaltDiv).className =
      'movements__type movements__type--withdrawal';
    newWithDrawaltDiv.textContent = '1 WITHDRAWAL'; // Quantidades de depositos executados no dia (Var)
  }

  // Create div date
  const newDatetDiv = document.createElement('div');
  newMovRow.appendChild(newDatetDiv).className = 'movements__date';
  newDatetDiv.textContent = today;

  // Create div value
  const newValueDiv = document.createElement('div');
  newMovRow.appendChild(newValueDiv).className = 'movements__value';

  if (typeOfMov === 'deposit') {
    newValueDiv.textContent = `€${value}`; // variavel
  } else if (typeOfMov === 'withdraw') {
    newValueDiv.textContent = `- €${Math.abs(value)}`; // variavel
  }
}

// First Test addNewMovRow function:

//addNewMovRow('deposit',150);
//addNewMovRow('withdraw',180);
//addNewMovRow('withdraw',300);

/*

  2) Conta que efetuou a transferencencia account.moviment.push(-valor); + Exibir a transferencia.


*/

btnTransfer.addEventListener('click', transferMoney);
function transferMoney() {
  // 1) Quando clicar no botão : Pegar valores da interface Transfer Money
  //inputTransferTo inputTransferAmount

  // Reading input values:
  const transferTo = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  console.log(transferTo, transferAmount);

  // Reset input box:
  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  //2) Identificar Conta que efetuou a transferencencia + account.moviment.push(-valor); + Exibir a transferencia.

  // Add movement to account.movements + display movement
  const acc = currentAcc.movements;
  acc.push(-transferAmount);
  addNewMovRow('withdraw', transferAmount);

  // Calc new currentBalance + display it
  const newBalance = calcAccountsBalance(acc);
  labelBalance.textContent = `€${newBalance}`;

  // 3) Conta que recebeu a transferência: Como identificar a const que foi feita a transferencia
  const transferAcc = account1.movements;
  transferAcc.push(transferAmount);
  addNewMovRow('deposit', transferAmount);
}

// Será necessário criar uma função que identifica o objeto account através do nome de usuario "String" ***
