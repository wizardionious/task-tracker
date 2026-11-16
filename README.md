# Task Tracker

Version 1.0.0 — a learning project for managing a personal task list, built with Vue 3 and TypeScript.

See the [release notes](CHANGELOG.md) for features and known limitations.

## Features

- Create tasks with **Add task**. Each new task starts as **New task**, with its
  name selected and ready to edit.
- Rename tasks: **Enter** or leaving the input saves changes; **Escape** cancels
  editing. Leading and trailing whitespace is removed, and empty names are rejected.
- Mark tasks as complete using the checkbox or task name.
- Move tasks to Trash, restore them, or delete them permanently.
- View task counts in the navigation and empty states for each list.
- Use bottom navigation on screens up to 640 px wide.

## Pages

| Path           | Page      | Tasks                              |
| -------------- | --------- | ---------------------------------- |
| `/#/`          | My tasks  | Active, incomplete tasks           |
| `/#/completed` | Completed | Completed tasks                    |
| `/#/trash`     | Trash     | Deleted tasks that can be restored |

Restoring a task returns it to **My tasks** or **Completed**, depending on its
completion status. Permanent deletion is available in **Trash**.

## Data storage

In v1.0.0, tasks are held in memory through Pinia. Navigating between pages keeps
the current list, but reloading the page or closing the tab resets all tasks,
including Trash.

Persistent storage, synchronization, and user accounts are not implemented yet.

## Tech stack

Vue 3 with the Composition API and `<script setup>`, TypeScript, Pinia,
Vue Router, SCSS, and Vite. Code checks use vue-tsc, ESLint, Oxlint, and Prettier.

## Getting started

Requires Node.js `^22.18.0 || >=24.12.0` and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by Vite, usually `http://localhost:5173/task-tracker/`.

## Commands

| Command           | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `pnpm dev`        | Start the development server               |
| `pnpm type-check` | Check TypeScript and Vue types             |
| `pnpm build`      | Check types and build into `dist/`         |
| `pnpm preview`    | Preview the production build locally       |
| `pnpm lint`       | Run ESLint and Oxlint with automatic fixes |
| `pnpm format`     | Format files in `src/` with Prettier       |

An automated test suite is not configured yet.

## Deployment

The app is configured for GitHub Pages at
[wizardionious.github.io/task-tracker/](https://wizardionious.github.io/task-tracker/).

In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the app
on pushes to `main`. It can also be started manually from the **Actions** tab.

Vite uses `/task-tracker/` as the base path. Vue Router uses hash routing, so
direct links such as `/task-tracker/#/completed` work without a server-side
fallback. For another hosting path, update `base` in `vite.config.ts`.

To preview a production build locally, run `pnpm build`, then `pnpm preview`.
