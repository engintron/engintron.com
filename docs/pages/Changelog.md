## Changelog

***To update to a newer version of Engintron, [please have a look here](pages/install).***

### December 4th, 2024 - v2.6 (Build 20241204)
This release fixes the issue where SSL certificate changes (issues and renewals) where not immediately reflected on Nginx. Keep in mind this seems to have been an edge case, affecting some servers. However, by adding a small delay in the reload process for Nginx, the issue should go away for good.

### September 29th, 2024 - v2.5 (Build 20240929)
This release resolves issue [#1493](https://github.com/engintron/engintron/issues/1493).

It also bundles a new EA4 profile for EL8 (2024.2) distros like AlmaLinux 8.

### June 3rd, 2024 - v2.4 (Build 20240603)
This release adds an extra check for the installed Nginx version so it does not apply the Nginx configuration patch that was introduced with v2.3.

Additionally, we've added common bot protection :)

It's a feature that's been asked for sometime now.

To enable common bot protection simply comment out a single line in the custom\_rules file:

`include common_simple_protection.conf;`

If you're already an Engintron user, just copy the relevant "include..." line from the default custom\_rules file. If this is a brand new Engintron install, then just comment out the relevant line.

We've also added extra configuration there to block custom bots, as well as specific IPs overall that may overload your server with thousands of requests daily. The default custom\_rules file contains some additional insight on how to use this feature.

Keep in mind that bot protection, as configured in Engintron's Nginx setup, will immediately drop the connection (444 response) and not return an error page (e.g. 403 response). This is the most performant way to block unwanted traffic.

### May 31st, 2024 - v2.3 (Build 20240531)
This release fixes a warning ("nginx: [warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead in /etc/nginx/conf.d/default_https.conf...") introduced by updates in Nginx in May 2024.

### November 14th, 2023 - v2.2 (Build 20231114)
This release updates secondary installers and third-party scripts included with Engintron.
* Added support for PHP 8.2 in the APCu & Memcached installers (installed under /opt/engintron/installers/)
* Updated database performance insights scripts mysqltuner.pl & tuning-primer.sh (do "engintron -h" in the terminal to see how to run these utilities)
* Updated EA4 installation profiles to support PHP up to v8.2 & Node 16
* Updated the healthcheck.sh utility to follow redirects (installed under /opt/engintron/utilities/)

### September 16th, 2022 - v2.1 (Build 20220916)
This is a security release, so you are advised to upgrade as soon as possible.

In this update, Engintron's UI in WHM ensures any output of the Apache restart script is properly sanitized. Depending on your ModSecurity setup, it's possible for a third party to inject remote JavaScript code (XSS type vulnerability) when you perform any task in Engintron's UI (in WHM) that restarts Apache. That's because the related Apache restart script provided by cPanel prints a snapshot of the ModSecurity log entries.

### January 17th, 2022 - v2.0 (Build 20220117)
* New! Added a Redis installer for cPanel. Check the relevant [Redis usage guide](pages/optimization-guide-install-redis).
* Updated all documents in this site to better reflect the current Engintron version.

Since this is an addition beyond Engintron, the version remains the same but the build is updated as it reflects everything the Engintron package contains, so you will not see this as an update in the Engintron dashboard in WHM. If you perform a manual update there (or via terminal), the new Redis installer will be added to your system.

### January 2nd, 2022 - v2.0
* Brand new series released!
* Adds support for Enterprise Linux (EL) version 8 variants such as AlmaLinux 8, Rocky Linux 8 and CentOS 8 (the latter is EOL already but some folks may still use it). Although not tested, it should work on Oracle Linux 8 and Amazon Linux 2022.
* Refreshed WHM app for Engintron with a new 100% responsive layout. The WHM app is now also lighter as any 3rd party scripts used in the past (e.g. for the GitHub button, the Twitter share widget or even the Font Awesome icons) are now removed.
* Improved CLI commands
* Apache 2.2 is no longer supported as it's really old and cPanel has dropped support for it for some time now. Likewise, the installer for Apache's RPAF module is now removed.
* New simplified one-liner for installing/updating Engintron: `curl -sSL https://raw.githubusercontent.com/engintron/engintron/master/engintron.sh | bash -s -- install` (a wget version is also available on the project's GitHub repo). You can run the install/update command anywhere in your terminal (you don't have to "cd" to the server's / directory anymore).
* Engintron's files are now installed under "/opt/engintron" (by following the FHS standard for 3rd party apps) and a symlink is created for "/opt/engintron/engintron.sh" to "/usr/local/sbin/engintron". This means that you no longer have to specify "/engintron.sh" before running any CLI command as "engintron" is available as a system-wide command (=anywhere) in your terminal. Upon upgrading to Engintron v2.0, the "/engintron.sh" file is removed from your system and of course the old location of Engintron's supporting files is also removed.
* Bundled the latest release of [MySQL Tuner](https://github.com/major/MySQLTuner-perl) (v1.8.5) so you can easily run database diagnostics from within Engintron's WHM app.
* Bundled the latest [Tuning Primer](https://github.com/BMDan/tuning-primer.sh) script for database diagnostics. This option will work via the terminal only. Run "engintron -h" to see all available CLI options.
* Updated APCu and Memcached installers to support PHP 5.6, 7.x and 8.x. Since cPanel now builds PHP modules for Memcached, the PECL installer has been dropped in favor of these packages.
* Updated Engintron's EasyApache4 profiles to support up to EL8 variants.

**IMPORTANT**
When upgrading Engintron from within WHM there is a small chance that you'll get a page loading error, in which case you just need to hit the back button and reload the page in your browser. This "hiccup" may occur ONLY when upgrading Engintron from v1.x to v2.0 specifically. Upgrades in the 2.x series will be flawless as in the past.

Additionally, for the curious eye, you'll notice code that mentions Ubuntu. This is not by accident of course. cPanel is already working on adding full Ubuntu support soon, so Engintron includes some preliminary work for Ubuntu as well. Once cPanel is officially released to support Ubuntu, Engintron will also be updated to support Ubuntu as well (which by the way is our favorite server OS).

Existing documentation will be updated in the coming days. Just keep in mind that wherever you see a "/engintron.sh" reference in the docs, you should replace it with just "engintron" for now.

### September 8th, 2021 - v1.16.0
* Added extra data sanitisation for the Engintron WHM app - thank you Jamie Slome from [huntr.dev](https://huntr.dev)
* Fixed long-standing WHM UI annoyances (expanded sidebar menu & analytics popping up all the time).
* Updated Ace.js editor used for editing files in the Engintron WHM app.
* Added new contact endpoint in the Engintron WHM app.

### May 4th, 2021 - v1.15.0
* Cache only 200 response requests for static files. Original discussion here: https://github.com/engintron/engintron/issues/1306 (thanks to the Drupal folks for locating this bug).
* Remove documents & other media from static caching, move CSV to JSON/XML block and lower cache-control TTL to 1m for that block.

### October 28th, 2020 - v1.14.0
* Reinstate `$scheme` in `proxy_cache_key` (for dynamic caching) as some users reported redirect loops caused with certain HTTP to HTTPS .htaccess rewrite rules.
* Micro-improvements to both Nginx dynamic & static caching: use a larger cache pool by default, keep stale cache objects longer (useful if a site is hammered with traffic), don't make Nginx write caches to an intermediate temp folder, optimize static asset caching and lower static caching TTL to 10 secs from 1 min.
* Add Magento-specific cookies to bypass.
* Add support for PHP 7.4 in Engintron's APCu and Memcached installers.

### March 28th, 2020 - v1.13.0
* Added client support for TLV v1.3. CentOS's OpenSSL binaries don't yet seem to support TLS v1.3 but this will probably come soon, so let's make Engintron future-proof. By default Engintron will support as many clients as possible. If you want to restrict your client coverage, you can switch to a different protocols/ciphers combination by commenting out the intermediate or modern configuration (edit the file /etc/nginx/common_https.conf). Just make sure you only end up with one such configuration, otherwise Nginx will not restart.
* Added cookie and path exclusions for Drupal (as referenced in https://www.drupal.org/docs/7/caching-to-improve-performance/varnish-4x-configuration & https://www.drupal.org/docs/8/api/cache-api/cache-tags-varnish)
* Added path exclusions for Craft CMS
* Improved the resellers check for the Engintron WHM app to be more resilient to errors or missing details in the related file for resellers.
* Added 2 new EA4 profiles: `Engintron_EA4_2020_v1` which you should prefer for your current or new cPanel setups (it also includes Node.js) and `Engintron_EA4_2020_v2` which includes PHP 7.4 support BUT is not yet supported by cPanel as PHP 7.4 has not arrived yet (latest update from the cPanel team was just yesterday - see https://features.cpanel.net/topic/php-7-4). Once PHP 7.4 support is official in cPanel, the APCu & Memcached installers will also be updated.
* Updated APCu to v5.1.18 & Memcached to v3.1.5 for PHP 7.x in the related installers under "utilities".
* IMPORTANT NOTE: When updating Engintron through WHM, if for any reason the update does not seem to complete (after a few minutes tops), then you need to run the upgrade (install) from the terminal. This was reported by some users during the last upgrade, so just keep it in mind. The reason why this happens is yet unknown as it's not widely reproducible (so it probably relates to certain configurations).

### January 9th, 2020 - v1.12.0
* This is mainly a security release as it addresses log filtering in the Engintron WHM app. An attacker could inject malicious JS code as part of the HTTP headers that are logged in Nginx and in turn displayed into the Engintron WHM app. The issue was originally raised here: https://github.com/engintron/engintron/issues/1112
* Improved the resellers' permissions check before allowing access to the Engintron WHM app.
* Minor code cleanups.

### July 10th, 2019 - v1.11.0
* Engintron is now IPv4 & IPv6 capable by default.
* Added CloudFlare Public DNS IPs as resolver option in /etc/nginx.conf.

### May 29th, 2019 - v1.10.0
* Moved Nginx cache purging after Apache has restarted as the previous execution order caused issues in servers where Apache takes a long time to restart - effectively breaking web serving.
* For those using dynamic caching (enabled by default for micro-caching), the "Vary" HTTP header is now hidden by default, which translates to fewer cache objects and in turn more efficient caching overall.
* Added force-restart option for Nginx. This option will come handy if for some reason Nginx cannot be restarted normally (and you see errors that indicate Nginx cannot bind to ports 80/443).
* Added new healthcheck.sh utility script (located inside /usr/local/src/engintron/utilities/) which you can use to monitor your server's health (uptime). If the check fails, Engintron restarts Apache, Nginx & PHP-FPM and sends an email to your email address of choice so you know when downtime was detected. You can also configure the script to force-restart Nginx in case it was abruptly cut off (which may cause normal restarting to fail) in low-RAM scenarios etc. Usage comments are inside the script.
* Updated all utility scripts (installers) for APCu & Memcached to support latest released versions and PHP 7.3. Removed option to install APCu for PHP version 5.4 & 5.5. Default cache size for Memcached is now 512M (but you can override that upon installing the script).
* Added new EA4 profile (Engintron\_EA4\_2019_v1) which supports PHP 5.6 to 7.3 and also installs the Node.js runtime.
* Updated usage comments in "Custom Rules" with examples on how to host Node.js (and other non-PHP based) apps.

### January 22nd, 2019 - v1.9.3
* Fixed issue where Nginx ports where broken after disabling and then re-enabling Engintron. Bonus points for those who never disabled Engintron and thus never saw this issue ;)
* Improvements in the "purge cache" function. Apparently Apache takes some time to restart in some servers (my guess is low-spec servers with hundreds of sites on them) and this caused issues in the Nginx "purge cache" function as the cache would empty first, then wait for Apache to restart to finally restart Nginx. In the meantime, if Apache took many seconds to restart, Nginx would try to locate cache files that were previously deleted. This is now resolved.

### November 15th, 2018 - v1.9.2
* Replaced rawgit.com CDN (for mod_rpaf) with jsDelivr.
* Updated copyrights.

### August 17th, 2018 - v1.9.1
* Fixed Horde webmail forwarding. If you previously tried to open Horde from webmail.domain.tld (either via http:// or https://), cPanel would throw a 404 error. This is now fixed.
* Added PrestaShop dynamic cache exclusions.
* Minor installer improvements.
* Improved the non-EA4-repo Memcached installer for PHP 5.6 to 7.2. This should be your preferred way to enabled Memcached on your cPanel server from now. See the Wiki for more info on installation.
* Added new EA4 profile (v3 for 2018), primarily for use with cPanel/CloudLinux servers. All EA4 profiles can be found here: [https://github.com/engintron/engintron/tree/master/cpanel/EasyApache_Profiles/EA4](https://github.com/engintron/engintron/tree/master/cpanel/EasyApache_Profiles/EA4)

### July 24th, 2018 - v1.9.0
* Re-use common Nginx definitions for both HTTP and HTTPS traffic.
* Allow $scheme to be overridden (e.g. when there's a need to proxy traffic to a custom Node.js app in a regular "public\_html" folder). This actually makes hosting Node.js apps ideal using Engintron as to do this with Apache is nearly impossible if the required proxy module is not built in EA3 or EA4. An example rule for a Node.js app would be (set in your "custom rules" in Engintron):
```
if ($host ~ "mynodeapp.com") {
    set $PROXY_SCHEME "http";
    set $PROXY_TO_PORT 3000;
}
```
See how the port is overridden and the protocol enforced internally to HTTP only for both external HTTP and HTTPS requests (a Node.js app may listen on a single port and on HTTP only). Node.js app hosting in cPanel couldn't be simpler than this.
* Use cPanel's main PHP binary for any PHP related functions (e.g. HTTPS vhost generation).
* Removed the "PHP" section in Engintron's WHM app as it was mostly used for server's with EasyApache 3.
* Fix Apache diagnostics display (in Engintron's WHM app) in all CentOS 7 environments.

### June 29th, 2018 - v1.8.13
* Added support for installing Engintron on Amazon Linux AMI (based on CentOS 6) and Amazon Linux 2 (based on CentOS 7).
* Added new Memcached installer that does not use the EA4 Experimental repo from cPanel for the PHP modules but PECL (the original source) directly. This installer will also configure the related PHP module for Memcached for PHP 7.2 (unlike the EA4 Experimental repo which still has no support for 7.2). Install with: `bash /usr/local/src/engintron/utilities/install_memcached_in_cpanel_ea4_no_exp_repo.sh`
* Added new EA4 profile (v2 for 2018) which includes additional Apache modules (e.g. FastCGI) and ionCube v10 PHP modules for all PHP versions from 5.6 to 7.2.

### May 24th, 2018 - v1.8.12
* Commented out "proxy\_cache\_background\_update" from /etc/nginx/proxy\_params\_dynamic as it was forcing the 1s micro-cache for form submissions (using POST, redirect, GET) which is pretty normal to submit in less than 1 second. This option was a performance fail-safe, so it's left commented out in case anyone wants to use (and knows it won't conflict with their sites/apps).
* Mute PHP warning being output in /etc/nginx/utilities/https\_vhosts.php and thus breaking the HTTPS vhost generation, when the timezone is not configured in PHP's settings.

### May 22nd, 2018 - v1.8.11
* Updated WooCommerce exclusions (cookies and paths) so expect even better performance & behaviour with WordPress/WooCommerce sites. If you host exclusively WordPress sites, you can now safely increase "proxy\_cache\_valid" in /etc/nginx/proxy\_params\_dynamic from "1s" (1 second - aka micro-caching) to minutes (e.g. "3m"). If you do this, Nginx can serve dynamic content entirely from its cache for content that CAN be cached, so expect a MAJOR boost in performance. You're welcome :)
* Main Nginx configuration has been updated for improved performance for busy sites/servers.
* Added installer for Memcached in cPanel with EA4. WordPress, Joomla and other CMSs/apps that can utilize Memcached will see significant performance improvements. Installation instructions can be found here: [pages/optimization-guide-install-memcached](pages/optimization-guide-install-memcached)
* Disabled any type of caching for cPanel specific subdomains (e.g. webmail.domain.tld, cpanel.domain.tld etc.).

### Apr 27th, 2018 - v1.8.10
* The Engintron WHM app will now open within the cPanel UI and not in a new window. Includes various small code improvements as well. Keep in mind that when you navigate Engintron's options, the WHM sidebar will always expand (and not maintain its state). This is a bug in the cPanel WHP PHP API for which the cPanel team is aware of and will be (hopefully) sorted soon.
* Fixed updating /engintron.sh file when updating Engintron from the terminal.
* Added dynamic cache exclusions for Invision Power Board/Suite versions 4.x (3.x rules where already present).
* Nginx proxy rules for cPanel-specific subdomains (e.g. cpanel.*, whm.*, webdisk.* etc.) have been commented out for both HTTP and HTTPS traffic. This allows cPanel or LetsEncrypt certificates to now be issued for these subdomains as well.
* Updated Nginx mime type definitions (covers additions to documents file types, web fonts etc.).
* Properly restart MySQL when applying any configuration in my.cnf. You previously required to execute terminal commands manually when changing values that required "flushing" MySQL's temp files (ib\_logfile*). The means you can fully manage your MySQL's configuration from the Engintron WHM app entirely. And don't forget to use this uber-awesome optimized my.cnf config: [https://gist.github.com/fevangelou/0da9941e67a9c9bb2596](https://gist.github.com/fevangelou/0da9941e67a9c9bb2596)
* Restart PHP-FPM whenever Apache is restarted in various Engintron operations.
* Bundled optimized EasyApache 3 & EasyApache 4 profiles with Engintron. See the related guides in the Engintron Wiki.

### Apr 16th, 2018 - v1.8.9
* Resolve issue with Nginx being installed from the EPEL software repository (when present) instead of the official one (from Nginx.org). More info on the issue can be found [in this Engintron Wiki post](pages/%22Welcome-to-Nginx-on-Fedora%22-showing-on-all-sites-after-upgrading-Engintron-or-cPanel-(aka-Nginx-from-EPEL-repo-issue)).
* Commented "Access-Control-Allow-Origin..." line in static file serving definitions for web fonts as it was causing issues for folks using CDNs.
* Added CS-Cart cookie exclusions for Nginx's dynamic cache.

### Mar 16th, 2018 - v1.8.8
* Resolved a potential security issue in which resellers with access to Engintron's WHM app could view (but not edit) any system file on the server, by manipulating the edit view URL in Engintron's WHM app. Issue originally referenced here: [https://github.com/engintron/engintron/issues/768](https://github.com/engintron/engintron/issues/768)
* Added APCu setup support for PHP 7.2 and fixed an issue (in recent cPanel releases) where *pecl.ini files would attempt to load the APCu binaries and thus generate an error\_log at the root of your cPanel server. For installing APCu on your server, refer to [this wiki entry](pages/optimization-guide-install-apcu).
* Updated IPv6 syntax in Nginx configuration files. IPv6 is still not enabled by default as in systems without native IPv6 networking enabled, Nginx will fail to compile its configuration files and thus stop serving websites.

### Nov 21st, 2017 - v1.8.7
* Updated the way Nginx's HTTPS vhosts are regenerated when Apache's configuration is updated. Additionally, a log file of the last restart of Nginx & Apache is created at `/etc/nginx/utilities/https_vhosts.log` with a timestamp at the top of the file.
* Updated Apache httpd.conf path check (to cover different installations reported by users) and increased the interval time for checking when that file changes from 10 to 15 secs per minute to allow less powerful servers to have time to generate both their Apache and Nginx configurations in time. That interval can also be manually changed to a higher value if required. See the top of the file `/etc/nginx/utilities/https_vhosts.sh` and adjust accordingly. Until there's a permanent configuration option for this, you'll have to manually update your custom interval time whenever you update Engintron.
* Updated cache exclusions for the latest release (v4) of IPS (Invision Community). Sites using that version will have dynamic caching entirely off.
* Added "proxy\_hide\_header Upgrade;" to resolve certificate issues on desktop Safari as originally referenced here: [https://trac.nginx.org/nginx/ticket/915](https://trac.nginx.org/nginx/ticket/915)
* Updated CloudFlare IP pool in `/etc/nginx/nginx.conf`.

### Oct 17th, 2017 - v1.8.6
* Bug fix: Use multiple ServerAlias references originating from Apache's httpd.conf into Nginx
* Use new cPanel v68 "combined" certificate files as referenced directly in Apache's httpd.conf

### Aug 31st, 2017 - v1.8.5
* Added proper ACL checks for resellers to the Engintron WHM app.
* Change how owner permissions are repaired (to cover hidden files as well) in the Engintron CLI - explore with `./engintron.sh -h` in the terminal as root user.
* Improve the APCu installation process by removing garbage apcu.so entries in cPanel's config files for each PHP version.
* Fixed minor CSS issue in the Engintron WHM app.

_Please note that changes in cPanel v66+ have resulted in Engintron opening in a new window and not wrapped within cPanel's WHM UI. The next Engintron release (v1.9.0) coming early September will address this issue by launching Engintron within the WHM UI and also having it display in a mobile-friendly way, in-line with cPanel's WHM UI changes._

### Jun 29th, 2017 - v1.8.4
* Updated Apache's LogFormat to remove the hostname reference. This should resolve any issues with AWStats not reading Apache's logs properly
* Engintron will now flush Nginx's caches and temp files whenever a change is detected in Apache's configuration (and consequently Nginx recreates its vhosts for HTTPS traffic). This resolves issues with newly issued or updated certificates not being reflected in HTTPS traffic served by Nginx.

### Apr 12th, 2017 - v1.8.3
* Updated the UI to support UI changes in WHM since cPanel v64. This is more of a temporary solution until the WHM header is fully replicated inside Engintron's WHM app.
* Disabled OCSP stapling by default (parameters left with comments) as it caused issues for some servers.
* Added back references to IPv6 in all "listen" parameters in Nginx config files.
* Removed `add_header Vary "Accept-Encoding";` from proxy\_params\_static as it should not be used for all static files. Filetypes such as CSS, JS etc. will continue to carry this header when served to end-users.

### Mar 2nd, 2017 - v1.8.2
* Added Nginx monitoring in the TailWatch chkservd driver. If Nginx fails for some reason, the TailWatch will attempt an automated restart. This addresses a related issue reported by some users.
* Improved how IP forwarding is done from Nginx to Apache.
* Added option in the Engintron WHM app to restore Nginx IP forwarding in Apache. Previously you had to re-install Engintron entirely. This new method is much faster.
IMPORTANT: After you upgrade to v1.8.2, if for some reason you get 502 errors in Nginx, please restart Apache either from the Engintron WHM app or via WHM's built-in controls.

### Mar 1st, 2017 - v1.8.1
* Improved the HTTPS block generator in Nginx
* Added new Apache related utilities in the Engintron WHM app
* Fixed the "save" functionality in file editing to always save a file with LF line endings. This fixes broken cron jobs defined in /etc/crontab if you opened that file via the Engintron WHM app and saved the file (whether you actually edited the file or not). If you DID edit that file, just open it again and simply save it. It will fix line endings in /etc/crontab and any cron jobs in there will resume (including the cron job to generate the HTTPS blocks in Nginx).
* Improved the installer to force-restart Apache after the installation/update of Engintron, as Apache could "hang" and cause 502 errors in Nginx (and thus broken sites).
* Fixed OCSP stapling activation only for domains that support it.
* You can now edit /etc/nginx/common\_https.conf if you wish to do so :)
* MySQL status page check fix to support both MySQL and MariaDB
* Tweaked the HTTPS block generator script to possibly bypass open\_basedir restrictions
* Other minor fixes & improvements
IMPORTANT: After you upgrade to v1.8.1, if for some reason you get 502 errors in Nginx, please restart Apache either from the Engintron WHM app or via WHM's built-in controls.

### Feb 17th, 2017 - v1.8.0
* Finally addressed the elephant in the room. Engintron now **fully** supports both HTTP and HTTPS traffic. Additionally HTTP/2 is enabled by default. It's important that domains already have an issued TLS/SSL certificate via cPanel. With the option to issue free such certificates from within cPanel (AutoSSL feature) there's no cost reason not have any domain without a TLS/SSL certificate. It's important to note that since Nginx now binds to both ports 80 & 443, if you have CSF or any other firewall installed, you must allow ports 8080 and 8443 respectively which now bind to Apache.
* HSTS (HTTP Strict Transport Security) is not enabled by default in order to allow a smooth transition from HTTP to HTTPS. This is a practical decision as many hosting companies may update Engintron to support HTTPS, however the actual sites may still contain static assets with mixed HTTP and HTTPS sources. This will cause these sites to appear "visually broken" in most browsers as static assets loaded from HTTP will be blocked by default. So this is best left to the server admin to decide. The related HSTS header is commented by default in "proxy\_params\_common" which you can comment out to enable. Just remember that if you enable HSTS and change your mind, any visitors that requested sites from your HSTS enabled server(s) will cache the existence of that header and continue to request the HTTPS version of sites hosted there for at least a day, EVEN if you comment again the header and restart Apache & Nginx.
* Added option to monitor both HTTP (port 80) and HTTPS (port 443) traffic in the Engintron WHM App.
* Fixed a minor visual bug in the Engintron WHM app.
* Updated main nginx.conf configuration.
* Improved HTTP header handling overall for more efficient caching and overall static asset serving.

### Nov 19th, 2016 - v1.7.3

* Engintron will now install as a cPanel registered app (previously it was just switching the related option in cPanel off - sorry for that folks!).
* Fix Nginx logs filling up with failed connections to "localhost" from apps requesting "localhost" internally.
* You can now use a "?nocache" query string to force-bypass Nginx's micro-cache when testing. Additionally, if you use this query string in static files while developing a website on your server, static files like CSS & JS will not be cached internally by Nginx.
* Significantly improved HTTP header handling for both dynamic & static files. Especially with static files, large files like videos, music, documents, archives etc. are now directly streamed from Apache. This will resolve huge Nginx caches being created for site heavy on such media, document & archive files.
* Improved CMS exclusions and added support for WordPress' WooCommerce plugin.
* Added support for separate cache when a browser identifies itself to the server as "mobile" (iPhone, iPod, iPad and Android). This will allow plugins like WPtouch to work just fine with WordPress and Nginx's micro-caching.
* Improved the exclusions that you can add in "custom rules". It is now possible to exclude domains or even URL paths from either micro-caching or static file caching or even both.
* Added support for cPanel's special subdomains like webmail.domain.com, cpanel.domain.com etc. All these will now properly redirect to cPanel's respective apps.
* Fixed a bug in Engintron's WHM app where the checkbox to trigger a service reload/restart after editing a file simply failed. It now works properly and also logs the state of the services reloaded/restarted in the notifier bubble showing up on the top-right corner, after editing a file and saving.
* For advanced users who REALLY know what they're doing, there is now a (commented) section in "proxy\_params\_dynamic" which explains how to trigger both client & server side caching in Nginx for the ultimate performance. This way, Nginx can serve both dynamic & static content for longer (cache TTL can be in minutes) thus improving performance significantly. But there's a caveat to this: it's geared primarily for cPanel servers with few sites that do NOT have user-generated content in the frontend. The comments in "proxy\_params\_dynamic" contain everything an advanced user will need.

_**IMPORTANT!** After you update Engintron to v1.7.3 and click on the menu link "Engintron for cPanel/WHM" in WHM's sidebar, you may get an error that the requested page is missing. Don't panic. WHM's sidebar link for Engintron is simply pointing to the old .cgi entry file, because the sidebar is not refreshed when Engintron gets updated. Simply reload WHM entirely in your browser (Ctrl+Shift+R or CMD+Shift+R) and the sidebar link for Engintron will refresh to the actual .php file that is used for the app._

### Aug 30th, 2016 - v1.7.2

* Added CMS specific exclusions for the dynamic cache (Joomla, K2 for Joomla, WordPress and IPB supported for now). This allows to use longer cache times (beyond the 1 sec micro-cache shipped by default with Engintron), e.g. 1 or 2 mins or more, for even better performance, without affecting logged-in users. That's because Nginx now detects cookies and paths used by the CMSs currently supported to switch off its cache entirely. Check the proxy\_params\_dynamic configuration file for more info... ***However for Joomla specifically*** you MUST have a certain entry point for users to login. Engintron will exclude the URLs /login and /connect by default, if you wish to create menu items to these URLs where you can place your site's login page. These "entry point" pages/URLs make sure that Nginx's cache is switched off when these URLs are accessed, thus allowing Joomla to serve a fresh page to each user with the correct form token ID and therefore allow the user to login without getting an "invalid token" warnings.
* Added ***?nocache*** query string which developers can use to bypass Nginx's cache if using longer cache times for dynamic content (as it's now possible, as stated above). If for example you wish to see the page **http://example.com/blog** without Nginx caching the output, then you can just call **http://example.com/blog?nocache**. Simple!
* Addressed potential security issue through which an attacker could fake their IP and bypass any IP-based restrictions set in apps or websites. Special thanks to [Alex Vorona](https://github.com/voron) for spotting this issue.
* If [CSF](https://configserver.com/cp/csf.html) is installed, Engintron will now add the Nginx executable to CSF's process ignore list file.
* Removed cookie stripping from static files (Nginx will only ignore them to build its cache) as this was causing issues in certain sites.
* Added newsletter link in the Engintron WHM app.

### Aug 19th, 2016 - v1.7.1

* Addressed potential security issue where Nginx becomes an open proxy when Engintron is disabled and Nginx is switched to port 8080.
* The "Enable/Disable Engintron" toggler in the Engintron WHM app will now properly display the target state to switch to, e.g. either "Enable Engintron" or "Disable Engintron".

### Aug 17th, 2016 - v1.7.0

* Engintron is now EasyApache 4 compatible.
* Added option to edit the system's crontab file
* New CLI options added - explore with "/engintron.sh -h"

### Jul 19th, 2016 - v1.6.2

* Protect your cPanel server from the [httpoxy](https://httpoxy.org/) vulnerability with the help of Nginx, by setting the "HTTP Proxy" header to null.
* Install mod\_remoteip using the source file provided from the Engintron repo on GitHub. Many installations previously dealt with failed downloads of that file from the official Apache code repo, which resulted in mod\_remoteip not being installed at all and thus Nginx could not pass the visitor's IP back to Apache.
* Bumped proxy read/send timeouts to 180s from 120s.
* Fixed IPv6 resolver syntax in nginx.conf.
* The custom\_rules file will not be overridden on Engintron updates.
* You can switch between Nginx stable and mainline (latest) releases with new options in the WHM app and the Engintron CLI.
* Nuke cookies for static files for good - added 'proxy\_ignore\_headers Set-Cookie;' & 'proxy\_set\_header Cookie "";' alongside 'proxy\_hide\_header Set-Cookie;'.
* Switched Nginx status page back to public (by default). When that page was set to private, Munin failed to graph Nginx usage. If you don't use Munin, you can uncomment 2 lines in default.conf if you wish to hide that page. In any case, leaving the Nginx status page open does not pose any security or other issue.
* Nginx log rotation is updated to 7 days (the default option was 52 days!).
* Moved SVG file handling in Nginx to the "fonts" block as Chrome uses CORS to decide serving to end users.
* Fixed Nginx cache/temp folder reporting in CentOS 7 (or other systemd based distros where cPanel works).
* Code changes to make Engintron utilize the WHM API v1 where possible.

### Feb 19th, 2016 - v1.6.1

* Engintron will now (be default) modify Apache's log format to allow for the proper inclusion of a visitor's IP in all systems. The change is merged with Apache's configuration so it's protected if Apache settings are modified via WHM. If you uninstall Engintron, Apache's log format is reverted to its previous state.

### Feb 14th, 2016 - v1.6.0

* Introducing new "custom\_rules" file (fully editable from within WHM) for you to store any custom Nginx rules or redirects. These include custom setup for CloudFlare or for certain domains. The only thing you need to edit to apply any rules from now on is "custom\_rules" and that's why upon updates, we keep a copy of that file and display it within WHM so you can easily copy/paste your custom Nginx rules before the update to the new "custom\_rules" file being installed. We could simply keep that file for you, but breaking changes may be introduced so it's always good to be able to keep up to date.
* CloudFlare integration is now easier than ever. All you have to do is set your shared or any dedicated IPs. We also include some handy redirect rules for CloudFlare, for HTTP to HTTPS. Just uncomment whatever you want to use.
* Introducing version update checker. If you already have v1.5.3, you'll see the first update notice when you visit Engintron in WHM. Upgrading is as simple as clicking a link in the app.

### Feb 12th, 2016 - v1.5.3

* Micro-caching is now enabled by default. Extensive tests have shown that there are no issues caused when micro-caching is enabled. In fact, performance is exponentially increased when micro-caching is on, which is the reason why Engintron now ships with this option on.
* Improvements to the installer - if any of the Apache modules (RPAF or RemoteIP) fail to install, we just skip that part without causing Apache to stop working because of missing .so files.
* Increased default timeouts in nginx.conf to minimize 504 errors from slow backends.
* Added a more reliable way to restart Nginx if another Nginx plugin for cPanel was previously uninstalled leaving Nginx still binding to port 80.

### Feb 7th, 2016 - v1.5.2

* Added CentOS 7 support (installer worked fine since 1.5.0, however a few controls in the WHM app did not output the correct messages)
* Added option to update or re-install Engintron from within WHM, via the Engintron app under "Plugins"

### Feb 6th, 2016 - v1.5.1

* General installer/uninstaller improvements
* Improved compatibility with CentOS 5
* Added option to enable/disable Engintron without completely uninstalling it. You can control Engintron's state through the WHM app dashboard or via the terminal. Nginx switches to port 8080 and Apache switches to port 80 when you run "$ bash /engintron.sh disable". If you run "$ bash /engintron.sh enable" Nginx reclaims port 80 and Apache takes port 8080.
* IPv6 support is now present but it has to be uncommented in order to work properly (in files /etc/nginx/nginx.conf for the resolver & /etc/nginx/conf.d/default.conf for the catch-all rule)
* Improved help/instructions when executing engintron.sh via terminal
* Added some terminal utilities like "restart Apache & Nginx", "restart all important services", "show server info", "show traffic on port 80" and more. From the terminal type "bash /engintron.sh" or just "/engintron.sh" if you have already installed Engintron.
* Fixed /nginx\_status page - info now also shown under "Nginx Status" option in the WHM app dashboard
* Fixed /favicon.ico and /robots.txt loading - previously these files were blocked due to a mismatch in their respective definitions
* Updated retrieval location for mod\_rpaf to ensure proper installation on all CentOS releases

### Feb 1st, 2016 - v1.5.0

* Complete re-write of the main installer script as well as the app dashboard
* vhost sync'ing is no longer needed - you add new domains via cPanel and it just works
* New, smarter, better proxying/caching approach - improves performance without the headaches of controlling exclusions for different CMSs - it just works
* Proper client side caching for all types of content
* Compatible with domains served via CloudFlare


***


### Dec 23rd, 2014 - v1.0.4 Build 20141223

* Updated static asset loading from an HTTPS source

### Dec 3rd, 2014 - v1.0.4 Build 20141203

* Since mod\_rpaf was dropped from its original developer, it's now been updated with the fork that's been actively maintained here: [https://github.com/gnif/mod_rpaf](https://github.com/gnif/mod_rpaf)
* Moved all static assets of the app dashboard onto GitHub's CDN. This simply results to a cleaner Engintron script.
* Removed the line "proxy\_hide\_header Set-Cookie;" from proxy.conf as it was causing issues with WordPress websites not being properly cached (thank you @AgentGod)

### May 30th, 2014 - v1.0.3

* Fixed compatibility with Munin, added Nginx tracking in Munin
* Enabled access logs for domains, but static file logging is disabled for performance reasons
* Switched default Nginx worker process to "auto" (aka CPU/core support), so it won't be required to be set manually
* Obsolete vhosts are now cleaned up whenever the sync process is performed
* Added some default Nginx files after setup in case they are not created during Nginx's installation
* Added default.conf vhost during installation
