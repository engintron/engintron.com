## Install Memcached in cPanel (EasyApache 4 only)

_(As of v1.8.11, the Memcached installer is shipped with Engintron)_

a) Make sure Engintron is installed. If you installed it before May 22nd, 2018, simply update it.
b) Execute this command:
```
$ chmod +x /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4.sh
$ /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4.sh
```

Done.

The above command will install and configure Memcached auto-magically with a 256 MB cache size. If you wish to use another cache size value, simply pass on the new value as a parameter to the script. So if you wanted to use a 512 MB cache size for Memcached, you would do:
```
$ chmod +x /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4.sh
$ /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4.sh 512M
```

Note that you define MBs with just an M right after the number. So 64 MBs is 64M, 128 MBs is 128M and so on.

If you rebuild your cPanel's LAMP stack with EasyApache, you need to re-install Memcached (for the PHP modules primarily) so just do the process above again.

The installer is also provided as standalone here:

[https://gist.github.com/fevangelou/c4852324c9f218870ffd5fbb2ddde591](https://gist.github.com/fevangelou/c4852324c9f218870ffd5fbb2ddde591)

Although the script was written for CentOS 7, it should work on CentOS 6 as well provided you're also using EasyApache 4. Likewise, it should work on CloudLinux 6 & 7.

If you have EasyApache 3 still installed on your server, this option won't work for you.


### UPDATED ON JUNE 29TH 2018
If you get problems with cPanel's EA4 Experimental repo which is used by the installer above, you'll find an additional Memcached installer since v1.8.13 of Engintron that uses the PECL repos for installing the required PHP modules, which also happen to include support for PHP 7.2 (which the EA4 Experimental repo does not yet offer).

Use the additional installer with:
```
bash /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4_no_exp_repo.sh
```

or if you want a different pool size for Memcached (e.g. 512M), execute:
```
bash /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4_no_exp_repo.sh 512M
```