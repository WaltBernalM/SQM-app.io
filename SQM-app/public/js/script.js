// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("SQM-app JS imported successfully!");
});


window.addEventListener('load', () => { 
  // Setup for date in complaint form
  const today = new Date()
  const day = '0' + String(today.getDate())
  const month = '0' + String(today.getMonth() + 1)
  const year = String(today.getFullYear())
  const fullDate = `${year}-${month.slice(-2)}-${day.slice(-2)}`
  document.querySelector('#problemDateForm')?.setAttribute('max', fullDate)

  // setup dates for the table in profile
  const dates = document.querySelectorAll('.date-type')
  dates.forEach(date => date.innerHTML = date.innerHTML.slice(4, 15))
})