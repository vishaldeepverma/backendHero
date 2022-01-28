const db = require("../models");
const logger = require("../utility/logger");

exports.createItemService = (data) => {
  logger.info("Service: get all items");
  console.log(data);
  return db.item.create(data);
};

exports.fetchAllItems = (data) => {
  logger.info("Service: get all items");
  return db.item.findAll({
    raw: true,
  });
};

exports.fetchItemById = (data) => {
  logger.info("Service: get item by id");
  return db.item.findOne({
    raw: true,
  });
};

exports.updateItemById = (id, data) => {
  logger.info("Service: update item by id");
  return db.item.update(data, { where: { id } });
};

exports.deleteItemById = (data) => {
  // some sql query
};
