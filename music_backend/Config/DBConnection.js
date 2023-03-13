const mongoose = require('mongoose');

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
});

db.once("open", () => {
    console.log(`Connected to the database: ${db.name}`);
});