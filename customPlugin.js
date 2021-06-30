(function (mw, $) {
    "use strict";

    mw.PluginManager.add('ctPlayer', mw.KBaseComponent.extend({


        // Set basic config for all components
        defaultConfig: {
            align: "right",
            "parent": mw.isMobileDevice() ? 'topBarContainer' : 'controlsContainer',
            smartContainer: 'morePlugins',
            smartContainerCloseEvent: 'ctPlayer',
            displayImportance: "low",
            downloadName: '{mediaProxy.entry.name}',
            showTooltip: true,
            preferredBitrate: '',
            flavorID: '',
            title: gM('mwe-embedplayer-download_clip'),
            order: 41
    },
        isSafeEnviornment: function () {
            return !mw.isIOS();
        },
        setup: function () {
            var _this = this;
            this.bind('ctPlayer', function () {
                _this.ctPlayer();
            });
        },
        ctPlayer: function () {
            var ks = this.getKalturaClient().getKs();
            var ctPlayerUrl = 'https://classtranscribe-dev.ncsa.illinois.edu/liveplayer?videosrc=https://cdnapisec.kaltura.com/p/1359391/sp/0/playManifest/entryId/';
            ctPlayerUrl += this.getPlayer().kentryid + 'format/applehttp/protocol/https/flavorParamId/manifest.m3u8';
            // ctPlayerUrl += this.getPlayer().kwidgetid + '/uiconf_id/' + this.getPlayer().kuiconfid;
            // ctPlayerUrl += '&downloadName=' + encodeURIComponent(this.getConfig('downloadName'));
            // if (this.isSourceOnly()) {
            // 	ctPlayerUrl += '&flavorParamsId=0'
            // } else {
            // 	if (this.getConfig('flavorParamsId')) {
            // 		downloadUrl += '&flavorParamsId=' + encodeURIComponent(this.getConfig('flavorParamsId'));
            // 	}
            // 	if (this.getConfig('preferredBitrate') != '' && this.getConfig('preferredBitrate') != null) {
            // 		downloadUrl += '&preferredBitrate=' + encodeURIComponent(this.getConfig('preferredBitrate'));
            // 	}
            // 	if (this.getConfig('flavorID') != '' && this.getConfig('flavorID') != null) {
            // 		downloadUrl += '&flavorID=' + encodeURIComponent(this.getConfig('flavorID'));
            // 	}
            // }

            // if( ks ){
            // 	downloadUrl += '&ks=' + ks;
            // }

            window.open(ctPlayerUrl);
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
        },
        isSourceOnly: function () {
            //Entries with only a source have only one flavor
            if (this.getPlayer().kalturaFlavors.length === 1) {
                return true;
            }
        }

    }));

})(window.mw, window.jQuery);