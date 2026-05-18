import { generateResponse } from "../Config/openRouter.js";
import User from "../Models/user.model.js"
import { extractJson } from "../Utils/extractjson.js";
import Website from "../Models/website.model.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

// const masterPrompt = `
// You are a senior frontend engineer and UI/UX designer.

// Create a fully functional, high-end website using ONLY HTML, CSS, and JavaScript.

// USER REQUIREMENT:
// {USER_PROMPT}

// IMPORTANT:
// This must feel like a real working application, not a static website.

// FUNCTIONAL REQUIREMENTS:
// - Use JavaScript for real interactivity
// - Use localStorage or sessionStorage to store and manage data
// - Forms must be fully functional (save, validate, display data)
// - Navigation must work like a real app (SPA style, no reload)
// - Buttons must perform actions (not just UI)
// - Add dynamic content updates using JS

// STRUCTURE:
// - Simulate multiple pages: Home, About, Services, Contact, Dashboard
// - Each page must have different layout and content
// - Dashboard should display stored data (like submitted forms)

// DESIGN:
// - Modern premium UI (startup-level design)
// - Hero section, feature cards, testimonials, stats
// - Call-to-action sections
// - Smooth animations and hover effects
// - Clean spacing and typography

// RESPONSIVE:
// - Fully responsive (mobile-first)
// - Works on all devices
// - No layout breaking

// IMAGES:
// - Use high-quality images from https://images.unsplash.com/
// - Include: ?auto=format&fit=crop&w=1200&q=80

// TECHNICAL:
// - Single HTML file
// - One <style> and one <script>
// - No frameworks or libraries
// - Use Flexbox/Grid

// UX:
// - Active navigation highlight
// - Smooth transitions
// - Loading states (basic)
// - No empty sections

// RETURN ONLY JSON:
// {
//   "message": "Website created successfully",
//   "code": "<full HTML document>"
// }
// `;

export const generatewebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "you have not enough credits to generate a website",
      });
    }

    user.credits += 50;

    const finalprompt = masterPrompt.replace("{USER_PROMPT}", prompt);

    let raw = "";
    let parsed = null;

    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalprompt);
      parsed = await extractJson(raw);

      if (!parsed) {
        raw = await generateResponse(finalprompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed || !parsed.code) {
      return res.status(400).json({
        message: "ai returned invalid response",
      });
    }

    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        { role: "ai", content: parsed.message },
        { role: "user", content: prompt },
      ],
    });

    await user.save();

    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    return res.status(500).json({
      message: `generate website error ${error}`,
    });
  }
};

export const getwebsitebyid = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const website = await Website.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!website) {
      return res.status(404).json({
        message: "website not found",
      });
    }

    return res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({
      message: `get website by id error ${error}`,
    });
  }
};

export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required",
      });
    }

    const website = await Website.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!website) {
      return res.status(404).json({
        message: "website not found",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.credits < 25) {
      return res.status(400).json({
        message: "you have not enough credits to update the website",
      });
    }

    user.credits -= 25;

    const updatePrompt = `
UPDATE THIS HTML WEBSITE.

CURRENT CODE:
${website.latestCode}

USER REQUEST:
${prompt}

RETURN RAW JSON ONLY
{
  "message":"Short confirmation",
  "code":"<UPDATED FULL HTML>"
}
`;

    let raw = "";
    let parsed = null;

    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatePrompt);
      parsed = await extractJson(raw);

      if (!parsed) {
        raw = await generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed || !parsed.code) {
      return res.status(400).json({
        message: "ai returned invalid response",
      });
    }

    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message }
    );

    website.latestCode = parsed.code;

    await website.save();
    await user.save();

    return res.status(201).json({
      message: parsed.message,
      code: parsed.code,
    });
  } catch (error) {
    return res.status(500).json({
      message: `update website error ${error}`,
    });
  }
};

export const getall = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.userId });
    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({
      message: `getall website error ${error}`,
    });
  }
};