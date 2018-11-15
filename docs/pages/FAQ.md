Q. **How popular is Engintron?**  
A. At the time of writing (April 2018) and since Feb 2016, **Engintron has been deployed into more than 50,000 servers worldwide**! It is the [most popular (starred) cPanel plugin on GitHub](https://github.com/topics/cpanel?o=desc&s=stars) and [the most reviewed cPanel plugin in the cPanel Applications Catalog](https://applications.cpanel.net/listings/view/Engintron-Nginx-on-cPanel).

Q. **How do I get started?**  
A. Installation is pretty straightforward as you may have read above already. There is however extensive documentation available in the wiki: [https://engintron.com/docs](https://engintron.com/docs) - we even include general optimization guides for your cPanel server!

Q. **Any requirements I should be aware of before installing Engintron?**  
A. Yeap, there are a few. Have a look here: pages/Requirements

Q. **Engintron is awesome! But I have a problem or I want to report a bug! Where do I do that?**  
A. The "Issues" section here on GitHub - [https://github.com/engintron/engintron/issues](https://github.com/engintron/engintron/issues) - is the right place to report bugs or request for help. We will eventually offer a dedicated support forum when we launch the new Engintron website.

Q. **I have dozens of .htaccess rules in Apache. Will I have to re-write those for Nginx?**  
A. Of course not! Nginx works as a proxy to Apache, it does not operate as the direct webserver of your content. In other words, you just install Engintron and everything in Apache (and your apps or websites) will function as it did before. Nginx requires no maintenance. It just works.

Q. **Is Nginx secure? Will my server be protected as it is now with Apache. I already have [name 20 protection solution for cPanel here] installed. Do I have to configure my cPanel/WHM server additionally?**  
A. Nginx is both reliable and secure. In fact, it can even be used to mitigate attacks on software ([see how Nginx was used to protect vulnerable Joomla 3.x websites from a recently disclosed exploit](https://www.nginx.com/blog/new-joomla-exploit-cve-2015-8562/)) and when used with micro-caching enabled, it can even handle large DoS (denial of service) attacks by simply doing what it does best: handle huge web traffic! To be more precise, all you need for a secure server is ConfigServer's CSF firewall (essentially a frontend for IPTables) to handle basic firewall functionality for your server and Engintron for web traffic.

Q. **How does Engintron (and Nginx) handle HTTPS traffic?**  
A. As of version 1.8.0, Engintron fully supports passing both HTTP & HTTPS traffic through Nginx entirely.

Q. **I have a firewall like CSF on my cPanel server. Should I open up any additional ports?**  
A. Yes please. Make sure ports 8080 and 8443 are enabled in your firewall.

Q. **Will it work with CloudFlare?**  
A. Yes, but there is a minor gotcha. You need to adjust your "custom\_rules" Nginx configuration file a bit. When you open that file via Engintron's WHM app, you'll see examples of the rules to add for Engintron to work seamlessly with CloudFlare. To briefly explain the process, you need to set your server's shared (main) IP and/or any additional dedicated IPs matching certain domains (everything is documented with examples in there).

Q. **I have Munin installed on my cPanel server to monitor resources. Does Engintron setup Nginx graphs in Munin as well?**  
A. Absolutely. Have a look at the "Using Engintron" document in our Wiki for a screenshot of the graphs you get for Nginx in Munin. If you install Munin after you first installed Engintron, simply re-install Engintron via WHM and you'll get the Nginx graphs in your newly set Munin installation.

Q. **Does Engintron require a certain CentOS release to work?**  
A. Engintron is fully compatible with the last 2 major releases of CentOS. That means CentOS versions 6 and 7 are fully supported. It may work on CentOS 5 but it's not tested.

Q. **Does Engintron work in CloudLinux?**  
Yes. It is fully compatible with CloudLinux versions 6 & 7.