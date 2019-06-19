var fetch = require('node-fetch');

var DataBaseController = require('../node_modules/parse-server/lib/Controllers/DatabaseController');
let dataBaseCreate = DataBaseController.prototype.create;

DataBaseController.prototype.create = function (className, object, {
	acl
} = {}, validateOnly = false) {
	return   _handleClassPower.bind(this)(className, object, acl,validateOnly).then(object =>{
		return dataBaseCreate.bind(this)(className, object, acl, validateOnly)
	});
};

async function _handleClassPower(className, object, acl) {

	let userId  = acl && acl[1] ? acl[1] : "*";
	if (!object.ACL) {
		let config = await _getConfig() || {};
		let classLevel = config[`${className}_class_level`];
		if(!isNaN(classLevel)){
			let acl = _createACLByLevel(classLevel, userId)
			object.ACL = acl
		}
	}
	return object
}


function _createACLByLevel(classLevel, userId){
	let postACL = new Parse.ACL();
	switch (classLevel) {
		case 0 : {
			postACL.setWriteAccess("*", true);
			postACL.setReadAccess("*", true);
			break
		}
		case 1 : {
			postACL.setWriteAccess(userId, true);
			postACL.setReadAccess( "*", true);
			break
		}
		case 2 : {
			postACL.setWriteAccess(userId, true);
			postACL.setReadAccess( userId, true);
			break
		}
		case 3 : {
			postACL.setWriteAccess("*", false);
			postACL.setReadAccess( "*", false);
			break
		}
	}
	return postACL.toJSON()
}



function _initClassLevel(className, classLevelPremissions) {

	return fetch(`${process.env.PARSE_PUBLIC_SERVER_URL}/schemas/${className}`, {
		method: 'put',
		body: JSON.stringify(classLevelPremissions),
		headers: {
			'Content-Type': 'application/json',
			'x-parse-master-key': process.env.PARSE_SERVER_MASTER_KEY,
			'x-parse-application-id': process.env.PARSE_SERVER_APPLICATION_ID
		},
	}).then(res => res.json())

}

_initClassLevel("_User", {
	classLevelPermissions: {
		find: {
			"requiresAuthentication": true,
		},
		get: {"requiresAuthentication": true,},
		create: {"requiresAuthentication": true,},
		update: {"requiresAuthentication": true,},
		delete: {"requiresAuthentication": true,},
		addField: {"requiresAuthentication": true,},
	}
}).then(data => {
}, err => console.log);




function _getConfig(){
	return Parse.Config.get().then(config => {
		return config.attributes
	});
}

async function setClassDefaultLevel(className, level){
	let config = _getConfig();

	let classConfig = {};
	classConfig[`${className}_class_level`] =  level;
	const result =
		Object.keys(classConfig).length > 0
			? await Parse.Config.save(
			{ ...config, ...classConfig, updated: Date.now() }
			)
			: config;

	return result.attributes;
}

Parse.Object.setClassDefaultLevel =  setClassDefaultLevel;
