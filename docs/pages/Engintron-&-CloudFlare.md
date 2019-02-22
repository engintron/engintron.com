## Engintron & CloudFlare

Starting from version 1.6.0, the option to integrate CloudFlare with Engintron is a little simpler.

With the introduction of the "custom\_rules" Nginx configuration file, you have a fully documented way to setup CloudFlare for use with Engintron.

What you essentially need to do is set your server's IP addresses (the shared IP as well as any dedicated IPs pointing to certain domains) and then restart Nginx. All this process can be done entirely via the Engintron app in WHM.

And Engintron also includes a few handy redirect tools for HTTP to HTTPS (with exclusions of course) so you don't have to create page rules in CloudFlare for each domain or add .htaccess rules in Apache.

There are a few important things to remember though:

- If you use SSL via CloudFlare and you do not have SSL certificates installed on your cPanel server, make sure you choose "Flexible SSL" inside "Crypto" settings. This way all HTTPS traffic from CloudFlare will be proxied to your Nginx HTTP port (80). If you get redirect loops in your browser after you perform this change, it means PHP is forcing an HTTP to HTTPS redirect causing this loop because CloudFlare proxies HTTPS to HTTP yet PHP sees an HTTP response internally thus forcing a redirect again to HTTPS (and here's your loop).
- If you use SSL via CloudFlare and your domains also have SSL certificates installed on your cPanel server, make sure you choose "Strict SSL" or "Full SSL" inside "Crypto" settings. This way all HTTPS traffic from CloudFlare will be proxied to your Nginx HTTPS port (443).
- If you have domains on CloudFlare that map to dedicated IP addresses on your server, then you will have to apply separate definitions for each such domain inside your "custom\_rules" file. HTTP or HTTPS traffic being proxied to your server will now always be served from Nginx.

### SOME EXAMPLES

Here are some use case scenarios to help clear things up if all the above sound confusing to you...

- You have 10 websites on your cPanel server all sharing 1 IP address. However only 4 use CloudFlare. If you don't edit "custom\_rules" as mentioned previously, the CloudFlare domains won't work and you'll see 10xx error messages from CloudFlare. For that reason, you need to edit "custom\_rules" in Engintron's WHM app and in there add your shared IP address, then restart Nginx. CloudFlare domains should work fine now.
- You have 5 domains on your cPanel server sharing 1 IP address and one more domain which has a dedicated IP address because it has an SSL certificate assigned to it. Edit "custom\_rules" in Engintron's WHM app and apply the shared IP as in the previous example, but now make sure you also add a custom "if" block for the sixth domain which is attached to a dedicated IP. Inside this "if" block you'll define that domain's dedicated IP address. Now all domains should work fine.
- You have a mixed amount of domains on or off CloudFlare, with or without dedicated IPs and SSL certificates. Again the rules are simple. Define your main shared IP address in "custom\_rules" and then for each dedicated IP create "if" blocks per domain.