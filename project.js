const prompt = require("prompt-sync")();

const Rows = 3;
const Columns = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
const SYMBOLS_VALUE = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
    
}

//function for the amount 
function deposit()
{
   while(true){
       const depositAmount = prompt("Enter a deposit Amount: ");
   const numberDepositAmount = parseFloat(depositAmount);

   if( isNaN(numberDepositAmount) || numberDepositAmount <=0 ){
      console.log("Invalid deposit Amount! please try agin") 
   }else{
      return numberDepositAmount;
   }
   }
  
};

//function for the lines
const getNumberOfLines = () =>{
   while(true){
   const lines = prompt("Enter the number of lines to bet on(1-3): ");
   const numberOfLines = parseFloat(lines);

   if( isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3 ){
      console.log("Invalid number of lines! please try agin") 
   }else{
      return numberOfLines;
   }
}
};

//function for the bet
const getBet = (depositAmount , lines) =>{
   while(true){
      const bet = prompt("Enter the bet par line ");
   const numberBet = parseFloat(bet);

   if( isNaN(numberBet) || numberBet <=0 || numberBet > depositAmount / lines ){
      console.log("Invalid bet! please try agin") 
   }else{
      return getBet;
   }
   }
}


const spin = () =>{
    const SYMBOLS = [];
    for(const [ SYMBOLS, count] of Object.entries(SYMBOLS_COUNT)){
        console.log(SYMBOLS , count);
    }
} 

//call back functions
spin()
let depositAmount=deposit();
const  lines= getNumberOfLines();
const bet = getBet(depositAmount , lines);