const express = require('express')
const app = express()

const httpPort = 8080

var count = -1;

// According to https://stackoverflow.com/a/63825359
// This is necessary to pass post parameters for express ~4.17
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.get('/reset', function(req, res) {
   count = 0;
   res.sendFile('reset.html', { root: __dirname }); console.log('reset');
} )

app.get('/hitcount', function(req, res) {
   res.send(
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Page HitCount</title>
</head>
<body>
<div id="count">${count}</div>  
</body>
</html>`);

 console.log('hitcount');
} )

app.get('/multiplicar.html', function(req, res) {
	res.send(
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Page HitCount</title>
</head>
<body>

<form id="mult" method="POST" action="mult">
<input type="text" id="a" name="a"></input>
<input type="text" id="b" name="b"></input>
<input type="submit" id="send">
</form>

</body>
</html>`);
})

app.post('/mult', function(req, res) {
	
	console.log(req.body);
	var a = parseInt(req.body.a);
	var b = parseInt(req.body.b);
	var result = a*b;
	console.log(result);
	
	res.send(
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Page HitCount</title>
</head>
<body>

<h1 id="result">El resultado de multiplicar ${a} por ${b} es ${result}</h1>

</body>
</html>`);
	
	
})
		

app.get('/hit', function(req, res) {
   ++count;
   res.send('hit ok'); console.log('get hit');

} )


app.post('/cargar_datos.php', function(req, res) {
   ++count;
   res.sendFile('postOk.html', { root: __dirname } ); console.log('post hit');

} )

app.get('/imagen.png', function(req, res) {
   ++count;
   res.sendFile('gok.png', { root: __dirname } ); console.log('img hit');

} )

app.listen(httpPort, () => console.log(`App listening on port ${httpPort}!`))

