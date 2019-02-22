## Requirements

A few things to keep in mind before installing Engintron.

1. Read the Engintron Wiki section before posting questions in the "Issues" section. **Seriously**.
2. As of v1.8.0, Engintron has to perform constant file operations within cPanel to make sure HTTPS works smoothly. Since Engintron is built in Bash & PHP, it's mandatory that open\_basedir protection is disabled in your system. Besides, if PHP is served via PHP-FPM or running as a CGI or FastCGI module in your server, the file system's restrictions in access rights and file ownership will prevent you from having any issues with open\_basedir disabled.
3. If you use a firewall like CSF (or similar), please make sure ports 8080 and 8443 are enabled. Apache will use these when Nginx binds to ports 80 and 443 to handle HTTP and HTTPS traffic respectively. Additionally, have a look here: [pages/Restrict-access-to-ports-8080-&-8443-used-by-Apache-only-for-Nginx](pages/Restrict-access-to-ports-8080-&-8443-used-by-Apache-only-for-Nginx.md)
4. If you already had some other Nginx for cPanel plugin installed on your system, please make sure you've uninstalled it first. This may also help: [pages/How-to-uninstall-other-Nginx-plugins-for-cPanel-(before-installing-Engintron)](pages/How-to-uninstall-other-Nginx-plugins-for-cPanel-(before-installing-Engintron).md)
