var Script = function () {
    $(function () {
	$.ajax({
    		url:"http://localhost:84/admin/confession/confCountSex",
    		type:"GET",
    		dataType: "json",
            success: function (result) {
            	 new Morris.Donut({
        	        element: 'conf_male',
        	        data: [
        	          {label: '男性发布', value: result.data.man },
			          {label: '女性发布', value: result.data.woman  }
        	        ],
        	          colors: ['#41cac0', '#EE6AA7'],
        	        formatter: function (y) { return Math.round(y/(result.data.woman+result.data.man)*100) + "%" }
        	      });
            }
    	});

	$.ajax({
    		url:"http://localhost:84/admin/confession/confCountStateIncognito",
    		type:"GET",
    		dataType: "json",
            success: function (result) {
            	 new Morris.Donut({
        	        element: 'conf_real',
        	        data: [
        	          {label: '实名', value: result.data.realName },
			          {label: '匿名', value: result.data.incognito  }
        	        ],
        	          colors: ['#41cac0', '#EE6AA7'],
        	        formatter: function (y) { return Math.round(y/(result.data.realName+result.data.incognito)*100) + "%" }
        	      });
            }
    	});

    });

}();




