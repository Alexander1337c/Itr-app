const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router();
const User = require('../models/User')



router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .then(users => res.json(users))
    res.json(users)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));

});
// router.route('/update-block/:id').put((req, res) => {
  
//     const users = await User.findByIdAndUpdate(req.params.id)
//     users.status = 'Заблокирован'
//     users.save()
//     res.send('ok')
// });

router.put('/update-block/:id', async (req, res) => {
  const users = await User.findByIdAndUpdate(req.params.id)

  users.status = 'Заблокирован'
  users.save()
  res.send('ok')
})
router.put('/update-unblock/:id', async (req, res) => {
  const users = await User.findByIdAndUpdate(req.params.id)

  users.status = 'Разблокирован'
  users.save()
  res.send('ok')
})
// router.put('/:id/update-unblock', auth, async (req, res) => {
//   const users = await User.findByIdAndUpdate(req.params.id)

//   users.status = 'Разблокирован'
//   users.save()
//   res.send('ok')
// })
module.exports = router