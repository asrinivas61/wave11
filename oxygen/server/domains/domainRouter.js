'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();

const domainCtrl = require('./domainController');

// Mounted at mount point /domain/

// Create new domain
router.post('/:domainName', function(req, res) {

  try {

    let newDomainObj = req.body;
    logger.debug("in 8080 ",
      req.params.domainName);

    domainCtrl.publishNewDomain(newDomainObj)
    .then(function(savedDomainObj) {
      logger.debug("Successfully published new domain: ",
        savedDomainObj.name);
      res.send(savedDomainObj);
      return;
    },
    function(err) {
      logger.error("Encountered error in publishing a new domain: ",
        err);
      res.send(err);
      return;
    });

  } catch (err) {
    logger.error("Caught a error in posting new domain ", err);
    res.status(500).send({
      error: "Something went wrong, please try later..!"
    });
    return;
  }
});

// Get details of all domain in the system
router.get('/', function(req, res) {
  try {
    domainCtrl.getAllDomainDetails().then(function(cardDetailsObj) {
      logger.debug("Successfully retrived all details to show length----->",cardDetailsObj.length);
      res.send(cardDetailsObj);
      return;
    },
    function(err) {
      logger.error("Encountered error in retrived concept(s) of domain: ",
        err);
      res.send(err);
      return;
    })

  } catch (err) {
    logger.error("Caught a error in retrived concept(s) of domain ", err);
    res.status(500).send({
      error: "Something went wrong, please try later..!"
    });
    return;
  }
});

// Get details of a specific domain by its name
router.get('/:domainName', function(req, res) {

 try {

  let domainName = req.params.domainName;
  domainCtrl.getDomain(domainName).then(function(domainDetails) {
    logger.info("Successfully retrived all concepts and intents of a domain : ");
    logger.info(domainDetails)
    res.send(domainDetails);
    return;
  },
  function(err) {
    logger.error("Encountered error in retrived concept(s) of domain: ",
      err);
    res.send(err);
    return;
  })

} catch (err) {
  logger.error("Caught a error in retrived concept(s) of domain ", err);
  res.status(500).send({
    error: "Something went wrong, please try later..!"
  });
  return;
}

});

// Freshly index a domain
router.post('/:domainName/index', function(req, res) {
  res.send({});
});

module.exports = router;
