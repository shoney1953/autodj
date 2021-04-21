const express = require('express');
const path = require('path');
const PDFDocument = require('pdfkit');
var PdfTable = require('voilab-pdf-table'), PdfDocument = require('pdfkit');
const blobStream = require('blob-stream');

const fs = require('fs');


const exphbs = require('express-handlebars');


const PORT = process.env.PORT || 5000;

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



// app.use(logger);
// middleware to parse req.body
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.render('index' );
})

/// 
app.post('/writePlayList', (req, res) => {
  let newDate = new Date(Date.now());
  const doc = new PDFDocument,
    table = new PdfTable(doc, {
        topMargin: 30,
        bottomMargin: 30
    });;
  const filePath = path.join(__dirname, 'playlists' );
  const playListFile = path.join(__dirname, 'playlists',`${req.body.filename}.pdf`)
  var stream = doc.pipe(blobStream());
 
  // doc.font('Courier-Bold');
  doc.fontSize(14);
  //doc.pipe(fs.createWriteStream(playListFile));

  doc.image('img/sbdc logo gold.png', 50, 0, {fit: [375, 120], align: 'left', valign: 'top'});
  doc.roundedRect(50, 0, 500, 160, 10).lineWidth(2)
  .fillOpacity(0.1)
  .fillAndStroke("gray", "#000");

  doc.stroke().strokeColor('black').fillOpacity(1).fillAndStroke("black", "#000")
  doc.text(' ');
 
  doc.text(`Playlist file: ` );
  doc.text(playListFile );
  doc.text(`Written: ${newDate.toDateString()} ${newDate.toTimeString()}`);
 
  doc.text(`${req.body.numSongs} Songs `);
  doc.text(' ');
  var ifeld;
  table
  // add some plugins (here, a 'fit-to-width' for a column)
  .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      column: 'songName'
  }))
  // set defaults to your columns
  .setColumnsDefaults({
      headerBorder: 'B',
      align: 'right'
  })
  // add table columns
  .addColumns([
      {
          id: 'songNumber',
          header: ' # ',
          align: 'left',
          width: 35
      },
      {
          id: 'songType',
          header: 'Song Type',
          align: 'left',
          width: 175
      },
      {
          id: 'songName',
          header: 'Song Name',
          align: 'left',
          width: 200
      }
    
  ])
  // add events (here, we draw headers on each new page)
  .onPageAdded(function (tb) {
      tb.addHeader();
  });
  let bodyRows = [];
    for (i = 0; i < req.body.numSongs; i++) {
      ifeld = 'inp'+i;
      var songInfo = req.body[ifeld].split(":");
      var songType = songInfo[0];
      var songName = songInfo[1];

      var bodyRow = {
        songNumber: (i + 1),
        songType: songType,
        songName: songName
      }
      
        bodyRows.push(bodyRow);
  
    
    };
   

    table.addBody(bodyRows);
    doc.end(); 
    stream.on('finish', function() {
       //const url = stream.toBlobURL('application/pdf');
        const blob = stream.toBlob('application/pdf');
        console.log(blob);
      });
    // res.redirect('/');
    res.redirect('/');
 });
// set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));

