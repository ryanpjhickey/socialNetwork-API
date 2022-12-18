const { Users, Thoughts } = require('../models');

const UsersController = {
  getAllUsers(req, res) {
    Users.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No users found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUsers({ body }, res) {
    Users.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },

  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No users found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  deleteUsers({ params }, res) {
    Thoughts.deleteMany({ usersId: params.id })
      .then(() => {
        Users.findOneAndDelete({ usersId: params.id })
          .then(dbUsersData => {
            if (!dbUsersData) {
              res.status(404).json({ message: 'No users found with this id!' });
              return;
            }
            res.json(dbUsersData);
          });
      })
      .catch(err => res.json(err));
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No users found with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No users found with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = UsersController