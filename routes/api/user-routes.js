const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

//get all users
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

//get all users by id
router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

//get friends
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)


module.exports = router; 