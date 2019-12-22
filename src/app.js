const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        dev: 'Raj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page!',
        dev: 'Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        dev: 'Raj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please send location'
        })
    }
    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        console.log(error)
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                location,
                forecast: data,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404!',
        message: 'Help article not found!',
        dev: 'Raj'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        message: 'Page not found!',
        dev: 'Raj'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000 !!')
})