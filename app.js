//0615095802 0661913893 0661526060 
// 1ere chose est de raporter les module.
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');

// Bien chaîner les appels aux middlewares
// La biblio pour récupérer les données du formulaire
// Charge le middleware de gestion des paramètres
var bodyParser = require('body-parser');

var swig = require('swig');

// Charge le middleware de sessions
var session = require('cookie-session');

// 2eme chose est 
// On genere deux routeurs (/routes/index.js et /routes/users.js).
// Ces routeurs sont utilisés dans le fichier app.js 
var routes = require('./routes/index');
var users = require('./routes/users');

// 3eme chose est de demarrer l'application
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// 4eme chose est 
// indiquer à Express.js l’utilisation du moteur de template Swig 
// view engine setup
// utilisation du moteur de swig pour les .html
app.engine('html', swig.renderFile);

// utiliser le moteur de template pour les .html 
app.set('view engine', 'html');

// 5eme chose est
// dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Vous pouvez voir qu’il y a deux systèmes de cache pour les vues
// générer. Comme nous sommes en développement, ils sont désactives
// view cache
app.set('view cache', false); // désactivation du cache express
swig.setDefaults({ cache: false }); // désactivation du cache swig

// On utilise les sessions 
// Le paramètre secret envoyé au module de session est obligatoire
// Il permet de sécuriser les cookies de session.
// Envoyez la valeur de votre choix.
// Vous pouvez envoyer d'autres options,
// Comme la durée de vie du cookie de session
// Par défaut la session durera tant que le navigateur reste ouvert
app.use(session({secret: 'todotopsecret'}))

// Configuration pour avoir accès à req.body.nomDuChamp
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

 
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

    if (typeof(session.index1) == 'undefined') {
        session.index1 =[] ;
    }
    if (typeof(session.index2) == 'undefined') {
        session.index2 = [];
    }
    if (typeof(session.index3) == 'undefined') {
        session.index3 =[] ;
    }
    if (typeof(session.index4) == 'undefined') {
        session.index4 = [];
    }
// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log ( "session" + session.index1 ); 
    console.log('Un client est connecté !');
    socket.emit('message', 'Vous êtes bien connecté !');
    socket.on('message1', function ( index) {
        console.log('Un client me parle ! Il me dit : ' + index.index + index.element );
      socket.emit('checkind', index.index );
      if (session.index1.indexOf(index.index) == -1 ) {
      session.index1.push ( index.index );
      session.index2.push ( index.element );
     console.log( "session" + session.index1 );
     console.log( "session" + session.index2 );}
    });	
    socket.on('message3', function ( index) {
        console.log('Un client me parle ! Il me dit : ' + index.index + index.element );
      socket.emit('checkind3', index.index );
      if (session.index3.indexOf(index.index) == -1 ) {
      session.index3.push ( index.index );
      session.index4.push ( index.element );
     console.log( "session" + session.index3 );
     console.log( "session" + session.index4 );}
    });	
    socket.on('message', function ( index) {
        console.log('Un client me parle ! Il me dit : ' + index.index + index.element );
      if (session.index1.indexOf(index.index) != -1 ) {
    session.index1.splice (session.index1.indexOf(index.index), 1);}
      if (session.index2.indexOf(index.element) != -1 ) {
    session.index2.splice (session.index2.indexOf(index.element), 1);}
     console.log( "session" + session.index1 );
     console.log( "session" + session.index2 );
    });	
    socket.on('message4', function ( index) {
        console.log('Un client me parle ! Il me dit : ' + index.index + index.element );
      if (session.index3.indexOf(index.index) != -1 ) {
    session.index3.splice (session.index3.indexOf(index.index), 1);}
      if (session.index4.indexOf(index.element) != -1 ) {
    session.index4.splice (session.index4.indexOf(index.element), 1);}
     console.log( "session" + session.index3 );
     console.log( "session" + session.index4 );
    });	
    socket.on('message5', function ( index1) {
        console.log('Un client me parle ! Il me dit ne s affiche pas : ' + index1.index + index1.element );
    var tempSession = session.index1.indexOf(index1.index);
      if (tempSession != -1 ) {
      console.log ( 'je suis a la premier condition' );
    session.index1.splice (session.index1.indexOf(index1.index), 1);
          for ( var i=0;i < session.index1.length ;i++ ) {
      if ( index1.index < session.index1[i] ) {
            session.index1[i] = session.index1[i] - 1;
           }}}
      else if (tempSession == -1 ) {
          for ( var i=0;i < session.index1.length ;i++ ) {
      if ( index1.index < session.index1[i] ) {
            session.index1[i] = session.index1[i] - 1;
           }}}
      if (session.index2.indexOf(index1.element) != -1 ) {
      console.log ( 'je suis a la deuxieme condition' );
    session.index2.splice (session.index2.indexOf(index1.element), 1);}

     console.log( "session" + session.index1 );
     console.log( "session" + session.index2 );
    });	
     
    socket.on('condition', function ( index) {
    console.log ('condition' + index );
    if ( index == 'todo' ) {
    socket.emit('message2',{index1: session.index1, todo : session.index2} );
    }
    else if ( index == 'Historique' ) {
    console.log ('condition' );
    socket.emit('message3',{index3: session.index3, todo3 : session.index4} );
    }
    });	
})	


module.exports = app;

server.listen(8080);
