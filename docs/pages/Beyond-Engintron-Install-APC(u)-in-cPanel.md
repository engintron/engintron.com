## Install APC(u) in cPanel

_(Originally published in https://www.joomlaworks.net/blog/item/153-install-apc-apcu-on-a-whm-cpanel-server)_

**[Updated on March 29th, 2017]**

If you run a popular Joomla (or WordPress, Drupal or any other PHP based CMS) website on either a dedicated server or VPS running WHM/cPanel, chance is you may have stumbled upon performance issues at some point.

Although improving Joomla's or WordPress' performance is a task that requires in-depth analysis, I thought I'd just write a couple of words on improving one aspect of your site's performance quickly and efficiently: PHP execution by using the APC or APCu opcode caching modules. Keep in mind that APC is compatible with PHP up to version 5.3.x. APCu replaces APC for PHP versions 5.4.x or newer and it's currently under active development.

Since PHP 5.3.x is considered obsolete, I'll cover the steps to have APCu installed on your server. If you run PHP 5.3.x either consider updating to 5.5.x/5.6.x or follow the steps below making sure you replace any "apcu" reference with just "apc" (minus the "u").

There are many tutorials out there covering how to install APCu from command line (as root user), but none on how to install APCu on a WHM/cPanel server " the easy way ". And it's actually pretty easy provided your server is executing PHP in FastCGI mode (the most optimal setup). Default cPanel installations usually run PHP in suPHP mode, which does not allow APCu to be installed. If you have full control of the server, you can use EasyApache in WHM to "rebuild" your system with PHP in FastCGI mode.

FastCGI mode is known to be a fast and secure way to run PHP on your server... FastCGI is also preferred compared to mod\_php as it allows websites to execute with the user's permissions (like with suPHP) and as some claim, it's also the fastest from all other PHP builds.

If you want to re-build your server with FastCGI, you can grab a ready-made profile to upload and use in WHM: [https://github.com/engintron/engintron/blob/master/cpanel/EasyApache_Profiles/EA3/Engintron_EA3_2016.yaml](https://github.com/engintron/engintron/blob/master/cpanel/EasyApache_Profiles/EA3/Engintron_EA3_2016.yaml)

Don't bother trying to install APCu via cPanel's PECL modules installer. It's just broken.

Now, assuming you have PHP in FastCGI mode running on your WHM/cPanel (version 11.48+) based server, here are the steps to install APCu on your server:

## APCu in cPanel with EasyApache 4
a) Make sure Engintron is installed. If you installed it before March 29th, 2017, simply update it.
b) Execute this command:
```
$ chmod +x /usr/local/src/engintron/utilities/install_apcu_in_cpanel_ea4.sh
$ /usr/local/src/engintron/utilities/install_apcu_in_cpanel_ea4.sh
```

Done.

The above command will install and configure APCu auto-magically with a 128 MB cache size. If you wish to use another cache size value, simply pass on the new value as a parameter to the script. So if you wanted to use a 64 MB cache size for APCu, you would do:
```
$ chmod +x /usr/local/src/engintron/utilities/install_apcu_in_cpanel_ea4.sh
$ /usr/local/src/engintron/utilities/install_apcu_in_cpanel_ea4.sh 64M
```

Note that you define MBs with just an M right after the number. So 64 MBs is 64M, 128 MBs is 128M and so on.

If you rebuild your cPanel's LAMP stack with EasyApache, you may need to re-install APCu so just do the process above again.

## APCu in cPanel with EasyApache 3
The process in EasyApache 3 involves the following steps to take.

### 1. INSTALL PACKAGES

Login via SSH as "root" user on your cPanel server and execute the following commands:

**In cPanel with EasyApache 3 and PHP 5.6 or older**
```
$ yum install make pcre-devel
$ pecl install channel://pecl.php.net/APCu-4.0.11
```

**In cPanel with EasyApache 3 and PHP 7.0 or newer**
```
$ yum install make pcre-devel
$ pecl install channel://pecl.php.net/APCu-5.1.7
```

The line "yum install make pcre-devel" installs some required packages. Year 2014 or later builds of cPanel should have these installed. If you run the command and the packages are already installed, nothing will happen.

The second line will retrieve the latest build of APCu directly from the PECL code repositories which is compatible with PHP 5.2+ and 7.0+ respectively (at the time of writing).

Restart Apache via WHM.

### EDIT PHP.INI

Now edit the master php.ini file of the server to add a couple of configuration options for APCu. Edit the php.ini file via Engintron or by using a CLI text editor like Nano or Vim and append these lines at the very bottom of the file:


For EasyApache3, "php.ini" is usually located in /usr/local/lib/php.ini:
```
[apcu]
apc.enabled = 1
apc.shm_size = 128M
```

The last line in the [apcu] config blocks will create a memory pool of 128MBs of cache available from the system to APCu. If you have lots of sites that will use APCu for caching, adjust accordingly.

Restart Apache via WHM.


### 3. ADJUST SETTINGS FOR APCU

If you wish to adjust the APCu values above, you can now do so via "PHP Configuration Editor" in WHM, after selecting the "Advanced Mode" editing option. These 2 values will be at the very top. APCu has a lot more options but "apc.shm\_size" is obviously the most critical as it defines the memory pool to hold all cache objects coming from your CMS (Joomla, WordPress etc.).

Remember that whenever your edit your PHP's configuration, you need to restart Apache for the changes to take effect.


### 4. KEEP IN MIND

If you rebuild your cPanel's LAMP stack with EasyApache, you need to re-install APCu as your changes will be lost. Just follow steps 1-3 once more.