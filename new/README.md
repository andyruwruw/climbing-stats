# Climbing Stats

Climbing stats will be a Vue.js app that will display stats about a climber, including their session history, tick list and other climbing related statistics. 

## Inspiration

The inspiration is a spreadsheet I maintain for myself about my climbing sessions.

In my spreadsheet, I track every session with the following information:

- Date
- Starting Time
- Ending Time
- Location (Outdoor or Indoor Gym)
- Various sub-areas visited (for outdoor sessions)
- What state the location is in (US states or countries)
- Whether I bouldered (boolean)
- Wehther I rope climbed (boolean)
- Whether the area is outdoors or indoors
- My top indoor grade at the time (over all sessions)
- My top outdoor grade at the time (over all sessions)
- The max grade I climbed during the session
- Notes about the session
- Links to media from the session (photos, videos, etc.)
- Climbing partners during the session (comma separated names)
- Who I drove with (comma separated names)
- How long the drive was (in hours)

This data allows me to track total summations such as how many hours I've bouldered, how many hours I've roped climbed, how many sessions I've had, how many different locations I've climbed at, etc.

I can generate a leaderboard showing my top locations by hours, by sessions and how many hours per session. I can do the same with states and countries.

I can also generate a leaderboard of my top climbing partners, showing how many hours, how many sessions, how many oudoor hours, when I first met them, how many days since, and much time on average we've climbed together since I met them.

In addition to tracking sessions, I track outdoor climbs I try and my progress on them.

In this list of outdoor climbs I track:

- Date
- Type of climb (boulder / route)
- Name
- Location
- State / Country
- Sub-Area
- Wall / Boulder it's on
- A link to mountain project or link to another climbing site
- Grade
- Danger of the climb (PG-13, R, X or nothing)
- Status of the climb (Attempted, Success, Failed, etc.)
- Protection used (pads, bolts, top roped, traditional, none)
- Notes (usually beta)
- Rating of the climb (1-5)
- How it felt (easy, impossible and everything in between)
- And what I think the grade should be (sometimes empty)

This data allows me to track my progress on outdoor climbs, and see how many climbs I've done, how many I've failed, how many I've succeeded at, and how many I've attempted.

I can create a pyramid of my grades climbed, and show timelines. I can show my longest projects and show how many sessions I've had on any given grade.

The status of a climb can be:

- Sent
- Attempt
- Flash
- Onsight
- Lead
- Top Roped
- Trad. Lead
- Day Flash
- Hung
- Followed
- Touched
- Trad. Followed
- Trad. Cleaned
- Aid
- Trad. Simul

## Reason for the app

My spreadsheet is too large, and crashes on my phone. I want to create more interesting graphs and charts. And having a leaderboard online for my friends to see is fun. I'd love to be able to add more media to each session, and have better links with Mountain Project and other climbing sites.

## Frontend

The frontend will be a Vue.js app using the Vuetify library for the UI. The UI will be minimal and clean, with a focus on data visualization. The code will be written with the best modern JavaScript practices and will be well documented. The code should be organized professionally.

The frontend will use axios to communicate with the backend, and d3.js for data visualization. It should be able to show charts, timelines and graphs of relevant data.

The app should use Vuex for state management.

The project should be structured like so:

- client/
  - src/
    - components/
      - General components shared by various views.
    - router/
    - store/
      - modules/
        - Various Vuex modules
    - views/
      - Folder separated pages. Each page has a <name>.vue file and a separate folder for it's unique components.
    - App.vue
    - main.ts

## Backend

The intent is to use a serverless backend with MongoDB for persistence. The backend will be written in Typescript using the latest Node.js and Express. The code will be well documented and organized professionally. The server should be able to take CSV of my spreadsheet and import the data.

The backend should ensure security through:

- JWT-based authentication
- Role-based access control
- Resource ownership validation

The backend will be separated into layers described below with their own folder:

- Handler Layer
  - Handle HTTP interactions.
  - Parsing requests and passing parameters to the service layer, and sending back responses.
  - Uses abstraction and a base class.
- Validation Layer
  - Validates input data
  - Checks entity relationships
- Service Layer
  - Handles business logic and working with the database layer.
  - Enforce business rules
  - Operation validation
  - Uses abstraction and a base class.
- Database Layer
  - Abstract database operation, giving clean interface for data access.
  - Provides importable data access bojects for each table.
  - Executes database queries
  - Uses abstraction and a base class.
  - Handles database errors

All items should include timestamps.

## Desired Features

Allow users to sign up and login, creating a profile.

## Schema

Here's a set of enums:
- AttemptStatus: 'attempt', 'hung', 'flash', 'send', 'day-flash', 'onsight', 'project', 'touch', 'unknown'
- Protection: 'pads', 'bolts', 'top-rope', 'traditional', 'none', 'water', 'parachute', 'net'
- ClimbingActivities: 'sport', 'top-rope', 'traditional', 'boulder', 'followed', 'ice', 'mixed', 'alpine', 'aid', 'free-solo', 'speed', 'deep-water-solo', 'free-base'
- GradingSystem: 'v-scale', 'yosemite-decimal-system', 'french', 'font', 'uiaa', 'bmc-traditional-grading', 'australian', 'circuit-grading', 'everything-v3'
- Color: 'Yellow', 'Green', 'Teal', 'Blue', 'Purple', 'Pink', 'Red', 'Orange', 'White', 'Black'
- RockType: 'boulder', 'wall'
- UploadType: 'none', 'sound', 'image'
- MediaType: 'image', 'youtube', 'instagram', 'website', 'drive'
- ChartInterval: 'all', 'week', 'month', 'quarter', 'year'
- ChartPeriod: 'daily', 'few-days', 'weekly', 'monthly', 'yearly'
- Gender: 'man', 'woman', 'non-binary', 'agender', 'unknown'
- Privacy: 'private', 'public', 'unlisted'

Here's a set of looser types in typescript:

```
type ClimbingGrade = 'VB'
| `everything-v3-${number}`
| 'V-Easy'
| `V${number}`
| `V${number}+`
| `V${number}-`
| `V${number}-${number}`
| `V?`
| `${string}${number}`
| `${string}${number}+`
| `${string}${number}-`
| `${number}.${number}${string}`
| `${number}.${number}${string}/${string}`
| `${number}.${number}`
| `${number}.${number}+`
| `${number}.${number}-`
| `${number}.?`
| 'S'
| 'HS'
| 'VS'
| 'HVS'
| `E${number}`
| `E${number} ${number}${string}`
| `A${number}`
| `A${number}+`
| `A${number}-`
| `A/C${number}`
| `A/C${number}+`
| `A/C${number}-`
| `M${number}`
| `WI ${number}`
| `${string} ${Color}`
| number
| string;
```

```
type RouteDanger = ''
| 'PG-13'
| 'R'
| 'X'
| number
| string;
```

```
interface GradeSuggestions {
  /**
   * Names for unofficial sources.
   */
  [key: string]: ClimbingGrade | undefined;

  /**
   * Mountain Project link.
   */
  mountainProject?: ClimbingGrade;

  /**
   * Website.
   */
  website?: ClimbingGrade;

  /**
   * 8a link.
   */
  eightA?: ClimbingGrade;

  /**
   * Sendage link.
   */
  sendage?: ClimbingGrade;
}
```

```
interface DangerSuggestions {
  /**
   * Names for unofficial sources.
   */
  [key: string]: RouteDanger | undefined;

  /**
   * Mountain Project link.
   */
  moutainProject?: RouteDanger;

  /**
   * Website.
   */
  website?: RouteDanger;

  /**
   * 8a link.
   */
  eightA?: RouteDanger;

  /**
   * Sendage link.
   */
  sendage?: RouteDanger;
}
```

The database should hold the following entities:

- Tick
  - id: string
  - user: string
  - route: string
  - type: ClimbingActivities
  - status: AttemptStatus
  - sent: boolean
  - protection: Protection
  - date: number
  - description: string
  - attempts: number
  - laps: number
  - media: string[]
  - feature: boolean
  - grade: ClimbingGrade

- Location
  - id: string
  - name: string
  - officiallyNamed: boolean
  - altNames: string[]
  - outdoors: boolean
  - image: string
  - country: string
  - state: string
  - locale: string
  - color: string
  - address: string
  - hrefs: ExternalHref
  - updated: number
  - submitted: string
  - activities: ClimbingActivities[]
  - private: boolean
  - privateName: boolean
  - privateLocation: boolean
  - media: string[]

- Area
  - id: string
  - location: string
  - name: string
  - officiallyNamed: boolean
  - altNames: string[]
  - image: string
  - hrefs: ExternalHref
  - updated: number
  - submitted: string
  - activities: ClimbingActivities[]
  - private: boolean
  - privateName: boolean
  - privateLocation: boolean
  - media: string[]

- Rock
  - id: string
  - location: string
  - area: string
  - name: string
  - officiallyNamed: boolean
  - altNames: string[]
  - type: RockType
  - activities: ClimbingActivities[]
  - image: string
  - hrefs: ExternalHref
  - updated: number
  - submitted: string
  - private: boolean
  - privateName: boolean
  - privateLocation: boolean
  - media: string[]

- Route
  - id: string
  - type: ClimbingActivities
  - location: string
  - area: string
  - rock: string
  - name: string
  - officiallyNamed: boolean
  - altNames: string[]
  - image: string
  - hrefs: ExternalHref
  - media: string[]
  - grade: GradeSuggestions
  - private: boolean
  - privateName: boolean
  - privateLocation: boolean
  - danger: DangerSuggestions
  - updated: number
  - submitted: string
  
- Session
  - id: string
  - user: string
  - location: string
  - areas: string[]
  - outdoors: boolean
  - date: number
  - start: number
  - end: number
  - duration: number
  - activities: ClimbingActivities[]
  - description: string
  - felt: number
  - partners: string[]
  - activeCal: number
  - totalCal: number
  - heart: number
  - lowHeart: number
  - highHeart: number
  - carpool: string[]
  - drive: number
  - media: string[]
  - sent: ClimbingGrade[]

- User
  - id: string
  - username: string
  - password: string
  - displayName: string
  - image: string
  - hrefs: ExternalHref
  - age: number
  - gender: Gender
  - locale: string
  - state: string
  - country: string
  - created: number
  - points: number
  - admin: boolean
  - profilePrivacy: Privacy
  - localePrivacy: Privacy
  - agePrivacy: Privacy
  - ticksPrivacy: Privacy
  - sessionsPrivacy: Privacy
  - partnersPrivacy: Privacy
  - pyramidPrivacy: Privacy
  - mapPrivacy: Privacy
  - boulderingGrades: GradingSystem
  - routeGrades: GradingSystem

- ClimbingPartner
  - user: string
  - first: string
  - last: string
  - hoursRank: number
  - hours: number
  - hoursBy: number
  - outdoorHoursRank: number
  - outdoorHours: number
  - sessionsRank: number
  - sessions: number
  - outdoorSessionsRank: number
  - outdoorSessions: number
  - outdoorPercent: number
  - met: string
  - metDate: number
  - droveRank: number
  - drove: number
  - hide: boolean

## Project Structure

The project is divided into two main parts:

### Client (Vue.js Frontend)

Located in the `client` directory:
- `src/components/` - Reusable Vue components
- `src/router/` - Vue Router configuration
- `src/store/` - Vuex store modules
- `src/views/` - Page components
- `src/App.vue` - Root component
- `src/main.ts` - Application entry point

### Server (Node.js Backend)

Located in the `server` directory:
- `src/handlers/` - HTTP request handlers
- `src/validation/` - Input validation logic
- `src/services/` - Business logic layer
- `src/database/` - Database access layer
- `src/index.ts` - Server entry point

## Setup Instructions

### Client Setup
```bash
cd client
npm install
npm run serve
```

### Server Setup
```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/climbing-stats
JWT_SECRET=your_jwt_secret_here
```

## Technologies Used

- Frontend:
  - Vue.js 3
  - TypeScript
  - Vuetify
  - Vue Router
  - Vuex
  - D3.js for data visualization
  - Axios for API calls

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB with Mongoose
  - JWT for authentication

## Style

Break down imports into:

// Packages

// Local Imports

// Types

Always use semicolons.
Use single quotes for strings.
Always use trailing commas.
Use SCSS modules instead of scoped SCSS in .vue files.
