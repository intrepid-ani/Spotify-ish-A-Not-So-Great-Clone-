const playBtn = document.querySelector("#big");
const progressBar = document.getElementsByClassName("progressBar")[0];
// Song details variable
const curCover = document.getElementById("current-song-cover");
const curName = document.getElementById("current-song-name");
const curArtists = document.getElementById("current-song-artists");
const next = document.getElementsByClassName("next")[0];
const prev = document.getElementsByClassName("prev")[0];
const duration = document.getElementById("duration");
const curTime = document.getElementById("current-time");
const songs = [
    {
        name: "Machayenge 4",
        path: "Assets/music/song1.mp3",
        cover: "Assets/Album-cover/card1Img.jpeg",
        artists: "Kri$na",
    },
    {
        name: "Suniya Suniya",
        path: "Assets/music/song2.mp3",
        cover: "Assets/Album-cover/card2Img.jpeg",
        artists: "Pata Nahi kon hai",
    },
    {
        name: "Akatsuki",
        path: "Assets/music/song3.mp3",
        cover: "Assets/Album-cover/card3Img.jpeg",
        artists: "Seedhe Maut",
    },
    {
        name: "Fuck what they say",
        path: "Assets/music/song4.mp3",
        cover: "Assets/Album-cover/card4Img.jpeg",
        artists: "King & MC Stan",
    },
    {
        name: "Jo tum mere ho",
        path: "Assets/music/song5.mp3",
        cover: "Assets/Album-cover/card5Img.jpeg",
        artists: "Anu Jain",
    }
];
let index = 4;
let audio = new Audio(songs[index].path);
// varible for 

// >>>>>>>>>>>>>>>>>> Functions <<<<<<<<<<<<<<<<<<<<<<<<

// Function to format time in 00:00 format
function formatTime(seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to change Current Song Details 
function changeInfo(index){
    curCover.src = songs[index].cover;
    curName.innerText= songs[index].name;
    curArtists.innerText = songs[index].artists; 
    audio.src = songs[index].path;
    audio.addEventListener('loadedmetadata', () => {
        duration.innerText = formatTime(audio.duration);
    });
}

// function to Play and pause the music
function playPause(index = 0) {  // Default index to 0 if not provided
    changeInfo(index);
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        playBtn.src = "Assets/media-controll-imgs/pause.svg";
    } else {
        audio.pause();
        playBtn.src = "Assets/media-controll-imgs/play.svg";
    }
}

// funstion to play next song
function nextSong(){
    index = (index + 1) % songs.length;
    playPause(index);
}

// function to play previous song
function prevSong(){
    index = (index - 1 + songs.length) % songs.length;
    playPause(index);
}





// >>>>>>>>>>>>>>>>>> EventListeners <<<<<<<<<<<<<<<<<<<<<<<<

// Adding play/pause trick
playBtn.addEventListener('click', () => playPause(index));  // Pass the current index

audio.addEventListener('timeupdate', () => {
    // update SeekBar
    let progress= parseFloat(((audio.currentTime/audio.duration)* 100).toFixed(4));
    progressBar.value = progress;
    curTime.innerText = formatTime(audio.currentTime);  // Update current time
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
    audio.play();
})

// Events for next buttons
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight" && e.ctrlKey) {
        // Perform task for Ctrl + ArrowRight
        nextSong();
    } else if (e.key === "ArrowLeft" && e.ctrlKey) {
        // Perform task for Ctrl + ArrowLeft
        prevSong();
    } else if (e.key === " ") {
        // play/pause song using Space
        playPause(index);
    } else if (e.key === "ArrowRight") {
        // seek forward by 5 seconds
        audio.currentTime += 5;
    } else if (e.key === "ArrowLeft") {
        // seek backward by 5 seconds
        audio.currentTime -= 5;
    }
});