# ip notifier

This utility will post the external ip address of your machine to your slack channel. It was created to keep our team updated on the ip address of a server with a non-static ip that our isp likes to change regularly. You can set this up to run on a regular basis using a cron job.

To run, clone the repo, and `npm install` 

You will need a file in the root directory named `slack_props.js`
it needs to export the following variables:
`webhook_url` (the webhook url for your slack webhook)
`channel_name` (the channel name to post ip to)
`message` (message to be displayed before the ip)
`bot_name` (name of the bot to post)

Every time it runs it will log info to the `ip-notifier.log` file. This will be overwritten every time the bot executes.

The bot will run by executing the `npm start` command.