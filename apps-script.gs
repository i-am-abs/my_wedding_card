/**
 * Saves every RSVP as a new row in your Google Sheet:
 * https://docs.google.com/spreadsheets/d/1G8tqxxhfQMZcPIwHmSCQ8VPDjDJeOukuBR71m06QxGA
 *
 * SETUP (one time, ~2 minutes):
 * 1. Open the sheet above → Extensions → Apps Script
 * 2. Delete any placeholder code, paste this entire file, click Save
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy → Authorize with your Google account → Allow
 * 5. Copy the Web app URL (ends with /exec)
 * 6. Paste that URL into CONFIG.rsvpEndpoint in index.html
 */
const SPREADSHEET_ID = '1G8tqxxhfQMZcPIwHmSCQ8VPDjDJeOukuBR71m06QxGA';
const SHEET_NAME = 'RSVP';
const HEADERS = ['Time', 'Name', 'Phone', 'Attending', 'Guests', 'Celebrations', 'Reason (if no)', 'Message'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.appendRow([
    new Date(),
    d.name || '',
    "'" + (d.phone || ''),
    d.attending || '',
    d.guests || 0,
    Array.isArray(d.events) ? d.events.join(', ') : (d.events || ''),
    d.reason || '',
    d.message || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Open the Web app URL in a browser to confirm the deploy worked. */
function doGet() {
  return ContentService
    .createTextOutput('Wedding RSVP endpoint is live. Form posts will appear in the RSVP sheet.')
    .setMimeType(ContentService.MimeType.TEXT);
}
