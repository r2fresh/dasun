/*
 * kt-membership-statistics-service 1.0.0
 * 방문자, 메뉴, 서비스 별로 다양한 통계 데이터와 차트
 * https://cms.membership.kt.com
 * Copyright ©2011 - 2017 KT corp. All rights reserved.
*/
requirejs.config({
	baseUrl: '/js',
	packages: [{
		name: 'moment',
		location: '../lib/moment/',
		main: 'moment'
	}],
	paths: {
		'text':'../lib/text/text',
		'tpl':'../template',
		'jquery':'../lib/jquery/dist/jquery',
		'bootstrap':'../lib/bootstrap/dist/js/bootstrap',
		'Handlebars':'../lib/handlebars/handlebars',
		'd3':'../lib/d3/d3',
		'c3':'../lib/c3/c3',
		'underscore':'../lib/underscore/underscore',
		'backbone':'../lib/backbone/backbone',
		'vis':'../lib/vis/dist/vis',
		'common':'utils/common',
	},
	shim:{
		'c3':{
			deps: ['d3'],
			exports:'c3'
		},
		'backbone':{
			deps:['underscore'],
			exports:'Backbone'
		},
		'vis':{
			deps:['underscore'],
			exports:'vis'
		},
		'bootstrap':{
			deps:['jquery'],
			exports:'bootstrap'
		}
    }
});

requirejs([
	'Timeline',
	'backbone',
	'Router',
	'bootstrap',
	'common'
],
function(Timeline, Backbone, Router){

	var prevView = null, routers = null;

	/*
	 * 초기 실행함수
	 */
	function init(){
		setHandlebars();
		Router.init();
	}

	/*
	*
	*/
	function setHandlebars(){
	}

	init();
})
