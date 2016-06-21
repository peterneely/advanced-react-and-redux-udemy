module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(['waterbottle', 'phone', 'paper']);
  });
}
