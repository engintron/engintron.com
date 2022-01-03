## Cron job to purge Nginx cache & temp files

If your /tmp directory is filling up daily with Nginx cache & temp files, you can add a cron job to purge these files daily.

Edit **/etc/crontab** (e.g. via Engintron's WHM app) and add this at the bottom of the file:

```
0 2 * * * root "/opt/engintron/engintron.sh purgecache" > /dev/null 2>&1
```

This will cleanup the cache at 2am every day.

If you ever uninstall Engintron, remember to remove that line.