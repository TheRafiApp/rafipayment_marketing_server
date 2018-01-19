# RafiPay Public Site Server

Super simple express server to handle email inputs and send to the MailChimp API, saving to a mailing list.


## Development

It is possible to run using `export NODE_ENV=dev && npm start`, but better to run in Docker

```
docker-compose -f docker-compose.dev.yml up --build
```

## Deployment

Uses `post-receive` git hook to rebuild the container using `docker-compose`