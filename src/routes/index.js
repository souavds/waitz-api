const PlaceRoutes = require('./Place');
const CommentRoutes = require('./Comment');
const AuthRoutes = require('./Auth');

module.exports = (app) => {
  app.use('/api/place', PlaceRoutes);
  app.use('/api/comment', CommentRoutes);
  app.use('/api/auth', AuthRoutes);
};
