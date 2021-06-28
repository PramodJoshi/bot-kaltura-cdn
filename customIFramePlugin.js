mw.kalturaPluginWrapper(function(){

	mw.PluginManager.add( 'myComponent', mw.KBaseComponent.extend({
		defaultConfig: {
			parent: "controlsContainer",    // the container for the button 
			order: 41,                      // the display order ( based on layout )
			displayImportance: 'low',       // the display importance, determines when the item is removed from DOM
			align: "right",                 // the alignment of the button

			cssClass: "kaltura-logo",       // the css name of the logo
			href: 'https://classtranscribe-dev.ncsa.illinois.edu/liveplayer?videosrc=https://cdnapisec.kaltura.com/p/309/sp/0/playManifest/entryId/1_rcit0qgs/format/applehttp/protocol/https/flavorParamId/301971/manifest.m3u8', // the link for the logo
			title: 'ClassTranscribe',               // title
			img: null                       // image
		},
		isSafeEnviornment:function(){
		        // any runtime checks to determine the plugin can be active 
		        // for example if you need to check if this partner has a key against your service: 
		        var deferred = $.Deferred();
		       $.ajax ( myAjaxRequst, function( data ){
		           deferred.resolve( !!data.isUserAllowed );
		        });
		        return deferred.promise();
		},
		setup: function(){
		       // The place to set any of your player bindings like:
		      this.bind( 'playerReady', function(){
		              // do something on player ready
		       });
		},
		getComponent: function() {
			if( !this.$el ) {
				var $img = [];
				if( this.getConfig('img') ){
					$img = $( '<img />' )
								.attr({
									alt: this.getConfig('title'),
									src: this.getConfig('img')
								});
				}
				this.$el = $('<div />')
								.addClass ( this.getCssClass() )
								.append(
								$( '<a />' )
								.attr({
									'title': this.getConfig('title'),
									'target': '_blank',
									'href': this.getConfig('href')
								}).append( $img )
							);
			}
			return this.$el;
		}
	}));

});