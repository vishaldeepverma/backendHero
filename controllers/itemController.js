const moment = require("moment");

const { decryptField } = require("../utility");

const {
  createItemService,
  fetchAllItems,
  fetchItemById,
  updateItemById,
} = require("../services/itemServices");
const logger = require("../utility/logger");

exports.createItem = async (req, res, next) => {
  try {
    logger.info("Controller: create item");
    const dbResponse = await createItemService(req.body);
    return res.status(200).send(dbResponse);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    logger.info("Controller: get all items");
    const dbResponse = await fetchAllItems();
    return res.status(200).send(dbResponse);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    logger.info("Controller: get item by id");
    const dbResponse = await fetchItemById(decryptField(itemId));

    // format date
    dbResponse.dateOfManufacture = moment(dbResponse.dateOfManufacture).format(
      "YYYY-MM-DD"
    );

    return res.status(200).send(dbResponse);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.updateItemById = async(req, res, next) => {
  try {
    logger.info("Controller: update item by id");
    console.log(req.body);
    const itemId = decryptField(req.body.id);
    
    // remove id field
    delete req.body.id;

    console.log(req.body);

    const dbResponse = await updateItemById(itemId, req.body);

    console.log("db response", dbResponse);

    // format date
    dbResponse.dateOfManufacture = moment(dbResponse.dateOfManufacture).format(
      "YYYY-MM-DD"
    );

    return res.status(200).send(dbResponse);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.deleteItemById = (req, res, next) => {
  // create item
  createItemService(req.body);
};
