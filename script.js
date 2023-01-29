// namespace object
const app = {};

// namespace variables
app.menuIcon = document.querySelector('.navIcon');
app.closeIcon = document.querySelector('.navCloseIcon');
app.slideOut = document.getElementById('slideOutNavElement');
app.url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCA3Z6mIClgs_cB7sTaW3Paw&maxResults=10&order=date&key=AIzaSyAPD_tpOTh600Cx7nx6Oqpc7MmrQtTBAlM'
app.musicContainer = document.querySelector('.videoGallery')

// API KEY: AIzaSyB2ENYW8tvibTqSBpSbHvNcEU4fAUFT_ns
// API KEY2: AIzaSyAPD_tpOTh600Cx7nx6Oqpc7MmrQtTBAlM

// API Call to Youtube Data API
app.getVideos = function() {
    fetch(app.url)
        .then((result) => {
            return result.json()
        }).then((data) => {
            console.log(data)
            const listOfVideos = []
            data.items.map((item) => {
                const info = {}
                info.id = item.id.videoId
                info.title = item.snippet.title
                info.img = item.snippet.thumbnails.medium.url
                info.description = item.snippet.description
                info.artist = item.snippet.channelTitle
                info.datePublished = item.snippet.publishedAt.slice(0,10)
                listOfVideos.push(info)
            })
            app.displayVideos(listOfVideos);
        })
}

app.displayVideos = function(listOfVideos) {
    console.log(listOfVideos)
    listOfVideos.pop()
    listOfVideos.forEach((video) => {
        let musicItem = document.createElement('li')
        musicItem.classList.add('item')
        musicItem.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                <ul class="table">
                    <li class="tableItem"><img class="thumbnail" src=${video.img} alt="thumbnail of video"></li>
                    <li class="tableItem"><h3 class="videoTitle">${video.title}</h3>
                    </li>
                    <li class="tableItem"><p class="videoArtist">${video.artist}</p></li>
                    <li class="tableItem"><p class="videoDescription">${video.description}</p></li>
                    <li class="tableItem"><p class="videoDate">${video.datePublished}</p></li>
                </ul>
            </a>
        `
    app.musicContainer.appendChild(musicItem)
    })
}

// function that will show slide out menu
app.showClass = () => {
    app.menuIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('hide');
        app.slideOut.classList.add('show');
    });
}

// function that will hide slide out menu
app.hideClass = () => {
    app.closeIcon.addEventListener('click', () => {
        app.slideOut.classList.remove('show');
        app.slideOut.classList.add('hide');
    });
}

// init method that will run when app first loads
app.init = function () {
    app.showClass();
    app.hideClass();
    app.getVideos();
};

// calling init method
app.init();


// Alternate Version of Layout (Gallery)
// app.displayVideos = function (listOfVideos) {
//     console.log(listOfVideos)
//     listOfVideos.pop()
//     listOfVideos.forEach((video) => {
//         let musicItem = document.createElement('li')
//         musicItem.classList.add('item')
//         musicItem.innerHTML = `
//         <li>
//             <h3 class="videoTitle">${video.title}</h3>
//             <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
//                 <img class="thumbnail" src=${video.img} alt="thumbnail of video">
//             </a>
//             <p class="videoDescription">${video.description}</p>
//         </li>
//     `
//         app.musicContainer.appendChild(musicItem)
//     })
// }