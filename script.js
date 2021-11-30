const audio = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs =
[
    {
        name: 'Somebody That I Used To Know',
        displayName: 'Somebody That I Used To Know',
        artist: 'Gotye, Kimbra'
    },
    {
        name: 'love nwantiti',
        displayName: 'love nwantiti',
        artist: "CKay,Dj Yo!,AX'EL"
    },
    {
        name: 'How to save a life',
        displayName: 'How to save a life',
        artist: 'The Fray'
    }
]

// Check if playing
let isPlaying = false

// Play
const playSong = () =>
{
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    audio.play()
}

// Pause
const pauseSong = () =>
{
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    audio.pause()
}

// Play or pause event listere
playBtn.addEventListener('click', () => !isPlaying ? playSong() : pauseSong())

// Update DOM
const loadSong = (song) =>
{
    title.textContent = song.displayName
    artist.textContent = song.artist
    audio.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current song
let songIndex = 0

// On load - first song
loadSong(songs[songIndex])

// Previos song
const prevSong = () =>
{
    songIndex--
    if (songIndex < 0)
    {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song
const nextSong = () =>
{
    songIndex++
    if (songIndex > songs.length - 1)
    {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Update progress bar and time
const updateProgressBar = (event) =>
{
    if (isPlaying)
    {
        const { duration, currentTime } = event.srcElement

        // Update progress bar width
        const progressPercent = (currentTime /  duration) * 100
        progress.style.width = `${progressPercent}%`

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10)
        {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration element to avoid NaN
        if (durationSeconds)
        {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10)
        {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set progress bar
function setProgressBar(event)
{
    const width = this.clientWidth
    const clickX = event.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// event listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)
audio.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)