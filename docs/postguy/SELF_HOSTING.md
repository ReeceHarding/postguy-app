# Postguy setup and operations

This guide records the checked-out source workflow. A production deployment is not configured. The upstream production Compose file currently references a prebuilt upstream image and contains example credentials, so do not use it unchanged for a public Postguy instance.

## Local development

Requirements at the pinned checkout: Node.js 22.12.x (the root package requires `>=22.12.0 <23`), pnpm 10.6.1, Docker Desktop with Compose, and enough memory for PostgreSQL, Redis, Temporal and Elasticsearch.

1. Install dependencies from the repository root:

   ```sh
   corepack pnpm@10.6.1 install --frozen-lockfile
   ```

2. Create a root `.env` (ignored by Git) with local-only values. Start from the required settings in `.env.example`, set a long random `JWT_SECRET`, and use local URLs. The current app uses `FRONTEND_URL=http://localhost:4200`, `NEXT_PUBLIC_BACKEND_URL=http://localhost:3000`, `BACKEND_INTERNAL_URL=http://localhost:3000`, a PostgreSQL `DATABASE_URL`, `REDIS_URL=redis://localhost:6379`, `TEMPORAL_ADDRESS=localhost:7233`, `TEMPORAL_NAMESPACE=default`, `STORAGE_PROVIDER=local`, and a writable `UPLOAD_DIRECTORY`. The local port depends on your machine; this checkout used 5433 because another PostgreSQL server already owned 5432. Do not put real provider keys in a shared file.

3. Start only the local dependencies:

   ```sh
   docker compose -f docker-compose.dev.yaml up -d postiz-postgres postiz-redis temporal-postgresql temporal-elasticsearch temporal
   ```

4. Push the Prisma schema to the empty local database, then start the source apps:

   ```sh
   pnpm run prisma-db-push
   pnpm run dev
   ```

   The workspace dev command starts the frontend, API, scheduler/orchestrator, and browser extension development process. No social platform app keys, email provider, AI service, cloud storage, or paid plan is part of the local baseline.

5. Check the UI at `http://localhost:4200`, public policy pages at `/privacy` and `/terms`, and the API root at `http://localhost:3000/` (expected response: `App is running!`). The root controller is only a process check; it does not verify PostgreSQL, Redis, Temporal, storage, or provider readiness.

For local draft and upload exercises, use a test-only account and clearly non-public sample media. Do not connect Reece’s social accounts or submit a public post without separate approval.

## Production requirements

The source is a multi-service system: frontend/API container, PostgreSQL, Redis, Temporal server, Temporal persistence database and Elasticsearch visibility store. Keep the Postgres data, uploads and configuration on durable storage with restricted access. Use a private network for internal services. The API and web UI need stable HTTPS origins for OAuth and secure cookies. Never use a callback domain until Reece has verified and confirmed it.

Before exposing an instance:

- Build the image from this modified checkout; do not pull the upstream Postiz image as the Postguy app.
- Replace example passwords and placeholder secrets with generated, unique values in the deployment secret manager. Keep `JWT_SECRET` private and include it in protected backup recovery.
- Configure actual public `MAIN_URL`, `FRONTEND_URL` and `NEXT_PUBLIC_BACKEND_URL` origins, reverse-proxy TLS, storage path and OAuth redirect URLs. The project does not have a verified public hostname yet.
- Restrict registration if the instance is private. Configure email before relying on password resets, invitations or notifications.
- Configure each social developer app and individual channel authorization separately. Leave unapproved provider flows unavailable; do not add production credentials before platform review.
- Review optional email, AI, analytics, object storage, short-link, media-processing, telemetry and payment providers individually. Usage may be charged by those providers. The no-cost baseline has none configured.
- Add a public source URL for this modified AGPL application before serving a network-hosted instance.

See the official [Postiz self-host guide](https://docs.postiz.com/self-host/overview) and [configuration reference](https://docs.postiz.com/self-host/configuration/reference) for upstream service configuration. Re-check those docs against the pinned source before an upgrade.

## Backup and restore

Take backups before upgrades and on an operator-defined schedule. A database backup alone does not include uploaded media.

Example when PostgreSQL is reachable from the host and `DATABASE_URL` is set in the protected shell:

```sh
pg_dump --format=custom --no-owner --file=postguy-db-$(date +%Y%m%d).dump "$DATABASE_URL"
tar -czf postguy-uploads-$(date +%Y%m%d).tar.gz "$UPLOAD_DIRECTORY"
```

Keep backups encrypted and access-restricted. Test them by restoring into a separate empty database and a separate upload directory; verify login, media previews, schedules and channel records before switching production traffic. Preserve the matching `JWT_SECRET` securely or stored integration credentials may no longer decrypt.

To restore, stop writers, create a fresh empty database, restore with `pg_restore --no-owner --dbname=<empty-restore-database> <backup.dump>`, extract media to the matching upload path, set the exact `JWT_SECRET`, and then start the restored stack. Do not point a test restore at a live production database.

## Updates

The local clone is pinned to the recorded baseline in `BASELINE_AUDIT.md`. For an upstream update, fetch and inspect the upstream release and migration notes, compare its commits with the Postguy branch, merge in a review branch, resolve branding/security changes, back up data, build and run the full UI flow against a restored test database, then deploy the reviewed image. Do not reset this modified branch to upstream.

## Health and troubleshooting

- Frontend unavailable: verify the frontend server/container and `FRONTEND_URL`; inspect its runtime logs without printing environment variables.
- API root does not respond: check `http://localhost:3000/`, backend logs, database connection and migrations.
- Posts remain queued: check Temporal is healthy, `TEMPORAL_ADDRESS` and namespace match, and the orchestrator is running. Check Redis and database availability.
- Uploads fail or disappear: verify `STORAGE_PROVIDER`, `UPLOAD_DIRECTORY` permissions, mounted volume persistence and the browser-visible upload route.
- OAuth callback mismatch: compare the exact configured provider callback with `FRONTEND_URL/integrations/social/<provider>`; TikTok Business uses a trailing slash. Confirm the origin is HTTPS and registered with the platform.
- Publishing errors: distinguish local validation, provider submission, asynchronous processing and confirmed platform outcomes. Reconnect expired credentials only through the platform’s official flow.
- Missing emails: configure the selected email provider, sender identity and its current policy. Do not present email features as configured when no provider is set.
- Optional AI/media feature unavailable: inspect its service-specific keys, quota, region and billing status; these features are not part of the free baseline.

This file does not certify a production deployment, backup restore, high availability, monitoring, security audit or provider approval.
