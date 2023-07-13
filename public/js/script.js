// @ts-nocheck
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
  dates.forEach(date => {
    const utcDate = new Date(date.innerHTML).toString()
    date.innerHTML = utcDate.slice(4, 15)
    if (date.innerHTML === 'lid Date') {
      date.innerHTML = `<span class="text-warning">Not defined</span>`
    }
  })

  // calculation of aging 
  const complaints = document.querySelectorAll('.complaint')
  complaints.forEach(complaint => {
    const complaintStatus = complaint.querySelector(".status")?.innerText
    let complaintAging = complaint.querySelector(".aging")?.innerText
    const complaintLastUpdate = complaint.querySelector(".last-update")?.innerText

    const startDate = new Date(complaintAging)
    const lastUpdate = new Date(complaintLastUpdate)
    const today = new Date()
    let elapsedDays 

    if (complaintStatus === "On-going") {
      elapsedDays = ((today - startDate) / 1000 / 60 / 60 / 24).toFixed('')
      complaint.querySelector(".aging").innerText = elapsedDays + " days"

      if (elapsedDays > 21) {
        complaint.querySelector(".aging").style.color = "orange"
      } else if (elapsedDays > 14) {
        complaint.querySelector('.aging').style.color = 'red'
      } else {
        complaint.querySelector(".aging").style.color = "green"
      }

    } else if (complaintStatus === "Closed" || complaintStatus === "Approved") {
      elapsedDays = ((lastUpdate - startDate) / 1000 / 60 / 60 / 24).toFixed('')
      complaint.querySelector(".aging").innerText = elapsedDays + " days"
    } 
  })

  // Setup for date in New Action form
  document.querySelector('#dueDate')?.setAttribute('min', fullDate)
})
