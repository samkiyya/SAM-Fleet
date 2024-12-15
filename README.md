# SAM-Fleet | Vehicle Management Dashboard

## Overview

The **Vehicle Management Dashboard** is a web application designed for fleet administrators to efficiently manage and monitor vehicles. It provides features such as vehicle status updates, data visualization, and advanced search capabilities. The frontend is developed using **Typed Next.js** with **TailwindCSS** for styling, while the backend utilizes **Node.js** with **Express.js**, following an **MVC architecture**. The database is managed with **MongoDB**, and the app is deployed on **Render**.

---

## Features

### Vehicle Table

- Displays vehicle details: Name, Status, Last Updated.
- Status indicators:

  - **Green**: Active
  - **Yellow**: Under Maintenance
  - **Red**: Inactive

- Sorting by Last Updated, Mileage, or Fuel Level.

### Vehicle Management

- Add new vehicles with details: Name, Type, License Plate, Driver, Mileage, Fuel Level, and Status.
- Update vehicle status in real-time.
- Fetch and display all vehicles.

### Search and Filter

- Search by vehicle name, license plate, or status.
- Filter vehicles by status or type.

### Statistics Dashboard

- Total number of vehicles.
- Percentage of vehicles in Active/Inactive status.
- Average mileage.

### Data Export

- Export vehicle data in **CSV** or **Excel** format.

### Mobile Responsiveness

- Fully responsive design using **TailwindCSS** for seamless experience across devices.

---

## Technologies Used

### Frontend

- **Next.js (Typed)**
- **TailwindCSS**
- **shadcn** for ui elements
- **Axios** for API integration

### Backend

- **Node.js** with **Express.js**
- **MongoDB** for database
- **Mongoose** for object data modeling
- **Dotenv** for environment variable management

### Deployment

- Deployed on **Render** for production-ready hosting.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Git**

### Clone the Repository

```bash
# Clone the repository
$ git clone https://github.com/samkiyya/SAM-Fleet.git

# Navigate to the project directory
$ cd SAM-Fleet
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   $ cd server
   ```

2. Install dependencies:

   ```bash
    $ npm install
   ```

3. Create a `.env` file in the backend directory with the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   ```

4. Start the backend server:

   ```bash
    $ npm start or
    $ npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   $ cd fleet_client
   ```

2. Install dependencies:

   ```bash
   $ npm install
   ```

3. Start the development server:

   ```bash
   $ npm run dev
   ```

4. Open your browser and navigate to:

   ```bash
   $ http://localhost:3000
   ```

---

## Deployment on Render

### Backend Deployment

1. Login to **Render** and create a new **Web Service**.
2. Link the backend repository and configure:
   - **Environment Variables**: Add `MONGO_URI`.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Frontend Deployment

1. Create a new **Static Site** on Render.
2. Link the frontend repository and configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `out`

---

## Project Structure

```bash

vehicle-management-dashboard/
├── server/                # Backend (Node.js/Express)
│   ├── controllers/       # Controllers for API endpoints
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
│
├── fleet_client/          # Frontend (Typed Next.js)
│   ├── components/        # Reusable UI components
│   ├── app/               # Next.js pages
│   ├── public/            # Static assets
│   ├── lib/               # api midlewares
│   ├── types              # typescript interface for car
│   ├── context/           # context of the app
│   ├──.next/              # static outputs of the build for frontend
│   └── tsconfig.json      # TypeScript configuration
└── README.md              # Project documentation
```

---

## Future Enhancements

- Real-time updates with WebSockets.
- Notifications for maintenance schedules.
- Predictive analytics for vehicle maintenance.
- Companion mobile app with React Native.
- Role based access | user management ...

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## Contact

For questions or feedback, reach out at:

- **Email**: [samuelabera523@gmail.com](mailto:samuelabera523@gmail.com)

- **GitHub**: [samkiyya](https://github.com/samkiyya)
