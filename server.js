var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user:'shsm1981',
    database:'shsm1981',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));



var pool=new Pool(config);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-db', function (req, res) {
  pool.query('select * from article', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }
      else
      {res.send(JSON.stringify(result.rows));}
  });
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});


var names=[];
app.get('/submit-name',function(req,res){
var name=req.query.name;
names.push(name);
res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
 pool.query("select * from article where title=$1",[req.params.articleName], function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else
      {
      if(result.rows.length===0)
      {res.status(404).send('article not found');}
      else
      {
          var articleData=result.rows[0];
        // res.send(articleData);
     res.send(createTemplate(articleData));
      }
      }
        });   
    
});

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var content=data.content;
    var category=data.category;
    var htmlTemplate=`
    <html>
    <head>
    <title>
  ${title}
    </title>
    </head>
    <body>
  <h1>
  ${category}
  </h1>
  <p>
  ${content}
  </p>
  <h3>
  ${date.toDateString()}
  </h3>
  </body>
</html> 
`;
    return htmlTemplate;
   
}

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article1.html'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
