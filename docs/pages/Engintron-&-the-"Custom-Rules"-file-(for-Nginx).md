## Engintron & the "Custom Rules" file (for Nginx)

Engintron ships with a "Custom Rules" configuration file to allow you to set (you guessed right) your own custom rules for Nginx.

Some examples include:
- Engintron & CloudFlare
- HTTP to HTTPS redirects when using CloudFlare
- Setting up domains with dedicated IPs on the system
- Cache exclusions for domains, subdomains or even directories
- Any other global or domain specific rule (redirect, process etc.)

The "Custom Rules" file is constantly updated with every release of Engintron to include new examples of what's possible. Be sure to check it our here: [https://github.com/engintron/engintron/blob/master/nginx/custom_rules](https://github.com/engintron/engintron/blob/master/nginx/custom_rules)

Below we cover a few use cases for such custom rules in Nginx.

Remember that you should edit the "Custom Rules" file via Engintron's WHM app. Engintron will **NEVER** overwrite that file and it will always allow you to see the default "custom rules" file shipping with Engintron in case you wish to view what's been added/enabled s a feature or in case you mess up your rules and wish to revert changes.


### FOR USE WITH CLOUDFLARE

a) If your server has a single shared IP ONLY and you wish to use CloudFlare for any (or all) of your sites you will have to specify this shared IP address below otherwise you'll get errors from CloudFlare. This change will simply tell Nginx to skip DNS resolving and simply forward traffic to the shared IP.

Within your "Custom Rules" file, add the following line if all your sites on the shared (main) IP of your server are on CloudFlare:
```
set $PROXY_DOMAIN_OR_IP "XXX.XXX.XXX.XXX"; # Use your cPanel's shared IP address here
```

b) If you utilize CloudFlare on a cPanel server with BOTH a shared IP and dedicated IPs for domains, you will have to set the IP ONLY for each such domain at the "WHEN TO SPECIFY A DOMAIN IP" section lower in this file.

c) It is possible to force-redirect all your domains on CloudFlare to HTTPS if you have TLS/SSL enabled in CloudFlare's "Crypto" settings page. Make sure you use "Flexible SSL" there so CloudFlare proxies traffic from HTTPS to Nginx's HTTP port (80). This way you'll also be able to serve sites over HTTPS with no actual TLS/SSL certificate installed on the server, as long as they exist in CloudFlare and have CloudFlare's shared TLS/SSL certificate enabled there. To redirect to HTTPS, simply specify a block similar to the one below and make sure you set the domains you DO NOT want to automatically redirect to HTTPS.
```
# Protocol redirect handling when using CloudFlare [start]
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

# Protocol redirect handling when using CloudFlare [finish]
```


### WHEN TO SPECIFY A DOMAIN IP
By default, Nginx will redirect requests to the right domain IP by using DNS resolving. However there are cases where you want to specify an IP for use with Nginx:
- When you use CloudFlare for certain domains only on your server, regardless of whether these domains use the server's shared IP or a dedicated IP.
- When you are working on a domain which does not yet (DNS) resolve to your server, but you want to access it by modifying your computer's "hosts" file.

To specify the domain IP in such cases, simply enter a domain or subdomain in an "if" block (as shown below) and inside that block set the appropriate shared or dedicated IP to point to.

To specify the IP for a domain simply add the following 3 lines and make sure you replace example.com with your actual domain or subdomain and also replace XXX.XXX.XXX.XXX with the actual IP assigned to that domain. To specify the IP for more domains, simply copy that "if" block (per domain) and change accordingly.
```
if ($host ~ "example.com") {
    set $PROXY_DOMAIN_OR_IP "XXX.XXX.XXX.XXX";
}
```


### DOMAIN AND URL PATH EXCLUSIONS FROM CACHING
If you wish to exclude certain domains, subdomains or even full URL paths from micro-caching and/or static file caching, simply specify them below and use a colon (|) character as a separator. Remember that if you specify a "naked" domain name, e.g. mynicedomain.com, every subdomain e.g. support.mynicedomain.com will also be excluded from caching. Decide wisely!

If you wish to disable ONLY micro-caching, then comment the line "set $CACHE\_BYPASS\_FOR\_STATIC".
If you wish to disable ONLY static file caching, then comment the line "set $CACHE\_BYPASS\_FOR\_DYNAMIC".

Note: Don't include the "http(s)://" portion of a URL.

```
if ($SITE_URI ~* "example.com|example2.com/path|example3.com/some/other/path|subdomain.example4.com") {
    set $CACHE_BYPASS_FOR_DYNAMIC 1; # Disables micro-caching
    set $CACHE_BYPASS_FOR_STATIC 1; # Disables static file caching
}
```