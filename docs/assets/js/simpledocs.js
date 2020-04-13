/**
 * @version     1.1
 * @package     SimpleDocs.js
 * @author      JoomlaWorks https://www.joomlaworks.net
 * @copyright   Copyright (c) 2006 - 2020 JoomlaWorks Ltd. All rights reserved.
 * @license     https://www.joomlaworks.net/license
 */

/*
    Requirements to load before SimpleDocs.js:
    - jQuery 1.9.x+ (https://jquery.com/)
    - Showdown.js (http://showdownjs.com/)

    Basic conventions (for things to work as easy as possible):
    - You only need an entry index.html file to load everything.
    - Use 2 data-attributes (data-sd-menu & data-sd-content) in any HTML element
      where you want to output the menu and content (markdown page).
    - Add the JS files in order according to the requirements stated above (jQuery, Showdown.js, SimpleDocs.js).
    - Store markdown (.md) documents in the /pages/ subfolder by default.
    - Your are free to store your CSS, JS, images etc. wherever you want.
    - For your homepage create a /pages/index.md file (with some welcome message for example).
    - For your navigation create a /pages/menu.md file (with a simple Markdown list, nested or not).
    - For pages that don't exist create a /pages/404.md file.
    - You can organize your .md files inside /pages however you want (e.g. group them in subfolders).
      Just make sure to properly map them in your /pages/menu.md file.

    To Do:
    - Create an initializer for the main index.html file,
      so every configurable part of the script is managed there and not in this file.
    - Create themes
*/

(function($) {
    // Configuration
    var outputContainer = '[data-sd-content]';
    var navContainer = '[data-sd-menu]';
    var gaDomain = 'https://engintron.com';

    // Parse Markdown (showdown.js)
    var converter = new showdown.Converter();

    // Trigger a GA page view entry (you need to load GA first inside index.html)
    function triggerGA(domain) {
        if (domain && typeof(ga) !== 'undefined') {
            ga('send', {
                hitType: 'pageview',
                title: document.title,
                page: window.location.href.replace(domain, '')
            });
        }
    }

    // PHP's ucfirst() for JS
    function ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Update browser history
    function updateBrowser(page, title, data) {
        if (!title) title = ucfirst(page.slice(8, page.length));
        history.pushState(data, title, page);
        document.title = title;
        triggerGA(gaDomain);
    }

    // Get page
    function getPage(page, title, container, urlstate) {
        $.ajax({
            url: page + '.md',
            success: function(result) {
                var output = converter.makeHtml(result);
                $(container).html(output);
                if (urlstate) {
                    updateBrowser('#/' + page, title, output);
                }
                parseUrls(container);
                $(container).scrollTop(0);
            },
            error: function(req, status, error) {
                getPage('pages/404', '404 - Not found', container, true)
            }
        });
    }

    // Parse all .md URLs
    function parseUrls(el) {
        $(el + ' a[href*="pages/"]').each(function() {
            var title = $(this).html();
            var page = $(this).attr('href');
            $(this).attr('href', '#/' + page);
            $(this).on('click', function(e) {
                e.preventDefault();
                getPage(page, title, outputContainer, true);
            });
        });
    }

    // Render the navigation menu
    function renderNav() {
        var page = 'pages/menu';
        getPage(page, false, navContainer, false);
    }

    // First load
    function initialLoad(hash, urlstate) {
        if (!hash) {
            var hash = window.location.hash
        }
        if (hash) {
            var match = hash.match(/^#\/?(.*)$/)[1];
        } else {
            var match = null;
        }
        if (match) {
            var page = match;
            getPage(page, false, outputContainer, urlstate);
        } else {
            var page = 'pages/index';
            getPage(page, false, outputContainer, urlstate);
        }
    }

    // Bootstrap everything
    $(document).on('ready', function() {
        renderNav();
        initialLoad(null, true);
        $(window).on('popstate', function(e) {
            //console.log(e.originalEvent);
            //console.log(e.target.location.hash);
            initialLoad(null, false);
        });
    });
})(jQuery);
