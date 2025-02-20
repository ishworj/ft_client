# Finance Tracker App - Frontend

## Overview

The Finance Tracker App is a web application designed to help users track their finances, including income, expenses, and overall balance. This frontend is built with React.js and communicates with the backend via RESTful APIs. The app provides users with secure authentication and various features for managing financial transactions and viewing visual reports.

## Features

- **User Authentication**: Secure login and registration system with JWT.
- **Transaction Management**: Add, edit, and delete income and expense transactions.
- **Balance Overview**: View the current balance based on logged income and expenses.
- **Financial Reports**: Visual representation of spending habits through pie charts and line graphs.
- **Responsive UI**: Built with React-Bootstrap for a responsive user experience.

## Technology Stack

- **React.js**: A JavaScript library for building the user interface.
- **Context API**: State management solution for sharing global data like user authentication status.
- **React-Bootstrap**: For responsive design and UI components.
- **Chart.js / Recharts**: Used for rendering visual financial reports (pie charts and line graphs).
- **JWT**: For secure user authentication (handled by the backend).
- **Axios**: For making HTTP requests to the backend API.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/finance-tracker-app-frontend.git
   ```

2. Navigate to the project folder:

   ```bash
   cd finance-tracker-app-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or if you are using Yarn:
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or if you are using Yarn:
   yarn start
   ```

   This will start the frontend application at `http://localhost:3000/`.

## Folder Structure

- **src/**: Contains all source code.
  - **components/**: Reusable UI components (e.g., Header, Footer, etc.)
  - **context/**: Contains Context API providers for managing global state.
  - **pages/**: React components for individual pages (e.g., Dashboard, Transactions).
  - **services/**: API calls to the backend for user authentication and transaction management.
  - **assets/**: Images, icons, or other assets.
  - **styles/**: Custom CSS or SCSS for styling.

## API Endpoints

This frontend communicates with the backend API, which should be running separately. Below are the key endpoints used by the frontend:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: User login and authentication.
- **GET /api/transactions**: Fetch all transactions of the logged-in user.
- **POST /api/transactions**: Add a new transaction.
- **PUT /api/transactions/:id**: Edit an existing transaction.
- **DELETE /api/transactions/:id**: Delete a transaction.

Make sure the backend is deployed and running before using the frontend.

## Deployment

This frontend app is deployed  [Vercel](https://vercel.com/) for production. You can also deploy it manually using a variety of hosting services like AWS or GitHub Pages.

## Testing

To run tests:

yarn dev
```

## Contributing

We welcome contributions to the Finance Tracker App. If you want to contribute, please fork the repo, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any issues or feedback, feel free to open an issue on the repository or contact the team.
