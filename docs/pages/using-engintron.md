## Using Engintron

![Engintron Backend](./images/20220101_engintron_v2.0_s1.png)

### PREFACE FOR v1.5 OR NEWER

Unlike version 1.0.x of Engintron, the new 1.5.x version (or greater) uses a different approach for proxying and caching, which now makes Engintron a perfect fit for any cPanel server - operated by freelancers, agencies or even large hosting companies. Engintron will now cache both static assets and dynamic HTML content, by using the micro-caching concept for the latter to significantly boost a site's performance, even if it has user generated content that should not be cached. Micro-caching is perfect for sites with user-generated content like forums, e-shops etc. as it maintains the benefits of caching without altering the user experience.

By using a different proxying & caching strategy altogether, the previous use of vhost synchronization between Apache and Nginx is now unnecessary. You essentially set and forget Engintron. New domains added in cPanel will work just fine with Nginx and without restarting any service.


### WHAT MAKES ENGINTRON SPECIAL

It's really the accumulated knowledge from years of deploying and managing high traffic websites around the globe. We're talking about websites that measure in the dozens of millions of page views per month, receiving traffic from millions of visitors per month. Beyond that, we're also software developers. We have built & maintain the awesome award-winning K2 extension for Joomla (downloaded more than 3 million times at the time of writing - [getk2.org](https://getk2.org)), precisely because we needed to bypass the performance & content limitations in the CMS, using our knowledge on high performance deployments. The vast community of users who have used K2 so far has brought in an enormous wealth of information on all matters related to high performance. That is also the reason why the constant improvements to K2 have made it the de-facto content extension to use in Joomla for high traffic deployments. It's no wonder that companies like MTV, Nickelodeon, Carrefour, Jaguar or Groupama, organizations like Amnesty International or Actionaid, institutions like the Harvard University or public organizations like the Governments of Brazil, Italy and many more across the world that choose to use Joomla, also choose to have K2 installed.

All this knowledge, both from our sysadmin experience as well as our software development expertise, have been the driving force behind Engintron. And it's our pleasure to be able to provide it to any cPanel user for free :)


### HOW DOES CACHING IN ENGINTRON WORK EXACTLY?

Engintron will (by default) install Nginx in such a way that caching is performed bpth for static files like CSS, JavaScript, images etc. as well as dynamic HTML content.

First, Nginx will enforce Cache-Control/Expires headers for such static files, which allows a visitor's browser to store these static assets in its internal cache. This is called client-side caching. Since the browser caches all this static content, the requests to your server drop and the server will essentially only serve HTML content plus any new static assets that get requested. The default expiration time for the static assets in 30 days for CSS/JS and 60 days for everything else. HTML or dynamically generated content is never cached.

Using client-side caching, your sites will perform better and your overall score on services like Google PageSpeed Insights will improve.

Second, Nginx will apply a soft 1 minute internal cache for static files, so that it doesn't re-request these files from Apache, whenever new traffic comes in. Since Nginx is built to handle static asset delivery way better than Apache, you'll notice a drop in resource usage (CPU & RAM) on your server. Using a 1 minute cache time for static files does have one small caveat though. If you don't use cache-busting techniques (more here: [https://css-tricks.com/strategies-for-cache-busting-css/](https://css-tricks.com/strategies-for-cache-busting-css/)) then any changes performed to CSS or JS code will be visible after this 1 minute. We believe it's a trivial amount of time when cache-busting is not used and the overall benefits outweigh this small caveat.

The above caching options available to you "out-of-the-box" when you install Nginx will allow your server to increase its serving capacity while at the same time lower the load on your server.

As a sidenote, Nginx is pre-configured to enable Gzip compression for the static files that it makes sense to compress, e.g. CSS or JS, but not images. So if you combine Gzip support and caching, you really don't have to edit your sites' .htaccess files to apply such optimization rules. Nginx will simply do the "heavy lifting" for you once you install Engintron.

Micro-caching on the other hand is a very effective technique to allow a server to withstand sudden spikes in traffic. If a server's capacity is measured from a dozen to a few hundred requests per second, then in the case of traffic bursts, your server will probably collapse and stop serving content overall. If you also host DNS on your cPanel server and the server collapses due to high traffic or load, then your domains will not respond to DNS queries at all, which means services like email will stop working entirely!

Using micro-caching, the server could be able to handle thousands to dozens of thousands requests per second. The "trick" is simple: if you get 100 visitors requesting the same page in 1 sec, generate the page from the absolute first visitor and then serve the rest 99 visitors the cached copy of that page. Even if your sites have thousands of pages, the benefits are still enormous in terms of both performance and resource consumption.

The micro-caching technique is also an officially suggested caching technique (from the Nginx team) when using Nginx as a reverse caching proxy.

The micro-cache time is set to 1 second and it is highly recommended not to increase it beyond that, otherwise it may interfere with sites like forums & e-shops when users are logged in.

We urge you to test a few sites and make sure everything works as expected - especially sites with user generated content such as forums or e-shops.


### TERMINAL UTILITIES

After you download engintron.sh on your server (using the wget command), you can explore all available terminal options by simply executing:

```
$ engintron -h
```

Besides the Engintron specific functionality (install, remove, enable/disable, clean the Nginx cache) you'll also find some handy utilities for when using the terminal to work on your server.

 
### DAY TO DAY TASKS

After you install Engintron, you will notice it has enabled its own app dashboard in WHM, under the Plugins section. From now on you can fully operate Engintron & Nginx related tasks entirely from the Engintron app dashboard. And we have included controls for Apache, PHP & MySQL as well. The most important configuration files from these services can be directly edited via Engintron's app dashboard and you can even control the status of the 3 main services (Nginx, Apache, MySQL).

You can also check Nginx's main logs (access and error) and we have bundled a few tiny tools for common day-to-day sysadmin tasks, e.g. resource or HTTP traffic monitoring.

Some of these utilities are also available via the terminal. Execute:

```
$ engintron -h
```

...to see all available options.


### INTEGRATION WITH MUNIN

![Nginx on Munin](./images/1.6.0_nginx_on_munin.png)
If your cPanel server has Munin (the most popular system monitoring software) installed, then when you install Engintron, it will also enable graphs inside Munin for Nginx as well, so you can monitor traffic and overall usage for it.


### TROUBLESHOOTING

If you edit any of the default Nginx files and you're worried if things may "break", you can choose to save any of its configuration files without reloading Nginx and then run the option "Check configuration for errors" to verify if everything is OK.

If anything else happens, the two Nginx logs (access & error) are your first source of information.

If you can't find any meaningful reason as to why things may have been messed up, just post about it the Issues section here on the project's GitHub repo:

[https://github.com/engintron/engintron/issues](https://github.com/engintron/engintron/issues)
