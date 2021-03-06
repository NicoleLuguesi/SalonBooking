const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../..models/Profile');
const User = require('../..models/User');


// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user'})
    }

    res.json(profile);

  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post('/', [ auth, [
  check('company', 'company is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('social', 'Social is required').not().isEmpty()

]
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {
    company,
    location,
    //facebook,
    //twitter,
    //instagram
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if(company) profileFields.company = company;
  if(location) profileFields.location = location;

  // Build social object
 // profileFields.social = {}
  // if (facebook) profileFields.social.facebook = facebook;
  // if (twitter) profileFields.social.twitter = twitter;
  // if (instagram) profileFields.social.instagram = instagram;


  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if(profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields},
        { new: true }
        );

        return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

module.exports = router;



