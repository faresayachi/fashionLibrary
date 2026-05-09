# FashionLib TODO

## Backend
- [x] Create backend scaffold under `server/`
- [x] Add `server/package.json` with dependencies and scripts
- [x] Add database config `server/config/db.js`
- [x] Add models `server/models/User.js` and `server/models/Report.js`
- [x] Add middleware `server/middleware/authMiddleware.js` and `server/middleware/adminMiddleware.js`
- [x] Add auth controller and routes
- [x] Add report controller and routes
- [x] Add `server/server.js` entrypoint
- [x] Add `server/.env.example`
- [x] Add uploads placeholder `server/uploads/.gitkeep`
- [x] Install dependencies
- [x] Run server
- [ ] Perform thorough backend API tests (remaining report/admin/private scenarios)
- [ ] Fix issues found in backend testing
- [ ] Final backend verification summary

## Frontend
- [ ] Scaffold `client/` with React + Vite
- [ ] Configure Tailwind + PostCSS + custom FashionLib theme tokens
- [ ] Add router and route pages (Home, Shop, ReportDetail, Login, Register, Dashboard, Admin pages)
- [ ] Add context/services (AuthContext, axios instance, authService, reportService)
- [ ] Build shared components (Navbar, Footer, ReportCard, ProtectedRoute, AdminRoute)
- [ ] Implement Home page sections per design spec
- [ ] Implement Shop and Report detail flows
- [ ] Implement auth pages and dashboard flow
- [ ] Implement admin panel/create/edit report pages
- [ ] Integrate frontend with backend API
- [ ] Run frontend app and perform thorough UI flow testing
- [ ] Fix issues found in frontend testing
- [ ] Final full-stack verification summary
