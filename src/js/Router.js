define([
   'module',
   'backbone',
   'TopMenu',
   'Timeline',
   'Books',
   'MediaChart'
   ],
   function(module, Backbone, TopMenu, Timeline, Books, MediaChart){

	'use strict'

    /*
     * hash를 사용하여 페이지 전환 설정
     */
    // function routeStart(){
    //
    //     window.router = routers = new (Backbone.Router.extend());
    //
    //     routers.route('','defaultGuide', changeHash);
    //     routers.route('*guideType', 'changeGuide', changeHash);
    //
    //     Backbone.history.start({pushstate:true})
    // }

    /*
     * 처음 라우터 설정
     */
    // function startRouter(){
    //     var hash = DAESUN.util.parseHash();
    //
    //     if(hash) {
    //         routers.navigate(hash.join('/'), { trigger: false, replace: true });
    //     } else {
    //         routers.navigate('', { trigger: true, replace: true });
    //     }
    // }

    /*
     * #의 router가 변경되면 처음에 실행 되는 함수
     * @r2fresh
     * @param {String} guideType - 선택된 가이드
     * @param {String} main - 선택된 가이드
     * @param {String} sub - 선택된 가이드
     */
    // function changeHash( guideType ){
    //
    //     if(prevView != null){
    //         prevView.hide();
    //     }
    //
    //     var mainMenu = guideType;
    //
    //     switch(mainMenu){
    //         case 'media' :
    //
    //         break;
    //         default :
    //             Timeline.render();
    //             prevView = Timeline;
    //             Timeline.show();
    //         break;
    //     }
    // }

 	module.exports = {
        routers:null,
        prevView:null,
        init : function(){
            this.routeStart();
    		this.startRouter();

            TopMenu.render();
            TopMenu.show();
        },

        routeStart : function(){

            window.router = this.routers = new (Backbone.Router.extend());

            this.routers.route('','defaultGuide', this.changeHash);
            this.routers.route('*guideType', 'changeGuide', this.changeHash);

            Backbone.history.start({pushstate:true})
        },

        /*
         * 처음 라우터 설정
         */
        startRouter : function(){
            var hash = DAESUN.util.parseHash();

            if(hash) {
                this.routers.navigate(hash.join('/'), { trigger: false, replace: true });
            } else {
                this.routers.navigate('', { trigger: true, replace: true });
            }
        },

        changeHash( guideType ){

            if(this.prevView != null){
                this.prevView.hide();
            }

            var mainMenu = guideType;

            switch(mainMenu){
                case 'media-chart' :
                    MediaChart.render();
                    this.prevView = MediaChart;
                    MediaChart.show();
                break;
                case 'books' :
                    Books.render();
                    this.prevView = Books;
                    Books.show();
                break;
                default :
                    Timeline.render();
                    this.prevView = Timeline;
                    Timeline.show();
                break;
            }
        }
    }

})
