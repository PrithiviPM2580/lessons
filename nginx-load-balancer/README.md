# Nginx Load Balancer

A demonstration project showcasing load balancing across multiple Node.js/Express backend instances using Nginx as a reverse proxy.

## Overview

This project sets up three separate Express.js server instances that run on different ports, with Nginx configured to distribute incoming requests across all three backends using a round-robin load balancing strategy.

## Architecture

```
Client Request (Port 8080)
         ↓
    Nginx Load Balancer
         ↓
    ┌────┴────┬────────┐
    ↓         ↓        ↓
Backend 1  Backend 2  Backend 3
(Port 3000) (Port 3001) (Port 3002)
```

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10.26.2 or compatible)
- **Nginx** installed on your system
  - Ubuntu/Debian: `sudo apt-get install nginx`
  - macOS: `brew install nginx`
  - Other systems: [Nginx Installation Guide](https://nginx.org/en/docs/install.html)

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd nginx-load-balancer
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the project root with the following variables:
```env
PORT1=3000
PORT2=3001
PORT3=3002
INSTANCE_ID1=1
INSTANCE_ID2=2
INSTANCE_ID3=3
```

## Configuration

### Nginx Configuration

The [nginx.conf](nginx.conf) file is configured to:
- Listen on port 8080
- Define an upstream group called `backend_servers` with three backend instances
- Proxy all requests to the backend servers using round-robin distribution

To use this configuration:

```bash
# Test the configuration
nginx -t -c /path/to/nginx-load-balancer/nginx.conf

# Start Nginx with this configuration
nginx -c /path/to/nginx-load-balancer/nginx.conf

# Or reload if Nginx is already running
nginx -s reload
```

### Backend Servers

Each backend server ([app1.js](src/app1.js), [app2.js](src/app2.js), [app3.js](src/app3.js)):
- Runs an Express.js application
- Responds with its instance ID
- Reads configuration from environment variables

## Usage

### Starting the Backend Servers

You need to run all three backend instances in separate terminal windows:

**Terminal 1:**
```bash
pnpm run dev1
```

**Terminal 2:**
```bash
pnpm run dev2
```

**Terminal 3:**
```bash
pnpm run dev3
```

Each server will start on its configured port (3000, 3001, 3002 by default).

### Starting Nginx

In another terminal, start Nginx with the provided configuration:

```bash
nginx -c $(pwd)/nginx.conf
```

### Testing the Load Balancer

Once all servers and Nginx are running, you can test the load balancer:

```bash
curl http://localhost:8080
```

You should see responses rotating through the three instances:
- `Welcome to Instance 1`
- `Welcome to Instance 2`
- `Welcome to Instance 3`

### Load Testing

The project includes autocannon for load testing. To run a load test:

```bash
pnpm run load-test
```

This will:
- Send concurrent requests (30 connections)
- Run for 10 seconds
- Target http://localhost:8080
- Show performance metrics including requests/second and latency

## Project Structure

```
nginx-load-balancer/
├── src/
│   ├── app1.js          # Backend instance 1
│   ├── app2.js          # Backend instance 2
│   ├── app3.js          # Backend instance 3
│   └── routes/
│       └── index.js     # Shared route definitions
├── nginx.conf           # Nginx load balancer configuration
├── package.json         # Project dependencies and scripts
├── design.excalidraw    # Architecture diagram
└── README.md           # This file
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev1` | Start backend instance 1 on port 3000 |
| `pnpm run dev2` | Start backend instance 2 on port 3001 |
| `pnpm run dev3` | Start backend instance 3 on port 3002 |
| `pnpm run load-test` | Run performance load test against the load balancer |

## Stopping the Services

### Stop Nginx:
```bash
nginx -s stop
```

### Stop Backend Servers:
Press `Ctrl+C` in each terminal running a backend instance.

## Load Balancing Strategies

The current configuration uses **round-robin** (default), but Nginx supports other strategies:

- **Least Connections**: `least_conn;` - Routes to server with fewest active connections
- **IP Hash**: `ip_hash;` - Routes based on client IP (session persistence)
- **Weighted**: Add `weight=N` parameter to servers for uneven distribution

Example with weights:
```nginx
upstream backend_servers {
    server localhost:3000 weight=3;
    server localhost:3001 weight=2;
    server localhost:3002 weight=1;
}
```

## Troubleshooting

### Port Already in Use
If you get an "EADDRINUSE" error, another process is using the port. Find and kill it:
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### Nginx Configuration Errors
Test your configuration before starting:
```bash
nginx -t -c $(pwd)/nginx.conf
```

### Check Nginx Logs
```bash
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

## License

ISC

## Author

This project is for educational purposes, demonstrating load balancing concepts with Nginx and Node.js.
