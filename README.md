# Arpit & Muskan · Wedding Invitation

## Connect RSVP form → Google Sheet

RSVP replies are saved to:
https://docs.google.com/spreadsheets/d/1G8tqxxhfQMZcPIwHmSCQ8VPDjDJeOukuBR71m06QxGA

### One-time setup

1. Open that Google Sheet → **Extensions → Apps Script**
2. Delete any default code and paste everything from `apps-script.gs`
3. Click **Save**
4. **Deploy → New deployment**
   - Gear icon → choose **Web app**
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorize your Google account, then **Allow**
6. Copy the **Web app URL** (it ends with `/exec`)
7. In `index.html`, set:

```js
rsvpEndpoint: 'https://script.google.com/macros/s/XXXX/exec',
```

8. Reload the invitation and submit a test RSVP — a new **RSVP** tab/rows should appear in the sheet.

If you redeploy the script later, use **Manage deployments → Edit → New version** so the same URL keeps working.
