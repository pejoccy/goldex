(function ($) {
    Drupal.behaviors.settings_module = {
        attach: function (context, settings) {
		// var ans = jQuery('#edit-pagination .form-radio').attr('selected', true);	
		var base = Drupal.settings.base.url;		

			$("div[id*='suggest-client-']").hide();
			$("div[id*='suggest-scheme-']").hide();

			$("input[id*='edit-planinfo-']").click(function(event) {
				/* Act on the event */
				var piece = $(this).attr('id').split("-");
				var key = piece[2];
							
				//Hide everyone first
				$("div[id*='suggest-client-']").hide();
				$("div[id*='suggest-scheme-']").hide();
				//show the specific one
				$("div[id*='suggest-client-"+key+"']").show();
				$("div[id*='suggest-scheme-"+key+"']").show();								

			});

			$("select[id*= 'edit-suggest-']").change(function(event) {
				/* Act on the event */

				var piece = $(this).attr('id').split("-");
				var right = $(this).val();
				var mode = piece[2]; 
				var key = piece[4];
				var key2 = (key-1);
				var plan = (mode == 'scheme')?$('#splan-'+key2).val():$('#cplan-'+key2).val();
				var wrong = (mode == 'scheme')?$('#swrong-'+key2).val():$('#cwrong-'+key2).val();

				var urlCall	= base+"/fix-duplicate-issues/"+wrong+"/"+right+"/"+mode+"/"+plan;
					// console.log("URL: "+urlCall); return;
					// exit();
				if(confirm("This action will disable this plan do you want to continue?")){			
					//make ajax call to do database updates
				$.ajax({
			    type: 'POST',		    
			    url: urlCall,		    		   
			   success: function (data){
			   	console.log(data);
			   },
			   error: function (){
			   	console.log("An error occurred");
			   },
			   complete:function (){
			   	alert("Plan Modified");
			   }

			  });	
					// alert("Disable Plan:"+key);
				}else{
					alert("Stop:"+key);
				}
			});
				

		$("#price-tag").once(function(){
			$("#price-tag").click(function(event) {
				event.preventDefault();
				var href = $(event.target).attr('href');
				
				 urlpiece = href.split("/");
				 var callbackID  = ""; var link  = "";
				 for (var i = 0; i < urlpiece.length; i++) {
				 	
				 	if(urlpiece[i] == 'background-calling')			 	
				 		callbackID = i;			 				 	

				 	if(callbackID)
				 		link += urlpiece[i]+"/";
				 };
				// console.log(base+"/"+link);
				var urlCall = base+"/"+link;
			  /* Act on the event */
			  /*
			  localhost///hmo/background-calling/nojs/Life%20Blue/2000.00/AQUILA%20ASSET/Lifeworth%202016_NOV.xls/850/0
			   */
			   $.ajax({
			    type: 'POST',		    
			    url: urlCall,		    		   
			   success: function (data){
			   	$('#price-tag').text("...Please Wait");
			   	console.log(urlCall);
			   },
			   error: function (){
			   	$('#price-tag').text("RE-SAVE");
			   	console.log("An error occurred");
			   },
			   complete:function (){
			   	$('#price-tag').text("SAVED");
			   	$("#plnpric-issue-0").html("<div style='display:inline-block; margin-left:0px'><img src='"+base+"/misc/message-16-ok.png' width='15px'></div>");
			   	// alert("Price Saved");
			   }

			  });
		  });
		});

		$('#edit-nwprc').blur(function(event) {
			/* Act on the event */
			var price = $(this).val();
			$('#edit-nwprc').attr('value', price);
			var url = $("#price-tag").attr('href');
			$("#price-tag").attr('href','');
			urlPiece = url.split("/");
			var newPath = "";
			for (var i = 0; i < urlPiece.length; i++) {
				if(i == (urlPiece.length - 2))
				newPath += "/"+price;
				else	
				newPath += "/"+urlPiece[i];
			};
			//<a href="/hmo/background-calling/nojs/Life%20Blue/0" id="price-tag" class="ajax-processed">SAVE</a>
			$("#price-tag").attr('href',newPath);
			// console.log(newPath);
			
		});	
	}
};
}(jQuery));