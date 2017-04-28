var slack_props = require('./slack_props.js'),
		fs = require('fs'),
		Slack = require('slack-node'),
		getIP = require('external-ip')(),
		Log = require('log'),
  	log = new Log('info', fs.createWriteStream('ip-notifier.log'));

getIP(function (err, ip) {
  if (err) {
    log.error("There was an error getting the server ip :: " + JSON.stringify(err, null, 4));
  }
  slack = new Slack();
	slack.setWebhook(slack_props.webhook_url);
 
	slack.webhook({
	  channel: "#server-ip",
	  username: "ip-bot",
	  text: "Good morning, KCL FTW. The current ip for the SideHustleDashboardServer is: " + ip
	}, function(err, response) {
		if(err){
			log.error("There was an error posting server ip to slack :: " + JSON.stringify(err, null, 4));
		}
		if(response){
			log.info("IP posted successfully :: " + JSON.stringify(response, null, 4));
		}
	});
});