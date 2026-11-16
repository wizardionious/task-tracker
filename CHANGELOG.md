# Changelog

## 1.0.0 — 2026-11-16

The first release of Task Tracker, a learning project for managing a personal task list.

### Features

- Create tasks with **Add task**. New tasks start as **New task**, with the name
  selected and ready to edit.
- Rename tasks inline. **Enter** or leaving the input saves changes; **Escape**
  cancels editing. Names are trimmed, and empty names are rejected.
- Mark tasks as complete using the checkbox or task name.
- Browse **My tasks**, **Completed**, and **Trash**, with task counts in the navigation.
- Move tasks to Trash, restore them with their previous completion status, or
  delete them permanently from Trash.
- View empty states and animated list updates.
- Use a sidebar on desktop and fixed bottom navigation on screens up to 640 px.
  The **Add task** button sits above the bottom navigation, which stays in place
  while tasks appear.

### Known limitations

- Tasks are stored in memory. Reloading the page or closing the tab clears all
  tasks, including Trash.
- Persistent storage, synchronization, and user accounts are not implemented yet.
- An automated test suite is not configured yet.

See [README.md](README.md) for setup, commands, and deployment instructions.
