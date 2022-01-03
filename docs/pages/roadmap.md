## Roadmap

### Features to consider (as of Jan 2022)

* Add new configuration page that will automate tasks like adjusting the micro-cache or enabling CloudFlare support, without the need to modify any configuration files directly.
* Add a more "controlled" caching option for popular CMSs like WordPress (and others), in order to provide further performance improvements with a cache the expires after minutes, not just a 1 second micro-cache. The point is to apply rules specific to these CMSs so user generated content is properly excluded from caching.
* Add end-user option to enable/disable Nginx caching or direct proxying per domain or per account.
* Utilities: add option to purge all Apache logs with a single command in the Engintron WHM app dashboard - especially useful when your logs grow fast consuming GBs of disk space
* Utilities: integrate the MySQL Frag Finder (& Fixer) tool to easily optimize all the server's databases
* Utilities: Add APCu & Opcache GUIs for globally monitoring and controlling APC(u) & Opcache respectively


### Engintron History

* Old Engintron WHM app mockup
![Engintron v2](./images/screenshots/2.0.0_mockup.png)
