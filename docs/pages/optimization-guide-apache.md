## Optimizing Apache

The default Apache configuration that ships with cPanel is probably too restrictive.

We can adjust Apache's basic configuration settings to improve both speed and CPU/RAM usage.

In WHM, these Apache directives can be configured under "Service Configuration" >> "Apache Configuration" >> "Global Configuration".

If your server has for example 8 CPU cores, follow this pattern:

```
StartServers        8
# Same as your CPU core count, no less than 5 though

MinSpareServers     8
# Same as your CPU core count, no less than 5 though

MaxSpareServers     16
# Double as your CPU core count, no less than 10 though

ServerLimit         500
# 500 is a good base point for an average 4-8 CPU core system with 8-16 GBs of RAM. If your server has higher specs, you can increase up to 800-1000, anything beyond that is probably overkill

MaxRequestWorkers   500
# Same as "ServerLimit"

MaxRequestsPerChild 5000
# 10 times "ServerLimit"

Timeout             300
# Stick to the default value that comes with cPanel, there is no reason to lower this value. If you also have Engintron installed, Nginx's timeout is also at 300 sec to align with this setting in Apache.
```
