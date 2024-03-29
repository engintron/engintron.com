## 10 reasons why

### Why is Engintron a better solution compared to other Nginx (or performance related) plugins for cPanel

There are 10 key differences when comparing Engintron with other Nginx (or performance related) plugins for cPanel.

First and foremost, caching actually works with Engintron. It works as it should and it works universally. You install it and ALL your cPanel websites will get accelerated, even the slowest ones. Not only that, your serving capacity will increase tremendously. Simple Apache Benchmark (ab) tests reveal a phenomenal increase in concurrent requests served per second, from just 3-300 in Apache to 15,000-20,000 or even more using Nginx via Engintron. It's our carefully crafted Nginx proxy configuration that does all the magic. And it requires literally almost zero maintenance.

Second, Engintron is a single shell script (weighing only a few KBs) that installs all required software (to make Nginx work as intended) from the official software package vendors' repositories. Both installation and updates are very fast (they take only a few seconds).

Third, since we're using the official repositories for Nginx, all Engintron software is updated whenever cPanel (or the server's software) is updated. So you essentially set it and forget it. Whenever you perform "yum update" or "dnf update" from the terminal or upgrade the server's software from within WHM, Nginx will be updated if a new release is available. If something is changed on Engintron and you need to re-install it or a new version of Engintron is released, you simply install it on top of the previous installation, either from the terminal or using the Engintron WHM app. You don't need to uninstall it first like other Nginx plugins for cPanel require you to do so before upgrading!

Fourth, you can safely uninstall Engintron and it will *revert* your entire system to how it was before you installed Engintron. Simple as that. Which means you can try Engintron and if you don't like it or you find it doesn't fit your needs, you can simply uninstall it. Your system will revert to how it was before. Period.

Fifth, it has an amazingly simple yet practical app dashboard inside WHM with all the basic controls for Nginx, Apache, MySQL, the option to edit all important configuration files for these services and even some handy utilities that make Engintron the dashboard in cPanel for your day-to-day sysadmin tasks. Think of it as your cPanel server's mission control. And did we mention you can easily update Engintron from within WHM? Yeap! You even get update notifications when a new version is available.

Sixth, it's CloudFlare friendly. Because both CloudFlare and Engintron use Nginx as a reverse caching proxy, unless we configure Nginx in cPanel to properly act as the secondary proxy (after CloudFlare of course), chances are that CloudFlare will freak out and serve your sites with 10xx errors. So, if you have any domains hosted on your cPanel server that use CloudFlare for their CDN, you just set your server IPs inside your "custom_rules" Nginx configuration file (the file is commented for your help) and just restart Nginx for the changes to take effect. All this is done entirely inside WHM of course.

Seventh, it doesn't require manual Nginx/Apache vhost synchronization when adding new domains via cPanel. That's why you essentially "set it and forget it". Have a look at the other Nginx plugins for cPanel... 'Nough said ;)

Eighth, Engintron allows for both HTTP and HTTPS traffic to flow through Nginx entirely, as of version 1.8.0.

Ninth, Engintron is 100% open source. You can easily examine its code here on GitHub, tear it apart, customize it, fork it, knife it or contribute back to its development. Do whatever you want with it :)

And finally, Engintron (which was originally launched in April 2014) is nowadays a mature project, one of the most popular cPanel plugins and the defacto Nginx installer for cPanel. It is by far [the most reviewed plugin on the cPanel Applications Directory](https://applications.cpanel.net/listings#/listings/index/sort:Listing.review_count/direction:desc) and [the cPanel plugin/addon with most stars on GitHub](https://github.com/topics/cpanel?o=desc&s=stars). According to simplified analytics from the Engintron WHM app (added in February 2016), it is actively used by dozens of thousands of sysadmins in 150+ countries around the world. According to [BuiltWith](https://trends.builtwith.com/framework/Engintron), more than 300,000 sites worldwide are powered by Engintron optimized cPanel servers. BuiltWith also reports around 1,5 million sites powered by cPanel. In other words, 1 in 5 cPanel servers worldwide has Engintron installed. The actual numbers may differ of course, but statistically speaking, it's an interesting fact nevertheless...
