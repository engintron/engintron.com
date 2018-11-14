_The following post was contributed by user [@cloudunboxed-olorinhenderson](https://github.com/cloudunboxed-olorinhenderson)..._

I have edited Engintron's Nginx config to support true, native HTTPS offloading so that Apache only and always receives HTTP traffic. Equally, HTTPS is correctly handled with Apache's backend application so it functions seamlessly without knowing SSL is offloaded to Nginx only.

Here is what I did:

1. Edit /etc/apache2/conf.d/includes/pre_virtualhost_global.conf and append:
`SetEnvIf Ssl-Offloaded 1 HTTPS=on`

2. Edit /etc/nginx/common_https.conf and change:
`set $PROXY_TO_PORT 8443;` to `set $PROXY_TO_PORT 8080;`

3. Also in /etc/nginx/common_https.conf added the ssl-offloaded header to the location backend block:
```
location @backend {
    include proxy_params_common;
    # === MICRO CACHING ===
    # Comment the following line to disable 1 second micro-caching for dynamic HTML content
    include proxy_params_dynamic;
    proxy_set_header Ssl-Offloaded "1"; # Added custom "ssl-offloaded" header for Apache
    proxy_set_header X-Forwarded-Port 443;
}
```

4. Edit /etc/nginx/proxy_params_common to update proxy_pass:
`proxy_pass http://$PROXY_DOMAIN_OR_IP:8080;`


**So what are we actually doing here?**
- Step 1, we are defining Apache's behaviour when it sees the 'Ssl-Offloaded' header. With its presence, Apache knows the traffic it is receiving is already secured with HTTPS, so it treats the request like it is https:// accordingly, even though the request is _really_ http:// from nginx.
- Step 2, we are telling nginx to stop sending traffic to 8443 (Apache's https port) and instead send it to 8080 (Apache's http port).
- Step 3, we are telling nginx to set the 'Ssl-Offloaded' header so Apache knows the request is secured. Adding X-Forwarded-Port helps sites that force-rewrite to https in their .htaccess.
- Step 4, we are rewriting all requests in nginx to always go to http:// and the Apache http port, even if they are https. This ultimately means nginx does all the hard work with SSL, so that Apache, who is not so optimised at this, doesn't need to do the same job twice.

**The question is, does it work?**
Yes, it does! I have tested this with a plethora of sites including Wordpress, Magento, Joomla, SilverStripe and custom PHP. I cannot envisage any problems with this setup, but the benefits are HUGE. After enabling this on a busy server, CPU utilisation dropped by 20-30% compared to the previous day, at relative traffic levels.

**Any caveats?**
Glad you asked. The only I have come across is with sites using a force-rewrite to https in their .htaccess file. Typically, the code used would be:
```
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
However, since Apache has SSL offloaded and therefore it is not handing HTTPS itself, and this activity is happening directly inside Apache (not PHP, Python, Ruby etc who are already informed about HTTPS), this code will produce a redirect loop. The solution is to use the following .htaccess code instead:
```
RewriteCond %{HTTP:X-Forwarded-Port} !=443
RewriteRule .* https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
```

**One more thing!**
This is slightly unrelated, but sysadmins do note... when using Engintron's Nginx in front of Apache, we should remove mod_deflate from EasyApache 4. Otherwise, we will waste CPU cycles by GZIPing content twice on the web server (once on Apache, once on nginx) for no reason. This will give a very slight performance boost.