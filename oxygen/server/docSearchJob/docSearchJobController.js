'use strict';
const logger = require('./../../applogger');
const docSearchJobModel = require('./docSearchJobEntity').docSearchJobModel;
const engineModel = require('./docSearchJobEntity').engineModel;
const searchModel = require('./../searcher/searchEntity').searchModel;
const startSearcherMQ=require('./docOpenSearcherEngine').startSearcher;
const config = require('./../../config');
const addJob = function(jobData, callback) {
	console.log(jobData)
	let job=new docSearchJobModel(jobData);
	job.save(function(err,data) {
		if (err) {
			logger.error(
				"Encountered error at doSearchJobController::addJob, error: ",
				err);

			return callback(err, {});
		}
		console.log("saved job id is "+data._id);
		let id=data._id;
		startSearcherMQ(id.toString());
		return callback(null, job);
	});
};
const addSearchJob = function(domainName,concept) {
	console.log(domainName+" "+concept)
	engineModel.find(function(err,engineColl)
	{
		engineColl.forEach(function(engineData){
			let JobData={
				query:concept,
				engineID:engineData.engine[1]+" "+engineData.key[2],
				exactTerms:domainName,
				results:config.NO_OF_RESULTS,
				siteSearch:'NONE'
			}
			let job=new docSearchJobModel(JobData);
			job.save(function(errorOnSave,data) {
				if (errorOnSave) {
					logger.error(
						"Encountered error at doSearchJobController::addJob, error: ",
						errorOnSave);
				}
				console.log("saved job "+data);
				let id=data._id;
				startSearcherMQ(id.toString());

			});

		})
	})

};

const deleteJob = function(jobID, callback) {
	docSearchJobModel.remove( jobID, function(err) {
		if (err) {
			logger.error(
				"Encountered error at doSearchJobController::deleteJob, error: ",
				err);
			return callback(err, {});
		}
		console.log(jobID);
		return callback(null, {msg:'deleted'});
	});
};
const updateJob = function(job, callback) {
	console.log(job)
	docSearchJobModel.findById( job._id, function(err,data) {
		if (err) {
			logger.error(
				"Encountered error at doSearchJobController::updateJob, error: ",
				err);
			return callback(err, {});
		}
		console.log(data);
		data.query=job.query
		data.engineID=job.engineID
		data.exactTerms=job.exactTerms
		data.results=job.results
		data.siteSearch=job.siteSearch

		let ack=data.save(function (save_err){
			if(!save_err)
			{
				return callback(null, {msg:'updated'});
			}
			return callback(null,{err:"unexpected"});
		})
		return ack;
	});
};

const showJob = function(callback) {

	docSearchJobModel.find(function(err, jobs) {
		if (err) {
			logger.error(
				"Encountered error at doSearchJobController::showJob, error: ",
				err);
			return callback(err, {});
		}
		console.log(jobs);
		return callback(null, jobs);
	});
};

const showResults = function(id,callback) {

	searchModel.find({'jobID':id.slice(1,id.length)},function(err, searchresults) {
		if (err) {
			logger.error(
				"Encountered error at doSearchJobController::showJob, error: ",
				err);
			return callback(err, {});
		}
		console.log(id.slice(1,id.length));
		return callback(null, {'saved urls':searchresults.length,'content':searchresults});
	});
};
module.exports = {
	addJob: addJob,
	showJob:showJob,
	deleteJob:deleteJob,
	updateJob:updateJob,
	addSearchJob:addSearchJob,
	showResults:showResults
};
