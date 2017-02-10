define([
   'module',
   'text!tpl/topMenu.html',
   'backbone'
   ],
   function(module, TopMenu, Backbone){

	'use strict'

 	module.exports = new (Backbone.View.extend({
        el: '.d-topMenu',
        render:function(mainMenu){
            this.$el.html(TopMenu);
        },
        hide : function(){
            this.$el.addClass('displayNone');
        },
        show : function(){
            this.$el.removeClass('displayNone');
        }
 	}))

})
