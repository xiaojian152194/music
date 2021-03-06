import moment from 'moment'

let util = {}
util.musicTimeFormat = function (msd) {
  // let musicDt = msd.row[msd.column.dataIndex]
  debugger
  let time = parseFloat(msd) / 1000
  if (time != null) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + ':' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60)
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + ':' + parseInt((parseFloat(time / 3600.0) -
      parseInt(time / 3600.0)) * 60) + ':' +
      parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
      parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60)
    } else {
      time = parseInt(time)
    }
  }
  return time
}
util.longTimestampToString = function (longTimestamp) {
  if (longTimestamp && longTimestamp > 0) {
    let time = moment(longTimestamp).format('YYYY-MM-DD HH:mm:ss')
    return time
    // return moment(longTimestamp).format('YYYY-MM-DD HH:mm:ss');
  }
  return ''
}

util.yyyyMMddNow = function () {
  return moment(new Date()).format('YYYY-MM-DD')
}
export default util
