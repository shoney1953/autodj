const main = document.getElementById("main");
const downloadPlyBtn = document.getElementById("downloadPlyBtn");
danceArray = JSON.parse(localStorage.myDanceArray);

let playlistExist = 0;

try {
  playList = JSON.parse(localStorage.myPlaylist);
  playlistExist = 1;
} catch (e) {
  console.log("no playlist created yet");
}
if (playlistExist === 1) {
  createRBox(playList);
  
}

danceArray.forEach(createBox);

function createBox(item, index) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
    <h4>${item.danceType.toUpperCase()}</h4>
    `;
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });

  item.songTitles.forEach((song, songi) => {
    box.innerHTML += `<li class=songItem>${song} </li>`;
  });

  main.appendChild(box);
}

function createRBox(playList) {
  let numSongs = playList.length;
  const box2 = document.createElement("div");
  box2.classList.add("box");
  box2.innerHTML = `
    <h4>RANDOM PLAYLIST (${numSongs}) </h4>
    `;
  box2.addEventListener("click", () => {
    box2.classList.add("active");
    setTimeout(() => box2.classList.remove("active"), 4000);
  });

  playList.forEach((playEntry, playIndex) => {
    let songName = playList[playIndex][2];
    let songType = playList[playIndex][0];
    box2.innerHTML += `<li class=songItem><u>${songType}:</u>  ${songName} </li>`;
  });
  main.appendChild(box2);
}
//*************************** */
downloadPlyBtn.addEventListener("click", () => {


// pipe the document to a blob

let newDate = new Date(Date.now());
const doc = new PDFDocument;
  


doc.fontSize(14);

doc.text(`Written: ${newDate.toDateString()} ${newDate.toTimeString()}`, 50);

doc.text(`${playList.length} Songs generated from https://sbdcautodj.com `);
doc.text(' ');

doc.text(' #', 50);
doc.moveUp(1);
doc.text("Song Type", 100);
doc.moveUp(1);
doc.text("Song Name", 250);

doc.text('__________________________________________________________', 50);

playList.forEach((playEntry, playIndex) => {
 
    let songName = playEntry[2];
    let songType = playEntry[0];
    let songLine ;
   
    songLine = `${playIndex + 1}  ${songType}          ${songName}`;
 
    doc.text(`${playIndex + 1}`, 50);
    doc.moveUp(1);
    doc.text(`| ${songType}`, 100);
    doc.moveUp(1);
    doc.text(`| ${songName}`, 250);
    doc.moveUp(1);
    doc.text('__________________________________________________________', 50);
   
  
    
});

  doc.end(); 
  var stream = doc.pipe(blobStream());


stream.on("finish", function() {
  let blob;
  // get a blob you can do whatever you like with


  blob = stream.toBlob("application/pdf");
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'randomsonglist.pdf';
  a.click();
  window.URL.revokeObjectURL(url);

});

});