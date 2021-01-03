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
const bankImg = document.querySelector('.bank');
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
      // console.log(`You Deposited: ${value}`);
    } else {
      numWithdraw++;
      addNewMovRow('withdraw', value);
      withdraw += value;
      // console.log(`You withdraw: ${Math.abs(value)} `);
    }
  });

  // Calc Intrrest = in(or deposit) * interestRate/100 .
  interrest = (deposit * acc.interestRate) / 100;

  return [deposit, Math.abs(withdraw), interrest, numDep, numWithdraw];
};

('');

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
      bankImg.classList.add('hidden');
      labelWelcome.textContent = `Welcome to Minimal Bank, ${acc.owner}`;
      labelDate.textContent = today;
      containerApp.style.opacity = 100; // Display App
      // Display Timeout
      timeout();

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
//containerApp.style.opacity = 100;

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

  // Checking if account exist:
  const transfer = locAccount(transferTo);
  const hasAccount = transfer ? true : false;
  console.log(hasAccount);

  //2) Identificar Conta que efetuou a transferencencia + account.moviment.push(-valor); + Exibir a transferencia.
  if (
    hasAccount &&
    currentAcc.username !== transferTo &&
    calcAccountsBalance(currentAcc.movements) > transferAmount
  ) {
    // Add movement to account.movements + display movement
    const acc = currentAcc.movements;
    acc.push(-transferAmount);
    addNewMovRow('withdraw', transferAmount);

    // Calc new currentBalance + display it
    const newBalance = calcAccountsBalance(acc);
    labelBalance.textContent = `€${newBalance}`;

    // 3) Conta que recebeu a transferência: Como identificar a conta que foi feita a transferencia?
    const transferAcc = transfer.movements;
    transferAcc.push(transferAmount);
  } else if (currentAcc.username === transferTo) {
    alert('Operation invalid ');
  } else if (calcAccountsBalance(currentAcc.movements) < transferAmount) {
    alert("Couldn't complete the transfer: Insufficient funds");
  } else if (!hasAccount) {
    alert(
      "Couldn't complete the transfer: Account not registered in the system"
    );
  }
}

// Criando uma função que identifica o objeto account através do nome de usuario "String" ***
function locAccount(user) {
  let transfAcc;
  accounts.forEach(function (account) {
    if (account.username === user) {
      transfAcc = account;
    }
  });
  return transfAcc;
}

const loan = function () {
  const loanAmount = Number(inputLoanAmount.value);

  // Reset Input :
  inputLoanAmount.value = '';

  if (loanAmount > 0) {
    // Deposit:
    currentAcc.movements.push(loanAmount);

    // ReCalc account Summary + Balance
    const newSummary = calcSummary(currentAcc.movements, currentAcc); // [deposit,withdrawal,interest,numDeposit,numWithdrawal]
    const newBalance = newSummary[0] - newSummary[1]; // balance = deposit - withdrawal

    // Display new balance, in/out,interest
    labelBalance.textContent = `€${newBalance}`;
    labelSumIn.textContent = `€${newSummary[0]}`;
    labelSumOut.textContent = `€${newSummary[1]}`;
    labelSumInterest.textContent = `€${newSummary[2]}`;
  }
};

// Implementing Loan Button functionality:
btnLoan.addEventListener('click', function () {
  // 3 seconds delay to simulate loan operation:
  setTimeout(loan, 3000);
});

// Close account:

/* Quando clicar no botão:
- Checar credenciais da conta atual
- Excluir a conta do array accounts
Localizar conta neste array por meio da função indexOf, excluir usando .splice(indexOf,1);

- Atualizar status da aplicação: apagar todos os elementos do container App  
containerApp.style.opacity = 0;
// mandar executar função que mostra o container + modificação na mesma tirando do evento do btnLogin e add condicional do else {
  containerApp.style.opacity = 0 (HIDE UI) **;
}

*/

btnClose.addEventListener('click', function () {
  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);

  // Reset input:
  inputCloseUsername.value = '';
  inputClosePin.value = '';

  // Checking credencials:
  const isCurrentUser = currentAcc.username === closeUser ? true : false;
  const isPinCorrect = currentAcc.pin === closePin ? true : false;

  if (isCurrentUser && isPinCorrect) {
    const indexAccElement = accounts.indexOf(currentAcc);

    // Delete account from data (array -> accounts):
    accounts.splice(indexAccElement, 1);

    // Hide UI:
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
    bankImg.classList.remove('hidden');
  }
});

function timeout() {
  const timeLogout = 2; // minutes
  const now = date;
  now.setMinutes(now.getMinutes() + timeLogout);

  // Set the date we're counting down to
  let countDownDate = new Date(now).getTime();

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element
    labelTimer.innerHTML = minutes + 'm ' + seconds + 's ';

    // If the count down is finished, display an alert

    if (distance < 0) {
      clearInterval(x);
      alert('Timeout');

      // Hide UI:
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
      bankImg.classList.remove('hidden');
    }
  }, 1000);
}

// Sort:

let seleciona = -1;
const sort = function () {
  //   Se eu clicar no sort uma vez seleciona todas as divs que correspondem aos deposits e inseri-las em movements:

  // Algoritmo para permitir apenas dois estados possiveis no botao
  seleciona++;
  const option = seleciona % 2;

  switch (option) {
    case 0:
      console.log('Case 0');
      orderMovements();
      break;
    case 1:
      console.log('Case 1');
      resetMovements();
      break;
  }
};

btnSort.addEventListener('click', sort);

function resetMovements() {
  // Removing Elements
  const movs = document.querySelectorAll('.movements__row');
  movs.forEach(function (mov) {
    containerMovements.removeChild(mov);
  });

  // Reset previus elements
  calcSummary(currentAcc.movements, currentAcc);
}

function orderMovements() {
  // Primeiro Click
  const movs = document.querySelectorAll('.movements__row'); // contem todas as divs que representam os movements
  console.log(movs.length);
  // Percorrer as divs da ultima para primeira:
  for (let i = movs.length - 1; i > 0; i--) {
    const movDiv = movs[i];
    // Seleciona o Elemento das transaões de cada div Mov Row
    const transacoes = movDiv.childNodes[0];
    const isDeposit = transacoes.textContent.includes('DEPOSIT');
    //console.log(`MOV${i}: ${isDeposit}`);

    // Se for deposito seleciona as divs:
    if (isDeposit) {
      // Seleciona a div correspondente
      const depositDiv = movs[i];
      // Inserir antes de tudo:
      containerMovements.insertBefore(
        depositDiv,
        containerMovements.childNodes[0]
      );
    }
  }
}
