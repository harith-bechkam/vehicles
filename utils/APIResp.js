module.exports = {

	getExistsResult: function (result, res) {
		res.status(202).send({ "status": false,responsecode:202, message: result });
	},
	getSuccessResult: function (result,msg, res) {
		let jsonMsg = { "status": true,responsecode:200, data: result, message: msg };
		res.status(200).send(jsonMsg);
	},
	getNoResult: function (msg, res) {
		let jsonMsg = { "status": false,responsecode:200, message: msg };
		res.status(200).send(jsonMsg);
	},
	getMessageResult: function (response, msg, res) {
		res.status(200).send({ "status": true,responsecode:200, data: response, message: msg });
	},
	getNotExistsResult: function (response, res) {
		res.status(204).send({ "status": false,responsecode:204, message: response });
	},
	getBadRequestResult: function (result, res) {
		res.status(400).send({ "status": false,responsecode:400, message: 'Bad request found' });
	},
	getValidationResult: function (errResp, res) {
		res.status(500).send({ "status": false, message :errResp });
		},
	getINTERNALSERVERError: function (result, res) {
		res.status(500).send({ "status": false,responsecode:500, message: result });
	},
	getErrorResult: function (errResp, res) {
		res.status(400).send({ "status": false,responsecode:400, message :errResp });
	},
	getUpdateResult: function (resp, res) {
		res.status(201).send({ "status": true,responsecode:201, message: resp });
	},
	getCreatedResult: function (msg,resp, res) {
		res.status(201).send({ "status": true,responsecode:201, message: msg , data: resp });
	},
	getDeletedResult: function (resp, res) {
		res.status(201).send({ "status": true,responsecode:201, message: resp });
	},
	getCreatedMsgResult: function (result,msg, res) {
		let jsonMsg = { "status": true,responsecode:200,result, message: msg };
		res.status(200).send(jsonMsg);
	},
	getAcceptedResult: function (msg, res) {
		let jsonMsg = { "status": true,responsecode:200,message: msg };
		res.status(200).send(jsonMsg);
	},
	getUniquenessError: function (result, res) {
		res.status(500).send({ "status": false, message: result });
	},
	getSuccessResults: function (result, message, res) {
		let jsonMsg = { "status": true,responsecode:200, data: result, message };
		res.status(200).send(jsonMsg);
		},
	// getMessageResultPagination: function (response, msg, res) {
	// 	res.status(200).send({ "status": true,responsecode:200, data: response.rows, count:response.count, pages:response.pages, msg: msg ,basePath: response.basePath});
	// },
}