function config() {
  this.DB_NAME = 'myapi';
  this.DB_URL = `mongodb://localhost:27017/${this.DB_NAME}`;
  this.COLLECTION_NAME = 'hostels';
  this.SERVER_PORT = 3012;
  this.SERVER_URL = 'http://localhost:3012';
}

module.exports = config;
