This repository is an example of using HAPI.js and prom-client.

To use:
- npm install
- npm start

Routes:
- http://localhost:3000 : used to increment the root counter metric
- http://localhost:3000/metrics : the metrics page that can be used with Prometheus

This server essentially serves page that can be use with Prometheus for scraping metrics. These
metrics can then be translated into something visual via Grafana dashboards.
