# 🌐 Raintor Frontend Developer Technical Assessment

This repository contains solutions to **Task 2: Real-Time Location Sharing** and **Task 3: Infinite Scroll User Feed** for the Raintor Frontend Developer role (Next.js/React-based assessment).

## 📁 Folder Structure

```
raintor-assessment/
├── task-2-signalr/        # Real-time location sharing using SignalR
├── task-3-infinite-feed/  # Infinite scroll user feed from API
```

---

## ✅ Completed Tasks

- ✅ **Task 2**: Real-Time Location Sharing
- ✅ **Task 3**: Infinite Scroll User Feed

---

## ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/raintor-assessment.git
cd raintor-assessment
```

2. **Install Dependencies**

Each task has its own folder. For example:

```bash
cd task-2-signalr
npm install
npm run dev
```

Repeat the same for `task-3-infinite-feed`.


---

## 🛠 Framework & Tools Used

- **React.js**
- **SignalR Client (WebSocket)**
- **Leaflet.js** (Map Rendering)
- **React Query** (Data Fetching)
- **Intersection Observer API** (Infinite Scroll)
- **React Icons** (UI)


---

## ⚡ Features

### 🛰 Task 2: Real-Time Location Sharing

- SignalR WebSocket setup using custom `useSignalR()` hook
- Simulates User A sending coordinates
- Displays live updates on a Leaflet map for User B
- Smooth animated transitions & responsive UI

### 🧑‍💼 Task 3: Infinite Scroll User Feed

- Dynamic API fetching with pagination
- Virtualized infinite scroll using Intersection Observer
- Clean user card component with dark mode support
- Loading spinner, empty state & error fallback

---

## ⚠️ Limitations / Tradeoffs

- Real location data for Task 2 was simulated using hardcoded coordinates for test purposes.
- Did not implement `react-window` due to low user count in demo API, but used Intersection   Observer for smooth UX.
- TypeScript was not used due to time constraint, though structure supports migration.

---

## 👩‍💻 Author

**Noorjahan Akter**  
Frontend Developer | MERN Stack Enthusiast  
