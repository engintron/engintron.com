## Troubleshooting Guide


### "Welcome to Nginx on Fedora" showing on all sites after upgrading Engintron or cPanel (aka Nginx from EPEL repo issue)

This issue surfaced after March 2018 and it basically boils down to Nginx being replaced by a copy referenced in the EPEL repository that some cPanel users/admins have added to their server.

Since the EPEL repo is quite popular in the CentOS community, it may be installed in your system by some other cPanel plugin or software package that required that repo.

The solution is to just re-install Engintron.


### Check if visitor IPs are properly logged in Apache after installing Engintron

Create a PHP file called **ip.php** and paste in this code snippet:

```
<?php
$serverIP = trim(file_get_contents("http://ipecho.net/plain"));
$loggedUserIP = $_SERVER["REMOTE_ADDR"];
$verdict = ($serverIP==$loggedUserIP) ? '<h2 style="color:red;">Verdict: NO</h2>' : '<h2 style="color:green;">Verdict: YES</h2>';
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="robots" content="noindex" />
        <title>Engintron Helpers | Are Visitor IPs Getting Properly Logged On My Server?</title>
        <style type="text/css">
            body {font-family:Helvetica, Arial, sans-serif;font-size:12px;color:#000;padding:0;margin:0;text-align:center;background:#fff;border-top:4px solid #000;}
            h1 {font-size:40px;padding:80px 0 0;}
            h2 {font-size:60px;padding:40px 0;text-decoration:underline;}
            table {width:800px;margin:20px auto;padding:0;border:0;}
            table tr th,
            table tr td {padding:20px;text-align:center;font-size:20px;}
            pre {text-align:left;width:800px;margin:20px auto;padding:10px;overflow:auto;border:1px solid #ccc;}
        </style>
    </head>
    <body>
        <h1>Are Visitor IPs Getting Properly Logged On My Server?</h1>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <th>Your server's IP address is</th>
                <th>Your IP address (as logged in the server) is</th>
            </tr>
            <tr>
                <td><?php echo $serverIP; ?></td>
                <td><?php echo $loggedUserIP; ?></td>
            </tr>
        </table>
        <?php echo $verdict; ?>
        <h3>Client &amp; Server Info</h3>
        <pre><?php print_r($_SERVER); ?></pre>
    </body>
</html>
```

Upload the file on some /public\_html folder in your cPanel server and visit the /ip.php page from the web.

**Is the verdict YES?** Then you're cool. Do you still NOT see visitor IPs in your Apache logs? Well, did you check in both files that Apache uses for HTTP and HTTPS traffic? These files are located in "/usr/local/apache/domlogs/" and named after this format respectively: domain.tld & domain.tld-ssl\_log

**Is the verdict NO?** Then the Apache module mod\_remoteip was either not properly installed or your Apache's configuration file overwrote the LogFormat changes done by Engintron to assist in proper IP logging. Try re-installing Engintron to fix the problem.


### How to uninstall other Nginx plugins for cPanel (before installing Engintron)

If you already have another Nginx plugin for cPanel installed on your server, it's best to remove it first, before installing Engintron. This way you'll have zero downtime and you essentially need not change any configuration file.

Below you can find uninstall methods for such plugins as users report them.

#### For Cpnginx (commercial)
Login to your server as root user via a terminal and then execute this to uninstall Cpnginx:
```
sh /etc/cpnginx/uninstall.sh
```

Or according to this [https://cpnginx.com/documentation/introduction.php#uninstallation](https://cpnginx.com/documentation/introduction.php#uninstallation) if you can locate the installer file (install.py), then execute this:
```
chmod 755 install.py &&  ./install.py remove
```

#### For Nginx Admin (also know as NginxCP) (free)
Login to your server as root user via a terminal and then execute this to uninstall Nginx Admin:
```
cd /usr/local/src
wget http://nginxcp.com/latest/nginxadmin.tar
tar xf nginxadmin.tar
cd publicnginx
./nginxinstaller uninstall
```
(taken from [https://www.nginxcp.com/installation-instruction/](https://www.nginxcp.com/installation-instruction/))


### Fix "localhost could not be resolved" entries in your Nginx log files

Until the following is merged with Engintron's codebase, here's a quick solution to fix the dreaded "localhost could not be resolved" entries in your Nginx log files.

Edit your "custom rules" file via Engintron's WHM app and at the bottom, add this block

```
if ($host ~ "localhost") {
    set $PROXY_DOMAIN_OR_IP "127.0.0.1";
}
```

Then simply restart both Apache & Nginx.

Voila :)


### Fix "110: Connection timed out" errors appearing in Nginx logs

"110: Connection timed out..." errors appearing in Nginx logs are usually related to a slow backend (=Apache & PHP). This usually results in "504 Gateway Timeout" errors in the frontend for actual site visitors.

There are 2 ways to solve this:

a) The quick & simple way is to bump the timeout values in Nginx's configuration so it waits more for the backend to respond. Current wait time is 180s (3 mins) but you can safely increase this say to 360s or more. Simply edit the file "proxy\_params\_common" and adjust "180s" in these 2 lines:
```
proxy_read_timeout            180s;
proxy_send_timeout            180s;
```

Then save and restart Apache/Nginx.

b) The better but harder way is to optimize your slow backend. This can be done by tuning the configuration files for Apache, MySQL, PHP and even the system itself. Have a look at the [Optimization Guides](https://engintron.com/docs/#/pages/optimization-guide-initial-whm-setup) for a great starting point.


### SSL certificate changes not visible in Nginx? Here's a possible explanation & solution

Whenever a SSL/TLS certificate change occurs, Apache's main configuration file changes and Nginx picks up these changes after 10 seconds (tops) in order to update its own configuration files.

There have been users that complained this process does not work for them or that they had to resort to extra restarts for both Apache and Nginx (or individually).

In reality, the Apache to Nginx sync process for HTTPS vhosts happens with a cron job that constantly checks the Apache configuration file (every 10 seconds) and if any changes are detected, Nginx will re-create its HTTPS vhosts and flush its cache and temp files.

So if the above process does not work for you, verify that your /etc/crontab file does not have a broken syntax. You may ask: how the heck could my main crontab file have its syntax broken. Well, before version 1.8.0 (if I recall properly), there was a configuration bug with the code editor used in Engintron's WHM app to edit that file. If you had edited this file back then, it would have saved your /etc/crontab file with the wrong line endings. Wrong line endings translate to a broken crontab file unfortunately, which means that any custom cron jobs specified in there will not work at all.

If that may have been the case for you or just to be sure, simply open the /etc/crontab file via the Engintron WHM app, check if everything is OK and just SAVE it. It's important to SAVE the file even if everything is OK.

After that, your server's crontab file will get the correct line endings and the main Engintron cron job used to sync HTTPS vhosts from Apache to Nginx will work again normally.
