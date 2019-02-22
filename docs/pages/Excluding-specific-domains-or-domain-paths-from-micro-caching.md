## Excluding specific domains or domain paths from micro caching

There are times when you'll want to exclude specific domains or domains paths from micro-caching. For example a forum website that it's not easy to make cookie-based exclusions for or custom apps that require a full path exclusion only.

Since v1.7.3, you can add such exceptions in your "Custom Rules" file. Simply edit that file from the Engintron WHM app and at the bottom of the file, add something like this:
```
if ($SITE_URI ~* "domain1.tld|forum.domain2.tld|domain3.tld/community|domain4.tld/path/to/some/form") {
    set $CACHE_BYPASS_FOR_DYNAMIC 1; # Disables micro-caching
    set $CACHE_BYPASS_FOR_STATIC 1; # Disables static file caching
}
```

Let's see what happens here.

Inside the if statement's condition, we execute domain-only and domain path exclusions based on simple regular expressions. Each exclusion is separated from the next using the colon (|) character.

So in the example above, we exclude:
* The domain "domain1.tld" and all its subdomains ENTIRELY. This is because "www.domain1.tld" and "subdomain.domain1.tld" both include "domain1.tld" in them and since this is a regular expression, the exclusion is matched for both.
* The subdomain "forum.domain2.tld" and all its contents are excluded entirely from caching. However "domain2.tld" and of course "www.domain2.tld" (if the latter exists in your DNS setup) are both NOT excluded.
* The domain path "domain3.tld/community" and all URLs including that path are completely excluded from caching. So "www.domain3.tld/community/login" and "www.domain3.tld/community/latest-posts" are both excluded entirely from caching.
* The domain path (probably to a single page) "domain4.tld/path/to/some/form" is entirely excluded from caching.

Remember that after you do any such changes to your "Custom Rules" file, you need to:
a) First check if Nginx's configuration is valid - you may have mistyped something - use the related command in Engintron's WHM app
b) Restart Apache & Nginx afterwards

Similarly to the above example, if you just add:
```
set $CACHE_BYPASS_FOR_DYNAMIC 1; # Disables micro-caching
```
directly in your custom rules file, then micro-caching is disabled for all domains (server-wide).