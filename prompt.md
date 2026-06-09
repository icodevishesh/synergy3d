1. Build a shared `YouTubeEmbed` component
2. Create `/admin/*` pages with forms to add/manage content
3. Build REST API routes for each section
4. Replace all hardcoded frontend data with dynamic fetches — without changing any existing design or layout

---

### Shared Component — `YouTubeEmbed`

Create `components/YouTubeEmbed.tsx`:

```ts
// Props
interface YouTubeEmbedProps {
  id: string; // YouTube video ID (not full URL)
  title?: string; // for iframe accessibility
  className?: string; // optional wrapper class override
  autoplay?: boolean;
}
```

- Renders a responsive 16:9 iframe embed using `https://www.youtube.com/embed/{id}`
- Used across Talks, Education, Webinars (recorded), and Customers pages
- Support lazy loading (`loading="lazy"`)

---

### `/admin/talks` — Talks Management

**Admin form fields:**

| Field           | Type    | Notes                                                               |
| --------------- | ------- | ------------------------------------------------------------------- |
| `youtubeId`     | string  | YouTube video ID only (not full URL)                                |
| `episodeNumber` | number  | e.g. EP 01                                                          |
| `title`         | string  |                                                                     |
| `description`   | string  | textarea                                                            |
| `category`      | select  | e.g. "Strategy", "Branding", "Growth" — admin can define categories |
| `docName`       | string  | Referenced document name (optional)                                 |
| `duration`      | string  | e.g. "12:34"                                                        |
| `published`     | boolean | Toggle to show/hide on frontend                                     |

**API routes:**

- `GET /api/talks` — returns all published talks (sorted by episodeNumber desc)
- `POST /api/admin/talks` — create
- `PUT /api/admin/talks/:id` — update
- `DELETE /api/admin/talks/:id` — delete
- `PATCH /api/admin/talks/:id/publish` — toggle published

**Frontend update:** Replace hardcoded talks cards/grid with data fetched from `GET /api/talks`. Map each item to the existing card component, passing `youtubeId` to `YouTubeEmbed`. Do not change card design.

---

### `/admin/education` — Education Management

Same schema as Talks **except**: no `episodeNumber`, no `docName`.

| Field         | Type      | Notes         |
| ------------- | --------- | ------------- |
| `youtubeId`   | string    |               |
| `title`       | string    |               |
| `description` | string    |               |
| `category`    | select    | admin-defined |
| `duration`    | string    | e.g. "08:45"  |
| `published`   | boolean   |               |
| `createdAt`   | timestamp | auto-set      |

**API routes:** Same pattern as Talks (`/api/education`, `/api/admin/education`).

**Frontend update:** Fetch from `GET /api/education?sort=latest`. Render latest/newest videos first (sort by `createdAt` desc). Replace hardcoded data only — keep existing card/grid layout intact.

---

### `/admin/webinars` — Webinars Management

**Admin form fields:**

| Field          | Type     | Notes                                    |
| -------------- | -------- | ---------------------------------------- |
| `youtubeUrl`   | string   | Full YouTube URL (for recorded sessions) |
| `category`     | select   | `"recorded"` or `"upcoming"`             |
| `title`        | string   |                                          |
| `description`  | string   |                                          |
| `date`         | date     |                                          |
| `time`         | time     |                                          |
| `duration`     | string   | e.g. "1hr 30min"                         |
| `speakerName`  | string   |                                          |
| `speakerImage` | file/url | Upload or URL                            |
| `published`    | boolean  |                                          |

**Banner & stats (editable from admin):**

Store these as a single settings document:

```ts
{
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImageUrl: string;
  totalSessions: number; // shown as stat
  totalRegistrations: number; // shown as stat (auto-incremented or manual override)
}
```

Admin `/admin/webinars` page has a separate "Edit Banner & Stats" section at the top.

**Registration flow (upcoming sessions):**

- Card CTA: "Register" button
- Opens a modal/drawer with form:
  - Name (required)
  - Email (required)
  - WhatsApp Number (required)
- On submit: `POST /api/webinars/:id/register` — saves registration, increments `totalRegistrations`

**API routes:**

- `GET /api/webinars` — all published (recorded + upcoming)
- `GET /api/webinars?category=upcoming`
- `GET /api/webinars?category=recorded`
- `POST /api/admin/webinars` — create
- `PUT /api/admin/webinars/:id` — update
- `DELETE /api/admin/webinars/:id` — delete
- `POST /api/webinars/:id/register` — register for upcoming session
- `GET/PUT /api/admin/webinars/settings` — banner & stats

**Frontend update:**

- Recorded cards: show "Watch Now" → opens YouTube URL in new tab
- Upcoming cards: show "Register" → opens registration modal
- Banner section: fetch from `/api/admin/webinars/settings`
- Session count & registration count: fetched from settings document

---

### `/admin/customers` — Customer Stories Management

**Admin form fields:**

| Field                | Type     | Notes                                     |
| -------------------- | -------- | ----------------------------------------- |
| `youtubeId`          | string   | YouTube video ID                          |
| `title`              | string   |                                           |
| `description`        | string   |                                           |
| `category`           | select   | admin-defined (e.g. "E-commerce", "SaaS") |
| `customerName`       | string   |                                           |
| `customerImage`      | file/url |                                           |
| `location`           | string   | e.g. "Mumbai, India"                      |
| `published`          | boolean  |                                           |
| `featuredOnHomepage` | boolean  | Max 3 allowed simultaneously              |

**Partners section:**

Separate sub-section in `/admin/customers`:

- Add partner: `name`, `logoUrl`, `websiteUrl`
- List/reorder/delete partners
- All active partners render in the "From Our Partners" section on frontend

**Homepage featured logic:**

- Admin can toggle `featuredOnHomepage` on any customer story
- Enforce max 3: if a 4th is toggled on, show an error — "Deselect another story first"
- `GET /api/customers/featured` returns exactly 3 featured stories for homepage

**API routes:**

- `GET /api/customers` — all published customer stories
- `GET /api/customers/featured` — the 3 homepage-featured stories
- `POST/PUT/DELETE /api/admin/customers/:id`
- `PATCH /api/admin/customers/:id/feature` — toggle featuredOnHomepage
- `GET /api/admin/customers/partners` — all partners
- `POST /api/admin/customers/partners` — add partner
- `DELETE /api/admin/customers/partners/:id` — remove partner

**Frontend update:**

- Customer story cards: fetch from `GET /api/customers`
- Homepage customer section: fetch from `GET /api/customers/featured`
- Partners section: fetch from `GET /api/admin/customers/partners`
- Pass `youtubeId` to `YouTubeEmbed` in story cards

---

### General Admin UI Requirements

- All admin pages sit under `/admin/*` and are protected (redirect to `/login` if unauthenticated)
- Each admin page has: a data table listing existing entries + an "Add New" button that opens a form (modal or side panel)
- Table rows have Edit and Delete actions
- Show loading/error states on all fetches
- Use `react-hook-form` + `zod` for form validation
- Image uploads: use a URL input field (or integrate with an existing storage solution like Cloudinary/S3 — specify which)
- Toast notifications on success/error (e.g. `react-hot-toast`)

---

### Implementation Order

1. Database models / schema for all 4 sections + settings
2. `YouTubeEmbed` component
3. API routes (CRUD for each section)
4. Admin UI pages
5. Frontend data fetching (replace hardcoded data section by section)

---

- **Data schemas defined explicitly** so there's no guessing what fields mean
- **API routes fully named** with HTTP methods and filter params
- **Edge cases handled** (max 3 featured, registration counter, category filtering)
- **Implementation order** to avoid blocking dependencies
- **Tech stack anchored** (react-hook-form, zod, toast, next-auth)
- **YouTubeEmbed props typed** so it's built once and used correctly everywhere
