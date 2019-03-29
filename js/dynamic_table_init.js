$(document).ready(function() {

   /* $('#dynamic-table').dataTable( {
        "aaSorting": [[ 4, "desc" ]]
    } );*/

    /*
     * 展开关闭图片 
     */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = '<img src="img/details_open.png">';
    nCloneTd.className = "center";

    $('#hidden-table-info thead tr').each( function () {
        this.insertBefore( nCloneTh, this.childNodes[0] );
    } );

    $('#hidden-table-info tbody tr').each( function () {
        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
    } );

    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    //debugger
    var oTable = $('#hidden-table-info').dataTable( {
    	"serverSide": true,  //启用服务器端分页
    	"bProcessing" : false,
    	"aLengthMenu": [   
    				[5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
        "iDisplayLength": 5,
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": [ 0 ] }
        ],
        "aaSorting": [[1, 'asc']],
        "oLanguage": {
                    "sLengthMenu": "_MENU_ 每页显示的条数",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    },
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sSearch": "搜索用户昵称:"
                    
        },
        
		"ajax": function (data, callback, settings) {
                //封装请求参数
                //console.log(data);
                var param = {};
                param.pagesize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                //param.start = data.start;//开始的记录序号
                param.currentpage = (data.start / data.length)+1;//当前页码
                param.search = data.search.value;
                //param.order = data.order[0]
                console.log(param);
                //ajax请求数据
               $.ajax({
                    type: "GET",
                    url: "http://localhost:84/admin/user/userlist",
                    cache: false,  //禁用缓存
                    data: param,  //传入组装的参数
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        //setTimeout仅为测试延迟效果
                        setTimeout(function () {
                            //封装返回数据
                            var returnData = {};
                            returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                            returnData.recordsTotal = result.total;//返回数据全部记录
                            returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                            returnData.data = result.data;//返回的数据列表
                            //console.log(returnData);
                            //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                            //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                            callback(returnData);
                        }, 200);
                    }
                });
        	
        },
       /*"ajax": {
		      "url": "http://132.232.7.250:84/user/userlist?currentpage=1&pagesize=1",
		      "dataSrc": "data"
		   },*/
        "aoColumns": [
         	{"data": "id",
         		"render": function(data,type,row,meta){
         			return data = '<img src="img/details_open.png">'
				}
         	},
         	{"data": "avatarurl",
         		"render": function(data,type,row,meta){
         			return data = '<img style="height:30px;width:30px;" src="'+data+'"/>'
				}
         	},
         	{"data": "nickname"},
         	{"data": "gender",
	         	"render": function(data,type,row,meta){
	         			var sex='';
	         			if(data==1){
	         				sex='男'
	         			}else if(data==2){
	         				sex='女'
	         			}else{
	         				sex='未知'
	         			}
	         			return sex;
					}
         	},
         	{"data": "city"},
         	{"data": "signtime"}
        ]
    });//此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象 .api() https://www.cnblogs.com/huim/p/9514337.html

    /* 
     * 点击展开关闭图片
     */
    $(document).on('click','#hidden-table-info tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.src = "img/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "img/details_close.png";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    } );
} );



function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>用户昵称:</td><td>'+aData.nickname+'</td></tr>';
    sOut += '<tr><td>用户头像:</td><td>'+'<img style="height:90px;width:90px;" src="'+aData.avatarurl+'"/>'+'</td></tr>';
    sOut += '<tr><td>openid:</td><td>'+aData.openid+'</td></tr>';
    sOut += '<tr><td>城市 省份:</td><td>'+aData.city+':'+aData.province +'</td></tr>';
    sOut += '<tr><td>邮箱:</td><td>'+aData.email+'</td></tr>';
    sOut += '<tr><td>电话:</td><td>'+aData.phonenumber+'</td></tr>';
    sOut += '<tr><td>注册时间:</td><td>'+aData.signtime+'</td></tr>';
    sOut += '<tr><td>最近上线时间:</td><td>'+aData.recenttime+'</td></tr>';
    sOut += '</table>';

    return sOut;
}