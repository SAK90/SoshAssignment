module.exports = wrap = (success, data, message) => {
  return { success: success, data: data, message: message };
};
