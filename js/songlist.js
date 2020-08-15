const main = document.getElementById("main");

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
