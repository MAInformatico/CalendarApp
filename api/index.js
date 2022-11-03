const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let port = 3000;

let event = {
    name: '',
    description: '',
    date: ''
};

let response = {
    error: false,
    code: 200,
    message: ''
};


app.get('/', function(req,res){
    response = {
        error: true,
        code: 200,
        message: 'Init'
    }
    res.send(response);
});

app.route('/event')
.get(function(req, res){
    response = {
        error: false,
        code: 200,
        message: ''
    };
    if(event.name === '' || event.date === ''){
        response = {
            error: true,
            code: 501,
            message: 'Event has not created'
        };
    }
    else{
        response = {
            error: false,
            code: 200,
            message: 'Event created',
            response: event
        };
    }
    res.send(response);    
})
.post(function(req, res){
    if(!req.body.name || !req.body.date){
        response = {
            error: true,
            code: 502,
            message: 'Name and Date are mandatory'
        };
    }
    else{
        if(event.name !== '' || event.date !== ''){
            response = {
                error: true,
                code: 503,
                message: 'The event exists previously'
            };
        }
        else{
            event = {
                name : req.body.name,
                description: req.body.description,
                date: req.body.date
            };
            response = {
                error : false,
                code: 200,
                message: 'Event created',
                response: event
            };
        }
    }
    res.send(response);
})
.put(function(req, res){
    if(!req.body.name || !req.body.date){
        response = {
            error: true,
            code: 502,
            message: 'Name and date are mandatory'
        };
    }
    else{
        if(event.name === '' || event.date === ''){
            response = {
                error: true,
                code: 501,
                message: 'Event has been created'
            };
        }
        else{
            event = {
                name: req.body.name,
                description: req.body.description,
                date: req.body.date
            };
            response = {
                error: false,
                code: 200,
                message: 'Event updated',
                response: event
            };
        }
    }
    res.send(response);
})

.delete(function(req,res){
    if(event.name === '' && event.date === ''){
        response = {
            error: true,
            code: 501,
            message: 'The event has not been created'
        };
    }
    else{
        response = {
            error: false,
            code: 200,
            message: 'Event deleted'
        };
        event = {
            name: '',
            description: '',
            date: ''
        };
    }
    res.send(response);
});

app.use(function(req, res, next){
    response = {
        error: true,
        code: 404,
        message: 'URL not found'
    };
    res.status(404).send(response);
});

app.listen(port, () => {
    console.log("The server started in port 3000");
   });
