define([
   'module',
   'text!tpl/timeline.html',
   'text!tpl/template.html',
   'Handlebars',
   'Model',
   'backbone'
   ],
   function(module, Timeline, Template, Handlebars, Model, Backbone){

	'use strict'
 	module.exports = new (Backbone.View.extend({
 		el: '.d-timeline',
        prevView: null,
        timeLineListTpl:'',
        initialize:function(){

        },
        render:function(mainMenu){

            this.$el.html(Timeline);

            if(this.prevView != null){
    			this.prevView.hide();
    		}


            this.timeLineListTpl     = $(Template).find('.d-timeline-tpl').html();


            //this.getKeyword();

        },
        getKeyword : function(){
            Model.getKeyword({
                'success' : Function.prototype.bind.call(this.getKeywordSuccess,this),
                'error' : Function.prototype.bind.call(this.getKeywordError,this)
            })
        },
        getKeywordSuccess : function(data, textStatus, jqXHR){
            var template = Handlebars.compile(this.timeLineListTpl);
            this.$el.find('.timeline').html(template({'list':data}));
        },
        getKeywordError : function(jsXHR, textStatus, errorThrown){

        },
        hide : function(){
            this.$el.addClass('displayNone');
        },
        show : function(){
            this.$el.removeClass('displayNone');
        }
 	}))

})
