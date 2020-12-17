
require('../css/index.css')

import { Fspm } from 'fspm-lib';
const http = require("http")

const button = document.querySelector('#submit')
button.onclick = (e) =>{
  const icao = document.querySelector('#icao')
  const urlStation = `https://avwx.rest/api/station/${icao.value}?options=translate,summary&format=json&token=PnW8lyDoz8Rto5u-Mz4VjU4cqjbchGdgjC_X_PVHwCE`
  const urlMetar = `https://avwx.rest/api/metar/${icao.value}?options=translate,summary&format=json&token=PnW8lyDoz8Rto5u-Mz4VjU4cqjbchGdgjC_X_PVHwCE`

  document.querySelectorAll('.placeholder').forEach((elem)=>{
    elem.innerHTML = '--'
  })

  http.get(urlMetar, res => {
    let data = ""
    if(res.statusCode===200){

      res.on("data", d => {
        data = JSON.parse(d)
      })
      res.on("end", () => {
        document.querySelector('#metarRAW').innerHTML = data.sanitized
        document.querySelector('#metarTranslated').innerHTML = data.summary
        var moreArea = document.querySelector('#more')
        var html = ''

        var values = [
          {key: 'visibility', label: 'Visibility', value: 0, unit: 'm'}, 
          {key: 'wind_speed', label: 'Wind speed', value: 0, unit: 'kt'},
          {key: 'wind_direction', label: 'Wind direction', value: 0, unit: 'deg'},
          {key: 'dewpoint', label: 'Dew point', value: 0, unit: '°C'},
          {key: 'temperature',label: 'Temperature', value: 0, unit: '°C'},
          {key: 'altimeter', label: 'Altimete', value: 0, unit: 'hPa'},
        ]
        
        values.forEach((v)=>{
          if (data[v.key]){
            if (data[v.key].hasOwnProperty('value')){
              v['value'] = data[v.key].value
            }
          }

          html += `<div><div>${v.label}</div><div>${v.value}<span>${v.unit}</span></div></div>`
        })

        moreArea.innerHTML = html

        /*var cloudTypes = [
          { code: 'FEW', label: 'FEW'},
          { code: 'SKC', label: 'SKY CLEAR'},
          { code: 'SCT', label: 'SCATTERED'},
          { code: 'BKN', label: 'BROKEN'},
          { code: 'OVC', label: 'OVERCAST'},
          { code: 'NSC', label: 'NO SIGNIFICANT CLOUDS'},
          { code: 'NCD', label: 'NO CLOUD DETECTED'},
        ]*/

        if(data.translate.clouds){
          document.querySelector('#CloudTranslated').innerHTML = data.translate.clouds
        }

        if(data.translate.wx_codes){
          document.querySelector('#RainTranslated').innerHTML = data.translate.wx_codes
        }

        document.querySelector('#result').classList.remove('hidden')
        document.querySelector('#error').classList.add('hidden')
        
      })
    } else{
      document.querySelector('#result').classList.add('hidden')
      document.querySelector('#error').classList.remove('hidden')
    }
  })

  http.get(urlStation, res => {
    let data = ""
    res.on("data", d => {
      data = JSON.parse(d)
    })
    res.on("end", () => {
      document.querySelector('#stationCity').innerHTML = data.city
      document.querySelector('#StationName').innerHTML = data.name
    })
  })

}