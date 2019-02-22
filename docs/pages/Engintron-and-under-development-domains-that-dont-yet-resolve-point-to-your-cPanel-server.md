## Engintron & (under development) domains that don't yet resolve (point) to your cPanel server

By default, Nginx will redirect requests to the right domain IP.

However there are cases where you want to enter a dedicated IP for use with Nginx:

- When you use CloudFlare and sites with dedicated IPs
- When you are working on a domain which does not yet resolve to your server, but you want to access it by modifying your computer's "hosts" file.

To use such domain exclusions, edit your "Custom Rules" file in the Engintron WHM app and simply enter a domain or subdomain in an "if" block (as shown below) and inside that block set the right shared or dedicated IP to point to.

To exclude domain "example.com", uncomment the following 3 lines and make sure you replace example.com with your actual domain or subdomain and also replace XXX.XXX.XXX.XXX with your actual dedicated or shared IP (depending on the exclusion scenario). Repeat the process for more domains.

```
if ($host ~ "example.com") {
    set $PROXY_DOMAIN_OR_IP "XXX.XXX.XXX.XXX";
}
```
