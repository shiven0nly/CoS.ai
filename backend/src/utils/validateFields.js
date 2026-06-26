const AppError = require('./AppError');

/**
 * SRP: Single utility to validate required fields on a request body.
 * Eliminates the duplicated manual guard pattern in every controller.
 * 
 * @param {object} body     - req.body
 * @param {string[]} fields - Required field names to check
 * @param {Function} next   - Express next()
 * @returns {boolean}       - Returns true if validation fails (to allow early return in caller)
 */
const validateRequiredFields = (body, fields, next) => {
  for (const field of fields) {
    const value = body[field];
    const isEmpty = 
      value === undefined || 
      value === null || 
      value === '' ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      next(new AppError(`'${field}' is required and cannot be empty.`, 400));
      return true; // Signal "has error" so controller can return early
    }
  }
  return false; // No errors
};

module.exports = validateRequiredFields;
