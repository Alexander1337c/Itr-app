const { Router } = require('express')
const Note = require('../models/Note')
const config = require('config')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post('/', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { title, text, color } = req.body
        const note = new Note({
            title, text, color, owner: req.user.userId
        })
        await note.save()
        res.status(201).json({ note })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.json(note)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router