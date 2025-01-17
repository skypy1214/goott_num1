$(document).ready(function(){
    $("#setInvert").click(function(){
		if($("html").hasClass("invert")){
			setInvertOff();
		}else{
			$("html").addClass("invert");
			$(this).attr("aria-pressed","true");
		}
	});
    $("#setZoomin").click(function(){
		setZoom(1)
	});
	$("#setZoomout").click(function(){
		setZoom(0);
	});
    $('body').keydown(function(e){
	    if(e.keyCode == 27){
	    	if($("#magnifyLense").is(":visible")) magnifyOff();
			if($("html").hasClass("invert")) setInvertOff();
			$(".ctrl_edit").hide();
	    }
	});
    $("#setMagnify").click(function() {
		var zoomNum = 2;
		$(".section_Ele_Cont_Detail").css("display","flex");
		$(this).addClass("active");
		if($("#magnifyLense").is(":visible")){
			magnifyOff();
		}else{
			if($("#magnifyImg").find("canvas").length < 1){
				$("#a11yMenu").hide();
				$("#magnify_pop").show();
				html2canvas($("#container"), {
					onrendered: function(canvas) {
						document.body.appendChild(canvas);
						canvas.setAttribute("id","magnify");
						$("#magnifyImg").append(canvas);
						$("#a11yMenu").show();
						$("#magnify_pop").hide();
						$("#setMagnify")[0].focus();
						var imgData = canvas.toDataURL();
						var lense = $("#magnifyLense");
						lense.css({
							"background-image": "url("+imgData+")",
							"background-size": (canvas.width * zoomNum) + "px " + (canvas.height * zoomNum) + "px"
						});
						$("#wrap").on("mousemove", function(e){
							magnifyEvent(e,lense);
						});
					}
				});
			}
			$("#magnifyImg").show();
			$(this).attr("aria-pressed","true");
		}
	});
    function magnifyOff(){
		$("#magnifyImg").hide();
		$("#setMagnify").removeClass("active");
		$("#setMagnify").attr("aria-pressed","false");
		$(".section_Ele_Cont_Detail").css("display","none");
	}
    function magnifyEvent(ev,el){
		if(!el.is(":visible")){
			el.fadeIn(100);
		}
		var w = el.width()/2;
		var h = el.height()/2;
		var leftPos = (ev.pageX - w);
		var topPos = (ev.pageY - h);
		var rx = Math.round((ev.pageX*2)-w)*-1
		var ry = Math.round((ev.pageY*2)-h)*-1
		el.css({
			left: leftPos+"px",
			top: topPos+"px",
			'background-position': rx+"px "+ry+"px"
		});
	}        
});
function setInvertOff(){
	$("html").removeClass("invert");
	$("#setInvert").attr("aria-pressed","false");
}

function setZoom(num){
	num = num ? 10 : -10;
	console.log(num)
	var zoom = document.body.style.zoom;
	console.log(zoom);
	var zoomNum = zoom === "" || !zoom ? 100 : parseInt(zoom);
	$("#zoomNum").text(zoomNum + num);
	document.body.style.zoom = (zoomNum + num)+"%";
}

       
