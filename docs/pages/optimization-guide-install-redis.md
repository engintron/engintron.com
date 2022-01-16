## Install Redis in cPanel

Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.

Redis can be utilized by popular CMSs like Joomla, WordPress, Drupal etc. to save cached content or entire pages in RAM, which is much faster that writing/reading cached pages to/from disk.

Since Redis is independent of PHP, restarting PHP-FPM does not flush your sites caches. Which makes Redis a far more suitable caching option for popular CMSs. The holy trinity of WordPress, Joomla & Drupal all support it. Joomla natively and WordPress/Drupal via third party plugins. For WordPress specifically, the easiest integration is by using this plugin: [Redis Object Cache](https://wordpress.org/plugins/redis-cache/)

a) Make sure Engintron is installed and up to date.

b) Execute the following commands, line by line:


```
$ chmod +x /opt/engintron/installers/install_redis_in_cpanel.sh
$ /opt/engintron/installers/install_redis_in_cpanel.sh
```

Done.

The above command will install and configure Redis auto-magically with a 2 GB cache size and support for all available PHP version on your cPanel server.

If you wish to use another cache size value, simply pass on the new value as a parameter to the script. Keep in mind that cache size in Redis is declared with lowercase characters. So if you wanted to use an 8 GB cache size for Redis, you would do (notice the "8gb"):

```
$ chmod +x /opt/engintron/installers/install_redis_in_cpanel.sh
$ /opt/engintron/installers/install_redis_in_cpanel.sh 8gb
```

If you rebuild your cPanel's LAMP stack with EasyApache4, you should re-run this script.
