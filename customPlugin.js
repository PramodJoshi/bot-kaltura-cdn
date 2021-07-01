(function (mw, $) {
    "use strict";

    mw.kalturaPluginWrapper(function () {
        mw.PluginManager.add('myComponent', mw.KBaseComponent.extend({
            // Set basic config for the component
            defaultConfig: {
                align: "right",
                "parent": mw.isMobileDevice() ? 'topBarContainer' : 'controlsContainer',
                smartContainer: 'morePlugins',
                smartContainerCloseEvent: 'ctPlayer',
                displayImportance: "low",
                title: 'ClassTranscribe Player',
                order: 31,
                tabIndex: 8,
                img: 'https://uofi.box.com/shared/static/5bzxsygsk8y0pz0azzpigg110zovibq9.png'
            },
            setup: function () {
                var _this = this;
                this.bind('ctPlayer', function () {
                    _this.ctPlayer();
                });
            },
            ctPlayer: function () {
                var ctPlayerUrl = 'https://classtranscribe-dev.ncsa.illinois.edu/liveplayer?videosrc=https://cdnapisec.kaltura.com/p/';
                ctPlayerUrl += this.getPlayer().kpartnerid + '/sp/0/playManifest/entryId/';
                ctPlayerUrl += this.getPlayer().kentryid + '/format/applehttp/protocol/https/flavorParamId/ manifest.m3u8';

                window.open(encodeURI(ctPlayerUrl));
            },
            getComponent: function () {
                var _this = this;
                var $img = $('<img />')
                    .attr({
                        alt: this.getConfig('title'),
                        src: this.getConfig('img')
                    });

                if (!this.$el) {
                    this.$el = $('<div />')
                        .addClass(this.getCssClass())
                        .append(
                            $('<a />')
                                .attr({ 'tabIndex': this.getConfig('tabIndex') })
                                .attr({
                                    'title': this.getConfig('title'),

                                }).append($img)
                        ).click(function () {
                            if (_this.isDisabled) return;
                            _this.getPlayer().triggerHelper('ctPlayer');
                        });
                }
                return this.$el;
            }
        }));
    });

})(window.mw, window.jQuery);