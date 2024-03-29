// ==UserScript==
// @name         yougame.biz adblocker
// @namespace    http://github.com/mr-nv/
// @version      1.1.2
// @updateURL    https://raw.githubusercontent.com/mr-nv/ygadblocker/master/ygadblocker.user.js
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

    function RemoveColoredThread( node )
    {
        if( node.innerHTML && node.childNodes && node.childNodes[ 3 ] )
        {
            var elnode = node.childNodes[ 3 ];
            if( elnode && elnode.childNodes )
            {
                for( var i = 0; i < elnode.childNodes.length; i++ )
                {
                    if( elnode.childNodes[ i ] )
                    {
                        var childstyle = elnode.childNodes[ i ].style;
                        if( childstyle && childstyle.color )
                        {
                            if( childstyle.color != "rgb(255, 255, 255)" && childstyle.color != "rgb(212, 24, 59)" )
                            {
                                document.getElementsByClassName( "content" )[ 0 ].removeChild( node );
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    function Scan( )
    {
        document.getElementsByClassName( "content" )[ 0 ].childNodes.forEach( function( node )
        {
            if( node.innerHTML )
            {
                if( ShouldRemove( node.innerHTML ) )
                    document.getElementsByClassName( "content" )[ 0 ].removeChild( node );
                else
                    RemoveColoredThread( node );
            }
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
