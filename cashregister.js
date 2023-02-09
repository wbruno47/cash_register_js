let MONEY = [["PENNY", 1], ["NICKEL", 5], ["DIME", 10], ["QUARTER", 25], ["ONE", 100], ["FIVE", 500], ["TEN", 1000], ["TWENTY", 2000], ["ONE HUNDRED", 10000]];

function makeObject(cid){
  let object = {};
  cid.forEach(c=>{
    object[c[0]] = Math.round(c[1]*100);
  });
  return object;
}

function changeInDrawer(drawer){
  for (var cash in drawer){
    if (drawer[cash]>0){
      return true;
    }
  }
  return false;
}

function convertChange(returnChange){
  //console.log("convert " + returnChange);
  for (let i=0;i<returnChange.length;i++){
    if (returnChange[i][1] > 0){
      returnChange[i][1] = returnChange[i][1]/100;
    }
  }
  console.log(returnChange);
  return returnChange;
}
function checkReturnChangeStatus(change, returnChange, originalDrawer, changeInDrawer){
  console.log("CHECKING: "  + " " + change);
  console.log(originalDrawer);
  if (change == 0){
    if (changeInDrawer){
      return {
        status: "OPEN",
        change: returnChange
        }
      } else{
        return {
        status: "CLOSED",
        change: originalDrawer
        }
      }
    } else {
      return{
        status:"INSUFFICIENT_FUNDS",
        change: []
      }
    }
  }


function checkCashRegister(price, cash, cid) {
  let change = Math.round(cash*100) - Math.round(price*100);
  console.log(Math.round(2.05*100)-Math.round(.05*100)); 
  let currentCash = makeObject(cid);
  let returnChange = [];
  //console.log(currentCash);
  //for (let i=Object.keys(currentCash).length-1;i>=0; i--){
    //console.log();
    //console.log(change - MONEY[i][1] + " " + currentCash[MONEY[i][0]]);
    //console.log(currentCash[MONEY[i][0]]);
    let iteration =1;
    
    //while (changeInDrawer(currentCash) && change > 0 && iteration >0){
      for (let i=Object.keys(currentCash).length-1;i>=0; i--){
        //console.log("Start: " + change);
        if (change - MONEY[i][1] >= 0){
          //current bill/coin is more
          let slotValue =[];
          slotValue[0] = MONEY[i][0];
          slotValue[1] = 0;
          while (change - MONEY[i][1]>=0 && currentCash[MONEY[i][0]] > 0){
            //console.log("HERE");
            change -= MONEY[i][1]; 
            currentCash[MONEY[i][0]] -= MONEY[i][1]
            slotValue[1] += MONEY[i][1];
            //console.log(slotValue);
          }
          console.log(currentCash);
          returnChange.push(slotValue);
        }
      }
      console.log("end");
      console.log(currentCash);
    let newReturn = convertChange(returnChange);
    console.log(newReturn);
    let status = checkReturnChangeStatus(change, returnChange, cid, changeInDrawer(currentCash));
    console.log(status);
    return status;
  }

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
