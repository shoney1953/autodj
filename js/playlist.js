// const { stringify } = require("querystring");

//*************************** */
danceArray = JSON.parse(localStorage.myDanceArray);
let playlistExist = 0;

try {
  playList = JSON.parse(localStorage.myPlaylist);
  playlistExist = 1;
} catch (e) {
  console.log("no playlist created yet");
}


const downloadPlyBtn = document.getElementById("downloadPlyBtn");

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
 
    let songName = playEntry[3];
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

function getPlaylist1() {
let playList = JSON.parse(localStorage.myPlaylist);
 
//    const url = "/actions/getPlaylist.php";
//    let h = new Headers;
//    h.append ("Content-type", "application/json");
    
//   let options = {
//     method: "POST",
//     headers: h, 
//     body: JSON.stringify(playList)
//   }
// let req = new Request(url, options);
// fetch(req)
//     .then((res) => {
//         if(!res.ok) {
//             throw new Error('oops res not ok');
//         }
//        return res.json();
//     }
//   )
//     .then((res) => console.log("Success:", result))
  
//     .catch( (err) => {
//         console.log('Error', err);
      
//     })
    var request = new XMLHttpRequest();
      try {
 
     request.open("POST", "actions/getPlaylist.php", false);
     request.setRequestHeader("Content-type", "application/json");
     request.send(localStorage.myPlaylist);
    } catch (exception) {
      console.log("no existing playlist");
      alert('no existing playlist');
    }
    
   
  }
