/**
 * @version		1.0.3
 * @package		Engintron for WHM
 * @author		Fotis Evangelou (Nuevvo) - http://nuevvo.com
 * @copyright	Copyright (c) 2010 - 2014 Nuevvo Webware P.C. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

function confirm(id) {
	if(confirm('Are you sure?')) {
		document.getElementById(id).submit();
	}
	return false;
}
function clog() {
	document.getElementById('log').submit();
}
