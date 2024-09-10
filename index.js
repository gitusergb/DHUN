const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const lyc = document.getElementById("lyc");
const singers = document.getElementById("singer");
const from = document.getElementById("from");
const songListContainer = document.getElementById("song-list");

let songIndex=0;
// Songs Titles
const songs = [
{
    name: "Ishq",
    singers: ["Amir Ameer", "Faheem Abdullah", "Rauhan Malik"],
    albumOrMovie: "Ishq (From `Lost;Found`)",
},
{
    name: "Pasoori",
    singers: [" Ali Sethi" , "Shae Gill "],
    albumOrMovie: "Coke Studio",
 
}
];
// Initially load song details into DOM
songs.forEach((song, index) =>{
  loadSong(song, index);
  generateSongList(song, index);
    
})

// song list .........................................

// Function to generate song list
function generateSongList(song, index) {
    const songItem = document.createElement("div");
    songItem.classList.add("song-list-item");
    
    // Create and set the song image element
    const songImage = document.createElement("img");

    fetch(`./image/${song.name}.jfif`)
      .then(response => {
        if (response.ok) {
          songImage.src = `./image/${song.name}.jfif`;
        } else {
          songImage.src = `./image/${song.name}.png`;
        }
      })
      .catch(() => {
        songImage.src = `./image/cover.png`;
      });

    songImage.alt = song.name;

    // Create and set the song name element
    const songName = document.createElement("span");
    songName.innerText = song.name;

    // Append song image and name to the song item
    songItem.appendChild(songImage);
    songItem.appendChild(songName);

    // Add click event to play the selected song
    songItem.addEventListener("click", () => {
      // songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    // Append the song item to the song list container
    songListContainer.appendChild(songItem);
  
}
// Function to generate song list


function loadSong(song, index){
    title.innerText = song.name;
    // Check if MP3 file exists, otherwise load MP4
    fetch(`./music/${song.name}.mp3`)
      .then(response => {
        if (response.ok) {
          audio.src = `./music/${song.name}.mp3`;
        } else {
          audio.src = `./music/${song.name}.mp4`;
        }
      })
      .catch(() => {
        audio.src = `./music/${song.name}.mp4`;
      });
    
    fetch(`./image/${song.name}.jfif`)
    .then(response => {
      if (response.ok) {
        cover.src = `./image/${song.name}.jfif`;
      } else {
        cover.src = `./image/${song.name}.png`;
      }
    })
    .catch(() => {
      cover.src = `./image/${song.name}.png`;
    }); 

    // Gauri Fetch and display lyrics from the text file
    fetch(`./lyrics/${song.name}.txt`)
      .then(response => response.text())
      .then(data => {
        lyc.innerText = data; // text file content in the lyc element
      })
      .catch(error => {
        console.error('Error loading lyrics:', error);
        lyc.innerText = "Lyrics not available"; // fallback message
      });

      singers.innerText=`Singers: ${song.singers.join(", ")}`;
    from.innerText=`Album/Movie: ${song.albumOrMovie}`;
  }
  
// Play Song
function playSong() {
musicContainer.classList.add("play");
playBtn.querySelector("i.fa").classList.remove("fa-play");
playBtn.querySelector("i.fa").classList.add("fa-pause");
audio.play();
}
// Pause Song
function pauseSong() {
musicContainer.classList.remove("play");
playBtn.querySelector("i.fa").classList.add("fa-play");
playBtn.querySelector("i.fa").classList.remove("fa-pause");
audio.pause();
}
// Previous Song
function prevSong() {
songIndex--;
if (songIndex < 0) {
songIndex = songs.length - 1;
}
loadSong(songs[songIndex]);
playSong();
}
// Next Song
function nextSong() {
songIndex++;
if (songIndex > songs.length - 1) {
songIndex = 0;
}
loadSong(songs[songIndex]);
playSong();
}
// Update Progress bar
function updateProgress(e) {
const { duration, currentTime } = e.srcElement;
const progressPerCent = (currentTime / duration) * 100;
progress.style.width = `${progressPerCent}%`;
}
// Set Progress
function setProgress(e) {
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;
audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playBtn.addEventListener("click", () => {
const isPlaying = musicContainer.classList.contains("play");
if (isPlaying) {
pauseSong();
} else {
playSong();
}
});
// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/Song Update
audio.addEventListener("timeupdate", updateProgress);
// Click On progress Bar
progressContainer.addEventListener("click", setProgress);
// Song End
audio.addEventListener("ended", nextSong);


