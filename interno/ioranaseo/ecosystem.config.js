module.exports = {
  apps: [
    {
      name: 'ioranaseo',
      script: 'pnpm',
      args: 'start',
      cwd: '/opt/ioranaseo/interno/ioranaseo',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        IORANASEO_ENV: 'production',
      },
      // Auto restart on crash
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',

      // Logs
      out_file: '/var/log/ioranaseo-out.log',
      error_file: '/var/log/ioranaseo-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Health check
      watch: false,
      ignore_watch: ['node_modules', '.next', '.git'],

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true,
    },
  ],

  // Cluster mode for multiple instances (optional)
  // Change to: exec_mode: "cluster", instances: "max"
  // This will run on all CPU cores
};
