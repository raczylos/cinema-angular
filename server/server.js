import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto'

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    let request = `GET: /\n`
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))

    res.send({ movies: moviesJson["movies"], rooms: roomsJson["rooms"], screenings: screeningsJson["screenings"] })
});

app.get('/movies', (req, res) => {
    let request = `GET: /movies\n`
    console.log(request)
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))

    res.send(moviesJson["movies"])
})

app.post('/movies', (req, res) => {
    let request = `POST: /movies\n`
    let movie = req.body
    let randId = crypto.randomUUID()
    movie.id = randId
    let movies = JSON.parse(fs.readFileSync('./movies.json'))
    movies['movies'].push(movie)
    movies = JSON.stringify(movies)

    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    console.log(movies)

    fs.writeFile('./movies.json', movies, err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(movie)
        console.log("Successfully updated movies.json")
    })

})

// STARA WERSJA DODAWANIA FILMOW UWAGA UWAGA
// app.post('/movies', (req, res) => {
//     let randId = crypto.randomUUID()
//     let movies = JSON.stringify({movies: req.body.movies})

//     let request = `POST: /movies\n`
//     console.log(request)
//     fs.appendFile('requests.txt', request, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//       });
//     console.log(movies)
//     fs.writeFile('./movies.json', movies, err => {
//         if(err) {
//             console.error(err)
//             res.status(500).send("Failed to write to file")
//             return
//         }
//         res.status(201).send(req.body)
//         console.log("Successfully updated movies.json")
//     })

// })


app.get('/movies/:id', (req, res) => {
    let movieId = req.params.id
    let request = `GET: /movies/${movieId}\n`
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let movie = moviesJson.movies.find((x) => {
        return x.id === movieId
    })

    res.status(201).send(movie)
})

app.put('/movies/:id/', (req, res) => {
    let movie = req.body
    let movieId = req.params.id
    console.log(req.body.title)
    // console.log("WAZNY CONSOLE LOG: " + movie)
    // let movies = JSON.stringify({movies: req.body.movies})
    let request = `PUT: /movies/${movieId}\n`
    console.log(request)
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let movieIdx = [...moviesJson.movies].findIndex(x => x.id === movieId)
    moviesJson.movies[movieIdx] = movie
    moviesJson = JSON.stringify(moviesJson)

    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.writeFile('./movies.json', moviesJson, err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(movie)
        console.log("Successfully updated movies.json")
    })
})


app.delete('/movies/:id', (req, res) => {
    let movieId = req.params.id
    console.log(movieId)
    let request = `DELETE: /movies/${movieId}\n`
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))
    let filtered = moviesJson.movies.filter((x) => {
        return x.id !== movieId
    })
    let filteredScreenings = screeningsJson.screenings.filter((x) => {
        return x.film !== movieId
    })
    fs.writeFileSync('./screenings.json', JSON.stringify({ screenings: filteredScreenings }))
    filtered = JSON.stringify({ movies: filtered })

    fs.writeFile('./movies.json', filtered, err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully deleted from movies.json")
    })
})

app.get('/screenings', (req, res) => {
    let request = "GET: /screenings\n"
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))['screenings']
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))['movies']
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))['rooms']
    for (let screening of screeningsJson) {
        let movieId = screening.film
        let movie = moviesJson.find(x => x.id === movieId)
        screening.film = movie

        let roomId = screening.room
        let room = roomsJson.find(x => x.nr === roomId)
        screening.room = room


    }
    screeningsJson = JSON.stringify(screeningsJson)
    res.status(201).send(screeningsJson)
})

app.get('/rooms', (req, res) => {
    let request = "GET: /screenings\n"
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))['rooms']
    roomsJson = JSON.stringify(roomsJson)
    res.status(201).send(roomsJson)
})

app.get('/screenings/:id', (req, res) => {
    const id = req.params.id
    let request = `GET: /screenings/${id}\n`
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))['screenings']
    let screening = screeningsJson.find(x => x.id === id)
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))['movies']
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))['rooms']

    let movieId = screening.film
    let movie = moviesJson.find(x => x.id === movieId)
    screening.film = movie
    let roomId = screening.room
    let room = roomsJson.find(x => x.nr === roomId)
    screening.room = room

    screening = JSON.stringify(screening)
    res.status(201).send(screening)
})

app.post('/screenings', (req, res) => {

    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))['screenings']
    // let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))['movies']
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))['rooms']
    let screening = req.body
    let randId = crypto.randomUUID()
    screening.id = randId

    let date = screening.date
    if(!date){
        return ;
    }
    date = date.split('-').map(Number)

    date[1]-- //format Daty w miesiącu to indeks miesiąca (styczen zaczyna sie od 0)

    let room = screening.room
    if(!room){
        return ;
    }
    screening.date = date

    let roomObject = roomsJson.find(x => x.nr === room)
    screening.availableTickets = roomObject.capacity
    screeningsJson.push(screening)
    screeningsJson = JSON.stringify({ screenings: screeningsJson })
    fs.writeFile('./screenings.json', screeningsJson, err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(screening)
        console.log("Successfully updated screenings.json")
    })




})

app.put('/screenings/:id', (req, res) => {
    let screening = req.body
    let screeningid = req.params.id
    console.log("chce tu byc " + screening.id)


    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))['screenings']
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))['rooms']
    let date = screening.date

    let time = screening.time
    
    if(!date){
        
        return ;
    }

    if(!time){

        return ;
    }

    date = date.split('-').map(Number)

    date[1]-- //format Daty w miesiącu to indeks miesiąca (styczen zaczyna sie od 0)

    let room = screening.room
    screening.date = date

    let roomObject = roomsJson.find(x => x.nr === room)

    screening.availableTickets = roomObject.capacity

    let screeningIdx = [...screeningsJson].findIndex(x => x.id === screeningid)
    screeningsJson[screeningIdx] = screening
    screeningsJson = JSON.stringify({ screenings: screeningsJson })

    fs.writeFile('./screenings.json', screeningsJson, err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(screening)
        console.log("Successfully updated screenings.json")
    })
    // let request = "PUT: /screenings\n"
    // console.log(request)
    // fs.appendFile('requests.txt', request, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    // let screening = req.body.screening
    // console.log(screening)
    // let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))

    // let idx = screeningsJson.screenings.findIndex((x) => {
    //     return x.id === screening.id
    // })

    // console.log(`found idx: ${idx}`)
    // screeningsJson.screenings[idx] = screening
    // console.log(`AFTER CHANGE: ${JSON.stringify(screeningsJson)}`)
    // screeningsJson = JSON.stringify(screeningsJson)
    // fs.writeFile('./screenings.json', screeningsJson, err => {
    //     if (err) {
    //         console.error(err)
    //         res.status(500).send("Failed to write to file")
    //         return
    //     }
    //     res.status(201).send(req.body)
    //     console.log("Successfully edited screenings.json")
    // })


})

app.put('/screenings/:id/buyTickets', (req, res) => {

    let screening = req.body
    console.log("jestem w kupowaniu biletów")
    console.log(req.body)

    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))['screenings']
    let idx = screeningsJson.findIndex((x) => {
        return x.id === screening.id
    })
    screeningsJson[idx].takenSeats = screening.takenSeats
    screeningsJson[idx].soldTickets = screening.soldTickets

    // let date = screening.date
    // date = date.substring(0, date.indexOf("T"))
    // date = date.split('-').map(Number)
    // console.log(date)
    // console.log(date.getDay())
    // date[1]-- //format Daty w miesiącu to indeks miesiąca (styczen zaczyna sie od 0)
    // date[2]++
    // screening.date = date

    // screening.film = screening.film.id
    // screening.room = screening.room.nr
    // screeningsJson[idx] = screening

    fs.writeFile('./screenings.json', JSON.stringify({ screenings: screeningsJson }), err => {
        if (err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(screening)
        console.log("Successfully updated screenings.json")
    })

})

app.delete('/screenings/:id', (req, res) => {
    let id = req.params.id
    let request = `DELETE: /screenings/${id}\n`
    console.log(request)
    fs.appendFile('requests.txt', request, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))

    let filtered = screeningsJson.screenings.filter((x) => {
        return x.id !== id
    })

    console.log(JSON.stringify(filtered))

    filtered = JSON.stringify({ screenings: filtered })
    fs.writeFileSync('./screenings.json', filtered)
    res.status(201).send(req.body)
    console.log("Successfully deleted from screenings.json")

})

app.listen(7777, () => console.log("Server address http://localhost:7777"));