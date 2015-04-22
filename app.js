/**
 *
 * Created by linux-top on 15-4-9.
 */

    //[标识]当前
    $("*").on("click",".node",function(){
        //任何node-DIV被单击都会变成活动元素:
        $(".node").removeClass("active");
        $(this).addClass("active");
        $(this).attr("contentEditable",true);
    });

    //[可拖动]
    $("*").on("mouseover",".node",function(){
        //鼠标所到之处,div都变的"可拖动";
        $(this).draggable();
    });

    //[编辑]
    //$("*").on("click","",function(){
    //    //双击变成可编辑
    //   $(".node").removeAttr("contentEditable");
    //});

    //[正在拖动...]
    $("*").on("mousemove","div",function(){
        //曲线动画;
        //console.log("div[id="+$(this).attr("father")+"]");
		//console.log("div[id="+$(this).attr("id")+"]");
		//console.log(this);
        $("path[id="+$(this).attr("id")+"]").attr("d",flushPath("div[id="+$(this).attr("father")+"]",this,0.6));
		$("path[father="+$(this).attr("id")+"]").attr("d",flushPath(this,"div[id="+$("path[father="+$(this).attr("id")+"]").attr("id")+"]",0.6));
		//-------------------------------------------------------------此处有问题，静态方法不能处理多个对象（曲线），要写成原型方法；；；；；
    });

$(document).ready(function(){
    var _id=1;//每个节点[div]、曲线[svg path]的ID产生器;
    //var _cId=0;//每个曲线的ID产生器;

    //[添加结点]
    $("#addNode").button().on("click",function(){
        //console.log("正在为活动元素添加内容...");

        //1:给当前元素添加一个ID为"_id"的<div>;
        $(".active").createNodeObj(++_id);
        //2:为其生成曲线;
        createCurve(".active","#"+_id,0.6,_id);

    });
});

    function createCurve(_filter1,_filter2,_k,_cId){
        //path的html母体结构修改：
        _pathStr="<svg><path id="+_cId+" d='"+flushPath(_filter1,_filter2,_k)+"' father='"+$(_filter1).attr("id")+"' stroke='red' fill='none' style='stroke-width: 2px'></path></svg>";
        $("body").append(_pathStr);
		//$("svg").attr("id","svgid");
        //console.log(_pathStr+"|建立在"+_filter1+"和"+_filter2+"之间");
    }
	
    function flushPath(filter1,filter2,k) {
		//console.log($(filter1));
		//console.log($(filter2));
        //起点1：---------------------------------------------------------------//
        var x0 = $(filter1).position().left + 50;
        var y0 = $(filter1).position().top + 20;
        //末点4：---------------------------------------------------------------//
        var x3 = $(filter2).position().left + 50;
        var y3 = $(filter2).position().top + 20;

        //控制点1---------------------------------------------------------------//
        var x1 = x0 + (x3 - x0) * k;
        var y1 = y0;
        //控制点2---------------------------------------------------------------//
        var x2 = x3 - (x3 - x0) * k;
        var y2 = y3;
        //---------------------------------------------------------------------//

        var _dStr = "M" + x0 + "," + y0 + " C" + x1 + "," + y1 + "," + x2 + "," + y2 + "," + x3 + "," + y3;
        //console.log("path的d参数："+_dStr);
        return _dStr;
    }

    //拓展jQ对象功能：[添加div]
    $.fn.createNodeObj=function(_id){

        //node的html母体结构修改：
        _nodeStr="<div id='"+_id+"' class='node "+this.attr("id")+"' father='"+this.attr("id")+"'>"+_id+"</div>";

        $(this).after(_nodeStr);
        //console.log(_nodeStr);
    }