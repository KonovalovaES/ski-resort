function clearAttributes(user) {
  const info = { ...user.dataValues };
  const attributes = ['createdAt', 'updatedAt', 'password'];
  attributes.forEach((key) => delete info[key]);
  return info;
}
module.exports = clearAttributes;
