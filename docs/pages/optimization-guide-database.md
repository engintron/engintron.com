## Optimizing MySQL/MariaDB

cPanel ships with a failry basic configuration for MySQL or MariaDB.

This configuration simply does not scale, nor is it suitable for all servers.

90% of the times, the database will be your server's performance bottleneck.

If you use Engintron, you'll notice there's an option to directly edit the database's main configuration file (located in /etc/my.cnf).

Backup your current my.cnf configuration as its displayed there in some text file, in case you need to revert back.

Next copy the optimized database configuration which we are maintaining here:

[https://gist.github.com/fevangelou/0da9941e67a9c9bb2596](https://gist.github.com/fevangelou/0da9941e67a9c9bb2596)

Now paste that into the editor window in Engintron's WHM app.

Depending on your CPU count and RAM, adapt the configuration based on the comments it has next to each value. If there is no comment beside a value, you most likely don't need to change it at all.

Once you're ready, save your edits and the new configuration will now be applied (after a few seconds).

Now, check your sites. They should work. If they don't, you'll have to check the database error log located at /var/lib/mysql/mysql\_error.log

Also consult the my.cnf comments at the top of the file for additional guidance/troubleshooting.
