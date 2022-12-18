const router = require('express').Router();

const {
  createThoughts,
  getAllThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

//get all thoughts
router
  .route('/')
  .get(getAllThoughts);

//get all thoughts by id, update/delete thoughts
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

//create thoughts
router
  .route('/:userId')
  .post(createThoughts);

//add reaction route
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

//delete reaction route
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;