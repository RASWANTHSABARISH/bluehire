const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, PageBreak, TabStopType, TabStopPosition,
  Header, Footer
} = require('docx');
const fs = require('fs');

const BLUE       = "1A5276";
const BLUE_LIGHT = "D6EAF8";
const TEAL       = "0E6655";
const TEAL_LIGHT = "D1F2EB";
const AMBER      = "784212";
const AMBER_LIGHT= "FDEBD0";
const GRAY_LIGHT = "F2F3F4";
const GRAY_MED   = "D5D8DC";
const RED_LIGHT  = "FADBD8";
const RED        = "7B241C";
const GREEN_LIGHT= "D5F5E3";
const GREEN      = "1D6A39";
const WHITE      = "FFFFFF";
const BLACK      = "1A1A1A";

const cellBorder = (color = "CCCCCC") => ({
  top:    { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left:   { style: BorderStyle.SINGLE, size: 1, color },
  right:  { style: BorderStyle.SINGLE, size: 1, color },
});

const noBorder = () => ({
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
});

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, font: "Arial", size: 34, bold: true, color: BLUE })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, font: "Arial", size: 28, bold: true, color: TEAL })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 24, bold: true, color: BLACK })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 100 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: BLACK, ...opts })]
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: BLACK })]
  });
}

function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: BLACK })]
  });
}

function spacer(lines = 1) {
  return Array.from({ length: lines }, () =>
    new Paragraph({ children: [new TextRun({ text: "", size: 22 })] })
  );
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GRAY_MED, space: 1 } },
    children: [new TextRun({ text: "" })]
  });
}

function labelValue(label, value) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: `${label}: `, font: "Arial", size: 22, bold: true, color: BLUE }),
      new TextRun({ text: value, font: "Arial", size: 22, color: BLACK })
    ]
  });
}

function codeBlock(lines) {
  return lines.map(line =>
    new Paragraph({
      spacing: { before: 40, after: 40 },
      shading: { fill: "F4F6F7", type: ShadingType.CLEAR },
      indent: { left: 360 },
      children: [new TextRun({ text: line, font: "Courier New", size: 20, color: "1A1A1A" })]
    })
  );
}

function colorBox(text, fill, textColor = BLACK) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorder(),
            shading: { fill, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            width: { size: 9360, type: WidthType.DXA },
            children: [new Paragraph({
              children: [new TextRun({ text, font: "Arial", size: 22, color: textColor })]
            })]
          })
        ]
      })
    ]
  });
}

function twoColTable(headers, rows, colWidths = [3120, 3120, 3120]) {
  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      new TableCell({
        borders: cellBorder("AAAAAA"),
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        width: { size: colWidths[i], type: WidthType.DXA },
        children: [new Paragraph({
          children: [new TextRun({ text: h, font: "Arial", size: 20, bold: true, color: WHITE })]
        })]
      })
    )
  });
  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          borders: cellBorder("DDDDDD"),
          shading: { fill: ri % 2 === 0 ? GRAY_LIGHT : WHITE, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 140, right: 140 },
          width: { size: colWidths[ci], type: WidthType.DXA },
          children: [new Paragraph({
            children: [new TextRun({ text: cell, font: "Arial", size: 20, color: BLACK })]
          })]
        })
      )
    })
  );
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows]
  });
}

function sectionHeader(number, title, subtitle) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorder(),
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 240, right: 240 },
        width: { size: 9360, type: WidthType.DXA },
        children: [
          new Paragraph({ children: [new TextRun({ text: `${number}. ${title}`, font: "Arial", size: 32, bold: true, color: WHITE })] }),
          new Paragraph({ children: [new TextRun({ text: subtitle, font: "Arial", size: 22, color: "AACDE8" })] }),
        ]
      })]
    })]
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "\u25CB", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
        ]
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: BLACK },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1260, bottom: 1440, left: 1260 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GRAY_MED } },
          children: [
            new TextRun({ text: "BlueShift — Backend Logic & Database Design", font: "Arial", size: 18, color: "888888" }),
            new TextRun({ text: "     |     Confidential", font: "Arial", size: 18, color: "AAAAAA" })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: GRAY_MED } },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 18, color: "888888" }),
            new PageNumber(),
            new TextRun({ text: "  |  BlueShift Internal Documentation", font: "Arial", size: 18, color: "AAAAAA" })
          ]
        })]
      })
    },
    children: [

      // ── COVER ──────────────────────────────────────────────────────────────
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: noBorder(),
          shading: { fill: BLUE, type: ShadingType.CLEAR },
          margins: { top: 600, bottom: 600, left: 400, right: 400 },
          width: { size: 9360, type: WidthType.DXA },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLUESHIFT", font: "Arial", size: 64, bold: true, color: WHITE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Blue Collar Job Matching Platform", font: "Arial", size: 28, color: "AACDE8" })] }),
            ...spacer(1),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Backend Logic, Database Design & Flow Documentation", font: "Arial", size: 26, color: "D6EAF8", bold: true })] }),
            ...spacer(1),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Version 1.0  |  Internal Technical Reference", font: "Arial", size: 20, color: "7FB3D3" })] }),
          ]
        })]})],
      }),

      ...spacer(2),

      // ── INTRO ──────────────────────────────────────────────────────────────
      h1("Overview"),
      body("This document covers the complete backend logic for BlueShift — a multi-sector blue-collar job matching platform. It explains every database collection, every key API flow, and the full lifecycle of a job from the moment it is posted to the moment it is closed after hiring."),
      body("The platform connects two types of users: Workers (job seekers across restaurant, healthcare, textile, and student gig sectors) and Employers (restaurant owners, hospital HR managers, factory supervisors). A third internal user — the Admin — monitors and moderates the platform."),
      ...spacer(1),

      colorBox("Tech stack: Node.js + Express  |  MongoDB Atlas (Free Tier)  |  Mongoose ODM  |  Firebase Cloud Messaging (push notifications)  |  JWT (authentication)', BLUE_LIGHT, BLUE"),

      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 1 — DB COLLECTIONS
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("1", "Database Collections", "MongoDB schema design — all collections explained"),
      ...spacer(1),

      body("MongoDB stores data as documents (similar to JSON objects). The BlueShift database has 6 main collections. Each collection is explained below with its fields and purpose."),
      ...spacer(1),

      // 1.1 Users
      h2("1.1  Users Collection"),
      body("This is the single most important collection. Both workers and employers are stored here — separated by the role field. This avoids maintaining two separate user systems."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Auto-generated unique ID for every user"],
          ["name", "String", "Full name of the person"],
          ["phone", "String", "Primary login identifier (used instead of email for blue-collar users)"],
          ["email", "String (optional)", "Email address — optional for workers, recommended for employers"],
          ["passwordHash", "String", "Bcrypt-hashed password — never stored as plain text"],
          ["role", "Enum", "worker | employer | admin — controls what they can see and do"],
          ["sector", "Enum", "restaurant | healthcare | textile | student — filters their job feed"],
          ["city", "String", "Used for location-based job filtering"],
          ["state", "String", "State of residence"],
          ["isVerified", "Boolean", "Aadhaar or GST verified — shows a verified badge on profile"],
          ["fcmToken", "String", "Firebase Cloud Messaging token — used to send push notifications to this device"],
          ["profileComplete", "Boolean", "True only when all required profile fields are filled"],
          ["rating", "Number", "Average rating from past employers/workers (1 to 5)"],
          ["totalRatings", "Number", "Count of ratings — used to calculate accurate average"],
          ["createdAt", "Date", "Account creation timestamp"],
          ["isActive", "Boolean", "False if account is suspended or deleted"],
        ],
        [3600, 2100, 3660]
      ),

      ...spacer(1),
      body("Worker-specific extra fields (stored as a nested object workerProfile):"),
      bullet("jobTitle — current or desired job title (e.g. Head Chef, Ward Boy, Loom Operator)"),
      bullet("experienceYears — total years of work experience"),
      bullet("skills — array of strings (e.g. ['Biryani cooking', 'IV setup', 'Power loom operation'])"),
      bullet("availableDays — array of day names when available to work"),
      bullet("availableShift — morning | afternoon | night | flexible"),
      bullet("expectedSalaryMin / Max — monthly salary range the worker wants"),
      bullet("resumeUrl — optional link to uploaded resume or voice note"),
      ...spacer(1),
      body("Employer-specific extra fields (stored as a nested object employerProfile):"),
      bullet("businessName — name of the restaurant, hospital, or factory"),
      bullet("businessType — restaurant | hospital | textile | other"),
      bullet("gstNumber — for verification (optional)"),
      bullet("address — full business address for map display"),
      bullet("totalHires — count of successful hires through the platform"),
      ...spacer(1),

      // 1.2 Jobs
      h2("1.2  Jobs Collection"),
      body("Every job posting lives here. When an employer posts a job, a new document is created in this collection. The job remains active until it is filled or manually closed."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Unique job ID"],
          ["employerId", "ObjectId (ref: Users)", "Who posted this job — links back to the Users collection"],
          ["title", "String", "Job title shown on listing card (e.g. Kitchen Helper, Ward Boy)"],
          ["description", "String", "Full job description — duties, requirements, perks"],
          ["sector", "Enum", "restaurant | healthcare | textile | student — controls which workers see this job"],
          ["jobType", "Enum", "full-time | part-time | single-shift — shown prominently on the card"],
          ["shiftTiming", "String", "Human-readable shift time (e.g. 8am to 4pm, Night shift 10pm-6am)"],
          ["salaryMin / Max", "Number", "Monthly or per-shift salary range in INR"],
          ["location", "Object", "{ address, city, state, coordinates: { lat, lng } }"],
          ["status", "Enum", "open | filled | closed | expired"],
          ["sectorMeta", "Object", "Sector-specific fields (see below)"],
          ["applicantCount", "Number", "Real-time count of applications received"],
          ["hiredWorkerId", "ObjectId (ref: Users)", "Set when a worker is hired — links to who got the job"],
          ["closedAt", "Date", "When the job was marked filled or closed"],
          ["expiresAt", "Date", "Auto-expires after 30 days if not closed manually"],
          ["createdAt", "Date", "When the job was posted"],
          ["isActive", "Boolean", "False when job is filled, closed, or expired"],
        ],
        [3100, 2400, 3860]
      ),

      ...spacer(1),
      body("The sectorMeta field stores industry-specific details that differ per sector:"),
      bullet("Restaurant jobs: kitchenRole (chef | helper | server | cashier | dishwasher | captain), cuisineType, serviceType (dine-in | delivery | both)"),
      bullet("Healthcare jobs: ward (ICU | General | OT | ER | Paediatrics), roleType (ward-boy | lab-assistant | OT-helper | housekeeping), certification required (yes/no)"),
      bullet("Textile jobs: machineType (handloom | power-loom | knitting), productType, physicalDemand level"),
      bullet("Student gigs: eventType, hoursPerWeek, allowsRemote (yes/no)"),
      ...spacer(1),

      // 1.3 Applications
      h2("1.3  Applications Collection"),
      body("When a worker taps Apply, this is the document that gets created. It is the central tracking record — every status change, every action by both sides, is reflected here."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Unique application ID"],
          ["workerId", "ObjectId (ref: Users)", "Who applied"],
          ["jobId", "ObjectId (ref: Jobs)", "Which job they applied for"],
          ["employerId", "ObjectId (ref: Users)", "Who needs to act on this application"],
          ["status", "Enum", "pending | shortlisted | interview_set | offer_sent | hired | rejected"],
          ["appliedAt", "Date", "Exact timestamp of application"],
          ["interviewSlot", "Date | null", "Proposed interview datetime sent by employer"],
          ["interviewConfirmed", "Boolean", "True when worker confirms the interview slot"],
          ["offerSentAt", "Date | null", "When a direct hire offer was sent to the worker"],
          ["hiredAt", "Date | null", "When worker confirmed the hire"],
          ["rejectionReason", "String | null", "Internal tag (not shown to worker): timing | overqualified | filled"],
          ["chatThreadId", "ObjectId (ref: Chats)", "Links to the conversation between worker and employer"],
          ["workerRating", "Number | null", "Rating the employer gave after the job (1-5)"],
          ["employerRating", "Number | null", "Rating the worker gave the employer after the job (1-5)"],
          ["ratingDue", "Boolean", "Set to true after job date passes — triggers rating reminder notification"],
          ["updatedAt", "Date", "Last time this document was modified (auto-updated by Mongoose timestamps)"],
        ],
        [3200, 2400, 3760]
      ),

      ...spacer(1),
      body("The status field is the most important field in this collection. Every notification, every UI update, and every action is driven by changes to this single field. Think of it as the state machine of the entire hiring process."),
      ...spacer(1),

      // 1.4 Chats
      h2("1.4  Chats Collection"),
      body("Every conversation between a worker and employer is stored here. One chat thread is created per application — not per user pair. This means if the same worker applies to the same employer for two different jobs, two separate threads exist."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Unique thread ID — stored as chatThreadId in the application"],
          ["applicationId", "ObjectId (ref: Applications)", "Which application this chat belongs to"],
          ["participants", "Array of ObjectIds", "[workerId, employerId] — both parties of this chat"],
          ["messages", "Array of Objects", "Array of message documents (see below)"],
          ["lastMessage", "String", "Preview of the most recent message — shown in chat list"],
          ["lastMessageAt", "Date", "Time of most recent message — used for sorting chat list"],
          ["createdAt", "Date", "When the chat thread was opened (on shortlisting)"],
        ],
        [3200, 2400, 3760]
      ),
      ...spacer(1),
      body("Each message object inside the messages array contains:"),
      bullet("senderId — who sent it (workerId or employerId)"),
      bullet("type — text | voice | action_card (for structured interview/offer cards)"),
      bullet("content — the message text or voice note URL"),
      bullet("actionCard — object present only for type=action_card: { cardType: 'interview_invite' | 'job_offer', data: { date, time, location, pay }, status: 'pending' | 'accepted' | 'declined' }"),
      bullet("sentAt — timestamp"),
      bullet("readAt — timestamp | null — for read receipts"),
      ...spacer(1),

      // 1.5 Notifications
      h2("1.5  Notifications Collection"),
      body("Every notification sent to any user is logged here. This powers the in-app notification bell (not just push notifications) and allows users to see their notification history even if they missed the push."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Unique notification ID"],
          ["userId", "ObjectId (ref: Users)", "Who should receive this notification"],
          ["type", "Enum", "new_application | shortlisted | interview_set | offer_sent | hired | rejected | new_message | rating_due"],
          ["title", "String", "Short headline shown in the push notification"],
          ["body", "String", "Full notification message body"],
          ["relatedId", "ObjectId", "Links to the application, chat, or job this notification is about"],
          ["isRead", "Boolean", "Marked true when user opens/taps the notification"],
          ["sentAt", "Date", "When the notification was dispatched"],
        ],
        [3200, 2400, 3760]
      ),
      ...spacer(1),

      // 1.6 Ratings
      h2("1.6  Ratings Collection"),
      body("Post-job ratings are stored separately (not just on the application) so that a user's full rating history is queryable. The average on the Users collection is re-calculated each time a new rating is added."),
      ...spacer(1),

      twoColTable(
        ["Field", "Type", "Purpose"],
        [
          ["_id", "ObjectId", "Unique rating ID"],
          ["applicationId", "ObjectId (ref: Applications)", "Which job/hire this rating is for"],
          ["raterId", "ObjectId (ref: Users)", "Who gave the rating"],
          ["ratedId", "ObjectId (ref: Users)", "Who received the rating"],
          ["score", "Number", "1 to 5 stars"],
          ["comment", "String (optional)", "Written feedback"],
          ["raterRole", "Enum", "employer | worker — helps display ratings correctly on profiles"],
          ["createdAt", "Date", "When the rating was submitted"],
        ],
        [3200, 2400, 3760]
      ),

      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 2 — AUTH FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("2", "Authentication Flow", "How users register, log in, and stay logged in"),
      ...spacer(1),

      h2("2.1  Registration"),
      body("Workers and employers both register through the same endpoint. The role field determines what kind of account is created."),
      ...spacer(1),
      numbered("User fills in name, phone, password, role, and sector on the registration screen."),
      numbered("Frontend sends a POST request to /api/auth/register with all fields."),
      numbered("Backend checks if a user with that phone number already exists in the Users collection. If yes, return error: 'Account already exists.'"),
      numbered("If no, password is hashed using bcrypt (saltRounds = 10) and a new user document is created in MongoDB."),
      numbered("A JWT token is generated with the payload { userId, role, sector } and a 30-day expiry."),
      numbered("The token is returned to the frontend. Frontend stores it in secure device storage (not localStorage — use React Native SecureStore or AsyncStorage)."),
      numbered("All future API requests include this token in the Authorization header: Bearer <token>."),
      ...spacer(1),

      h2("2.2  Login"),
      body("Login is phone-number based — not email — because the target users are more comfortable with their phone number."),
      ...spacer(1),
      numbered("User enters phone number and password."),
      numbered("POST /api/auth/login — backend finds the user by phone number."),
      numbered("If not found: return 404 error 'Account not found.'"),
      numbered("If found: bcrypt.compare() checks the entered password against the stored hash."),
      numbered("If password wrong: return 401 'Incorrect password.'"),
      numbered("If correct: generate a new JWT and return it. Backend also updates the fcmToken field if the device token has changed — this keeps push notifications working after re-login."),
      ...spacer(1),

      h2("2.3  Auth Middleware"),
      body("Every protected route passes through an authMiddleware function before reaching the route handler. This function:"),
      bullet("Reads the Authorization header from the request."),
      bullet("Verifies the JWT using the secret key stored in .env."),
      bullet("If valid: attaches req.user = { userId, role, sector } to the request and calls next()."),
      bullet("If invalid or expired: returns 401 Unauthorized immediately — the route handler never runs."),
      bullet("Role checks are done separately using a roleGuard middleware: roleGuard('employer') blocks workers from accessing employer-only routes."),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 3 — JOB POSTING FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("3", "Job Posting Flow", "From employer tapping 'Post a Job' to the job going live"),
      ...spacer(1),

      h2("3.1  What happens when an employer posts a job"),
      ...spacer(1),

      numbered("Employer fills in the job form in the app: title, description, sector, jobType, shiftTiming, salaryRange, location, and sector-specific fields (e.g. kitchenRole for restaurants)."),
      numbered("Frontend validates that all required fields are filled before sending."),
      numbered("POST /api/jobs — protected route, requires employer role."),
      numbered("Backend creates a new document in the Jobs collection with status = open, isActive = true, applicantCount = 0, and expiresAt = 30 days from now."),
      numbered("The employerId field is taken from req.user.userId (from the JWT) — the employer does not pass their own ID in the request body. This prevents fraud."),
      numbered("The job document is saved to MongoDB and the new job's _id is returned to the frontend."),
      numbered("Job is now live and visible in the worker job feed."),
      ...spacer(1),

      h2("3.2  Job expiry"),
      body("A background cron job runs every night at midnight. It queries the Jobs collection for all documents where status = open AND expiresAt is less than the current date. These jobs are updated to status = expired and isActive = false. Employers are sent a push notification: 'Your job listing for [Title] has expired. Post again to keep it active.'"),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 4 — JOB DISPLAY FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("4", "Job Display Flow", "How workers see relevant jobs in their feed"),
      ...spacer(1),

      h2("4.1  Worker job feed logic"),
      body("When a worker opens the app, the feed shows jobs filtered and sorted for them specifically. This is not a raw list of all jobs."),
      ...spacer(1),

      numbered("Worker opens the app. Frontend sends GET /api/jobs/feed with their JWT in the header."),
      numbered("Backend reads req.user.sector (e.g. 'restaurant') and req.user.city from their profile."),
      numbered("MongoDB query filters: { sector: workerSector, status: 'open', isActive: true, 'location.city': workerCity }."),
      numbered("Results are sorted by: featured jobs first (if any), then by createdAt descending (newest first)."),
      numbered("Jobs where the worker has already applied are excluded — backend cross-references the Applications collection: any jobId where this workerId has an application is filtered out of the feed."),
      numbered("Paginated response returned: default 20 jobs per page, with a nextCursor for infinite scroll."),
      ...spacer(1),

      h2("4.2  Job detail page"),
      body("When a worker taps a job card, they see the full detail. GET /api/jobs/:jobId — no auth required for viewing. The employer's businessName, city, and rating are fetched via a populate() join on the employerId field. The worker's own application status for this job (if any) is also returned so the frontend can show 'Applied' instead of 'Apply Now'."),
      ...spacer(1),

      h2("4.3  Search and filters"),
      body("Workers can search by keyword, filter by jobType, salary range, and shift timing. These map to MongoDB query conditions added on top of the base feed query. Text search uses MongoDB's $text index on the title and description fields."),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 5 — APPLICATION FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("5", "Application Flow", "From worker tapping Apply to employer receiving it"),
      ...spacer(1),

      h2("5.1  Step-by-step: worker applies"),
      ...spacer(1),

      numbered("Worker taps 'Apply Now' on a job listing."),
      numbered("Frontend checks: is the worker's profileComplete = true? If not, prompt them to complete their profile before applying."),
      numbered("If profile is complete: POST /api/applications with body { jobId }."),
      numbered("Backend checks for duplicate application: does an application already exist for this workerId + jobId combination? If yes, return 409 Conflict 'You have already applied for this job.'"),
      numbered("If no duplicate: create a new document in the Applications collection with status = pending, appliedAt = now."),
      numbered("Increment the applicantCount field on the corresponding Jobs document by 1 (using $inc operator for atomic update)."),
      numbered("Fetch the employer's fcmToken from the Users collection."),
      numbered("Send push notification to the employer via Firebase: title = 'New Application', body = '[Worker Name] applied for [Job Title]'."),
      numbered("Log this notification in the Notifications collection for in-app history."),
      numbered("Return success response to the worker. Frontend shows 'Application Sent' confirmation screen."),
      ...spacer(1),

      h2("5.2  Worker's application tracker"),
      body("Workers can see all their applications with live status via GET /api/applications/mine. This returns all Application documents where workerId = req.user.userId, with the jobId field populated (to show job title and employer name). Sorted by appliedAt descending — most recent application shown first."),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 6 — EMPLOYER MANAGES APPLICATIONS
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("6", "Employer Manages Applications", "How the recruiter reviews, shortlists, and acts"),
      ...spacer(1),

      h2("6.1  Viewing incoming applications"),
      body("GET /api/jobs/:jobId/applications — employer role required. Returns all Application documents for this job, sorted by appliedAt. The workerId field is populated with the worker's full profile: name, photo, experience, skills, rating, sector, availability. This gives the employer everything they need to make a decision from one API call."),
      ...spacer(1),

      h2("6.2  Shortlisting a candidate"),
      ...spacer(1),
      numbered("Employer taps 'Shortlist' on an applicant card."),
      numbered("PATCH /api/applications/:applicationId/status with body { status: 'shortlisted' }."),
      numbered("Backend validates: is req.user.userId equal to the application's employerId? If not, return 403 Forbidden — an employer cannot modify another employer's applications."),
      numbered("Update the Application document: status = shortlisted."),
      numbered("Create a new Chat document with participants = [workerId, employerId] and store its _id as chatThreadId on the application. The chat thread opens at the moment of shortlisting."),
      numbered("Send push notification to the worker: 'Good news! [Business Name] shortlisted you for [Job Title].'"),
      numbered("Log notification in Notifications collection."),
      ...spacer(1),

      h2("6.3  Sending an interview slot"),
      ...spacer(1),
      numbered("Employer selects a date and time in the calendar picker and taps 'Send Interview Invite'."),
      numbered("PATCH /api/applications/:applicationId/status with body { status: 'interview_set', interviewSlot: '2025-06-15T10:00:00Z' }."),
      numbered("Backend updates: status = interview_set, interviewSlot = provided datetime, interviewConfirmed = false."),
      numbered("A structured action_card message is added to the Chats collection: type = action_card, cardType = interview_invite, data = { date, time, location }, status = pending."),
      numbered("Push notification to worker: '[Business Name] wants to meet you on [Date] at [Time]. Confirm or suggest another time.'"),
      ...spacer(1),

      h2("6.4  Worker confirms the interview"),
      ...spacer(1),
      numbered("Worker sees the interview invite card in chat and taps 'Confirm'."),
      numbered("PATCH /api/applications/:applicationId/confirm-interview — worker role only."),
      numbered("Backend updates: interviewConfirmed = true. The action card in Chats is updated: status = accepted."),
      numbered("Push notification to employer: '[Worker Name] confirmed the interview for [Date].'"),
      numbered("A reminder notification is scheduled for 1 hour before the interview time for both parties."),
      ...spacer(1),

      h2("6.5  Direct hire (urgent shifts)"),
      body("For urgent same-day or next-day shifts, the employer can skip interview entirely. They tap 'Hire Directly' which sends a job offer immediately."),
      ...spacer(1),
      numbered("PATCH /api/applications/:applicationId/status with body { status: 'offer_sent', offerSentAt: now }."),
      numbered("A structured action_card message is added to chat: type = action_card, cardType = job_offer, data = { startDate, startTime, pay, location }, status = pending."),
      numbered("Push notification to worker: '[Business Name] offered you the [Job Title] position. Confirm to accept.'"),
      ...spacer(1),

      h2("6.6  Rejecting a candidate"),
      numbered("Employer taps 'Reject'. PATCH /api/applications/:applicationId/status with body { status: 'rejected', rejectionReason: 'timing' }."),
      numbered("Backend stores the rejectionReason internally (for analytics) but does not expose it to the worker."),
      numbered("Push notification to worker: 'Your application for [Job Title] at [Business Name] was not selected. Keep applying — more jobs are waiting!'"),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 7 — HIRING & JOB CLOSING FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("7", "Hiring & Job Closing Flow", "From offer confirmation to the job being marked filled"),
      ...spacer(1),

      h2("7.1  Worker accepts the offer"),
      ...spacer(1),
      numbered("Worker taps 'Confirm' on the job offer card in chat."),
      numbered("POST /api/applications/:applicationId/confirm-hire — worker role only."),
      numbered("Backend updates the Application: status = hired, hiredAt = now."),
      numbered("Backend updates the action card in Chats: status = accepted."),
      numbered("Backend updates the Jobs document: status = filled, isActive = false, hiredWorkerId = workerId, closedAt = now."),
      numbered("All other pending/shortlisted applications for this same job are automatically updated to status = rejected — the job is no longer available. Their notifications are queued as a batch: 'The position you applied for at [Business Name] has been filled.'"),
      numbered("Push notification to employer: '[Worker Name] confirmed the job. They will report on [Date].'"),
      numbered("Push notification to worker: 'You are hired at [Business Name]! Job starts [Date] at [Time]. Location: [Address].'"),
      numbered("Both sides now see the hire confirmation screen with all job details."),
      ...spacer(1),

      h2("7.2  Job marked as filled — what changes in the database"),
      ...spacer(1),
      colorBox(
        "Jobs document: status = filled, isActive = false, hiredWorkerId = workerId, closedAt = now\n" +
        "Hired application: status = hired, hiredAt = now\n" +
        "All other applications for same job: status = rejected (batch update)\n" +
        "Workers feed: this job no longer appears (isActive = false filter removes it)\n" +
        "Employer dashboard: job moves from Active to Closed tab",
        TEAL_LIGHT, TEAL
      ),
      ...spacer(1),

      h2("7.3  Employer closes a job manually"),
      body("If an employer fills the role through another channel, or decides not to hire, they can close the job manually from their dashboard. PATCH /api/jobs/:jobId/close. Backend sets status = closed, isActive = false, closedAt = now. All pending applications for this job are rejected and applicants notified."),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 8 — POST-JOB RATING FLOW
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("8", "Post-Job Rating Flow", "How both sides rate each other after the job"),
      ...spacer(1),

      numbered("A cron job runs every hour checking for applications where: status = hired AND hiredAt was more than 2 hours ago AND ratingDue = false."),
      numbered("For each match: set ratingDue = true on the application. Send push notification to both worker and employer: 'How was your experience? Rate your [shift/hire] at [BusinessName/WorkerName].'"),
      numbered("Worker submits rating: POST /api/ratings with body { applicationId, score, comment }."),
      numbered("Backend creates a new Rating document. Updates the application: employerRating = score (if the worker is rating the employer) or workerRating = score."),
      numbered("Backend recalculates the rated user's average: fetch all their Rating documents, compute mean score, update rating and totalRatings fields on their Users document."),
      numbered("Ratings are permanently visible on both profiles — employers see the worker's score, workers see the employer's score before applying."),
      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 9 — API ENDPOINT SUMMARY
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("9", "API Endpoint Summary", "All routes grouped by function"),
      ...spacer(1),

      h2("Authentication"),
      twoColTable(
        ["Method + Route", "Auth", "Purpose"],
        [
          ["POST /api/auth/register", "None", "Register new worker or employer"],
          ["POST /api/auth/login", "None", "Login and receive JWT"],
          ["GET /api/auth/me", "JWT", "Get current logged-in user profile"],
          ["PATCH /api/auth/profile", "JWT", "Update profile fields"],
          ["PATCH /api/auth/fcm-token", "JWT", "Update device push token"],
        ],
        [3200, 1500, 4660]
      ),
      ...spacer(1),

      h2("Jobs"),
      twoColTable(
        ["Method + Route", "Auth", "Purpose"],
        [
          ["POST /api/jobs", "Employer", "Create a new job listing"],
          ["GET /api/jobs/feed", "Worker", "Get personalised job feed for logged-in worker"],
          ["GET /api/jobs/:jobId", "JWT", "Get full details of a single job"],
          ["PATCH /api/jobs/:jobId", "Employer", "Edit an existing job listing"],
          ["PATCH /api/jobs/:jobId/close", "Employer", "Manually close a job listing"],
          ["GET /api/jobs/mine", "Employer", "Get all jobs posted by this employer"],
        ],
        [3200, 1500, 4660]
      ),
      ...spacer(1),

      h2("Applications"),
      twoColTable(
        ["Method + Route", "Auth", "Purpose"],
        [
          ["POST /api/applications", "Worker", "Apply to a job (body: { jobId })"],
          ["GET /api/applications/mine", "Worker", "Get all applications by this worker"],
          ["GET /api/jobs/:jobId/applications", "Employer", "Get all applicants for a specific job"],
          ["PATCH /api/applications/:id/status", "Employer", "Update application status (shortlist, interview, offer, reject)"],
          ["PATCH /api/applications/:id/confirm-interview", "Worker", "Confirm an interview slot"],
          ["POST /api/applications/:id/confirm-hire", "Worker", "Accept a job offer — triggers hire closing logic"],
        ],
        [3500, 1500, 4360]
      ),
      ...spacer(1),

      h2("Chat"),
      twoColTable(
        ["Method + Route", "Auth", "Purpose"],
        [
          ["GET /api/chats", "JWT", "Get all chat threads for this user"],
          ["GET /api/chats/:threadId/messages", "JWT", "Get all messages in a thread"],
          ["POST /api/chats/:threadId/messages", "JWT", "Send a message (text or voice note URL)"],
          ["PATCH /api/chats/:threadId/read", "JWT", "Mark all messages in thread as read"],
        ],
        [3500, 1500, 4360]
      ),
      ...spacer(1),

      h2("Ratings & Notifications"),
      twoColTable(
        ["Method + Route", "Auth", "Purpose"],
        [
          ["POST /api/ratings", "JWT", "Submit a rating after a completed job"],
          ["GET /api/notifications", "JWT", "Get notification history for logged-in user"],
          ["PATCH /api/notifications/:id/read", "JWT", "Mark a notification as read"],
          ["PATCH /api/notifications/read-all", "JWT", "Mark all notifications as read"],
        ],
        [3500, 1500, 4360]
      ),

      ...spacer(1),
      divider(),

      // ══════════════════════════════════════════════════════════════════════
      // SECTION 10 — COMPLETE LIFECYCLE SUMMARY
      // ══════════════════════════════════════════════════════════════════════
      sectionHeader("10", "Complete Job Lifecycle — End to End", "Every database state change from posting to closing"),
      ...spacer(1),

      body("The table below shows every stage in the life of a job, what changes in the database, and who receives a notification at each step."),
      ...spacer(1),

      twoColTable(
        ["Stage", "DB Changes", "Notifications sent"],
        [
          ["Employer posts job", "Jobs: new doc, status=open, isActive=true", "None"],
          ["Worker applies", "Applications: new doc, status=pending\nJobs: applicantCount +1", "Employer: 'New application received'"],
          ["Employer shortlists", "Applications: status=shortlisted\nChats: new thread created", "Worker: 'You have been shortlisted'"],
          ["Employer sends interview", "Applications: status=interview_set, interviewSlot set\nChats: action card added", "Worker: 'Interview invite sent'"],
          ["Worker confirms interview", "Applications: interviewConfirmed=true\nChats: card status=accepted", "Employer: 'Interview confirmed'\nBoth: reminder 1hr before"],
          ["Employer sends direct offer", "Applications: status=offer_sent, offerSentAt set\nChats: offer card added", "Worker: 'Job offer received'"],
          ["Worker accepts offer", "Applications: status=hired, hiredAt set\nJobs: status=filled, isActive=false, hiredWorkerId set, closedAt set\nAll other applications: status=rejected", "Both: 'Hire confirmed'\nOther applicants: 'Position filled'"],
          ["Employer rejects", "Applications: status=rejected, rejectionReason set", "Worker: 'Application not selected'"],
          ["Post-job rating (2hr after hire)", "Applications: ratingDue=true", "Both: 'Rate your experience'"],
          ["Rating submitted", "Ratings: new doc\nUsers: rating and totalRatings recalculated", "None"],
          ["Job expires (30 days)", "Jobs: status=expired, isActive=false", "Employer: 'Your job listing expired'"],
          ["Employer closes manually", "Jobs: status=closed, isActive=false, closedAt set\nAll pending applications: rejected", "Pending applicants: 'Position filled'"],
        ],
        [2600, 3400, 3360]
      ),

      ...spacer(2),
      colorBox(
        "This document is a living reference. As new features are added (training marketplace, payroll integration, enterprise contracts), new collections and endpoints will be appended here. Last updated: May 2025.",
        BLUE_LIGHT, BLUE
      ),
      ...spacer(1),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/mnt/user-data/outputs/BlueShift_Backend_Documentation.docx', buf);
  console.log('Done');
});
