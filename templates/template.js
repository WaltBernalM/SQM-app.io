// raised complaint
function complaintRaised(message) {
  return `<h1>A new complaint has been raised!</h1>
  <h2>${message}</h2>
  <p>24h to answer the 3D actions</p>
  <p>7 days to perform Root Cause Analysis and define corrective actions</p>
  <p>14 days to define preventive actions</p>`
}

function reportUpdated(message) {
  return `<h1>New information in report!</h1>
  <h2>${message}</h2>`
}

function reportApproved(message) {
  return `<h1>The report has been fully approved</h1>
  <h2>${message}</h2>`
}

function actionAdded(message) {
  return `<h1>A new has been added</h1>
  <h2>${message}</h2>`
}

function userAccountAdded(message) { 
  return `<h1>You have a new account assigned in SQM.copilot</h1>
  <h2>${message}</h2>`
}

module.exports = {
  complaintRaised,
  reportUpdated,
  reportApproved,
  actionAdded,
  userAccountAdded,
}