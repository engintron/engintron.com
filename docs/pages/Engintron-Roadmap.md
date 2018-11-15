### Features to consider for Engintron v1.8.0 or newer (but before v2.0.0)

* Refactor codebase, group all files under /usr/local/src/engintron/ & /etc/nginx/ with symlinks to everywhere else.
* Update the Engintron WHM app dashboard with a new configuration page that will automate tasks like enabling micro-cache or enabling CloudFlare support, without the need to modify any configuration files directly.
* Add a more "controlled" caching option for popular CMSs like WordPress (and others I presume), in order to provide further performance improvements with a cache the expires after minutes, not just a 1 second micro-cache. The point is to apply rules specific to these CMSs so user generated content is properly excluded from caching.
* Add port exclusions in CSF for 8080 and 8443 (if CSF is installed and enabled).
* If you use CloudFlare, add an option to define domains to be excluded from switching to SSL mode. This will be a textarea form field to list domains to exclude and this will simply generate the appropriate Nginx rules.
* New "optimize" option along with "install" and "remove" for engintron.sh. This option will identify the system's CPU and RAM and depending on your cPanel's server setup, it will install & configure APC(u) and it will optimize Apache, MySQL, FastCGI's php.conf and /etc/sysctl.conf (system wide tweaks). It's essentially what the "Beyond Engintron" guides describe in the Engintron Wiki, only the entire process will be automated.
* Utilities: add option to purge all Apache logs with a single command in the Engintron WHM app dashboard - especially useful when your logs grow fast consuming GBs of disk space.
* Utilities: integrate MySQL diagnostics tools like tuning-primer.sh or MySQLTuner.pl,
* Utilities: integrate the MySQL Frag Finder (& Fixer) tool to easily optimize all the server's databases, either manually or via a cron job.
* Utilities: Add APC(u) & Opcache GUIs for globally monitoring and controlling APC(u) & Opcache respectively
* User cPanel option to enable/disable Nginx caching or direct proxying per domain or per account.
* Proper AWStats logging.
* Add anonymous metrics gathering for development purposes. These metrics will contain generic usage data like number of active Engintron servers worldwide, cPanel version distribution, OS share, Nginx version active, Apache version active etc. You can see an example here: [https://metrics.getk2.org](https://metrics.getk2.org) (for K2, a highly popular Joomla extension)


### Features to consider for Engintron v2.0.0 or newer

* Redesigned WHM app dashboard for Engintron - the purpose is to make Engintron your go-to dashboard when logged in WHM
![Engintron v2](./images/screenshots/2.0.0_mockup.png)
