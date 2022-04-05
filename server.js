const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http')

const routes = require('./controllers')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const server = http.createServer(app)
const io = require('socket.io')(server) //for messaging
const messaging = require('./controllers/messaging-route')

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
// app.use("/node_modules", express.static(__dirname + "/node_modules"));
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/', messaging)

//app.use(routes);

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});

io.on('connection', socket => {      //for messaging
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', message)
  })
})