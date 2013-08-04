	$(document).ready(function(){
		//hide divs
		$('#caps').hide();
		$('#caps_naps').hide();
		$('#naps').hide();
		
		$('#composeBtn').on('click', function(){
			$('#init').hide();
			$('#validate').hide();
			$('#create').show();
			$('.result').find('ul').remove();
			$('#subType').val('');
			$('.control-group').removeClass("error");
			$('.help-inline').hide();
		})
		
		$('#bckBtn').on('click', function(){
			$('#validate').hide();
			$('#create').hide();
			$('#init').show();
			//clear all input
			$(':input').val("");
			$('.control-group').removeClass("error");
			$('.help-inline').hide();
		})
		
		$('#validateBtn').on('click', function(){
			$('#init').hide();
			$('#create').hide();
			$('#validate').show();
			$('.control-group').removeClass("error");
			$('.help-inline').hide();
		})
		
		$('#subType').change(function(){
			$('.control-group').removeClass("error");
			$('.help-inline').hide();
			switch($(this).val()){
			case "cap":
				$('#caps').show();
				$('#caps_naps').hide();
				$('#naps').hide();
				break;
			case "nap":
				$('#caps').hide();
				$('#caps_naps').hide();
				$('#naps').show();
				break;
			case "cap_nap":
				$('#caps').hide();
				$('#caps_naps').show();
				$('#naps').hide();
				break;
			 default:
				$('#caps').hide();
				$('#caps_naps').hide();
				$('#naps').hide();
				break;
			}
		});
		
		jQuery.fn.serializeJSON=function() {
			  var json = {};
			  jQuery.map(jQuery(this).serializeArray(), function(n, i) {
			    var _ = n.name.indexOf('[');
			    if (_ > -1) {
			      var o = json;
			      _name = n.name.replace(/\]/gi, '').split('[');
			      for (var i=0, len=_name.length; i<len; i++) {
			        if (i == len-1) {
			          if (o[_name[i]]) {
			            if (typeof o[_name[i]] == 'string') {
			              o[_name[i]] = [o[_name[i]]];
			            }
			            o[_name[i]].push(n.value);
			          }
			          else o[_name[i]] = n.value || '';
			        }
			        else o = o[_name[i]] = o[_name[i]] || {};
			      }
			    }
			    else {
			      if (json[n.name] !== undefined) {
			        if (!json[n.name].push) {
			          json[n.name] = [json[n.name]];
			        }
			        json[n.name].push(n.value || '');
			      }
			      else json[n.name] = n.value || '';      
			    }
			  });
			  return json;
			};
			
		$(".generateBtn").on("click", function(){
			$('.result').find('ul').remove();
			var form = $(this).closest("form");
			
			if (clientVal(form)==false)
				return;
			
			var data = JSON.stringify(form.serializeJSON());
			$.post('compose/'+form.attr('id'), data, function(result){
				$('.result').append(result);
			}).fail(function() { alert("error"); });
		});
		
		$("#btnValidate").on("click", function(){
			$('.result').find('ul').remove();
			var form = $(this).closest("form");
			var data = JSON.stringify(form.serializeJSON());
			
			if (clientVal(form)==false)
				return;
			
			$.post('validate', data, function(result){
				$('.result').append(result);
			}).fail(function() { 
				alert("error"); 
			});
		});
	});
	
	function clientVal(form){
		//reset all control groups to normal
		$('.control-group').removeClass("error");
		
		var faults = form.find('input').filter(function() {
	        // filter input elements to required ones that are empty
	        return $(this).data('required') && $(this).val() === "";
	    }).closest('.control-group').addClass("error"); // make them attract the eye
				
	    if(faults.length){
	    	return false; // if any required are empty, cancel submit
	    }
	    else
	    	return true;
	}