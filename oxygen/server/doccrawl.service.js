const logger = require('../applogger');
const crawlerEngine = require('./crawler/docCrawlerEngine');
const config = require('../config');

const mongoose = require('mongoose');

const path = require('path');

function setupMongooseConnections() {
 mongoose.connect(config.MONGO_URL);

 mongoose.connection.on('connected', function() {
   logger.debug('Mongoose is now connected to ', config.MONGO_URL);
 });

 mongoose.connection.on('error', function(err) {
   logger.error('Error in Mongoose connection: ', err);
 });

 mongoose.connection.on('disconnected', function() {
   logger.debug('Mongoose is now disconnected..!');
 });

 process.on('SIGINT', function() {
   mongoose.connection.close(function() {
     logger.info(
       'Mongoose disconnected on process termination'
     );
     process.exit(0);
   });
 });
}

let startDocCrawlerEngine = function() {
 try {
   //Any pre-requisites for running the engine
   setupMongooseConnections();

   logger.info("Starting doc crawler engine..!");

   crawlerEngine.start();
 } catch (err) {
   logger.error("Caught error in running doc crawler engine: ", err);
 }
}

startDocCrawlerEngine();
