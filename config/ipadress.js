module.exports = {
	////The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
		//var host = (process.env.VCAP_APP_HOST || 'localhost');
		////The port on the DEA for communication with the application:
		//var port = (process.env.VCAP_APP_PORT || 3000);
		//Start server
    'host' : (process.env.VCAP_APP_HOST || 'localhost'),
    'port' : (process.env.VCAP_APP_PORT || 3000),
  //VCAP_SERVICES contains all the credentials of services bound to
  //this application. For details of its content, please refer to
  //the document or sample of each service.
    'appInfo' : JSON.parse(process.env.VCAP_APPLICATION || "{}"),
  //There are many useful environment variables available in process.env.
  //VCAP_APPLICATION contains useful information about a deployed application.
    'services' : JSON.parse(process.env.VCAP_SERVICES || "{}")
 };
