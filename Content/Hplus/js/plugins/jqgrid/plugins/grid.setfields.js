;(function($){
/**
* 字段隐藏插件
**/
$.jgrid.extend({
	setColumns : function(p) {
		p = $.extend($.jgrid.col, p ||{});
		return this.each(function(){
			var $t = this;
			if (!$t.grid ) { return; }
			var gID = $t.p.id;
			if($("body").find(".cct-fields-container").length > 0){
				$(".edit_items").unbind();
				$(".cct-fields-container").remove();
			}
			var str = '<div class="cct-fields-container show">'+
				'<div head="">'+
				'<h2>选择列名</h2>'+
				'<a close="" class="ui-cmp-iconbtn alpha pull-right">'+
					'<span class="fa fa-times exposure" id="closeFieldsIframe"></span>'+
				'</a>'+
				'</div>'+
				'<div content="">'+
				'<form class="" id="formFieldsContainer">'+
				'<ul id="formFieldsUl" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">';
				var hasNoCheckItem = false;
				for(i=0;i<this.p.colNames.length;i++){
					if(!$t.p.colModel[i].hidedlg) { 
						var checked = ((this.p.colModel[i].hidden===false)? " checked='checked'":" ");
						if(!hasNoCheckItem) hasNoCheckItem = this.p.colModel[i].hidden===true;
						str += '<li class="">'+
						'<div item="">'+
						'<input type="checkbox" class="cct-fields-checks" value="'+this.p.colModel[i].name+'" id="col_'+this.p.colModel[i].name+'"'+
						checked + '/>'+
						'<label>'+this.p.colModel[i].label+'</label>'+
						'</div>'+
					'</li>';
					}
				}
				str += '</ul>'+
				'</form>'+
				'</div>'+
				'<div foot="">'+
					'<span class="cek_All" clean="">'+(hasNoCheckItem ? '全选':'反选')+'</span>'+
					'<button query="" class="btn btn-sm btn-primary pull-right m-r-xs" type="button" id="ensureHide">确认</button>'+
				'</div>'+
				'</div>';
				$("body").append(str);
				$('.cct-fields-checks').iCheck({
		               checkboxClass: 'icheckbox_square-green',
		               radioClass: 'iradio_square-green',
		        });
				$(".edit_items").click(function(e){
		  			if($(".cct-fields-container").hasClass("show"))
		  			{
		  				$(".cct-fields-container").removeClass("show").addClass("hide");
		  			}
		  			else
		  			{
		  				$(".cct-fields-container").addClass("show").removeClass("hide");
		  			}
		  			return this;
		  		});
				$("#closeFieldsIframe").click(function(e){
		  			if($(".cct-fields-container").hasClass("show"))
		  			{
		  				$(".cct-fields-container").removeClass("show").addClass("hide");
		  			}
		  		});
				$(".cek_All").click(function(e){
					if($(this).text() === '全选'){
						$(".cct-fields-checks").iCheck('check');
						$(this).text("反选");
					}else{
						$(".cct-fields-checks").iCheck('uncheck');
						$(this).text("全选");
					}
				})
				$("#ensureHide").click(function(e){
					var len=$($t).getGridParam("width");
					$('.cct-fields-checks').each(function(i){
						var checked = $(this).prop("checked");
						var colName = $(this).val();
	  	      			if(!checked){
	  	      				//隐藏该字段
	  	      				$($t).jqGrid("hideCol",colName);
	  	      			}else{
	  	      				//显示该字段
	  	      				$($t).jqGrid("showCol",colName);
	  	      			}
	  	      			
					});
		      	  	//设置为原有宽度
		      	  	$($t).setGridWidth(len);
		      	  	if($(".cct-fields-container").hasClass("show"))
		  			{
		  				$(".cct-fields-container").removeClass("show").addClass("hide");
		  			}
		      	  	return this;
				});
			})
		}
	})
})(jQuery);