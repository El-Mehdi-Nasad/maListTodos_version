var express = require('express');
var router = express.Router();

var dateFr =  function() {
                    // on recupere la date
                    var date = new Date();
                    // on construit le message
                    var jour = date.getDate() ;
                    if(jour < 10){
                       jour = "0" + jour;}
                    var message = jour + "/";   // nom du jour
                    var mois = date.getMonth()+1 ;
                    if(mois < 10){
                       mois = "0" + mois;}
                    message += mois + "/";   // mois
                    message += date.getFullYear() + "," + " ";
                    var heure = date.getHours();
                    if(heure < 10){
                       heure = "0" + heure;}
                    message += heure + "h";
                    var minutes = date.getMinutes();
                    if(minutes < 10){
                       minutes = "0" + minutes;}
                    message += minutes + "min";
                    var secondes = date.getSeconds();
                    if(secondes < 10){
                       secondes = "0" + secondes;}
                    message += secondes + "s";
                 return message;
           };

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
// Les routes
// Liste des tâches
// On affiche la todolist et le formulaire
router.get('/todo', function(req, res) { 
    
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    if (typeof(req.session.select) == 'undefined') {
        req.session.select = [];
    }
    if (typeof(req.session.date1) == 'undefined') {
        req.session.date1 = [];
    }
    if ( req.session.temp == '' ) {
        req.session.etat = null;
        req.session.deja = null;
    }
    if ( req.session.temp != '' ) {
        if ( req.session.temp1 == -1 ) {
           console.log ( req.session.temp1 );
           req.session.etat = 'true';
           req.session.deja = null;
           req.session.temp = '';
           req.session.temp1 = '';
         }
         else { 
           console.log ( req.session.temp1 );
           req.session.etat = null;
           req.session.deja = 'true';
           req.session.temp = '';
           req.session.temp1 = '';
          } 
    }
    res.render('todo', {todolist: req.session.todolist, select1: req.session.select, vr: req.session.etat, fx: req.session.deja, date1: req.session.date1, cond: req.session.cond});
});

// Ajoute une tâche
// En général les formulaire envoie les donné avec la méthode POST 
// On ajoute un élément à la todolist
router.post('/todo/ajouter/', function(req, res) {
  if (req.param('newtodo') != '' ) {
   req.session.temp1 = req.session.todolist.indexOf(req.param('newtodo'));
  if ( req.session.temp1 == -1 ) {
        req.session.todolist.push(req.param('newtodo'));

     req.session.date1.push( dateFr() );
    }}
    req.session.temp = req.param('newtodo');
    res.redirect('/todo');
});

// Supprime la tâche n°id
// Supprime un élément de la todolist 
router.get('/todo/supprimer/:id', function(req, res) {
    if (typeof(req.session.cond) == 'undefined') {
        req.session.cond = {condind : "",condtodo: "" };
    }
   
    if (req.params.id != '') {
        var todo = req.session.todolist[req.params.id];
       req.session.cond.condtodo = todo; 
       req.session.cond.condind = req.params.id ; 
       console.log( 'les parametres de em ' + req.session.cond.condtodo ); 
        req.session.datehistorique.push( dateFr() );
        req.session.todohistorique.push(todo);
        req.session.todolist.splice(req.params.id, 1);
        req.session.date1.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

router.get('/historique',function(req,res) {
    if (typeof(req.session.todohistorique) == 'undefined') {
        req.session.todohistorique = [];
    }
    if (typeof(req.session.datehistorique) == 'undefined') {
        req.session.datehistorique = [];
    }
    if (typeof(req.session.datefonct) == 'undefined') {
        req.session.datefonct = "";
    }
    
    res.render('historique', {todohistorique: req.session.todohistorique, datehistorique: req.session.datehistorique});
});
router.get('/historique/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todohistorique.splice(req.params.id, 1);
        req.session.datehistorique.splice(req.params.id, 1);
    }
    res.redirect('/historique');
});

router.get('/login',function(req,res) {
    res.render('login');
});
// Tout le code de gestion des routes (app.get) se trouve au-dessus
// On redirige vers la todolist si la page demandé n est pa trouve 
router.use(function(req, res, next){
    res.redirect('/todo');
});

module.exports = router;
