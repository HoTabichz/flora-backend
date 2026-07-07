const Bouquet = require('../models/Bouquet');

const getAll = () => Bouquet.findAll();

const getById = id => Bouquet.findByPk(id);

const create = data => Bouquet.create(data);

const update = async (id, data) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  return bouquet.update(data);
};

const remove = async id => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  await bouquet.destroy();
  return bouquet;
};

const updateFavorite = async (id, favorite) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  return bouquet.update({ favorite });
};

module.exports = { getAll, getById, create, update, remove, updateFavorite };
