module.exports = {
  apps: [
    {
      name: 'ol-schedule',
      port: '3002',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
    },
  ],
}
