# issue-tracker

> A GitHub App built with [Probot](https://github.com/probot/probot) that this is issue tracker app for support team

## Setup

```sh
# Install dependencies
npm install

# Run the bot
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
[https://github.com/apps/issues-auto-bot]

# 2. Install the app by clicking on the install option 
Click on Install

# 3. Select the repos on which you want to install the app
Select all repos or select only the ones you want the bot to manage the actions.
# 4. Hurray !!!
Sit back and relax . You have successfully installed the app.
```


## Contributing

If you have suggestions for how issue-tracker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Akhil Kamsala <87219018+akhilsdeportfolio@users.noreply.github.com>
