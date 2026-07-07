const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const gravatar = require('gravatar');
const HttpError = require('../helpers/HttpError');
const service = require('../services/bouquetsService');

const getAll = async (req, res, next) => {
  try {
    const bouquets = await service.getAll();
    res.json(bouquets);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const bouquet = await service.getById(req.params.id);
    if (!bouquet) return next(HttpError(404, 'Not found'));
    res.json(bouquet);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const photoURL = req.body.photoURL || gravatar.url(req.body.title, { s: '250', d: 'retro' }, true);
    const bouquet = await service.create({ ...req.body, photoURL });
    res.status(201).json(bouquet);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) return next(HttpError(400, 'Body must not be empty'));
    const bouquet = await service.update(req.params.id, req.body);
    if (!bouquet) return next(HttpError(404, 'Not found'));
    res.json(bouquet);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const bouquet = await service.remove(req.params.id);
    if (!bouquet) return next(HttpError(404, 'Not found'));
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const bouquet = await service.updateFavorite(req.params.id, favorite);
    if (!bouquet) return next(HttpError(404, 'Not found'));
    res.json(bouquet);
  } catch (error) {
    next(error);
  }
};

const updatePhoto = async (req, res, next) => {
  try {
    if (!req.file) return next(HttpError(400, 'File is required'));

    const bouquet = await service.getById(req.params.id);
    if (!bouquet) return next(HttpError(404, 'Not found'));

    const ext = path.extname(req.file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    const photosDir = path.resolve('public', 'photos');
    const newPath = path.join(photosDir, fileName);

    await fs.rename(req.file.path, newPath);

    const photoURL = `/photos/${fileName}`;
    const updated = await service.update(req.params.id, { photoURL });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove, updateFavorite, updatePhoto };
