## FAQ

Q. **How popular is Engintron?**
A. At the time of writing (Jan 2022) and since Feb 2016, **Engintron is powering more than 300,000 sites worldwide** which is roughly 1 in every 5 sites that is served by a cPanel server (according to BuiltWith metrics)! It is the [most popular (starred) cPanel plugin on GitHub](https://github.com/topics/cpanel?o=desc&s=stars) and [the most reviewed cPanel plugin in the cPanel Applications Catalog](https://applications.cpanel.net/listings/view/Engintron-Nginx-on-cPanel).

Q. **How do I get started?**
A. Installation is pretty straightforward as you may have read above already. There is however extensive documentation available in the wiki: [https://engintron.com/docs](https://engintron.com/docs) - we even include general optimization guides for your cPanel server!

Q. **Engintron is awesome! But I have a problem or I want to report a bug! Where do I do that?**
A. The "Issues" section here on GitHub - [https://github.com/engintron/engintron/issues](https://github.com/engintron/engintron/issues) - is the right place to report bugs or request for help.

Q. **I have dozens of .htaccess rules in Apache. Will I have to re-write those for Nginx?**
A. Of course not! Nginx works as a proxy to Apache, it does not operate as the direct webserver of your content. In other words, you just install Engintron and everything in Apache (and your apps or websites) will function as it did before. Nginx requires no maintenance. It just works.

Q. **Is Nginx secure? Will my server be protected as it is now with Apache. I already have [name 20 protection solution for cPanel here] installed. Do I have to configure my cPanel/WHM server additionally?**
A. Nginx is both reliable and secure. In fact, it can even be used to mitigate attacks on software ([see how Nginx was used to protect vulnerable Joomla 3.x websites from this exploit](https://www.nginx.com/blog/new-joomla-exploit-cve-2015-8562/)) and when used with micro-caching enabled, it can even handle moderate to large DoS (denial of service) attacks by simply doing what it does best: handle huge web traffic! To be more precise, all you need for a secure server is ConfigServer's CSF firewall (essentially a frontend for IPTables) to handle basic firewall functionality for your server and Engintron for web traffic.

Q. **How does Engintron (and Nginx) handle HTTPS traffic?**
A. It's 2022 (at the time of writing), so yeah, Engintron fully supports passing both HTTP & HTTPS traffic through Nginx entirely.

Q. **I have a firewall like CSF on my cPanel server. Should I open up any additional ports?**
A. It's not required, but it will help with debugging if you want to see how a site loads side by side with Apache too. In that case make sure ports 8080 and 8443 are enabled in your firewall.

Q. **Will it work with CloudFlare?**
A. Yes, but there is a minor gotcha. You need to adjust your "custom\_rules" Nginx configuration file a bit. When you open that file via Engintron's WHM app, you'll see examples of the rules to add for Engintron to work seamlessly with CloudFlare. To briefly explain the process, you need to set your server's shared (main) IP and/or any additional dedicated IPs matching certain domains (everything is documented with examples in there). Since v4 IPs are kind of expensive nowadays, most servers ship with a single shared IP v4 address. Just use that in your "custom\_rules" file.

Q. **I have Munin installed on my cPanel server to monitor resources. Does Engintron setup Nginx graphs in Munin as well?**
A. Absolutely. Have a look at the "Using Engintron" document in our Wiki for a screenshot of the graphs you get for Nginx in Munin. If you install Munin after you first installed Engintron, simply re-install Engintron via WHM and you'll get the Nginx graphs in your newly set Munin installation.

Q. **Does Engintron require a certain OS release/version to work?**
A. Engintron is tested only on platforms that are actively supported by cPanel itself. As such, as of January 2022, Engintron is fully compatible with CentOS 6 with CloudLinux (the only actively supported Enterprise Linux variant by cPanel as CentOS 6 is officially EOL since 2020), CentOS 7 and all EL 8 variants such as AlmaLinux, Rocky Linux & CentOS 8 (for which support by Red Hat stopped at the end of 2021). Engintron should also work on other EL 8 variants (e.g. Oracle Linux, Amazon Linux etc.) that can run cPanel (albeit "unofficially")... Additionally, once cPanel is officially released to also support Ubuntu (in the near future), Engintron will also be released to support Ubuntu as well.

Q. **Does Engintron work in CloudLinux?**
Yes. It is fully compatible with CloudLinux versions 6 (or newer) and, again, for as long as cPanel supports it too.