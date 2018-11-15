/**
 * @version    1.0.x
 * @package    Engintron for cPanel/WHM
 * @author     Fotis Evangelou (https://kodeka.io)
 * @url        https://engintron.com
 * @copyright  Copyright (c) 2018 Kodeka OÜ. All rights reserved.
 * @license    GNU/GPL license: https://www.gnu.org/copyleft/gpl.html
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
