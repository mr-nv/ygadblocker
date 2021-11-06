// ==UserScript==
// @name         yougame.biz adblocker
// @namespace    http://github.com/mr-nv/
// @version      1.0
// @description  big
// @author       mrnv
// @match        *://yougame.biz/
// @match        *://yougame.bz/
// @icon         https://yougame.bz/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // finally rich
    function ShouldRemove( innerHTML )
    {
        if( innerHTML.includes( "prefix_privateyougame" ) &&
           ( innerHTML.includes( "detectedyougame" ) || innerHTML.includes( "prefix_onupdate" ) ||
            innerHTML.includes( "prefix_useatownriskyougame" ) || innerHTML.includes( "prefix_outdatedyougame" ) ) ) return true;

        if( innerHTML.includes( "prefix_pryslyga" ) ) return true;
        if( innerHTML.includes( "prefix_sellmarket" ) && innerHTML.includes( "prefix_shopmarket" ) ) return true;

        return false;
    }

    function Scan( )
    {
        document.getElementsByClassName( "content" )[ 0 ].childNodes.forEach( function( node )
        {
            if( node.innerHTML && ShouldRemove( node.innerHTML ) )
                document.getElementsByClassName( "content" )[ 0 ].removeChild( node );
        } );
    }

    // startup
    Scan( );

    // on refresh
    document.getElementsByClassName( "refreshButton" )[ 0 ].onclick = function( )
    {
        Scan( );
    };

    // every 200 ms
    setInterval( Scan, 200 );
})();
