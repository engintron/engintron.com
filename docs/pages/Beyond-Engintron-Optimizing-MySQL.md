## Optimizing MySQL

cPanel ships with MySQL un-optimized by default. This is not to ensure compatibility, it's just a process that requires some manual intervention, which is out of the scope of let-cPanel-do-everything that cPanel follows :)

If you use Engintron, you'll notice there's an option to directly edit MySQL's my.cnf file - which is the main configuration file for MySQL. If you don't use Engintron (really?), then simply edit that file (it's located under /etc/my.cnf) using "nano" or an SFTP connection to the root directory of your server, so you can download, edit and then re-upload this file.

Let's assume you use Engintron (the easy way).

In Engintron's WHM app click on "Edit my.cnf". Copy the contents of the editor (your current my.cnf configuration) in a text file in case you need to revert back.

Next copy the optimized MySQL configuration which you can find here: [https://gist.github.com/fevangelou/0da9941e67a9c9bb2596](https://gist.github.com/fevangelou/0da9941e67a9c9bb2596)

Now paste that into the editor window in Engintron's WHM app.

Depending on your CPU count and RAM, adapt the configuration based on the comments it has next to each value. If there is no comment beside a value, you don't need to change it.

Once you're ready, save your edits and check the box to restart MySQL. After that, MySQL will use the new configuration.

Now, check your sites. They should work. If they don't, you'll have to check the MySQL error log located at /var/lib/mysql/mysql\_error.log

Also consult the my.cnf comments at the top for additional troubleshooting.