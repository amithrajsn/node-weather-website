const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a09bcc3b42fdc52bc88106629f9954d0/' + latitude + ',' + longitude + '?units=si'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const data = body.currently
            const message = body.daily.data[0].summary + ' It is currently ' + data.temperature + ' degrees out. There is ' + data.precipProbability + '% chances of rain'
            callback(undefined, message)
        }
    })
}

module.exports = forecast