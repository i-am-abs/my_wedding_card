# Arpit & Muskan · Wedding Invitation

### One-time setup

1. Open that Google Sheet → **Extensions → Apps Script**
2. Delete any default code and paste everything from `apps-script.gs`
3. Click **Save**
4. **Deploy → New deployment**
   - Gear icon → choose **Web app**
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorize your Google account, then **Allow**
6. Copy the **Web app URL** (it ends with `/exec`). The invitation is configured to use:

   `https://script.google.com/macros/s/AKfycbwF5YgbkvTMQM7tPKt4J-mn1T7PPvAu6jgAnWvuyLh8pVi85uHlmyGsV-vxrOXSIljy/exec`

7. In **Deploy → Manage deployments → Edit**, make sure **Execute as** is **Me** and **Who has access** is **Anyone**, then deploy a **New version**. A logged-out visit to the web app URL should show “Wedding RSVP is live”; a sign-in prompt or access-denied page means the deployment is not public yet.
8. Reload the invitation and submit a test RSVP — a new **RSVP** tab/rows should appear in the sheet.

If you redeploy the script later, use **Manage deployments → Edit → New version** so the same URL keeps working.
