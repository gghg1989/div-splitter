/*!
 * div Splitter Plugin 1.0
 * Copyright (C) 2014-2015 Yuzhou Feng <http://eternalcat.com>
 *
 * @example $('#div').splitter();
 * @desc Create a vertical splitter with default settings 
 *
 * @example $('#div').splitter({orientation: 'h'});
 * @desc Create a horizontal splitter resizable via Alt+Shift+M
 *
 * @name splitter
 * @type jQuery
 * @param Object options Options for the splitter (not required)
 * @cat Plugins/Splitter
 * @return jQuery
 * @author Yuzhou Feng (gghg1989@gmail.com)
 */
; (function ($, undefined) {
    var count = 0;  //Splitters count
    var splitterSize;
    var orientation;
    var ratio;
    var splitterBar;

    $.fn.splitter = function (options) {
        this.defaults = {
            //'ratio': 0.6
            orientation: 'horizontal',
            position: '50%',
            size: '5px'
        },
        this.settings = $.extend({}, this.defaults, options);
        //Get settings value
        orientation = this.settings.orientation;
        splitterSize = parseInt(this.settings.size);
        ratio = parseInt(this.settings.position) / 100; //Transfer percentage position into decimal ratio
        //Get main frame size
        var width = this.width();
        var height = this.height();
        //Get panes
        var children = this.children();
        var pane1 = children.first();
        var pane2 = pane1.next();
        //Set panes style
        if (orientation == 'vertical' || orientation == "v") {
            pane1.css({
                "height": "100%",
                "float": "left"
            });
            pane2.css({
                "height": "100%",
                "float": "left"
            });
        } else if (orientation == 'horizontal' || orientation == "h") {
            pane1.css({
                "width": "100%"
            });
            pane2.css({
                "width": "100%"
            });
        }
        //Create splitter
        splitterBar = $("<div id='" + this.attr('id') + "_splitter'></div>").insertAfter(pane1);
        
        if (orientation == 'vertical' || orientation == "v") {
            splitterBar.css({
                "width": "5px",
                "height": "100%",
                "background-color": "#CCC",
                "cursor": "col-resize",
                "float": "left"
            });
        } else if (orientation == 'horizontal' || orientation == "h") {
            splitterBar.css({
                "height": "5px",
                "background-color": "#CCC",
                "cursor": "row-resize"
            });
        }
        //Vertical Splitter
        if (this.settings.orientation == 'vertical') {
            var startDrag = false;
            
            pane1.css("width", ratio * width - splitterSize / 2 + "px");
            pane2.css("width", (1 - ratio) * width - splitterSize / 2 + "px");

            splitterBar.mousedown(function (e) {
                startDrag = true;
            });

            $(document).mousemove(function (e) {
                if (startDrag) {
                    mousePos = e.originalEvent.pageX - $("#main").offset().left;
                    ratio = mousePos / width;
                    //log(mousePos + ":" + ratio);
                    var leftPaneHeight = mousePos - splitterSize / 2;
                    var rightPaneHeight = width - mousePos - splitterSize / 2;

                    leftPaneHeight = fixBoundary(leftPaneHeight, width);
                    rightPaneHeight = fixBoundary(rightPaneHeight, width);
                    //log(leftPaneHeight+"+"+rightPaneHeight);

                    pane1.css("width", leftPaneHeight + "px");
                    pane2.css("width", rightPaneHeight + "px");
                }
            });
            $(document).mouseup(function (e) {
                startDrag = false;
            });
            //Horizontal Splitter
        } else if (this.settings.orientation == 'horizontal') {
            var startDrag = false;

            pane1.css("height", ratio * height - splitterSize / 2 + "px");
            pane2.css("height", (1 - ratio) * height - splitterSize / 2 + "px");

            splitterBar.mousedown(function (e) {
                startDrag = true;
            });

            $(document).mousemove(function (e) {
                if (startDrag) {
                    mousePos = e.originalEvent.pageY - $("#main").offset().top;
                    ratio = mousePos / height;
                    //log(mousePos + ":" + ratio);
                    var topPaneHeight = mousePos - splitterSize / 2;
                    var bottomPaneHeight = height - mousePos - splitterSize / 2;

                    topPaneHeight = fixBoundary(topPaneHeight, height);
                    bottomPaneHeight = fixBoundary(bottomPaneHeight, height);
                    //log(topPaneHeight + "+" + bottomPaneHeight);

                    pane1.css("height", topPaneHeight + "px");
                    pane2.css("height", bottomPaneHeight + "px");
                }
            });
            $(document).mouseup(function (e) {
                startDrag = false;
            });
        }

        return $(this);
    };

    function fixBoundary(part, total) {
        if (part > total - splitterSize) {
            part = total - splitterSize
        } else if (part <= 0) {
            part = 0;
        }
        return part;
    }

    function log(txt) {
        document.getElementById("debug").innerHTML = txt + "<br/>" + document.getElementById("debug").innerHTML;
    }
}(jQuery));
