## Install Memcached in cPanel

Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

Memcached is simple yet powerful. Its simple design promotes quick deployment, ease of development, and solves many problems facing large data caches.

Memcached can be used by popular CMSs like Joomla, WordPress, Drupal etc. to save cached pages in RAM, which is much faster that writing/reading cached pages to/from disk.

Since Memcached is independent of PHP, restarting PHP-FPM does not flush your sites caches. Which Memcached a far more suitable caching option for popular CMSs. The holy trinity of WordPress, Joomla & Drupal all support it. Joomla natively and WordPress/Drupal via third party plugins. For WordPress specifically, the easiest integration is by using this driver: [KDK Memcached Object Cache](https://github.com/kodeka/kdk_memcached_object_cache)

a) Make sure Engintron is installed and up to date.

b) Execute the following commands, line by line:


```
$ chmod +x /opt/engintron/installers/install_memcached_in_cpanel.sh
$ /opt/engintron/installers/install_memcached_in_cpanel.sh
```

Done.

The above command will install and configure Memcached auto-magically with a 512 MB cache size and support for all available PHP version on your cPanel server.

If you wish to use another cache size value, simply pass on the new value as a parameter to the script. So if you wanted to use a 1024 MB cache size for APCu, you would do:

```
$ chmod +x /opt/engintron/installers/install_memcached_in_cpanel.sh
$ /opt/engintron/installers/install_memcached_in_cpanel.sh 1024M
```

Note that you define MBs with just an M right after the number. So 64 MBs is 64M, 128 MBs is 128M and so on.

If you rebuild your cPanel's LAMP stack with EasyApache4, you may need to re-run this script.
