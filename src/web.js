var express = require("express");
var helperModule = require("./server/lib.js");

var app = express();

app.use(express.logger());
//New call to compress content
app.use(express.compress());
app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client/html');
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
  response.render('index.html');
});

app.post('/compose/:type', function(req, res) {
	 var type = req.params.type;
	 var data='' ;
	 req.on('data', function(buffer){
		 data += buffer;
	 });
	 
	 req.on('end', function(buffer){
		 var submissionData = JSON.parse(data);
		 if (submissionData!=null){
			 res.writeHead(200);
			 res.write(helperModule.composeName(type,submissionData));
			 res.end();
		 }else{
			 res.writeHead(400);
			 res.end();
		 }
		 
	 });
 });

app.post('/validate', function(req, res) {
	 var type = req.params.type;
	 var data='' ;
	 req.on('data', function(buffer){
		 data += buffer;
	 });
	 
	 req.on('end', function(buffer){
		 var submissionData = JSON.parse(data);
		 console.log(submissionData);
		 if (submissionData!=null){
			 res.writeHead(200);
			 res.write(helperModule.validateFileName(submissionData.inputVal));
			 res.end();
		 }else{
			 res.writeHead(400);
			 res.end();
		 }
	 });
});


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});