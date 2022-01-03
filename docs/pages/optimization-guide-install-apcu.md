## Install APCu in cPanel

APCu is an in-memory key-value store for PHP. Keys are of type string and values can be any PHP variables.

APCu can be used by popular CMSs like Joomla, WordPress, Drupal etc. to save cached pages in RAM, which is much faster that writing/reading cached pages to/from disk.

To install APCu for PHP 5.6 up to 8.1 (where supported), follow this process:

a) Make sure Engintron is installed and up to date.

b) Execute the following commands, line by line:

```
$ chmod +x /opt/engintron/installers/install_apcu_in_cpanel.sh
$ /opt/engintron/installers/install_apcu_in_cpanel.sh
```

Done.

The above command will install and configure APCu auto-magically with a 128 MB cache size.

If you wish to use another cache size value, simply pass on the new value as a parameter to the script. So if you wanted to use a 256 MB cache size for APCu, you would do:

```
$ chmod +x /opt/engintron/installers/install_apcu_in_cpanel.sh
$ /opt/engintron/installers/install_apcu_in_cpanel.sh 256M
```

Note that you define MBs with just an M right after the number. So 64 MBs is 64M, 128 MBs is 128M and so on.

If you rebuild your cPanel's LAMP stack with EasyApache4, you may need to re-run this script.
