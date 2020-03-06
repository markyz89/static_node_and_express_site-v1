// express fundamentals
const express = require('express')
const app = express()

//pulling my json data into a variable
const { projects } = require('./data.json');


// view engine setup
app.set('view engine', 'pug');

// serving up my static files, and putting them at the static route
app.use('/static', express.static('public'))

// the route for the homepage
app.get('/', (req, res) => {
    res.render('index', { projects })
})

// the route for the about page
app.get('/about', (req, res, next) => {
    res.render('about')
})

// the project pages, which need just about everything from the JSON file passed in as variables
app.get('/project/:id', (req, res, next) => {
    res.render('project', {
        title: projects[req.params.id].project_name,
        description: projects[req.params.id].description,
        images: projects[req.params.id].image_urls,
        technologies: projects[req.params.id].technologies,
        live: projects[req.params.id].live_link,
        github: projects[req.params.id].github_link
        // proveg repo is private so just linked a different project that's kind of similar.

    })
})

// error handling
app.use((req, res, next) => {
    const err = new Error('We seem to have encountered an error');
    err.status = 404;
    console.log(`${err.message}: ${err.status} `)
    next(err)
})

// putting the error message on the screen, just to practice the res.send method really.
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.send( `${err.message}: ${err.status} ` )
})

// serving up the app on localhost:3000
app.listen(3000);