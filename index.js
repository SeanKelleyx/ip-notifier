var slack_props = require('./slack_props.js'),
		fs = require('fs'),
		Slack = require('slack-node'),
		getIP = require('external-ip')(),
		Log = require('log'),
  		log = new Log('info', fs.createWriteStream('ip-notifier.log'));

getIP(function (err, ip) {
	if (err) {
		log.error("There was an error getting the server ip :: " + JSON.stringify(err, null, 4));
	}else{
		var lastIp = fs.readFileSync('lastIp.txt', 'UTF8');
		log.info('Last recorded IP was ' + lastIp + ' today the IP is ' + ip);
		if(ip != lastIp){
			slack = new Slack();
			slack.setWebhook(slack_props.webhook_url);
 
			slack.webhook({
				channel: slack_props.channel_name,
				username: slack_props.bot_name,
				text: slack_props.message + ip
			}, function(err, response) {
				if(err){
					log.error("There was an error posting server ip to slack :: " + JSON.stringify(err, null, 4));
				}
				if(response){
					log.info("IP posted successfully :: " + JSON.stringify(response, null, 4));
					fs.writeFile('lastIp.txt', ip);
				}
			});
		}else{
			log.info("IP hasn\'t changed, not notifying slack channel");
		}
	}
});
