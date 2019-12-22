const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoidGVycm9tYWdlIiwiYSI6ImNrNDloY2IwdzA1MjIzZW4ybGkzOHcwa3kifQ.IJ_MBj75Z7aOuKiQEirf2g&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find the location!', undefined)
        } else {
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode