const main = document.getElementById("main");

//
sl = JSON.parse(localStorage.myArray);
categories = JSON.parse(localStorage.myCategories);
playList = JSON.parse(localStorage.myPlaylist);

sl.forEach(createBox);
createRBox(sl, playList);

function createBox(item, index) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
    <h4>${categories[index].toUpperCase()}</h4>
    `;
  box.addEventListener("click", () => {
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 4000);
  });
  let arr2 = item;
  arr2.forEach((song, songi) => {
    box.innerHTML += `<li class=songItem>${song} </li>`;
  });

  main.appendChild(box);
}

function createRBox(sl, playList) {
  const box2 = document.createElement("div");
  box2.classList.add("box");
  box2.innerHTML = `
    <h4>Random Playlist</h4>
    `;
  box2.addEventListener("click", () => {
    box2.classList.add("active");
    setTimeout(() => box2.classList.remove("active"), 4000);
  });
  playList.forEach((playEntry, playIndex) => {
    let danceIndex = playEntry[0];
    let songIndex = playEntry[1];
    let songName = sl[danceIndex][songIndex];
    box2.innerHTML += `<li class=songItem>${songName} </li>`;
  });
  main.appendChild(box2);
}
