/**
 * Send JSON response in a consistent format
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Response message
 * @param {Object} [data] - Optional data object
 */
export const sendResponse = (res, status, message, data = {}) => {
    return res.status(status).json({
        status: status >= 200 && status < 300 ? 'success' : 'error',
        message,
        data
    });
};
