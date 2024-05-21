const prompt = require("prompt-sync")();

const Rows = 3;
const Columns = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//function for the amount
function deposit() {
  while (true) {
    const depositAmount = prompt("Enter a deposit Amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit Amount! please try agin");
    } else {
      return numberDepositAmount;
    }
  }
}

//function for the lines
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on(1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines! please try agin");
    } else {
      return numberOfLines;
    }
  }
};

//function for the bet
const getBet = (depositAmount, lines) => {
  while (true) {
    const bet = prompt("Enter the bet par line ");
    const numberBet = parseFloat(bet);

    if (
      isNaN(numberBet) ||
      numberBet <= 0 ||
      numberBet > depositAmount / lines
    ) {
      console.log("Invalid bet! please try agin");
    } else {
      return getBet;
    }
  }
};

const spin = () => {
  const SYMBOLS = [];
  for (const [SYMBOL, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      SYMBOLS.push(SYMBOL);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < Columns; i++) {
    const reelSymbols = [...SYMBOLS];
    for (let j = 0; j < Rows; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectSymbol = reelSymbols[randomIndex];
      reels[i].push(selectSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  let row = [];
  for (let i = 0; i < Rows; i++) {
    row.push([]);
    for (let j = 0; j < Columns; j++) {
      row[i].push(reels[j][i]);
    }
  }
  return row;
};

const printRows = (Rows) => {
  for (const row of Rows) {
    let rowString = "";
    for (const [i, SYMBOLS] of row.entries()) {
      rowString += SYMBOLS;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (row, bet, lines) => {
  let winning = 0;

  for (let rows = 0; rows < lines; rows++) {
    const symbols = row[rows];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winning += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }

  return winning;
};

//call back functions
const game = () => {
  let balance = deposit();

  while(true) {
    console.log("you have a balance of $" + balance);
    const lines = getNumberOfLines();
    const bet = getBet(balance, lines);
    balance -= bet * lines;
    const reels = spin();
    const row = transpose(reels);
    printRows(row);
    const winning = getWinnings(row, bet, lines);
    balance += winning;
    console.log("You won, $" + winning.toString());

    if (balance <= 0) {
      console.log("you ran out of money!!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)?")

    if (playAgain != "y") break;
    else continue;
  }
};

game();
