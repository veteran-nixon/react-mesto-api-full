class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.code = 11000;
  }
}

module.exports = ConflictError;
