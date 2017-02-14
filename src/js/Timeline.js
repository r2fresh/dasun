define([
   'module',
   'text!tpl/timeline.html',
   'text!tpl/template.html',
   'Handlebars',
   'Model',
   'backbone',
   'vis',
   'moment'
   ],
   function(module, Timeline, Template, Handlebars, Model, Backbone, vis, moment){

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


            //this.timeLineListTpl     = $(Template).find('.d-timeline-tpl').html();
            this.timeLineListTpl2     = $(Template).find('.d-timeline2-tpl').html();


            //this.getKeyword();
            // this.setTimeline();
            this.setTimeline2();
        },
        getKeyword : function(){
            Model.getKeyword({
                'success' : Function.prototype.bind.call(this.getKeywordSuccess,this),
                'error' : Function.prototype.bind.call(this.getKeywordError,this)
            })
        },
        getKeywordSuccess : function(data, textStatus, jqXHR){
            //var template = Handlebars.compile(this.timeLineListTpl);
            //this.$el.find('.timeline-list').html(template({'list':data}));
            //this.setTimeline();
        },
        getKeywordError : function(jsXHR, textStatus, errorThrown){

        },
        setTimeline2 : function(){
            var template = Handlebars.compile(this.timeLineListTpl2);
            //this.$el.find('.timeline-list').html(template({'list':data}));


            var container = document.getElementById('visualization');

            // var options = {
            //     zoomable : false,
            //     min : new Date(2010,8,4,6,0,0),
            //     max : new Date(2010,8,4,21,0,0),
            //
            //     editable : {
            //         remove : false
            //     },
            //     template : template
            //
            // };

            var items = new vis.DataSet([
              // round of 16
              {
                player1: '이재명',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 09:00'
              },
              {
                player1: '문재인',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 09:00'
              },
              {
                player1: '안희정',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 09:00'
              },
              {
                player1: '황교안',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 12:00'
              },
              {
                player1: '이재명',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 12:00'
              },
              {
                player1: '문재인',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 12:00'
              },
              {
                player1: '안희정',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 15:00'
              },
              {
                player1: '황교안',
                keyword1: '김동근',
                keyword2: '이민향',
                keyword3: '송민정',
                start: '2014-08-04 15:00'
               },
               {
                 player1: '황교안',
                 keyword1: '김동근',
                 keyword2: '이민향',
                 keyword3: '송민정',
                 start: '2014-08-04 15:00'
               }
            ]);

            var options = {
              // specify a template for the items
              template: template,
              //zoomable : false,
            };

            // Create a Timeline
            var timeline = new vis.Timeline(container, items, options);
        },
        setTimeline : function(){

            var container = document.getElementById('visualization');

            var kkk = [
              {start: new Date(2010,8,4,9,0,0), content: '<div class="title" data-index="0">문재인</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,9,0,0), content: '<div class="title" data-index="1">문재인</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,9,0,0), content: '<div class="title" data-index="2">문재인</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,12,0,0), content: '<div class="title" data-index="2">이재명</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,12,0,0), content: '<div class="title" data-index="3">이재명</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,12,0,0), content: '<div class="title" data-index="4">이재명</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,15,0,0), content: '<div class="title" data-index="5">안희정</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,15,0,0), content: '<div class="title" data-index="6">안희정</div><div>김동근,이민향,송민정</div>'},
              {start: new Date(2010,8,4,15,0,0), content: '<div class="title" data-index="7">안희정</div><div>김동근,이민향,송민정</div>'}
            ]
            // note that months are zero-based in the JavaScript Date object
            var items = new vis.DataSet(kkk);

            var options = {
              editable: true,
              margin: {
                item: 20,
                axis: 40
            },
            // timeAxis : {
            //     scale: 'day',
            //     step : 10
            // },
                zoomable : false,
                min : new Date(2010,8,4,6,0,0),
                max : new Date(2010,8,4,21,0,0),

                editable : {
                    remove : false
                }

            };

            var timeline = new vis.Timeline(container, items, options);
             timeline.zoomIn(0.8);

             timeline.on('rangechanged',function(e){
                 console.log(moment(e.start).hour())
                 console.log("sdfdsfs")

                 if(moment(e.start).hour() <= 6){
                     $('.d-timeline-more').removeClass('displayNone')
                     $('.d-timeline-body').removeClass('col-xs-12').addClass('col-xs-11')
                 } else {
                     $('.d-timeline-more').addClass('displayNone')
                      $('.d-timeline-body').removeClass('col-xs-11').addClass('col-xs-12')
                 }
             })




            //  var btnLoad = document.getElementById('left');
             //
            //  function loadData(){
            //      //items.clear();
            //      items.add([
            //        {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="8">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
            //        {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="9">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
            //        {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="10">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
            //      ]);
             //
            //    // adjust the timeline window such that we see the loaded data
            //    //timeline.fit();
             //
            //    timeline.setOptions({
            //        min : new Date(2010,8,4,1,0,0),
            //    })
            //  }
             //
            //  btnLoad.onclick = loadData

             //$('#visualization').removeClass('displayNone');

             this.$el.find('.d-timeline-more-btn').bind('click',function(e){
                 items.add([
                   {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="8">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
                   {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="9">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
                   {start: new Date(2010,8,4,6,0,0), content: '<div class="title" data-index="10">문재인2</div><div>김동근,이민향,송민정</div><span>김동근,이민향,송민정</span>'},
                 ]);

               // adjust the timeline window such that we see the loaded data
               //timeline.fit();

               timeline.setOptions({
                   min : new Date(2010,8,4,1,0,0),
               })
             })

             console.log(this.$el.find('.vis-group').html())

                this.$el.find('.vis-group').bind('click',function(e){
                    console.log($(this).find('.vis-item-content').html())
                e.preventDefault();
                 console.log("1234")
                 //console.log($(e.target).data('index'))
                 //console.log(kkk[$(e.target).find('.title').data('index')])
                 //$('.d-timeline-keyword-list').html(JSON.stringify(kkk[$(e.currentTarget).find('.title').data('index')]));
             })
        },
        hide : function(){
            this.$el.addClass('displayNone');
        },
        show : function(){
            this.$el.removeClass('displayNone');
        }
 	}))

})
