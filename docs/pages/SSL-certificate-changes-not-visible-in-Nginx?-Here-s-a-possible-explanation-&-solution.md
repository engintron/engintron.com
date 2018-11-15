Whenever a SSL/TLS certificate change occurs, Apache's main configuration file changes and Nginx picks up these changes after 10 seconds (tops) in order to update its own configuration files.

There have been users that complained this process does not work for them or that they had to resort to extra restarts for both Apache and Nginx (or individually).

In reality, the Apache to Nginx sync process for HTTPS vhosts happens with a cron job that constantly checks the Apache configuration file (every 10 seconds) and if any changes are detected, Nginx will re-create its HTTPS vhosts and flush its cache and temp files.

So if the above process does not work for you, verify that your /etc/crontab file does not have a broken syntax. You may ask: how the heck could my main crontab file have its syntax broken. Well, before version 1.8.0 (if I recall properly), there was a configuration bug with the code editor used in Engintron's WHM app to edit that file. If you had edited this file back then, it would have saved your /etc/crontab file with the wrong line endings. Wrong line endings translate to a broken crontab file unfortunately, which means that any custom cron jobs specified in there will not work at all.

If that may have been the case for you or just to be sure, simply open the /etc/crontab file via the Engintron WHM app, check if everything is OK and just SAVE it. It's important to SAVE the file even if everything is OK.

After that, your server's crontab file will get the correct line endings and the main Engintron cron job used to sync HTTPS vhosts from Apache to Nginx will work again normally.