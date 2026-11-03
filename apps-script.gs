/**
 * Saves every RSVP (Yes or No), including Message, to:
 * https://docs.google.com/spreadsheets/d/1G8tqxxhfQMZcPIwHmSCQ8VPDjDJeOukuBR71m06QxGA
 *
 * After any edit: Deploy → Manage deployments → ✎ → New version → Deploy
 */
const SPREADSHEET_ID = '1G8tqxxhfQMZcPIwHmSCQ8VPDjDJeOukuBR71m06QxGA';
const HEADERS = ['Time', 'Name', 'Phone', 'Attending', 'Guests', 'Celebrations', 'Reason (if no)', 'Message'];

function doPost(e) {
  try {
    const d = readPayload_(e);
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = book.getSheets()[0]; // first tab (gid=0) — what you see when you open the sheet
    ensureHeaders_(sheet);
    sheet.appendRow([
      new Date(),
      d.name || '',
      "'" + (d.phone || ''),
      d.attending || '',
      d.guests || 0,
      d.events || '',
      d.reason || '',
      d.message || '',
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function readPayload_(e) {
  // Prefer form fields (most reliable from the wedding card)
  if (e && e.parameter && (e.parameter.name || e.parameter.message || e.parameter.attending)) {
    return {
      name: e.parameter.name || '',
      phone: e.parameter.phone || '',
      attending: e.parameter.attending || '',
      guests: e.parameter.guests || 0,
      events: e.parameter.events || '',
      reason: e.parameter.reason || '',
      message: e.parameter.message || '',
    };
  }
  // Fallback: JSON body
  if (e && e.postData && e.postData.contents) {
    const d = JSON.parse(e.postData.contents);
    return {
      name: d.name || '',
      phone: d.phone || '',
      attending: d.attending || '',
      guests: d.guests || 0,
      events: Array.isArray(d.events) ? d.events.join(', ') : (d.events || ''),
      reason: d.reason || '',
      message: d.message || '',
    };
  }
  throw new Error('No form data received');
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    return;
  }
  const first = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (first[0] !== 'Time' || first[7] !== 'Message') {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput('Wedding RSVP is live. Submit the form to save Name + Message on the first sheet tab.')
    .setMimeType(ContentService.MimeType.TEXT);
}
