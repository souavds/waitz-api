const PlaceRoutes = require('./Place');
const CommentRoutes = require('./Comment');

module.exports = (app) => {
  app.use('/api/place', PlaceRoutes);
  app.use('/api/comment', CommentRoutes);
};
