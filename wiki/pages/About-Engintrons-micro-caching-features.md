Micro-caching is a very effective technique to allow a server to withstand sudden spikes in traffic. If a server's capacity is measured from a dozen to a few hundred requests per second, then in the case of traffic bursts, your server will probably collapse and stop serving content overall. If you also host DNS on your cPanel server and the server collapses due to high traffic or load, then your domains will not respond to DNS queries at all, which means services like email may stop working entirely!

Using micro-caching, the server could be able to handle thousands to dozens of thousands requests per second. The "trick" is simple: if you get 100 visitors requesting the same page in 1 sec, generate the page from the absolute first visitor and then serve the rest 99 visitors the cached copy of that page. Even if your sites have thousands of pages, the benefits are still enormous in terms of both performance and resource consumption.

The micro-caching technique is also an officially suggested caching technique from the Nginx team, when using Nginx as a reverse caching proxy.

The default micro-cache time is set to 1 second and it is highly recommended not to increase it beyond that, otherwise it may interfere with sites like forums & e-shops when users are logged in.

We urge you to test a few sites and make sure everything works as expected - especially sites with user generated content such as forums or e-shops.

The process to disable micro-caching is pretty easy (if for some reason you choose to do so). Login to WHM and head over to Plugins >> Engintron, then click to edit "Custom Rules" and just add:
```
set $CACHE_BYPASS_FOR_DYNAMIC 1; # Disables micro-caching
```
and save. Micro-caching is now disabled for all domains (server-wide).

