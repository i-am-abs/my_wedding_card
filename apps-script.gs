/**
 * Saves every RSVP as a new row in your Google Sheet.
 * Setup: Google Sheet > Extensions > Apps Script > paste this > Deploy > New deployment
 * > type "Web app" > Execute as: Me > Who has access: Anyone > Deploy.
 * Copy the Web app URL into CONFIG.rsvpEndpoint in index.html.
 */
const SHEET_NAME = 'RSVP';
const HEADERS = ['Time', 'Name', 'Phone', 'Attending', 'Guests', 'Celebrations', 'Reason (if no)', 'Message'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.appendRow([new Date(), d.name, "'" + d.phone, d.attending, d.guests, d.events.join(', '), d.reason, d.message]);
  return ContentService.createTextOutput('ok');
}
