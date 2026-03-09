# GitLab CI/CD and Server Deploy — Setup Guide

This document explains how to set up GitLab CI/CD for each project and deploy to a server (SSH/rsync). It references the repository's existing `.gitlab-ci.yml` and provides examples and checklist items to get you running quickly.

## Overview

- The repository already contains a pipeline file: `.gitlab-ci.yml` (root).
- Pipeline stages: `install` → `lint` → `build` → `deploy`.
- The `deploy` job is optional and uses SSH + `rsync` to push files to a remote server. It only runs for branch `saif-dev` by default.

## Prerequisites

- A GitLab project with your repo pushed.
- A GitLab Runner (shared or project-specific) able to run Docker images (or shell if adapted).
- A remote server accessible via SSH with a user that can write to the target `DEPLOY_PATH`.

# GitLab CI/CD — Vercel and DigitalOcean (SSH) setup

This repo's CI has been adapted to support two deployment targets only: Vercel (managed platform) and a DigitalOcean (or any SSH-accessible) server using rsync. The CI will run builds and then deploy to one or both providers depending on which variables you configure in GitLab.

Files changed in this repo:

- `.gitlab-ci.yml` — now contains two conditional deploy jobs: `deploy_vercel` and `deploy_digitalocean`.

## Summary of how it works

- Build and lint run as normal on `saif-dev` (and `main` for build/lint by default).
- `deploy_vercel` runs only when the branch is `saif-dev` and `VERCEL_TOKEN` is set.
- `deploy_digitalocean` runs only when the branch is `saif-dev` and both `DEPLOY_HOST` and `SSH_PRIVATE_KEY` are set.

This keeps the pipeline safe: a deploy job won't attempt to run unless the required variables exist.

## Required GitLab variables (only the ones used here)

- For Vercel deploy:
    - `VERCEL_TOKEN` — a Vercel personal token (create in Vercel dashboard → Settings → Tokens). Keep it protected.

- For DigitalOcean/SSH deploy:
    - `SSH_PRIVATE_KEY` — private key content for the deploy user (paste the full private key). Mark as Protected if you want it only on protected branches.
    - `DEPLOY_USER` — user on the server (e.g., `deploy`, `ubuntu`).
    - `DEPLOY_HOST` — host or IP (e.g., `203.0.113.45`).
    - `DEPLOY_PATH` — absolute path on server where files should be put (e.g., `/var/www/my-site`).

Optional / recommended:

- `VERCEL_PROJECT_ID` / `VERCEL_ORG_ID` — only if you want to be explicit with Vercel CLI commands (not required if the project is already linked).
- `NODE_ENV` — override environment if needed.

Security notes

- Keep `VERCEL_TOKEN` and `SSH_PRIVATE_KEY` protected. Add the corresponding public key to `~/.ssh/authorized_keys` on the server for `DEPLOY_USER`.
- If you prefer a stricter host key policy, add the server's fingerprint in a protected variable and write it to `~/.ssh/known_hosts` in the pipeline instead of using `ssh-keyscan`.

## How Vercel deploy job works

- Installs `vercel` CLI globally, then runs `vercel --token "$VERCEL_TOKEN" --prod --confirm`.
- This requires either a linked Vercel project (recommended) or passing `--scope`/`--prod` and related flags; set `VERCEL_PROJECT_ID`/`VERCEL_ORG_ID` if needed.

If you want to restrict Vercel deploys manually, consider adding `when: manual` under `deploy_vercel` in `.gitlab-ci.yml`.

## How DigitalOcean (SSH) deploy job works

# GitLab CI/CD — Full A→Z Setup for Vercel and DigitalOcean (SSH)

This file is a hands-on A-to-Z setup guide that walks you step-by-step through:

- Preparing GitLab and project settings
- Adding required CI variables
- Creating a Vercel token and enabling Vercel deploys from GitLab CI
- Preparing a DigitalOcean droplet (Ubuntu) and configuring SSH/rsync deploys
- Verifying and troubleshooting

The repository contains an updated `.gitlab-ci.yml` that supports two conditional deploy jobs:

- `deploy_vercel` (runs when `VERCEL_TOKEN` exists)
- `deploy_digitalocean` (runs when `SSH_PRIVATE_KEY` and `DEPLOY_HOST` exist)

Follow the steps below exactly to get a fully working pipeline and server deploy.

## Quick summary (tl;dr)

1. Create GitLab project and push code.
2. Add `.gitlab-ci.yml` to repo root (already present in this repo).
3. For Vercel: create a Personal Token and add `VERCEL_TOKEN` in GitLab variables.
4. For DigitalOcean: create SSH key pair, add public key to server, add private key to GitLab as `SSH_PRIVATE_KEY`, set `DEPLOY_USER`, `DEPLOY_HOST`, `DEPLOY_PATH`.
5. Push to `saif-dev` branch to trigger CI; only deploy jobs with configured variables will run.

---

## Part A — GitLab project and runner

1. Create a new project (or use existing) in GitLab and push your repository.
2. Ensure a GitLab Runner is available for your project (shared runners are fine). Runners should support Docker (recommended) or shell executor if you adapt the CI file.
3. Confirm `package.json` contains `build` and `lint` scripts (this repo uses `npm run build` and `npm run lint`).

Commands to push code (example):

```bash
git add .gitlab-ci.yml
git commit -m "Add GitLab CI config"
git push origin saif-dev
```

Note: The pipeline is configured to run `build` and `lint` on `saif-dev` and `main`; deploy jobs trigger only if their variables are present.

---

## Part B — Vercel deploy (A→Z)

Vercel is recommended for Next.js apps. This guide uses the Vercel CLI within CI to trigger a deployment.

1. Create or log into your Vercel account: https://vercel.com
2. (Optional but recommended) Link your GitLab repo in Vercel or use `vercel link` from local to associate project settings.
3. Create a Personal Token in Vercel:
    - Vercel Dashboard → Settings → Tokens → Create Token
    - Give it a descriptive name (e.g., gitlab-ci-deploy)
4. In GitLab: Project → Settings → CI/CD → Variables, add:
    - Key: `VERCEL_TOKEN`
    - Value: (paste the token) — mark as "Protected" if you only want it available on protected branches

5. (Optional) Add `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` if you need explicit targeting. Usually `vercel link` makes this unnecessary.

6. The `.gitlab-ci.yml` deploy job runs `vercel --token "$VERCEL_TOKEN" --prod --confirm`. If you prefer non-prod or preview deploys, change flags accordingly.

7. Push to `saif-dev`:

```bash
git push origin saif-dev
```

8. In GitLab, open CI/CD → Pipelines, select the pipeline and view job logs for `deploy_vercel`. It will run only if `VERCEL_TOKEN` exists.

Common issues and fixes:

- Vercel CLI cannot find project: run `vercel link` locally, commit `.vercel` config, or pass `--scope`/`--confirm`/`--prod` with `VERCEL_PROJECT_ID`.
- Token rejected: regenerate token in Vercel and update GitLab variable.

Security tip: mark `VERCEL_TOKEN` as Protected and restrict branch protections in GitLab so tokens are not available to forks or untrusted branches.

---

## Part C — DigitalOcean droplet (server) prepare (A→Z)

This section describes creating a droplet and configuring it to receive deploys via `rsync` and run a Next.js production app.

1. Create a DigitalOcean Droplet (Ubuntu 22.04 LTS recommended). Choose a size that fits your traffic.
2. While creating, add an SSH public key (or you can add it later).
3. SSH into the droplet using the root user or the user you created:

```bash
ssh root@203.0.113.45
```

4. Create a non-root deploy user (recommended) and add sudo rights:

```bash
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
```

5. Add your public key to `/home/deploy/.ssh/authorized_keys` (from your local machine):

```bash
# on your local machine
ssh-copy-id -i ~/.ssh/gitlab_deploy_id_rsa.pub deploy@203.0.113.45
```

6. Set up basic server software (as `deploy` or via sudo): Node 18, build essentials, pm2, nginx (optional):

```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

# Install pm2 to run Node apps as a service
sudo npm install -g pm2

# Optional: nginx for reverse proxy
sudo apt-get install -y nginx

# Firewall (UFW) open only needed ports
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # if using nginx
sudo ufw enable
```

7. Create the target deploy directory and set ownership:

```bash
sudo mkdir -p /var/www/my-site
sudo chown deploy:deploy /var/www/my-site
```

8. (Optional) Setup nginx reverse proxy for Next.js (example config):

```nginx
server {
        listen 80;
        server_name example.com;

        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

Reload nginx after adding config:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

9. Create a systemd service for your Next.js app (example `my-site.service`):

```ini
[Unit]
Description=My Next.js App
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/my-site
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable the service later after first deploy:

```bash
sudo systemctl daemon-reload
sudo systemctl enable my-site
```

10. Test manually: SSH to server, create a small test app or run `npm ci && npm run build && npm start` to confirm Node and pm2/systemd run correctly.

---

## Part D — GitLab variables for DigitalOcean & Vercel (exact names)

In GitLab → Project → Settings → CI/CD → Variables add:

- For Vercel:
    - `VERCEL_TOKEN` = (your vercel token)
    - optional: `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`

- For DigitalOcean/SSH deploy:
    - `SSH_PRIVATE_KEY` = (private key content, e.g., `cat ~/.ssh/gitlab_deploy_id_rsa`)
    - `DEPLOY_USER` = `deploy`
    - `DEPLOY_HOST` = `203.0.113.45` (your server IP or hostname)
    - `DEPLOY_PATH` = `/var/www/my-site`

Set `SSH_PRIVATE_KEY` and `VERCEL_TOKEN` as Protected if you only want them available to protected branches.

How to paste a private key value safely:

```bash
cat ~/.ssh/gitlab_deploy_id_rsa
# copy the contents (do NOT add extra whitespace)
```

Paste into GitLab variable value field, choose "Protected" if desired, and save.

---

## Part E — Recommended `.gitlab-ci.yml` tweaks (artifact-driven deploy)

Recommended: deploy only built output (smaller, faster, safer). Replace the current rsync command in `deploy_digitalocean` with:

```yaml
script:
    - rsync -az --delete .next public package.json package-lock.json "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
```

After the first deploy, SSH into server and run:

```bash
cd /var/www/my-site
npm ci --production
# if using pm2:
pm2 start npm --name "my-site" -- start
# or use systemd service: sudo systemctl start my-site
```

To fully automate server restart from CI, you can add a small SSH command (use carefully):

```yaml
script:
    - rsync -az --delete .next public package.json package-lock.json "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
    - ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" "cd $DEPLOY_PATH && npm ci --production && pm2 restart my-site || pm2 start npm --name 'my-site' -- start"
```

Note: Embedding remote commands requires that the `DEPLOY_USER` has the required permissions. Mark `SSH_PRIVATE_KEY` as protected and be mindful of command safety.

---

## Part F — Triggering & verifying the pipeline

1. Commit and push your changes to `saif-dev`.
2. Open GitLab → CI/CD → Pipelines and watch the pipeline run.
3. Check job logs for `lint`, `build`, and the deploy job (either `deploy_vercel` or `deploy_digitalocean`).
4. For Vercel, check the Vercel dashboard for the deployment status and URL.
5. For DigitalOcean, SSH into the server and verify files exist in `$DEPLOY_PATH`, run `ls -la`, confirm `.next` and `public` exist, and check your systemd/pm2 process or nginx logs.

Useful commands for verification on the server:

```bash
# list deployed files
ls -la /var/www/my-site

# check pm2 processes
pm2 list

# check systemd service
sudo systemctl status my-site

# tail logs
sudo journalctl -u my-site -f
```

---

## Troubleshooting checklist

- Vercel token invalid: regenerate token in Vercel and update GitLab variable.
- Vercel CLI can't find project: run `vercel link` locally or pass explicit project/org flags.
- SSH authentication error: confirm the public key is in `/home/deploy/.ssh/authorized_keys` and GitLab `SSH_PRIVATE_KEY` matches private key.
- `rsync` permission errors: ensure `DEPLOY_USER` has write permission to `DEPLOY_PATH`.
- Host key verification errors: either use `ssh-keyscan -H` as the CI does, or add host fingerprint to runner known_hosts.
- Build fails in CI: run locally `npm ci && npm run build` to replicate and fix missing env vars or dependency issues.

---

## Final notes and suggestions

- Prefer deploying built artifacts only (`.next`, `public`) to reduce deploy time and risk.
- Use a process manager (pm2) or systemd for production to ensure the app restarts automatically.
- Consider using DigitalOcean App Platform or Docker if you prefer container-based deploys.
- Keep sensitive variables Protected and limit pipeline permissions for branches where possible.

If you want, I can:

- Update `.gitlab-ci.yml` to automatically run the remote `npm ci --production` and restart PM2 after rsync.
- Make deploys manual (add `when: manual`) so a human must confirm the deploy step.
- Add a `typecheck` and `test` stage to the pipeline for stricter quality gates.

---

File updated with full A→Z instructions for Vercel and DigitalOcean deploys.
