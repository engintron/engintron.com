"110: Connection timed out..." errors appearing in Nginx logs are usually related to a slow backend (=Apache & PHP). This usually results in "504 Gateway Timeout" errors in the frontend for actual site visitors.

There are 2 ways to solve this:

a) The quick & simple way is to bump the timeout values in Nginx's configuration so it waits more for the backend to respond. Current wait time is 180s (3 mins) but you can safely increase this say to 360s or more. Simply edit the file "proxy_params_common" and adjust "180s" in these 2 lines:
```
proxy_read_timeout            180s;
proxy_send_timeout            180s;
```

Then save and restart Apache/Nginx.

b) The better but harder way is to optimize your slow backend. This can be done by tuning the configuration files for Apache, MySQL, PHP and even the system itself. Have a look at the Optimization Guides https://engintron.com/docs#beyond-engintron---optimization-guides for a great starting point.