webpackJsonp([1],{0:function(t,e){},1:function(t,e){},2:function(t,e){},"2bHb":function(t,e){},BLs7:function(t,e){},BvrH:function(t,e,n){t.exports=n.p+"static/img/avatar.dbc47b6.jpg"},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={};n.d(o,"userSignUp",function(){return S}),n.d(o,"userSignIn",function(){return x}),n.d(o,"addAccountRecord",function(){return R}),n.d(o,"updateAccountRecord",function(){return y}),n.d(o,"getAccountRecords",function(){return D}),n.d(o,"deleteAccountRecord",function(){return b});var c=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")(null,a,!1,function(t){n("BLs7")},"data-v-1ae2b1cf",null).exports,i=n("/ocq"),r=n("NYxO"),u=n("Xxa5"),d=n.n(u),l=n("exGp"),p=n.n(l),m=n("//Fk"),f=n.n(m),v=n("mtWM"),h=n.n(v),I=n("mw3O"),A=n.n(I),g=n("Au9i");h.a.defaults.timeout=6e4,h.a.interceptors.request.use(function(t){return E.state.user.token.access_token&&(t.headers.Authorization=E.state.user.token.token_type+" "+E.state.user.token.access_token),t},function(t){return g.Indicator.close(),Object(g.Toast)("响应超市"),f.a.reject(t)}),h.a.interceptors.response.use(function(t){return t},function(t){if(t.response)switch(t.response.status){case 401:ot.replace({path:"/Login",query:{redirect:ot.currentRoute.fullPath}})}return f.a.reject(t.response.data)});var _=h.a,C="https://api.round-king.com",T={getAccountTypes:function(t){return _.get(C+"/Account/Types/"+t)},getAccountRecords:function(t){return _.get(C+"/Account/List?"+A.a.stringify(t))},createAccountRecord:function(t){return _.post(C+"/Account",t)},updateAccountRecord:function(t,e){return _.put(C+"/Account/"+t,e)},deleteAccountRecord:function(t){return _.delete(C+"/Account/"+t)}},k={getToken:function(t){return _.post("https://identityserver4.round-king.com/connect/token",A.a.stringify(t))},signUp:function(t){return _.post(C+"/UserInfo",t)},getUser:function(t){return _.get(C+"/UserInfo/"+t)}},S=function(){var t=p()(d.a.mark(function t(e,n){var o,c=e.commit,a=(e.dispatch,e.state);return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.signUp(n).then(function(t){var e=t.data;e.IsSuccess?(console.log(e),c("SET_CURRENT_USER",e.Data)):(g.Indicator.close(),Object(g.Toast)(e.Message))}).catch(function(t){g.Indicator.close(),Object(g.Toast)("注册失败")});case 2:if(!a.user.currentUser.Account){t.next=8;break}return o={grant_type:"password",client_id:"pwd_client",client_secret:"pwd_secret",scope:"rk offline_access",username:n.Account,password:n.Password},g.Indicator.close(),g.Indicator.open({text:"注册成功, 登录中..."}),t.next=8,k.getToken(o).then(function(t){var e=t.data;console.log(e),c("SET_TOKEN",e),c("SET_IS_LOGIN",!0)}).catch(function(t){g.Indicator.close(),Object(g.Toast)("登录异常：获取 TOKEN 失败")});case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),x=function(){var t=p()(d.a.mark(function t(e,n){var o=e.commit,c=(e.dispatch,e.state);return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.getToken(n.tokenRequest).then(function(t){var e=t.data;console.log(e),sessionStorage.setItem("access_token",e.access_token),sessionStorage.setItem("refresh_token",e.refresh_token),sessionStorage.setItem("token_type",e.token_type),o("SET_TOKEN",e)}).catch(function(t){g.Indicator.close(),Object(g.Toast)("登录异常：获取 TOKEN 失败")});case 2:if(!c.user.token.access_token){t.next=5;break}return t.next=5,k.getUser(n.account).then(function(t){var e=t.data;e.IsSuccess?(console.log(e),o("SET_CURRENT_USER",e.Data),o("SET_IS_LOGIN",!0)):(g.Indicator.close(),Object(g.Toast)(e.Message))}).catch(function(t){g.Indicator.close(),Object(g.Toast)("登录异常：获取用户信息失败")});case 5:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),R=function(t,e){var n=t.commit,o=t.state,c=o.accountRecords.accountList.findIndex(function(t){return t.Date==e.AccountDate});if(-1==c){var a=o.accountRecords.accountList.findIndex(function(t){return new Date(e.AccountDate)>new Date(t.Date)});-1==a&&(a=o.accountRecords.accountList.length),n("SPLICE_ACCOUNT_ITEM",{index:a,record:{Date:e.AccountDate,DateAmount:e.Amount,AccountRecords:[e],MonthExpend:"",MonthIncome:""}})}else{n("CREATE_ACCOUNT_RECORD",{index:c,dateAmount:1==e.Type?(parseFloat(o.accountRecords.accountList[c].DateAmount)+parseFloat(e.Amount)).toFixed(2):o.accountRecords.accountList[c].DateAmount,recordItem:e})}var s=new Date(e.AccountDate),i=new Date;s.getFullYear()==i.getFullYear()&&s.getMonth()==i.getMonth()&&(0==e.Type?n("SET_MONTH_AMOUNT",{monthIncome:(parseFloat(o.accountRecords.monthIncome)+parseFloat(e.Amount)).toFixed(2),monthExpend:o.accountRecords.monthExpend}):n("SET_MONTH_AMOUNT",{monthIncome:o.accountRecords.monthIncome,monthExpend:(parseFloat(o.accountRecords.monthExpend)+parseFloat(e.Amount)).toFixed(2)}))},y=function(t,e){var n=t.commit,o=t.state;e.updateInfo.hasUpdateDate?(n("DELETE_ACCOUNT_RECORD",e.updateInfo),R({commit:n,state:o},e.record)):(0==e.record.Type?(e.dateAmount=o.accountRecords.accountList[e.updateInfo.index1].DateAmount,n("SET_MONTH_AMOUNT",{monthIncome:(parseFloat(o.accountRecords.monthIncome)+parseFloat(e.updateInfo.updateAmount)).toFixed(2),monthExpend:o.accountRecords.monthExpend})):(e.dateAmount=(parseFloat(o.accountRecords.accountList[e.updateInfo.index1].DateAmount)+parseFloat(e.updateInfo.updateAmount)).toFixed(2),n("SET_MONTH_AMOUNT",{monthIncome:o.accountRecords.monthIncome,monthExpend:(parseFloat(o.accountRecords.monthExpend)+parseFloat(e.updateInfo.updateAmount)).toFixed(2)})),n("UPDATE_ACCOUNT_ITEM",e))},D=function(t){var e=t.commit,n=t.state;if(!n.accountRecords.isLoading&&!n.accountRecords.allLoaded){var o={PageIndex:n.accountRecords.pageIndex,PageSize:n.accountRecords.pageSize,UserId:n.user.currentUser.Id};e("SET_IS_LOADING",!0),T.getAccountRecords(o).then(function(t){var o=t.data;o.IsSuccess?0==o.Data.length?(e("SET_ALL_LOADED",!0),e("SET_IS_LOADING",!1),Object(g.Toast)(o.Message)):(o.Data.forEach(function(t){var o=n.accountRecords.accountList.findIndex(function(e){return e.Date==t.Date});-1==o?e("PUSH_ACCOUNT_ITEM",t):e("SET_ACCOUNT_LIST",{index:o,dateAmount:t.DateAmount,recordItems:t.AccountRecords}),e("SET_MONTH_AMOUNT",{monthIncome:t.MonthIncome,monthExpend:t.MonthExpend})}),e("SET_PAGE_INFO",{pageIndex:n.accountRecords.pageIndex+1,pageSize:n.accountRecords.pageSize})):(console.error(o.Message),Object(g.Toast)(o.Message)),e("SET_IS_LOADING",!1)}).catch(function(t){console.error(t),Object(g.Toast)("获取列表异常"),e("SET_IS_LOADING",!1)})}},b=function(t,e){var n=t.commit,o=t.state,c=o.accountRecords.accountList[e.index1].AccountRecords[e.index2],a=new Date(c.AccountDate),s=new Date;a.getFullYear()==s.getFullYear()&&a.getMonth()==s.getMonth()&&(0==c.Type?n("SET_MONTH_AMOUNT",{monthIncome:(parseFloat(o.accountRecords.monthIncome)+parseFloat(c.Amount)).toFixed(2),monthExpend:o.accountRecords.monthExpend}):n("SET_MONTH_AMOUNT",{monthIncome:o.accountRecords.monthIncome,monthExpend:(parseFloat(o.accountRecords.monthExpend)+parseFloat(c.Amount)).toFixed(2)})),n("DELETE_ACCOUNT_RECORD",e)},w={state:{token:{},isLogin:!1,currentUser:{},routerLog:{}},mutations:{SET_TOKEN:function(t,e){t.token=e},SET_CURRENT_USER:function(t,e){t.currentUser=e},SET_IS_LOGIN:function(t,e){t.isLogin=e},UPDATE_CURRENT_USER:function(t,e){for(var n in e)user.hasOwnProperty(n)&&(t.currentUser[n]=e[n])},SET_ROUTER_LOG:function(t,e){t.routerLog.prev=e.prev,t.routerLog.next=e.next}}},U={state:{pageIndex:1,pageSize:10,isLoading:!1,allLoaded:!1,accountList:[],monthIncome:0,monthExpend:0},mutations:{SET_PAGE_INFO:function(t,e){t.pageIndex=e.pageIndex,t.pageSize=e.pageSize},SET_ALL_LOADED:function(t,e){t.allLoaded=e},SET_IS_LOADING:function(t,e){t.isLoading=e},CREATE_ACCOUNT_RECORD:function(t,e){t.accountList[e.index].DateAmount=e.dateAmount,t.accountList[e.index].AccountRecords.unshift(e.recordItem)},SPLICE_ACCOUNT_ITEM:function(t,e){t.accountList.splice(e.index,0,e.record)},PUSH_ACCOUNT_ITEM:function(t,e){t.accountList.push(e)},UPDATE_ACCOUNT_ITEM:function(t,e){t.accountList[e.updateInfo.index1].DateAmount=e.dateAmount,t.accountList[e.updateInfo.index1].AccountRecords[e.updateInfo.index2]=e.record},SET_ACCOUNT_LIST:function(t,e){t.accountList[e.index].DateAmount=e.dateAmount,e.recordItems.forEach(function(n){t.accountList[e.index].AccountRecords.some(function(t){return t.Id==n.Id})||t.accountList[e.index].AccountRecords.push(n)})},SET_MONTH_AMOUNT:function(t,e){t.monthIncome=e.monthIncome,t.monthExpend=e.monthExpend},DELETE_ACCOUNT_RECORD:function(t,e){if(1==t.accountList[e.index1].AccountRecords.length)t.accountList.splice(e.index1,1);else{var n=t.accountList[e.index1],o=n.AccountRecords[e.index2];1==o.Type?(t.accountList[e.index1].DateAmount=(parseFloat(n.DateAmount)-parseFloat(o.Amount)).toFixed(2),t.accountList[e.index1].MonthExpend=(parseFloat(n.MonthExpend)-parseFloat(o.Amount)).toFixed(2)):t.accountList[e.index1].MonthIncome=(parseFloat(n.MonthIncome)-parseFloat(o.Amount)).toFixed(2),t.accountList[e.index1].AccountRecords.splice(e.index2,1)}}}};c.default.use(r.a);var E=new r.a.Store({actions:o,modules:{user:w,accountRecords:U},strict:!1}),O=n("Dd8w"),N=n.n(O),L={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"layout"},[this._t("default")],2)},staticRenderFns:[]};var M=n("VU/8")({},L,!1,function(t){n("QBx0")},"data-v-3cce4a68",null).exports,F={computed:N()({},Object(r.c)({AccountList:function(t){return t.accountRecords.accountList},IsLoading:function(t){return t.accountRecords.isLoading},MonthIncome:function(t){return t.accountRecords.monthIncome},MonthExpend:function(t){return t.accountRecords.monthExpend}})),methods:N()({},Object(r.b)({getAccountRecords:"getAccountRecords"})),components:{Layout:M}},P={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"slide-fade"}},[o("div",{staticClass:"account-list"},[o("div",{staticClass:"top"},[o("div",{staticClass:"header"},[o("img",{staticClass:"avatar",attrs:{src:n("BvrH"),alt:"avatar",srcset:""}})]),t._v(" "),o("div",{staticClass:"total"},[o("div",{staticClass:"col-6 income"},[o("p",[t._v("本月收入")]),t._v(" "),o("p",[t._v(t._s(t.MonthIncome))])]),t._v(" "),o("div",{staticClass:"col-6 expend"},[o("p",[t._v("本月支出")]),t._v(" "),o("p",[t._v(t._s(t.MonthExpend))])])])]),t._v(" "),o("div",{staticClass:"container"},[o("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.getAccountRecords,expression:"getAccountRecords"}],attrs:{"infinite-scroll-disabled":"IsLoading","infinite-scroll-distance":"0"}},[o("transition-group",{attrs:{name:"records"}},t._l(t.AccountList,function(e,n){return o("li",{key:e.Date},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-6 day-left"},[o("span",{staticClass:"day"},[t._v(t._s(e.Date))])]),t._v(" "),o("div",{staticClass:"mid-day-total"}),t._v(" "),o("div",{staticClass:"col-6 day-right"},[o("span",{staticClass:"day"},[t._v(t._s(e.DateAmount))])])]),t._v(" "),t._l(e.AccountRecords,function(e,c){return[0==e.Type?o("div",{key:e.Id,staticClass:"row"},[o("router-link",{attrs:{to:{name:"addAccount",params:{index1:n,index2:c}}}},[o("div",{staticClass:"col-6 left"},[o("span",{staticClass:"amount"},[t._v(t._s(e.Amount))]),t._v(" "),o("span",{staticClass:"type-name"},[t._v(t._s(e.TypeName))])]),t._v(" "),o("i",{class:"mid icon iconfont icon-"+e.TypeCode})]),t._v(" "),o("div",{staticClass:"col-6 right"})],1):t._e(),t._v(" "),1==e.Type?o("div",{key:e.Id,staticClass:"row"},[o("div",{staticClass:"col-6 left"}),t._v(" "),o("router-link",{attrs:{to:{name:"addAccount",params:{index1:n,index2:c}}}},[o("i",{class:"mid icon iconfont icon-"+e.TypeCode}),t._v(" "),o("div",{staticClass:"col-6 right"},[o("span",{staticClass:"type-name"},[t._v(t._s(e.TypeName))]),t._v(" "),o("span",{staticClass:"amount"},[t._v(t._s(e.Amount))])])])],1):t._e()]})],2)})),t._v(" "),o("li",{directives:[{name:"show",rawName:"v-show",value:t.IsLoading,expression:"IsLoading"}]},[o("div",{staticClass:"row loading-mid"},[o("div",{staticClass:"col-12"},[o("mt-spinner",{staticClass:"mid",attrs:{type:"double-bounce"}})],1)])])],1)]),t._v(" "),o("div",{staticClass:"fix-add"},[o("router-link",{staticClass:"fix-add-link",attrs:{to:"/Account/Add"}},[t._v("+")])],1)])])},staticRenderFns:[]};var $=n("VU/8")(F,P,!1,function(t){n("r2Dd")},"data-v-071f5ba3",null).exports,j=n("mvHQ"),H=n.n(j),B={data:function(){return{AccountDateModel:"",AccountYear:"",AccountMonth:"",AccountDate:"",Integer:"",Decimal:"",CalcAmount:this.Amount,SumAmount:"0.00",OperatorType:"",OkOperatorType:"",HasDot:!1}},created:function(){this.AccountDateModel=this.RecordDate;var t=this.RecordDate.split("-");this.AccountYear=t[0],this.AccountMonth=t[1],this.AccountDate=t[2]},props:["Amount","RecordDate"],methods:{openDatePicker:function(t){this.$refs[t].open()},handleChange:function(t){var e=new Date(t);this.AccountYear=e.getFullYear(),this.AccountMonth=e.getMonth()+1>=10?e.getMonth()+1:"0"+(e.getMonth()+1),this.AccountDate=e.getDate()>=10?e.getDate():"0"+e.getDate(),this.AccountDateModel=this.AccountYear+"-"+this.AccountMonth+"-"+this.AccountDate,this.emitAccountDate()},clickCalcNumber:function(t){""!=this.OperatorType&&(this.CalcAmount="0.00",this.Integer="",this.Decimal=""),this.HasDot?(this.Decimal.length<2&&(this.Decimal+=t),""==this.Integer&&(this.Integer="0")):this.Integer+=t;var e=this.CalcAmount.split(".");e[0]=this.Integer,1==this.Decimal.length?e[1]=this.Decimal+"0":2==this.Decimal.length?e[1]=this.Decimal:e[1]="00",this.CalcAmount=e[0]+"."+e[1],this.OperatorType="",this.emitAmount()},clickCalcDot:function(){this.HasDot=!0},clickCalcClear:function(){this.CalcAmount="0.00",this.Integer="",this.Decimal="",this.SumAmount="0.00",this.OperatorType="",this.OkOperatorType="",this.HasDot=!1,this.emitAmount()},clickCalcOperate:function(t){this.OkOperatorType=t,""==this.OperatorType&&("+"==t?(this.OperatorType="+",this.SumAmount=(parseFloat(this.SumAmount)+parseFloat(this.CalcAmount)).toFixed(2),this.CalcAmount=this.SumAmount):"-"==t?(this.OperatorType="-",0!=parseFloat(this.SumAmount)?(this.SumAmount=(parseFloat(this.SumAmount)-parseFloat(this.CalcAmount)).toFixed(2),this.CalcAmount=this.SumAmount):this.SumAmount=this.CalcAmount):this.OperatorType="",this.HasDot=!1),this.emitAmount()},clickCalcOk:function(){this.$emit("clickOk")},clickRemark:function(){this.$emit("openRemark",!1)},emitAmount:function(){this.$emit("showAmount",this.CalcAmount)},emitAccountDate:function(){this.$emit("setAccountDate",this.AccountDateModel)}}},G={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container calc"},[n("div",{staticClass:"row calc-set"},[n("div",{staticClass:"col-6",on:{click:function(e){t.openDatePicker("date-picker")}}},[n("p",{staticClass:"calc-year"},[t._v(t._s(t.AccountYear))]),t._v(" "),n("p",{staticClass:"calc-date"},[t._v(t._s(t.AccountMonth)+"月"+t._s(t.AccountDate)+"日")])]),t._v(" "),n("div",{staticClass:"col-6"},[n("p",{staticClass:"calc-remark",on:{click:t.clickRemark}},[t._v("备注")])])]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(1)}}},[t._v("1")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(2)}}},[t._v("2")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(3)}}},[t._v("3")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcOperate("+")}}},[t._v("+")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(4)}}},[t._v("4")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(5)}}},[t._v("5")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcNumber(6)}}},[t._v("6")]),t._v(" "),n("div",{staticClass:"col-3",on:{click:function(e){t.clickCalcOperate("-")}}},[t._v("-")]),t._v(" "),n("div",{staticClass:"col-9"},[n("div",{staticClass:"col-4",on:{click:function(e){t.clickCalcNumber(7)}}},[t._v("7")]),t._v(" "),n("div",{staticClass:"col-4",on:{click:function(e){t.clickCalcNumber(8)}}},[t._v("8")]),t._v(" "),n("div",{staticClass:"col-4",on:{click:function(e){t.clickCalcNumber(9)}}},[t._v("9")]),t._v(" "),n("div",{staticClass:"col-4 calc-clear",on:{click:t.clickCalcClear}},[t._v("清零")]),t._v(" "),n("div",{staticClass:"col-4",on:{click:function(e){t.clickCalcNumber(0)}}},[t._v("0")]),t._v(" "),n("div",{staticClass:"col-4",on:{click:t.clickCalcDot}},[t._v(".")])]),t._v(" "),n("div",{staticClass:"col-3 calc-ok",on:{click:t.clickCalcOk}},[t._v("\n      OK\n    ")])]),t._v(" "),n("mt-datetime-picker",{ref:"date-picker",attrs:{type:"date"},on:{confirm:t.handleChange},model:{value:t.AccountDateModel,callback:function(e){t.AccountDateModel=e},expression:"AccountDateModel"}})],1)},staticRenderFns:[]};var Y=n("VU/8")(B,G,!1,function(t){n("nA4K")},"data-v-4e10390c",null).exports,V={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide-up",mode:"out-in"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row add-header"},[n("i",{staticClass:"title-back icon iconfont icon-fanhui",on:{click:t.closeRemark}}),t._v(" "),n("div",{staticClass:"col-12 title"},[t._v("备注")]),t._v(" "),n("div",{staticClass:"col-12"},[n("span",{staticClass:"txt-count"},[t._v(t._s(t.InputCount)+"/200")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.Remark,expression:"Remark"}],staticClass:"remark",attrs:{rows:"8",placeholder:"请输入备注信息",maxlength:"200"},domProps:{value:t.Remark},on:{input:[function(e){e.target.composing||(t.Remark=e.target.value)},t.descInput]}})]),t._v(" "),n("div",{staticClass:"col-12 finish"},[n("button",{staticClass:"btn btn-primary btn-finish",on:{click:t.finish}},[t._v("完成")])])])])])},staticRenderFns:[]};var q=n("VU/8")({data:function(){return{InputCount:0,Remark:""}},methods:{descInput:function(){this.InputCount=this.Remark.length},closeRemark:function(){this.$emit("closeRemark",!0)},finish:function(){this.$emit("setRemarkInfo",this.Remark),this.$emit("closeRemark",!0)}}},V,!1,function(t){n("ToP3")},"data-v-7cd6c4e1",null).exports,z=void 0,K={data:function(){return{Id:0,UserId:0,AccountTypeList:[],AccountIncomeTypeList:[],AccountExpendTypeList:[],SelectedId:4,SelectedType:"yiban",SelectedTypeName:"一般",Type:1,Amount:"0.00",RemarkNotOpen:!0,RemarkInfo:"",AccountDate:"",AccountDateBack:"",AmountBack:"",SlideName:""}},created:function(){z=this;var t=new Date;z.UserId=z.$store.state.user.currentUser.Id,z.getAccountTypeList(),z.AccountDate=t.getFullYear()+"-"+(t.getMonth()+1>=10?t.getMonth()+1:"0"+(t.getMonth()+1))+"-"+(t.getDate()>=10?t.getDate():"0"+t.getDate());var e=this.$route.params.index1,n=this.$route.params.index2;if(void 0!==n&&void 0!==n){var o=this.$store.state.accountRecords.accountList[e].AccountRecords[n];this.Id=o.Id,this.SelectedId=o.AccountTypeId,this.SelectedType=o.TypeCode,this.SelectedTypeName=o.TypeName,this.Type=o.Type,this.Amount=o.Amount,this.RemarkInfo=o.Remark,this.AccountDate=o.AccountDate,this.AccountDateBack=o.AccountDate,this.AmountBack=o.Amount}},beforeDestroy:function(){g.Indicator.close()},methods:N()({clickClose:function(){this.$router.go(-1)},clickDelete:function(){var t=this;g.Indicator.open("删除中..."),T.deleteAccountRecord(this.Id).then(function(e){var n=e.data;n.IsSuccess?t.deleteAccountRecord({index1:t.$route.params.index1,index2:t.$route.params.index2}).then(function(){t.$router.go(-1)}):(g.Indicator.close(),Object(g.Toast)(n.Message))}).catch(function(){g.Indicator.close(),Object(g.Toast)("删除失败")})},saveRecord:function(){var t=this;if("0.00"!==this.Amount){var e={UserId:this.UserId,Type:this.Type,AccountTypeId:this.SelectedId,Amount:this.Amount,Remark:this.RemarkInfo,AccountDate:this.AccountDate};g.Indicator.open("保存中..."),0===this.Id?T.createAccountRecord(e).then(function(e){var n=e.data;n.IsSuccess?(n.Data.TypeCode=t.SelectedType,n.Data.TypeName=t.SelectedTypeName,t.addAccountRecord(n.Data).then(function(){t.$router.go(-1)})):(g.Indicator.close(),Object(g.Toast)(n.Message))}).catch(function(t){console.log(t),g.Indicator.close(),Object(g.Toast)("操作异常")}):T.updateAccountRecord(this.Id,e).then(function(n){var o=n.data;if(o.IsSuccess){e.Id=t.Id,e.TypeCode=t.SelectedType,e.TypeName=t.SelectedTypeName;var c={hasUpdateDate:t.AccountDateBack!==t.AccountDate,index1:t.$route.params.index1,index2:t.$route.params.index2,updateAmount:(parseFloat(t.Amount)-parseFloat(t.AmountBack)).toFixed(2)};t.updateAccountRecord({updateInfo:c,record:e}).then(function(){t.$router.go(-1)})}else g.Indicator.close(),Object(g.Toast)(o.Message)})}else Object(g.Toast)("请输入金额")},getAccountTypeList:function(){var t=this,e=JSON.parse(sessionStorage.getItem("account-types-expend")),n=JSON.parse(sessionStorage.getItem("account-types-income"));e&&n?(this.AccountIncomeTypeList=n,this.AccountExpendTypeList=e):T.getAccountTypes(this.UserId).then(function(e){var n=e.data;t.AccountIncomeTypeList=n.Data.filter(function(t){return 0==t.Type}),t.AccountExpendTypeList=n.Data.filter(function(t){return 1==t.Type}),sessionStorage.setItem("account-types-expend",H()(t.AccountExpendTypeList)),sessionStorage.setItem("account-types-income",H()(t.AccountIncomeTypeList))}).catch(function(t){console.error(t)})},selectAccountType:function(t){this.Type=t,this.SelectedType=0==this.Type?"shouru":"yiban",this.SelectedId=0==this.Type?1:4,this.SelectedTypeName="一般"},selectType:function(t,e,n){this.SelectedId=t,this.SelectedType=e,this.SelectedTypeName=n},getAccountDate:function(t){this.AccountDate=t},showAmount:function(t){this.Amount=t},showRemark:function(t){this.RemarkNotOpen=t},closeRemark:function(t){this.RemarkNotOpen=t},getRemarkInfo:function(t){this.RemarkInfo=t}},Object(r.b)({addAccountRecord:"addAccountRecord",updateAccountRecord:"updateAccountRecord",deleteAccountRecord:"deleteAccountRecord"})),computed:{IsIncome:function(){return 0==this.Type?" active":""},IsExpend:function(){return 1==this.Type?" active":""}},components:{Calculator:Y,Remark:q,Layout:M}},Q={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide-fade"}},[n("Layout",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.RemarkNotOpen,expression:"RemarkNotOpen"}],staticClass:"container"},[n("div",{staticClass:"row add-header"},[n("i",{staticClass:"title-back icon iconfont icon-fanhui",on:{click:t.clickClose}}),t._v(" "),void 0!==t.$route.params.index1&&void 0!==t.$route.params.index2?n("i",{staticClass:"title-delete icon iconfont icon-guanbi",on:{click:t.clickDelete}}):t._e(),t._v(" "),n("div",{class:"col-6 add-income"+t.IsIncome,on:{click:function(e){t.selectAccountType(0)}}},[t._v("收入")]),t._v(" "),n("div",{class:"col-6 add-expend"+t.IsExpend,on:{click:function(e){t.selectAccountType(1)}}},[t._v("支出")])]),t._v(" "),n("div",{staticClass:"row add-type"},[n("div",{staticClass:"col-2"},[n("i",{class:"selectedType icon iconfont icon-"+t.SelectedType})]),t._v(" "),n("div",{staticClass:"col-2 type-info"},[t._v("\r\n          "+t._s(t.SelectedTypeName)+"\r\n        ")]),t._v(" "),n("div",{staticClass:"col-8 type-amount"},[t._v("\r\n          "+t._s(t.Amount)+"\r\n        ")])]),t._v(" "),n("div",{staticClass:"row"},[t._l(t.AccountIncomeTypeList,function(e){return n("div",{directives:[{name:"show",rawName:"v-show",value:0==t.Type,expression:"Type==0"}],key:e.Code,staticClass:"col-2 type-icon-list-icon",on:{click:function(n){t.selectType(e.Id,e.Code,e.Name)}}},[n("i",{class:"icon iconfont icon-"+e.Code}),t._v(" "),n("p",[t._v(t._s(e.Name))])])}),t._v(" "),t._l(t.AccountExpendTypeList,function(e){return n("div",{directives:[{name:"show",rawName:"v-show",value:1==t.Type,expression:"Type==1"}],key:e.Code,staticClass:"col-2 type-icon-list-icon",on:{click:function(n){t.selectType(e.Id,e.Code,e.Name)}}},[n("i",{class:"icon iconfont icon-"+e.Code}),t._v(" "),n("p",[t._v(t._s(e.Name))])])})],2),t._v(" "),n("Calculator",{attrs:{Amount:t.Amount,RecordDate:t.AccountDate},on:{showAmount:t.showAmount,openRemark:t.showRemark,clickOk:t.saveRecord,setAccountDate:t.getAccountDate}})],1),t._v(" "),n("Remark",{directives:[{name:"show",rawName:"v-show",value:!t.RemarkNotOpen,expression:"!RemarkNotOpen"}],on:{closeRemark:t.closeRemark,setRemarkInfo:t.getRemarkInfo}})],1)],1)},staticRenderFns:[]};var J=n("VU/8")(K,Q,!1,function(t){n("h5eH")},"data-v-778de884",null).exports,W=n("fzgq"),X=n.n(W),Z={data:function(){return{IsSignUp:!1,IsRmeberUser:!1,SignInInfo:{UserId:"",Account:"",Password:""},SignUpInfo:{Account:"",Password:"",ConfirmPassword:""}}},beforeCreate:function(){var t=X()({width:window.innerWidth,height:window.innerHeight});document.body.style.background="url("+t.png()+")"},created:function(){this.SignInInfo.Account=localStorage.getItem("rk-account"),this.SignInInfo.Password=localStorage.getItem("rk-password"),this.SignInInfo.Account&&this.SignInInfo.Password&&this.SignInInfo.Account.length>0&&this.SignInInfo.Password.length>0&&(this.IsRmeberUser=!0)},beforeDestroy:function(){document.body.style.background="",g.Indicator.close()},methods:N()({switchSignUp:function(t){this.IsSignUp=t},signUpAccount:function(){var t=this;return p()(d.a.mark(function e(){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.IsSignUp){e.next=2;break}return e.abrupt("return");case 2:if(0!==t.SignUpInfo.Account.length){e.next=5;break}return Object(g.Toast)("请输入帐号"),e.abrupt("return");case 5:if(0!==t.SignUpInfo.Password.length){e.next=8;break}return Object(g.Toast)("请输入密码"),e.abrupt("return");case 8:if(t.SignUpInfo.Password==t.SignUpInfo.ConfirmPassword){e.next=11;break}return Object(g.Toast)("请输入相同密码"),e.abrupt("return");case 11:return g.Indicator.open({text:"正在注册, 请稍等..."}),e.next=14,t.signUp({Account:t.SignUpInfo.Account,Password:t.SignUpInfo.Password});case 14:t.$router.push("/Account/List");case 15:case"end":return e.stop()}},e,t)}))()},signInAccount:function(){var t=this;return p()(d.a.mark(function e(){var n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.IsSignUp){e.next=2;break}return e.abrupt("return");case 2:if(""!==t.SignInInfo.Account){e.next=5;break}return Object(g.Toast)("请输入帐号"),e.abrupt("return");case 5:if(""!==t.SignInInfo.Password){e.next=8;break}return Object(g.Toast)("请输入密码"),e.abrupt("return");case 8:return g.Indicator.open({text:"登录中..."}),n={grant_type:"password",client_id:"pwd_client",client_secret:"pwd_secret",scope:"rk offline_access",username:t.SignInInfo.Account,password:t.SignInInfo.Password},e.next=12,t.signIn({tokenRequest:n,account:t.SignInInfo.Account});case 12:t.IsRmeberUser?(localStorage.setItem("rk-account",t.SignInInfo.Account),localStorage.setItem("rk-password",t.SignInInfo.Password)):(localStorage.setItem("rk-account",""),localStorage.setItem("rk-password","")),t.$router.push("/Account/List");case 14:case"end":return e.stop()}},e,t)}))()}},Object(r.b)({signIn:"userSignIn",signUp:"userSignUp"}))},tt={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"wrapper mid"},[n("div",{staticClass:"container"},[n("transition",{attrs:{name:"flipOutY",mode:"out-in"}},[t.IsSignUp?t._e():n("div",{key:"signIn",staticClass:"signIn"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"account"}},[t._v("帐号：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.SignInInfo.Account,expression:"SignInInfo.Account"}],attrs:{type:"text",name:"account",id:"account",required:""},domProps:{value:t.SignInInfo.Account},on:{input:function(e){e.target.composing||t.$set(t.SignInInfo,"Account",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"password"}},[t._v("密码：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.SignInInfo.Password,expression:"SignInInfo.Password"}],attrs:{type:"password",name:"password",id:"password",required:""},domProps:{value:t.SignInInfo.Password},on:{input:function(e){e.target.composing||t.$set(t.SignInInfo,"Password",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"setting-group"},[n("span",{staticClass:"remember"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.IsRmeberUser,expression:"IsRmeberUser"}],attrs:{type:"checkbox",name:"remeberUser",id:"remeberUser"},domProps:{checked:Array.isArray(t.IsRmeberUser)?t._i(t.IsRmeberUser,null)>-1:t.IsRmeberUser},on:{change:function(e){var n=t.IsRmeberUser,o=e.target,c=!!o.checked;if(Array.isArray(n)){var a=t._i(n,null);o.checked?a<0&&(t.IsRmeberUser=n.concat([null])):a>-1&&(t.IsRmeberUser=n.slice(0,a).concat(n.slice(a+1)))}else t.IsRmeberUser=c}}}),t._v(" "),n("label",{staticClass:"remeberUser",attrs:{for:"remeberUser"}},[t._v("记住账号")])]),t._v(" "),n("span",{staticClass:"forgetPwd"},[t._v("忘记密码?")])]),t._v(" "),n("div",{staticClass:"btn-group"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btnSignUp",attrs:{type:"button"},on:{click:function(e){t.switchSignUp(!0)}}},[t._v("注册")])]),t._v(" "),n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btnSignIn",attrs:{type:"button"},on:{click:t.signInAccount}},[t._v("登录")])])])])]),t._v(" "),t.IsSignUp?n("div",{key:"signUp",staticClass:"signUp"},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"signUp-account"}},[t._v("帐号：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.SignUpInfo.Account,expression:"SignUpInfo.Account"}],attrs:{type:"text",name:"account",id:"signUp-account","min-length":"4",maxlength:"12"},domProps:{value:t.SignUpInfo.Account},on:{input:function(e){e.target.composing||t.$set(t.SignUpInfo,"Account",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"signUp-password"}},[t._v("密码：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.SignUpInfo.Password,expression:"SignUpInfo.Password"}],attrs:{type:"password",name:"signUp-password",id:"signUp-password",minlength:"6",maxlength:"12"},domProps:{value:t.SignUpInfo.Password},on:{input:function(e){e.target.composing||t.$set(t.SignUpInfo,"Password",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"confirm-password"}},[t._v("确认密码：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.SignUpInfo.ConfirmPassword,expression:"SignUpInfo.ConfirmPassword"}],attrs:{type:"password",name:"confirm-password",id:"confirm-password",minlength:"6",maxlength:"12"},domProps:{value:t.SignUpInfo.ConfirmPassword},on:{input:function(e){e.target.composing||t.$set(t.SignUpInfo,"ConfirmPassword",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"btn-group"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btnSignUp",attrs:{type:"button"},on:{click:t.signUpAccount}},[t._v("注册")])]),t._v(" "),n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btnSignIn",attrs:{type:"button"},on:{click:function(e){t.switchSignUp(!1)}}},[t._v("返回")])])])])]):t._e()])],1)])])},staticRenderFns:[]};var et=n("VU/8")(Z,tt,!1,function(t){n("xVyQ")},"data-v-599b4118",null).exports;c.default.use(i.a);var nt=new i.a({routes:[{path:"",alias:"/Login",component:et},{path:"/Account/List",name:"accountList",component:$},{path:"/Account/Add",name:"addAccount",component:J}],scrollBehavior:function(t,e,n){return n||{x:0,y:0}}});nt.beforeEach(function(t,e,n){E.commit("SET_ROUTER_LOG",{prev:e.path.toLowerCase(),next:t.path.toLowerCase()}),"/"==e.path&&"/Login"===e.path||n(),E.state.user.isLogin?n():n({path:"/Login"})});var ot=nt,ct=n("v5o6"),at=n.n(ct);n("d8/S"),n("2bHb"),n("VaBq");c.default.use(g.InfiniteScroll),c.default.component(g.Spinner.name,g.Spinner),c.default.component(g.DatetimePicker.name,g.DatetimePicker),c.default.config.productionTip=!1,at.a.attach(document.body),new c.default({el:"#app",router:ot,store:E,template:"<App/>",components:{App:s}})},QBx0:function(t,e){},ToP3:function(t,e){},VaBq:function(t,e){},"d8/S":function(t,e){},h5eH:function(t,e){},nA4K:function(t,e){},r2Dd:function(t,e){},xVyQ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.e5e2b0433e7b5096d23d.js.map