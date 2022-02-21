# issue-tracker

> A GitHub App built with [Probot](https://github.com/probot/probot) that this is issue tracker app for support team

## Setup

```sh
# Install dependencies
npm install

# Run the bot3
npm start
```

## Docker

```sh
# 1. Build container
docker build -t issue-tracker .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> issue-tracker
```


## Install Github App on your repos

```sh
# 1. Visit the github app page
[UrbanPiper Bot](https://github.com/apps/issues-auto-bot)

# 2. Install the app by clicking on the install option 
Click on Install

# 3. Select the repos on which you want to install the app
Select all repos or select only the ones you want the bot to manage the actions.
# 4. Hurray !!!
Sit back and relax . You have successfully installed the app.
```

## Creating Slack Bot for easy slack nootifications
```sh
# 1. create a slack app at api.slack.com/apps
 create a app and select the channel you want to notifiy the messages to .
# 2 . after that slack will provide a webhook to send messages to that channel

# 3. Replace that web-hook url with the SLACK_HOOK variable in the env file.
```


## ENV file variables
```sh
# below is the list of variables present in the .env file 
WEBHOOK_PROXY_URL,
APP_ID,
PRIVATE_KEY,
WEBHOOK_SECRET, *(optional / required only if you added secret in the github app page)
GITHUB_CLIENT_ID,
GITHUB_CLIENT_SECRET,
DISABLE_DELAY,
TOKEN,
GITHUB_USERNAME,
SLACK_HOOK
```



## Contributing

If you have suggestions for how issue-tracker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Akhil Kamsala <87219018+akhilsdeportfolio@users.noreply.github.com>
