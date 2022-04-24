var express = require('express');
var router = express.Router();
var User = require('./../db/models/user');

/**
 * get all product
 */
router.get('/user', (req, res) => {
  User.find({})
    .then(users => {
      res.send({ users: users })
    })
    .catch(err => {
      console.log('Error: ', err);
      throw err;
    })
});

// get random user
router.get('/user/random', (req, res) => {
  const currentUserId = req.query.currentUser

  User.aggregate([
    { $match: { id: { $ne: currentUserId } } },
    { $sample: { size: 1 } },
    
  ])
  .then(users => {
    res.send({ 
      users: users
    })
  })
  .catch(err => {
    console.log('Error: ', err);
    res.send({ err: err })
  })
});

// get user details
router.get('/user/:userId', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      throw err
    }
    res.send({ user: user });
  })
});

// get details list user matches
router.get('/user/:userId/match', async (req, res) => {
  let currentUser = await User.findById(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      throw err
    }
    return user
  })

  User.find({_id: { $in: currentUser.matches }})
    .then(users => {
      res.send({ users: users });
    })
    .catch(err => {
      console.log('Error: ', err);
      throw err;
    })
});

/**
 * like user
 */
router.post('/user/like', (req, res) => {
    const currentUser = req.body.currentUser;
    const likedUserId = req.body.likedUserId;

    const listMatches = [...currentUser.matches];
    listMatches.push(likedUserId);
    const listMatchesUniq = [...new Set(listMatches)];
    
    const newMatch = currentUser.matches.length < listMatchesUniq.length

    User.findByIdAndUpdate(
        { _id: currentUser._id },
        { $set: { matches: listMatchesUniq } })
        .then(doc => {
            res.send({
              user: doc,
              success: true,
              newMatch: newMatch
            })
        })
        .catch(err => {
          console.log('Error: ', err);
          throw err;
        })
});

/**
 * pass user
 */
 router.post('/user/pass', (req, res) => {
  const currentUser = req.body.currentUser;
  const passedUserId = req.body.passedUserId;

  let listMatches = currentUser.matches;
  listMatches = listMatches.filter(item => item !== passedUserId)

  User.findByIdAndUpdate(
      { _id: currentUser._id },
      { $set: { matches: listMatches } })
      .then(doc => {
          res.send({
            user: doc,
            success: true
          })
      })
      .catch(err => {
        console.log('Error: ', err);
        throw err;
      })
});

module.exports = router;
