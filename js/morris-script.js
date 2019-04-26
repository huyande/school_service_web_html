var Script = function () {
    $(function () {
	$.ajax({
    		url:"http://localhost:84/admin/user/sexcount",
    		type:"GET",
    		dataType: "json",
            success: function (result) {
            	 new Morris.Donut({
        	        element: 'hero-donut',
        	        data: [
        	          {label: '男', value: result.data.man },
			          {label: '女', value: result.data.woman  },
			          {label: '未知', value: result.data.UNKnow }
        	        ],
        	          colors: ['#41cac0', '#EE6AA7', '#BDBDBD'],
        	        formatter: function (y) { return y + "%" }
        	      });
            }
    	});


    });

}();




