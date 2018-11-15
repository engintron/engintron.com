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