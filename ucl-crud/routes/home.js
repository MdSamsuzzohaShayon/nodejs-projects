const express = require('express');
const router = express.Router();
const Club = require('../models/Club');



// ROUTE FOR READ
router.get('/', (req, res) => {
    Club.find((err, docs) => {
        if (err) throw err;
        // console.log(docs);
        res.render('home', {
            teams: docs
        })
    }).catch(err => {
        console.log(err);
    })
});


// ROUTE FOR CREATE
router.post('/add', (req, res, next) => {
    const {
        name,
        players,
        coach
    } = req.body;
    console.log(name, players, coach);
    const club = new Club({
        name,
        players,
        coach
    });
    club.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

    // try {
    //     throw new Error('BROKEN')
    // } catch (err) {
    //     next(err)
    // }
});




// ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    // res.send(req.params.id);
    Club.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
        console.log(docs);
        
        console.log(docs.name);
        
        // console.log(docs._id);
        
        res.render('edit', {team:docs});
    })
});





// ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res, next) => {
    // let team = {};
    
    // const {
    //     name,
    //     players,
    //     coach
    // } = req.body;

    // team.name = name;
    // team.players = players;
    // team.coach = coach;
    // console.log(team);
    
    Club.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/');
        }
    })
    // next();
});



router.get('/:id',(req, res)=>{
    Club.findByIdAndDelete({_id:req.params.id}, err=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
})








module.exports = router;