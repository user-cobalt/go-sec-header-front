# GoNgHttpScanner
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



File Changes
=======================

scan-result.model.ts
  - HeaderDetail: added description field
  - ScanResult: added scannedAt field

environment.ts (new)
  - apiUrl: http://localhost:8080
  - apiKey: change-me

environment.prod.ts (new)
  - apiUrl: CLOUD_RUN_URL (replace after deploy)
  - apiKey: injected at build time

scanner.service.ts
  - API URL and key now read from environment.ts
  - X-API-Key header sent on every request
  - encodeURIComponent added to scan target
  - getHistory() added — calls GET /history
  - clearHistory() added — calls DELETE /history/clear

app.component.ts
  - Implements OnInit — loads history from backend on startup
  - loadHistory() — fetches from GET /history
  - runScan() — clears results before scan, refreshes history after
  - clearHistory() — calls DELETE /history/clear
  - error state — surfaces 429 as specific rate limit message
  - getFoundCount() / getMissingCount() — summary card helpers
  - formatDate() — formats scannedAt timestamp
  - Removed in-memory history deduplication logic

app.component.html
  - Navbar: brand name and tagline replacing placeholder TEXT
  - Search bar: search icon, disables during scan
  - History button: count badge, highlights when active
  - Error banner: dismissible, rate limit aware
  - History drawer: shows date, score, Clear all button
  - Summary card: passed/flagged counts
  - Header cards: show description and tip separately
  - Empty state added

app.component.scss
  - Full redesign: dark navy theme
  - Consistent design token system
  - Responsive: collapses to single column on mobile
