const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const PORT = process.env.PORT || 3000; 

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} from ${req.ip}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
    
});
app.use((req, res, next) => {
    res.render('maintenance.hbs',{
        pageTitle: 'MAINTAINENANCE'
    });
    next();

});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', new Date().getFullYear());
hbs.registerHelper('scream', (x)=>{ return x.toUpperCase(); });



//PAGES
//homepage
app.get('/', (req, res) => 
    {      
        res.render('home.hbs',{
            pageTitle: 'HOME',
            msg: 'welcome'
        });

    }
);

//aboutpage
app.get('/about', (req, res) =>
{
    res.render('about.hbs',{
        pageTitle: 'About',
        msg: 'welcome'
    })
});

//failurepage
app.get('/failure', (req, res) => {
    res.send({
        errorMessage: 'ERROR ERROR ERROR'
    })
});

//projectspage
app.get('/projects', (req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects',
        msg: 'this is the projects page'
    })
})
app.listen(PORT);