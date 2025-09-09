# GharExpress

GharExpress is a web application for listing and browsing rental properties. Built with Node.js, Express, MongoDB, and EJS, it demonstrates CRUD operations, RESTful routing, and server-side rendering.

---

## 🚀 Features

- View all property listings
- Create new listings
- Edit existing listings
- Delete listings
- Leave and manage reviews for listings
- Responsive UI with Bootstrap 5
- Data stored in MongoDB
- Server-side rendering with EJS & ejs-mate
- RESTful API design
- Flash messages for user feedback

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS & ejs-mate
- Bootstrap 5
- Joi (validation)

---

## 📦 Project Structure

```
GharExpress/
├── .git/
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── schema.js
├── .env
├── .gitignore
├── controllers/
│   ├── listingControllers.js
│   ├── reviewControllers.js
│   └── userControllers.js
├── init/
│   ├── index.js
│   └── sampleData.js
├── models/
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── public/
│   ├── favicon.svg
│   ├── css/
│   │   ├── style.css
│   │   └── rating.css
│   └── js/
│       └── script.js
├── routes/
│   ├── listingRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── ExpressError.js
│   ├── middlewares.js
│   └── wrapAsync.js
├── views/
│   ├── error/
│   │   └── error.ejs
│   ├── includes/
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── flash.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory to store environment variables such as your MongoDB URI and session secret. Example:

```
MONGODB_URI=mongodb://localhost:27017/gharexpress
SESSION_SECRET=your_secret_key
```

---

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone git@github.com:developershivam-sudo/GharExpress.git
    cd GharExpress
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start MongoDB locally** (default port 27017).
4. **(Optional) Seed the database with sample data:**
    ```bash
    node init/index.js
    ```
5. **Start the application:**
    ```bash
    node app.js
    ```
6. **Visit the app:**
    [http://localhost:8080](http://localhost:8080)

---

## 💡 Usage

- **Home Page:** View all listings.
- **Add New Listing:** Click "Add New Listing" in the navbar to create a new property.
- **Edit/Delete:** On a listing's detail page, use the Edit or Delete buttons.
- **Reviews:** Leave reviews for listings and manage them.

---

## 📝 API Endpoints

### Listings
- `GET /listings` — View all listings
- `GET /listings/new` — Render form to create a new listing
- `POST /listings/create` — Create a new listing
- `GET /listings/:id` — View details of a listing
- `GET /listings/:id/edit` — Edit a listing
- `PUT /listings/:id` — Update a listing
- `DELETE /listings/:id` — Delete a listing

### Reviews
- `POST /listings/:id/reviews` — Add a review to a listing
- `DELETE /listings/:id/reviews/:reviewId` — Delete a review

---

## 🧪 Validation

- **Server-side validation:** Implemented using Joi schemas for listings and reviews.
- **Client-side validation:** Bootstrap validation for forms.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**SHIVAM**

---
