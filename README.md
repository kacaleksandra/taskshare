<h1 align="center">📚 TaskShare</h1>
 
<p align="center">
  <img src="https://socialify.git.ci/kacaleksandra/taskshare/image?description=1&descriptionEditable=Empower%20your%20classroom%20with%20TaskShare!%20%F0%9F%9A%80&font=Inter&language=1&name=1&owner=1&pattern=Solid&pulls=1&theme=Dark" alt="TaskShare" width="640">
</p>

<p align="center">
  <b>Transform file sharing in education.</b><br>
  A course platform where teachers create courses & assignments and students submit their work - all in one place. 💼📚
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/Zustand-state-brown" alt="Zustand">
</p>

---

## 🎓 About the project

> **This is an academic project**, built for the **Modern Web Applications** course (_Współczesne aplikacje webowe_, 2023/2024). It was developed by a four-person team split into a **front-end** and a **back-end** squad, using Git & GitHub for version control and collaboration.

**TaskShare** is a system for easily sharing files, projects, and tasks within selected courses. Teachers can create dedicated courses that students can request to join; once approved, students can submit files as solutions to the assignments inside that course.

This repository contains the **front-end** of the application. The back-end (ASP.NET Core + MariaDB) lives in a separate repository.

- 🖥️ **Front-end:** https://github.com/kacaleksandra/taskshare
- ⚙️ **Back-end:** https://github.com/Avenek/taskshare_api

---

## ✨ Features

TaskShare ships with a full **registration & login** flow and a **role-based** experience split between teachers and students.

### 🧑‍🏫 As a teacher, you can…

- ✅ Create, edit, and delete **courses**
- ✅ Create, edit, and delete **assignments** within a course
- ✅ Manage course participants - **accept** or **remove** students
- ✅ Review and **download** the solutions submitted by students

### 🎒 As a student, you can…

- ✅ Search & browse all courses on the platform
- ✅ Request to **join a course** (subject to teacher approval)
- ✅ Track your **pending** and **enrolled** repositories
- ✅ Submit and edit **files** for assignments

> 🔐 New teacher accounts start in a *waiting-for-approval* state — teacher privileges are unlocked once the account is confirmed.

---

## 🖼️ Screenshots

<table>
  <tr>
    <td width="50%"><b>Landing page</b><br><img src="docs/screenshots/landing-page.png" alt="Landing page"></td>
    <td width="50%"><b>Sign up</b><br><img src="docs/screenshots/register.png" alt="Registration"></td>
  </tr>
  <tr>
    <td><b>Sign in</b><br><img src="docs/screenshots/login.png" alt="Login"></td>
    <td><b>Teacher — waiting for approval</b><br><img src="docs/screenshots/teacher-approval-waiting.png" alt="Waiting for approval"></td>
  </tr>
</table>

<details>
<summary><b>🧑‍🏫 More teacher screens</b> (click to expand)</summary>

<table>
  <tr>
    <td width="50%"><b>Create a new course</b><br><img src="docs/screenshots/teacher-create-course.png" alt="Create course"></td>
    <td width="50%"><b>Managed courses</b><br><img src="docs/screenshots/teacher-managed-courses.png" alt="Managed courses"></td>
  </tr>
  <tr>
    <td><b>Edit course</b><br><img src="docs/screenshots/teacher-edit-course.png" alt="Edit course"></td>
    <td><b>Delete course confirmation</b><br><img src="docs/screenshots/teacher-delete-course.png" alt="Delete course"></td>
  </tr>
  <tr>
    <td><b>Manage members</b><br><img src="docs/screenshots/teacher-manage-members.png" alt="Manage members"></td>
    <td><b>Create assignment</b><br><img src="docs/screenshots/teacher-create-assignment.png" alt="Create assignment"></td>
  </tr>
  <tr>
    <td><b>Course assignments</b><br><img src="docs/screenshots/teacher-course-assignments.png" alt="Course assignments"></td>
    <td></td>
  </tr>
</table>

</details>

<details>
<summary><b>🎒 More student screens</b> (click to expand)</summary>

<table>
  <tr>
    <td width="50%"><b>All courses + search</b><br><img src="docs/screenshots/student-all-courses-search.png" alt="All courses"></td>
    <td width="50%"><b>My repositories</b><br><img src="docs/screenshots/student-my-repositories.png" alt="My repositories"></td>
  </tr>
  <tr>
    <td><b>Assignments</b><br><img src="docs/screenshots/student-assignments.png" alt="Assignments"></td>
    <td><b>Edit a submission</b><br><img src="docs/screenshots/student-edit-assignment.png" alt="Edit submission"></td>
  </tr>
</table>

</details>

---

## 🛠️ Tech stack

### Front-end (this repo)

| Technology | Why we used it |
| --- | --- |
| **[Next.js 14](https://nextjs.org/)** | Core framework — SSR, dynamic routing & the App Router for fast, well-organized pages |
| **[React 18](https://react.dev/)** + **TypeScript** | Component-driven UI with end-to-end type safety |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling for a consistent, easily tweakable look |
| **[shadcn/ui](https://ui.shadcn.com/)** (Radix UI) | Accessible, customizable UI primitives (dialogs, forms, toasts…) |
| **[Zustand](https://zustand-demo.pmnd.rs/)** | Lightweight global state management |
| **[TanStack Query](https://tanstack.com/query)** | Server-state fetching, caching & synchronization |
| **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** | Performant forms with schema-based validation |
| **[date-fns](https://date-fns.org/)** | Date formatting, parsing & comparison |
| **[Lucide](https://lucide.dev/)** + **[Font Awesome](https://fontawesome.com/)** | Crisp, scalable SVG icons |
| **[react-lottie-player](https://github.com/mifi/react-lottie-player)** | Lottie (JSON) animations for a livelier UI |
| **next-client-cookies**, **clsx**, **tailwind-merge** | Cookie/session handling & dynamic class composition |

Code quality is enforced with **ESLint**, **Prettier** (with import sorting) and **Husky** git hooks.

### Back-end ([separate repo](https://github.com/Avenek/taskshare_api))

Written in **ASP.NET Core (C#)** with a **MariaDB** database, hosted locally via **Docker**. It uses **Entity Framework** (ORM), **JWT Bearer** authentication, **FluentValidation**, **AutoMapper**, and **Swagger** for API exploration, and follows the **Repository / Unit of Work** pattern with resource-based authorization.

---

## 📁 Project structure

```
taskshare/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # sign-in, sign-up, success
│   ├── (teacher)/              # teacher-only zone
│   │   ├── teacher-dashboard/
│   │   ├── teacher-courses/
│   │   ├── manage-members/
│   │   ├── submitted-works/
│   │   └── waiting-for-approval/
│   ├── course/                 # create / edit / view a course
│   ├── assignment/             # create / edit / submit / view assignments
│   ├── dashboard/              # student dashboard
│   ├── mycourses/              # pending & enrolled repositories
│   ├── _components/            # shared components
│   └── _utils/                 # shared helpers
├── ui/                         # shadcn/ui + Lottie assets
├── public/                     # static assets (logo, hero image…)
├── constants.ts                # role ids & pagination sizes
└── middleware.ts               # auth / route protection
```

---

## 🗄️ Database overview

The back-end database models courses and submissions around users and roles. Key entities include:

| Entity | Purpose |
| --- | --- |
| `users`, `roles`, `approval_statuses` | Accounts, roles (Admin / Teacher / Student) and confirmation status |
| `courses` | Courses owned by teachers |
| `course_enrolled_users` / `course_pending_users` | Many-to-many enrollment (approved vs. awaiting approval) |
| `assignments` | Tasks within a course (deadline, visibility, description) |
| `submissions` / `submission_files` | Student submissions and their uploaded files |
| `user_actions` / `user_logs` | Audit log of user actions |
| `black_listed_token` | Revoked JWT tokens |

---

## 🚀 Getting started

### Prerequisites

- **Node.js** (18+) and **npm**
- A running instance of the [TaskShare API](https://github.com/Avenek/taskshare_api)

### Run the front-end

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file and point it at your API
echo "NEXT_PUBLIC_API_URL=http://localhost:<api-port>" > .env

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Handy scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

> ℹ️ To run the back-end, build the Docker image from its `Dockerfile`, bring the stack up with `docker compose up`, import the database schema, then restart the containers. See the [API repository](https://github.com/Avenek/taskshare_api) for full instructions.

---

## 👥 Team

| Name | Role |
| --- | --- |
| **Aleksandra Kacprzak** | Front-end developer |
| **Rafał Maciończyk** | Front-end developer |
| **Jakub Machnik** | Back-end developer |
| **Piotr Karolak** | Back-end developer |

---

<p align="center"><i>Built with ❤️ as a university project · 2023/2024</i></p>
