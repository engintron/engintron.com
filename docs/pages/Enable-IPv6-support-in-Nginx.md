## Enable IPv6 support in Nginx (for IPv6 capable servers)

_*** The following instructions apply to v1.8.7 (Build 20180119) and later..._

IPv6 support is by default commented out in Nginx's configuration files. That's because servers that do not yet support IPv6 will cause Nginx to report errors when checking its configuration:

```
Restarting Nginx...
nginx: [emerg] socket() [::]:80 failed (97: Address family not supported by protocol)
nginx: configuration file /etc/nginx/nginx.conf test failed
```

So, in order to avoid such errors, IPv6 support is commented out in 3 places in Nginx's and Engintron's files.

## Here's how to enable IPv6 support for Nginx in your server

First off, check that your server supports IPv6 connectivity (in a terminal, connected as root user).

```
test -f /proc/net/if_inet6 && echo "IPv6 supported" || echo "IPv6 not supported"
```

If the result to the above is "IPv6 supported", you're good to go.

Now, modify the following 3 files in Nginx/Engintron:

### a) /etc/nginx/nginx.conf
Let's enable using IPv6 resolvers first. 
```
#resolver                      8.8.8.8 8.8.4.4 [2001:4860:4860::8888] [2001:4860:4860::8844];
```
to this:
```
resolver                       8.8.8.8 8.8.4.4 [2001:4860:4860::8888] [2001:4860:4860::8844];
```

and below that, change this:
```
resolver                       8.8.8.8 8.8.4.4;
```
to this:
```
#resolver                      8.8.8.8 8.8.4.4;
```

### b) /etc/nginx/conf.d/default.conf
This is the main definition file for all HTTP traffic (on port 80). Around line 13, change this:
```
#listen [::]:80 default_server;
```
to this:
```
listen [::]:80 default_server;
```

### c) /etc/nginx/utilities/https\_vhosts.php
This is the file that generates the Nginx definition files for all HTTPS traffic (port 443). Around line 45, change this:
```
#listen [::]:'.NGINX_HTTPS_PORT.' ssl http2 default_server;
```
to this:
```
listen [::]:'.NGINX_HTTPS_PORT.' ssl http2 default_server;
```

and at around line 128, change this:
```
#listen [::]:'.NGINX_HTTPS_PORT.' ssl http2;
```
to this:
```
listen [::]:'.NGINX_HTTPS_PORT.' ssl http2;
```

To force the regeneration of all Nginx HTTPS vhosts, delete the related file (and it will be automatically re-generated):
```
rm -f /etc/nginx/conf.d/default_https.conf
```

## Final notes
After you edit the files above, purge Nginx's cache & temp files which will restart both Apache & Nginx.

And finally, test that Nginx is listening on IPv6 by executing this in the terminal (as root user):
```
netstat -tulpna | grep nginx
```

If you see "tcp6..." entries with Nginx on them, you're good to go!

## The fine print
Keep in mind that IPv6 connectivity is currently limited worldwide. For any visitor to browse websites through via IPv6 addresses, they MUST also have an IPv6 capable connectivity. If they don't, they can't see a thing.

Try this on your own: [https://test-ipv6.com/](https://test-ipv6.com/)

If you get "No IPv6 address detected", then your internet connection is not IPv6 capable and thus you won't be able to browse the IPv6 web.

Some useful links:
- [https://en.wikipedia.org/wiki/IPv6_deployment](https://en.wikipedia.org/wiki/IPv6_deployment)
- [https://www.google.com/intl/en/ipv6/statistics.html#tab=per-country-ipv6-adoption&tab=per-country-ipv6-adoption](https://www.google.com/intl/en/ipv6/statistics.html#tab=per-country-ipv6-adoption&tab=per-country-ipv6-adoption)

Keep this in mind if you plan on going IPv6 only for your server ;)