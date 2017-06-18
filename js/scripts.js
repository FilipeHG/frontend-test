$(document).ready(function() {

	//CLICK EVENT - NAV DE MENU LATERAL ESQUERDO
	//==================================================================
	$('ul.menulist').on('click', 'li.title', function(event){
		event.stopPropagation();
		
		if($(this).parent().hasClass('closed'))
			$(this).parent().removeClass('closed').addClass('opened');
		else
			$(this).parent().removeClass('opened').addClass('closed');
	});
	//==================================================================
});
