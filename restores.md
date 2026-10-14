# Restores

- [[postgres]]
  - ```pgsql < date.db```
  - [[social coop]]: restored `mastodon-live` on [[paramita]] onto [[teras]] using `data_directory = '/media/flancian/teras/postgres'` and `pg_restore`. Codified in [[social coop ansible]]: `docs/restore-postgres-database.md` and `scripts/restore-from-s3.sh`.
- [[mysql]]
  - ```mysql db < date.db```
- [[pull]] [[backups]]
  - so you have something to restore.



