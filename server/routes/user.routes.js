module.exports = (app) => {
    const users = require('../controllers/user.controller');
    const User = require('../models/user.model')
    const jwt = require('jsonwebtoken');

    // Create a new User
    app.post('/user',verifyjwt, (req, res) => {
        // Validate request
        console.log('im hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeclear')
        if(!req.body.username) {
            return res.status(400).send({
                message: "User content can not be empty"
            });
        }
    
        // Create a user
        const user = new User({
            name : req.body.name,
            username : req.body.username,
            status : req.body.status,
            password : req.body.password,
            joindate : new Date()     
        });
    
        user.save()
        .then(data => {
            res.send(data);
            console.log('new User has Created:',user.username)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
    });

    function vfyToken(req,res,next) {
        if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request valid No token')
        }
        let token = req.headers.authorization.split(' ')[1]
         console.log('Body token:',req.headers.authorization)
        // console.log(token)
        if(token === '' || token === null){
            return res.status(401).send('Unauthorized request')
        }
        let payload = jwt.verify(token,'secretkey',(err,ok)=> {
            err= res.status(401).send('Unauthorized request')
            });
        if(!payload){
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next()
        
    }

    
function verifyjwt(req,res,next){
    const token = req.headers['authorization']
    console.log(token);
    if(!token) return res.status(401).json('Unauthorize user')

    if(!token.split(' ')[1]) return res.status(401).json('Unauthorize user')

   try{
        const decoded = jwt.verify(token.split(' ')[1],'secretkey');
        req.userId = decoded
        next()

   }catch(e){
    res.status(401).json('Token not valid')
   }
}

    // Retrieve all users
    app.get('/allusers', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.findOne);

    // Update a User with userId
    app.put('/users/:userId', users.update);

    // Delete a User with userId
    app.delete('/users/:userId', users.delete);
    

    //login to system
    app.post('/login',users.login);

}