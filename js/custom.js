const main = document.getElementById("main");
const submitBtn = document.getElementById("submitBtn");
const numArgTango = document.getElementById("numArgTango");
const numAmTango = document.getElementById("numAmTango");
const numBachata = document.getElementById("numBachata");
const numBolero = document.getElementById("numBolero");
const numChaCha = document.getElementById("numChaCha");
const numCbyCha = document.getElementById("numCbyCha");
const numECoast = document.getElementById("numECoast");
const numFoxtrot = document.getElementById("numFoxtrot");
const numHustle = document.getElementById("numHustle");
const numLineDance = document.getElementById("numLineDance");
const numMambo = document.getElementById("numMambo");
const numMerengue = document.getElementById("numMerengue");
const numNightClub = document.getElementById("numNightClub");
const numPolka = document.getElementById("numPolka");
const numQuickStep = document.getElementById("numQuickStep");
const numRumba = document.getElementById("numRumba");
const numSalsa = document.getElementById("numSalsa");
const numSamba = document.getElementById("numSamba");
const numTwoStep = document.getElementById("numTwoStep");
const numVWaltz = document.getElementById("numVWaltz");
const numWaltz = document.getElementById("numWaltz");
const numWCSwing = document.getElementById("numWCSwing");
const numWWaltz = document.getElementById("numWWaltz");
const numWPartner = document.getElementById("numWPartner");


danceArray = JSON.parse(localStorage.myDanceArray);
setCounts();

function setCounts() {
    numAmTango.value =  danceArray[0].numPerRandomList;
    numArgTango.value = danceArray[1].numPerRandomList;
    numBachata.value = danceArray[2].numPerRandomList;
    numBolero.value =  danceArray[3].numPerRandomList;
    numChaCha.value =  danceArray[4].numPerRandomList;
    numCbyCha.value =  danceArray[5].numPerRandomList;
    numECoast.value = danceArray[6].numPerRandomList;
    numFoxtrot.value = danceArray[7].numPerRandomList;
    numHustle.value = danceArray[8].numPerRandomList;
    numLineDance.value = danceArray[9].numPerRandomList;
    numMambo.value = danceArray[10].numPerRandomList;
    numMerengue.value = danceArray[11].numPerRandomList;
    numNightClub.value = danceArray[12].numPerRandomList;
    numPolka.value = danceArray[13].numPerRandomList;
    numQuickStep.value = danceArray[14].numPerRandomList;
    numRumba.value = danceArray[15].numPerRandomList;
    numSalsa.value = danceArray[16].numPerRandomList;
    numSamba.value = danceArray[17].numPerRandomList;
    numTwoStep.value = danceArray[18].numPerRandomList;
    numVWaltz.value = danceArray[19].numPerRandomList;
    numWaltz.value = danceArray[20].numPerRandomList;
    numWCSwing.value = danceArray[21].numPerRandomList;  
    numWWaltz.value = danceArray[22].numPerRandomList;
    numWPartner.value = danceArray[23].numPerRandomList;
}



submitBtn.addEventListener("click", function () {
    updateCounts();
  });

  function updateCounts() {
    danceArray[0].numPerRandomList = numAmTango.value  ;
    danceArray[1].numPerRandomList = numArgTango.value;
    danceArray[2].numPerRandomList = numBachata.value;
    danceArray[3].numPerRandomList =  numBolero.value;
    danceArray[4].numPerRandomList = numChaCha.value;
    danceArray[5].numPerRandomList = numCbyCha.value ;
    danceArray[6].numPerRandomList = numECoast.value ;
    danceArray[7].numPerRandomList = numFoxtrot.value ;
    danceArray[8].numPerRandomList = numHustle.value;
    danceArray[9].numPerRandomList = numLineDance.value ;
    danceArray[10].numPerRandomList = numMambo.value ;
    danceArray[11].numPerRandomList =  numMerengue.value ;
    danceArray[12].numPerRandomList = numNightClub.value;
    danceArray[13].numPerRandomList =  numPolka.value;
    danceArray[14].numPerRandomList = numQuickStep.value;
    danceArray[15].numPerRandomList = numRumba.value;
    danceArray[16].numPerRandomList = numSalsa.value;
    danceArray[17].numPerRandomList = numSamba.value;
    danceArray[18].numPerRandomList = numTwoStep.value ;
    danceArray[19].numPerRandomList = numVWaltz.value ;
    danceArray[20].numPerRandomList= numWaltz.value;
    danceArray[21].numPerRandomList = numWCSwing.value ;  
    danceArray[22].numPerRandomList = numWWaltz.value; 
    danceArray[23].numPerRandomList = numWPartner.value; 
    if (!window.localStorage) alert("Sorry, you're using an ancient browser");
else {
  localStorage.myDanceArray = JSON.stringify(danceArray);
}
danceArray = JSON.parse(localStorage.myDanceArray);
console.log(danceArray);
  }