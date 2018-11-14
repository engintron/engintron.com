Until the following is merged with Engintron's codebase, here's a quick solution to fix the dreaded "localhost could not be resolved" entries in your Nginx log files.

Edit your "custom rules" file via Engintron's WHM app and at the bottom, add this block

```
if ($host ~ "localhost") {
    set $PROXY_DOMAIN_OR_IP "127.0.0.1";
}
```

Then simply restart both Apache & Nginx.

Voila :)