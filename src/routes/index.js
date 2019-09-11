const PlaceRoutes = require('./Place');
const CommentRoutes = require('./Comment');
const UserRoutes = require('./User');

module.exports = (app) => {
  app.use('/api/place', PlaceRoutes);
  app.use('/api/comment', CommentRoutes);
  app.use('/api/user', UserRoutes);
};
