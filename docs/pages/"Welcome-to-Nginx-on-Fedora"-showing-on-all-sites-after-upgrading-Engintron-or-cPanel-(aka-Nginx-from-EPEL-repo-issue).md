## "Welcome to Nginx on Fedora" showing on all sites after upgrading Engintron or cPanel (aka Nginx from EPEL repo issue)

This issue surfaced after March 2018 and it basically boils down to Nginx being replaced by a copy referenced in the EPEL repository that some cPanel users/admins have added to their server.

Since the EPEL repo is quite popular in the CentOS community, it may be installed in your system by some other cPanel plugin or software package that required that repo.

The solution is to just re-install Engintron.
