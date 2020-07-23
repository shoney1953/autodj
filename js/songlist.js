const main = document.getElementById("main");

//
songList = JSON.parse(localStorage.mySongList);
categories = JSON.parse(localStorage.myCategories);
playList = JSON.parse(localStorage.myPlaylist);
createRBox(songList, playList);
songList.forEach(createBox);

function createBox(item, index) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
    <h4>${categories[index].toUpperCase()}</h4>
    `;
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 5000);
  });
  let arr2 = item;
  arr2.forEach((song, songi) => {
    box.innerHTML += `<li class=songItem>${song} </li>`;
  });

  main.appendChild(box);
}

function createRBox(songList, playList) {
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
    let danceIndex = playEntry[0];
    let songIndex = playEntry[1];
    let songName = songList[danceIndex][songIndex];
    let songType = categories[danceIndex];
    box2.innerHTML += `<li class=songItem><u>${songType}:</u>  ${songName} </li>`;
  });
  main.appendChild(box2);
}
