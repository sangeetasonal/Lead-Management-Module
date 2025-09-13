# 📋 Lead Management Module (Full Stack)

## 🚀 Overview

A simple **Lead Management System** to capture, view, and manage leads. Built with **React + Tailwind CSS** for frontend and **Node.js + Express + MongoDB** for backend. This project demonstrates **UI/UX**, **form validation**, **API integration**, and **database modeling** for full-stack development.

---

## 🌟 Features

### Frontend Features (React + Tailwind)

* 🎨 Modern and responsive UI with **Tailwind CSS**
* 🔍 Search leads by name, phone, status, qualification, interest, source, or assigned person
* 🏷️ Filter leads by status
* ✏️ Add/Edit leads with **form validation**
* 🗑️ Delete leads with confirmation
* 🔀 Sort leads by any column (name, status, date, etc.)
* 📄 Pagination (10 leads per page) with **Prev/Next** & numbered page navigation
* ⚡ Smooth transitions and hover effects
* 🖥️ Fully responsive layout

### Backend Features (Node.js + Express + MongoDB)

* 📦 RESTful API for `Lead` CRUD operations:

  * `POST /lead` → Create lead
  * `GET /lead` → Fetch all leads
  * `GET /lead/:id` → Fetch single lead
  * `PUT /lead/:id` → Update lead
  * `DELETE /lead/:id` → Delete lead
* 🛠️ Controller-based architecture
* 📜 MongoDB schema for lead management
* 🔄 Fully connected with frontend for seamless data flow

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Frontend  | React, Tailwind CSS, Axios          |
| Backend   | Node.js, Express, MongoDB, Mongoose |


---

## ⚡ Setup Instructions

### 1️⃣ Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGODB=<your_mongo_connection_string>
```

Start the server:

```bash
npm start
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/lead`     | Create a new lead |
| GET    | `/lead`     | Get all leads     |
| GET    | `/lead/:id` | Get lead by ID    |
| PUT    | `/lead/:id` | Update lead       |
| DELETE | `/lead/:id` | Delete lead       |

---

## 📝 Usage

1. Click **Add Lead** to create a new lead.
2. Use the **Filters** panel to view leads by status.
3. Click **Edit** ✏️ or **Delete** 🗑️ to manage leads.
4. Navigate through pages using pagination controls.
5. Sort leads by clicking on column headers.

---
