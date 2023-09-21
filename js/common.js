/* 
   Written by Jungmin Lee
*/
$(document).ready(function(){
	//스크롤 다운 이벤트 (scroll down event)
	const subConH = $() 
	$(window).on("scroll", function(event){

		var scrollTop = $(window).scrollTop();
		var footH = $('#footer').outerHeight();
		var btnH = $('#btnTop').outerHeight();
		var val = $(document).height() - $(window).height() - footH;
		var subConTop = $('.result-cont').offset().top;
		var resultH = $('.search-result').height();

		//스크롤 다운 시 btn-top ( btn-top button fadeIn&Out when Scroll Down)
		if( scrollTop > 0 ){
			/* 210222 삭제
			$("#header.fixed-top").addClass('sticky');
			*/
			$('#btnTop').stop().fadeIn(200);
		}else {
			/* 210222 삭제
			$("#header.fixed-top").removeClass('sticky');
			*/
			$('#btnTop').stop().fadeOut(200);
		}

		//Footer 영역에 가까워 질때, btn-top 버튼 포지션 ( btn-top position when approaching footer )
		if( scrollTop >= val + btnH  ){
			$('#btnTop').css('bottom' , footH - btnH);
		}else{
			$('#btnTop').css('bottom' , '1rem');
		}	

		//scroll down 시 검색결과 영역 포지션
		if( scrollTop >= subConTop ){
			//$('.sub-content').css('padding-top', '300px');
			$('.search-result').addClass('fixed-top');
			
		}else{
			//$('.sub-content').css('padding-top', 0);
			$('.search-result').removeClass('fixed-top');
		}
	});
	//btn-top 클릭 이벤트 (btn-top click event)
	$("#btnTop").on('click' , function(e) {
        $('html').animate({scrollTop : 0}, 300);
    });

	//모바일 사이즈일때 메뉴버튼 클릭 이벤트 ( on mobile size GNB : Open GNB Menu )
	$('#menuAll').on('click' , function(){
		$( '#navi' ).animate( {right: '0'}, 200, 'swing' );
		$( '#navi' ).addClass('active');
		$('#dimm').fadeIn();

		if( $('#header').hasClass('fixed-top') ){
			$('html, body').addClass('ban-scroll');
		}

		$('#dimm').on('click' , function(){
			$( '#navi' ).animate( { right: '-70%'}, 200, 'swing' );
			$( '#navi' ).removeClass('active');
			if( $('#header').hasClass('fixed-top') ){
				$('html, body').removeClass('ban-scroll');
			}
			$(this).fadeOut();
		});
	});

	//모바일 사이즈 GNB 닫기 버튼 이벤트 ( on mobile size MENU : Close Menu )
	$('#menuClose').on('click' , function(){
		$( '#navi' ).animate( { right: '-70%'}, 200, 'swing' );
		$( '#navi' ).removeClass('active');
		$('#dimm').fadeOut();
		if( $('#header').hasClass('fixed-top') ){
			$('html, body').removeClass('ban-scroll');
		}
	});

		
	//브라우저 사이즈 조정 시 이벤트 ( Setting when adjusting the screen width )
	$(window).resize(function(){

		var w = $(window).width();
		var scrollTop = $(window).scrollTop();
		var footH = $('#footer').outerHeight();
		var btnH = $('#btnTop').outerHeight();
		var val = $(document).height() - $(window).height() - footH;

		//모바일 사이즈일때 GNB 메뉴 숨김 ( on mobile size MENU : Hide the menu when adjusting the screen width )
		$('#dimm').fadeOut();
		$('html, body').removeClass('ban-scroll');
		if( w >= 992 ){
			$( '#navi' ).css('right' , '0');
		}else{
			$( '#navi' ).css('right' , '-70%');
		}

		//Footer 영역에 가까워 질때, btn-top 버튼 포지션( Stop btn-top when approaching footer )
		if( scrollTop >= val ){
			$('#btnTop').css('bottom' , footH - btnH);
		}else{
			$('#btnTop').css('bottom' , '1rem');
		}


		if( $('#header').find('.menu-language').length ){
			languagePos();
		}

		subHeight();
		tblRow();
	}); 

	//툴팁 클릭 이벤트 ( custom tooltip Click event )
	$('#tooltip').on('click' , function(e){
		e.preventDefault();
		var h = $(this).outerHeight();

		$(this).next().css('top' , h + 5);
		$(this).parent().toggleClass('active');

		$('body').click(function(e){
           if( $('.custom-tooltip-area').has(e.target).length === 0 ){
               $('.custom-tooltip-area').removeClass('active');
            }
        });

        $('#tooltipClose').on('click' , function(e){
        	$('.custom-tooltip-area').removeClass('active');
        });
	});

	//테이블 마우스 오버 이벤트 (Vertical table Click event)
	$('.tbl-type1.table-responsive.table-over .table tbody tr').click(function(){
		$('.tbl-type1.table-responsive.table-over .table tbody tr').removeClass('active');
        $(this).addClass('active');
        
    });

	//테이블 반응형 사이즈 조절 ( Horizontal table responsive: Release responsive table from tablet size )
	function tblRow(){
		var w = $(window).width();
		if( w >= 768 ){
			$('.tbl-type1.table-row').find('colgroup').show();
		}else{
			$('.tbl-type1.table-row').find('colgroup').hide();
		}
	}

	//서브컨텐츠 높이 자동 조절 ( Set the full height of sub contents )
	function subHeight(){
		var headH = $('#header').outerHeight();
		var subTitH = $('.search-result').outerHeight();
		var footH = $('#footer').outerHeight();
		var h =  headH + subTitH + footH;
		$('.result-cont').css('padding-bottom' , footH); //실 서버에서는 레이아웃이 달라, 해당 열이 필요가 없어서 삭제했음. 
		$('.result-cont').css( { 'min-height' : 'calc(100vh - ' + h + 'px)' } );

	}

	//번역 메뉴 PC 일때 위치 조정 ( translation menu : Position in PC size )
	function languagePos(){
		var w = $(window).width();
		var gnbPos = $('.gnb').position().left;

		if( w>=992 ){
			$('.menu-language').css({'position':'absolute', 'left':gnbPos - 110});
		}else{
			$('.menu-language').css({'position':'relative', 'left':'auto'});
		}
	}

	if( $('#header').find('.menu-language').length ){
		languagePos();
	}
	
	subHeight();
	tblRow();

});