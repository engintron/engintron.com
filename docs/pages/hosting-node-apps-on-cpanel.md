## Hosting Node apps on cPanel with the help of Engintron

One of the nice-to-have things with Engintron is that it makes it a breeze to proxy requests to any port in your server, supporting apps that would never otherwise work with standard cPanel domains.

Such an example is a Node.js app running on port 3000 or ElasticSearch, a popular search engine written in Java (works on port 9200), which usually comes with frontends that also work on non-standard web ports (e.g. Cerebro uses port 9000).

If you want to proxy both HTTP and HTTPS traffic to a given app, you have to do 2 things:

1. First create a domain or subdomain in cPanel for the app, even if you don't need to host the app within the typical folder structure in cPanel. This way you allow cPanel to create a domain reference so it can utilize AutoSSL and therefore have an SSL certificate issued for that domain/subdomain. Of course, to resolve (owner) permission issues, you should at least have your app inside the given user's home folder (/home/USERNAME/).

2. Then create a proxying rule in Engintron's "Custom Rules" (in WHM > Plugins > Engintron) and define the internal app port as well as the protocol (e.g. if you need to enforce HTTP because your app does not "speak" HTTPS):

An example rule for a Node.js app that needs to respond to a naked or www subdomain would be:
```
if ($host ~ "mynodeapp.com") {
    set $PROXY_SCHEME "http";
    set $PROXY_TO_PORT 3000;
}
```

If you want the app to proxy a certain subdomain, make the rule stricter (replacing ~ with =):
```
if ($host = "app.mynodeapp.com") {
    set $PROXY_SCHEME "http";
    set $PROXY_TO_PORT 3000;
}
```

In both examples we can override both the port and protocol. So we can easily proxy both external HTTP and HTTPS requests to a single port and on HTTP only, if for some reason our app does not support different ports for HTTP/HTTPS.

Node.js app hosting in cPanel couldn't be simpler than this.
