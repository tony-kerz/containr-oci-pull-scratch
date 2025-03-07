module.exports = {
  containr: {
    images: {
      gcloud: {
        name: 'google/cloud-sdk:503.0.0-alpine',
        volumes: {
          ...(process.env.IS_LOCAL && {
            '/root/.config/gcloud': `${process.env.HOME}/.config/gcloud`,
          }),
        },
      },
      oras: {
        name: 'ghcr.io/oras-project/oras:v1.2.2',
        entrypoint: 'sh',
      },
    },
    work: {
      isInit: true,
    },
  },
  configr: {
    format: 'json',
  },
}
