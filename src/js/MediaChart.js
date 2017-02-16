define([
   'module',
   'text!tpl/mediaChart.html',
   'text!tpl/template.html',
   'Handlebars',
   'Model',
   'backbone',
   'c3'
   ],
   function(module, MediaChart, Template, Handlebars, Model, Backbone, c3){

	'use strict'
 	module.exports = new (Backbone.View.extend({
 		el: '.d-media-chart',
        prevView: null,
        timeLineListTpl:'',
        press_data : null,
        press_chart : null,
        initialize:function(){

        },
        render:function(mainMenu){

            console.log(MediaChart)

            this.$el.html(MediaChart);

            if(this.prevView != null){
    			this.prevView.hide();
    		}

            this.getPressList()
        },
        getPressList:function(){
            Model.getPressList({
                'success' : Function.prototype.bind.call(this.getPressListSuccess,this),
                'error' : Function.prototype.bind.call(this.getPressListError,this)
            })
        },
        getPressListSuccess : function(data, textStatus, jqXHR){
            this.setPressList(data);
        },
        getPressListError : function(jsXHR, textStatus, errorThrown){

        },
        setPressList : function(data){

            console.log(data)
            this.press_data = data;

            //누적치
            for (var i=0; i<this.press_data.length; i++){
                this.total_moon = this.press_data[i].moon
                this.total_lee  = this.press_data[i].lee
                this.total_hee  = this.press_data[i].hee
                this.total_you  = this.press_data[i].you
                this.total_hwang= this.press_data[i].hwang
                this.total_ahn  = this.press_data[i].ahn
                this.total_nam  = this.press_data[i].nam
            }


            var total_data = [
        	            ['문재인', this.total_moon],
        	            ['이재명', this.total_lee],
        	            ['안희정', this.total_hee],
        	            ['유승민', this.total_you],
        	            ['황교안', this.total_hwang],
        	            ['안철수', this.total_ahn],
        	            ['남경필', this.total_nam]]

        	this.press_chart = c3.generate({
        		bindto: '#press_chart',
        	    data: {
        	        // iris data from R
        	        columns: total_data,
        	        type : 'pie',
        	        //onclick: function (d, i) { console.log("onclick", d, i); },
        	        //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        	        //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        	    }
        	});
        },
        hide : function(){
            this.$el.addClass('displayNone');
        },
        show : function(){
            console.log("sdfdf")
            this.$el.removeClass('displayNone');
        }
 	}))

})
