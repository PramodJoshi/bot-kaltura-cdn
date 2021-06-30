(function (mw, $) {
    "use strict";

    mw.kalturaPluginWrapper(function () {
        mw.PluginManager.add('myComponent', mw.KBaseComponent.extend({
            // Set basic config for all components
            defaultConfig: {
                align: "right",
                "parent": mw.isMobileDevice() ? 'topBarContainer' : 'controlsContainer',
                smartContainer: 'morePlugins',
                smartContainerCloseEvent: 'ctPlayer',
                displayImportance: "low",
                showTooltip: false,
                title: 'ClassTranscribe Player',
                order: 41
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
                ctPlayerUrl += this.getPlayer().kentryid + '/format/applehttp/protocol/https/flavorParamId/manifest.m3u8';

                window.open(encodeURI(ctPlayerUrl));
            },
            getComponent: function () {
                var _this = this;
                if (!this.$el) {
                    this.$el = $('<button />')
                        .attr('title', this.getConfig('title'))
                        .addClass("btn icon-play" + this.getCssClass())
                        .click(function () {
                            if (_this.isDisabled) return;
                            _this.getPlayer().triggerHelper('ctPlayer');
                        });
                }
                return this.$el;
            }
        }));
    });

})(window.mw, window.jQuery);