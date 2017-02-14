define([
   'module',
   'text!tpl/books.html',
   'text!tpl/template.html',
   'Handlebars',
   'Model',
   'backbone'
   ],
   function(module, Books, Template, Handlebars, Model, Backbone){

	'use strict'
 	module.exports = new (Backbone.View.extend({
 		el: '.d-books',
        prevView: null,
        timeLineListTpl:'',
        initialize:function(){

        },
        render:function(mainMenu){

            this.$el.html(Books);

            if(this.prevView != null){
    			this.prevView.hide();
    		}


            //this.timeLineListTpl     = $(Template).find('.d-timeline-tpl').html();


            this.getBooks();

        },
        getBooks : function(){
            Model.getBooks({
                'query' : '이재명',
                'display' : 10,
                'start' : 1,
                'success' : Function.prototype.bind.call(this.getBooksSuccess,this),
                'error' : Function.prototype.bind.call(this.getBooksError,this)
            })
        },
        getBooksSuccess : function(data, textStatus, jqXHR){

            console.log(data);

            document.write(JSON.stringify(data))
            //var template = Handlebars.compile(this.timeLineListTpl);
            //this.$el.find('.timeline').html(template({'list':data}));
        },
        getBooksError : function(jsXHR, textStatus, errorThrown){

        },
        hide : function(){
            this.$el.addClass('displayNone');
        },
        show : function(){
            this.$el.removeClass('displayNone');
        }
 	}))

})
