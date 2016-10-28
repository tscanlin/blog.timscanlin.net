export const formatDatestring = (date) => {
  let d = new Date(date)
  // 60,000 because the offset is in minutes.
  d = new Date(+d + (d.getTimezoneOffset() * 60000))
  let datestring = d.toDateString()
  datestring = datestring.split(' ')
  datestring.shift()
  datestring = datestring.join(' ')
  return datestring
}
