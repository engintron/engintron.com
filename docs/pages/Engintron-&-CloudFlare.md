## Engintron & CloudFlare

Both CloudFlare and Engintron's Nginx operate as web proxies. This may cause connectivity issues (10xx errors in CloudFlare) - more info can be found here: [https://support.cloudflare.com/hc/en-us/articles/360029779472](https://support.cloudflare.com/hc/en-us/articles/360029779472)

To resolve such issues, you need to edit Engintron's "custom\_rules" file and add IP references to affected domains.

All the configuration examples below should be placed inside Engintron's "custom\_rules" file, either via Engintron's WHM app (easiest method) or directly modifying the file /etc/nginx/custom\_rules and then restarting Nginx via terminal (with "service nginx restart").

### cPanel server with a single shared IP

If your server has a single shared IP ONLY and you wish to use CloudFlare for any (or all) of your sites, you will have to specify this shared IP address in your "custom\_rules" file. This change will simply tell Nginx to skip DNS resolving and just forward traffic to the shared IP.

Here's what you'd add at the bottom of your "custom\_rules" file (replace 1.2.3.4 with your actual shared IP):
```
set $PROXY_DOMAIN_OR_IP "1.2.3.4"; # Use your cPanel's shared IP address here
```

### cPanel server with multiple IPs
If you utilize CloudFlare on a cPanel server with BOTH a shared IP and dedicated IPs for domains, you will have to set the IP for each such domain ONLY.

For example:
```
if ($host ~ "some-domain-on-cloudflare.com") {
    set $PROXY_DOMAIN_OR_IP "1.2.3.4";
}
```

Again make sure you replace the domain name in the example (some-domain-on-cloudflare.com) & 1.2.3.4 with the actual domain name & dedicated IP respectively.

### Real-world examples

Here are some use case scenarios to help clear things up if all the above sound somewhat confusing to you...

- You have 10 websites on your cPanel server, all sharing 1 IP address. However only 4 use CloudFlare. If you don't edit "custom\_rules" as mentioned previously, the CloudFlare domains won't work and you'll see 10xx error messages from CloudFlare. For that reason, you need to edit "custom\_rules" in Engintron's WHM app and in there add your shared IP address, then restart Nginx. CloudFlare domains should work fine now, along with the rest of your domain that are not on CLoudFlare.
- You have 5 domains on your cPanel server sharing 1 IP address and one more domain which has a dedicated IP address because it has an SSL certificate assigned to it. Edit "custom\_rules" in Engintron's WHM app and apply the shared IP as in the previous case, but now make sure you also add a custom "if" block for the sixth domain which is attached to a dedicated IP. Inside this "if" block you'll define that domain's dedicated IP address. Now all domains should work fine.
- You have a mixed amount of domains on or off CloudFlare, with or without dedicated IPs and SSL certificates. Again the rules are simple. Define your main shared IP address in "custom\_rules" and then for each dedicated IP create "if" blocks per domain.

### I'm reselling cPanel so I don't know which domain uses CloudFlare

In this case you'll have to create a script to automate the process of creating these routing rules. It's no easy task for sure, but it's beyond the scope of what Engintron can do for most cPanel server users.

In the future, Engintron may include such a script to cover this use case as well.

### Force redirect all domains on CloudFlare to HTTPS

It is possible to force-redirect all your domains on CloudFlare to HTTPS if you have TLS/SSL enabled in CloudFlare's "Crypto" settings page.

Make sure you use "Flexible SSL" there so CloudFlare proxies traffic from HTTPS to Nginx's HTTP port (80). This way you'll also be able to serve sites over HTTPS with no actual TLS/SSL certificate installed on the server, as long as they exist in CloudFlare and have CloudFlare's shared TLS/SSL certificate enabled there.

To redirect to HTTPS, simply specify a block similar to the one below and make sure you set the domains you DO NOT want to automatically redirect to HTTPS.

```
# === Protocol redirect handling when using CloudFlare [start] ===

set $redirToSSL "";
if ($http_cf_visitor ~ '{"scheme":"http"}') {
    set $redirToSSL "on";
}

# Set each domain you DO NOT want to automatically redirect to HTTPS when using CloudFlare only below
# and repeat the process with additional "if" blocks for more domains

if ($host ~ 'domain-to-exclude-from-redirect.com') {
    set $redirToSSL "off";
}
if ($redirToSSL = "on") {
    return 301 https://$host$request_uri;
}

# === Protocol redirect handling when using CloudFlare [finish] ===
```
