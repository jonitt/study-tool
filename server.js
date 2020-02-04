//File for serving the frontend files
const path = require('path'),
  cors = require('cors'),
  express = require('express');

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  initiateHeader(res);
  next();
});
app.use(express.static(path.join(__dirname + '/dist/')));

const port = process.env.PORT || 3000;

function initiateHeader(res) {
  res.set({
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  });
  return res;
}

app.listen(port, () =>
  console.log(
    `Listening on port ${port}! Go to http://localhost:${port} to view the app.`
  )
);
