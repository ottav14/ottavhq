const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

const PORT = 4000;

const httpServer = http.createServer(app);

app.use(express.static('public'));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start web server
app.listen(PORT, () => {
	console.log(`http server running on http://localhost:${PORT}`);
});
