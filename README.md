# Honda Shokudo - Japanese Restaurant

A modern restaurant website for Honda Shokudo, featuring Western cuisine with a Japanese soul.

## Project Structure

```
honda-shokudo-harmony/
├── backend/
│   ├── package.json
│   ├── index.js (Express server entry with nodemon support)
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── styles/
│       └── App.jsx
├── .gitignore
└── README.md
```

## Features

- **Multi-language Support**: English and Japanese
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Menu**: Lunch and dinner menus with seasonal items
- **Reservation System**: Online table booking with validation
- **Modern UI**: Clean, elegant design inspired by Japanese aesthetics

## Getting Started

### Backend

```bash
cd backend
npm install
nodemon index.js
```

The backend will run on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React, Vite, Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## Development

- Backend runs with nodemon for auto-reloading
- Frontend uses Vite for fast development
- Tailwind CSS for styling
- Responsive design for all devices

## License

MIT
