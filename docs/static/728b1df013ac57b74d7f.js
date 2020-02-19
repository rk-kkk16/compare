(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{159:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,"a",(function(){return r}))},160:function(e,t,n){"use strict";function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n.d(t,"a",(function(){return o}))},161:function(e,t,n){"use strict";function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.d(t,"a",(function(){return r}))},162:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));n(14),n(23);var r=n(3),o=n(159),c=n(160),f=function(){function e(t,n,r){Object(o.a)(this,e),this.dbName=t,this.storeName=n,this.keyName=r}var t,n,f;return Object(c.a)(e,[{key:"getTransaction",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"readwrite";return this.db.transaction(e,t)}},{key:"getStore",value:function(){return this.getTransaction([this.storeName]).objectStore(this.storeName)}},{key:"add",value:function(data){this.getStore().add(data).onsuccess=function(){console.log("save success.")}}},{key:"remove",value:function(e){console.log(e),this.getStore().delete(e).onsuccess=function(){console.log("delete success.")}}},{key:"update",value:function(e,data){data[this.keyName]=e,this.getStore().put(data).onsuccess=function(){console.log("update success.")}}},{key:"get",value:(f=Object(r.a)(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var o=n.getStore().get(t);o.onsuccess=function(){var t=o.result;e(t)},o.onerror=r})));case 1:case"end":return e.stop()}}),e)}))),function(e){return f.apply(this,arguments)})},{key:"getCount",value:(n=Object(r.a)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r=t.getStore().count();r.onsuccess=function(){e(r.result)}})));case 1:case"end":return e.stop()}}),e)}))),function(){return n.apply(this,arguments)})},{key:"getAll",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r=[];t.getStore().openCursor().onsuccess=function(t){var cursor=t.target.result;if(cursor){var n=cursor.value;r.push(n),cursor.continue()}e(r)}})));case 1:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})}],[{key:"DB_NAME",get:function(){return this.dbName}},{key:"STORE_NAME",get:function(){return this.storeName}}]),e}()},163:function(e,t,n){"use strict";var r=n(29);function o(e,t){return!t||"object"!==Object(r.a)(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}n.d(t,"a",(function(){return o}))},164:function(e,t,n){"use strict";function r(e,p){return(r=Object.setPrototypeOf||function(e,p){return e.__proto__=p,e})(e,p)}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}n.d(t,"a",(function(){return o}))},165:function(e,t,n){"use strict";n(14),n(23);var r=n(3),o=n(159),c=n(160),f=n(163),m=n(161),d=n(164),l=function(e){function t(){return Object(o.a)(this,t),Object(f.a)(this,Object(m.a)(t).call(this,"PriceDB","price","idx_key"))}var n,l,h;return Object(d.a)(t,e),Object(c.a)(t,[{key:"connect",value:(h=Object(r.a)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){if(t.db)e(t);else{var r=indexedDB.open(t.dbName);r.onupgradeneeded=function(e){var n=e.target.result.createObjectStore(t.storeName,{keyPath:t.keyName});n.createIndex("item_id","item_id",{unique:!1}),n.createIndex("shop_id","shop_id",{unique:!1})},r.onsuccess=function(n){t.db=n.target.result,e(t)}}})));case 1:case"end":return e.stop()}}),e)}))),function(){return h.apply(this,arguments)})},{key:"genIdxKey",value:function(e,t){return e+";"+t}},{key:"save",value:function(e,t,n){var data={idx_key:this.genIdxKey(e,t),item_id:e,shop_id:t,price:n,updated:Math.floor((new Date).getTime()/1e3)};this.getStore().put(data).onsuccess=function(){console.log("price save success.")}}},{key:"getByItemId",value:(l=Object(r.a)(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var o=[],c=n.getStore(),f=IDBKeyRange.only(t),m=c.index("item_id").openCursor(f,"next");m.onsuccess=function(){var cursor=m.result;if(cursor){var t=cursor.value;o.push(t),cursor.continue()}e(o)}})));case 1:case"end":return e.stop()}}),e)}))),function(e){return l.apply(this,arguments)})},{key:"getByShopId",value:(n=Object(r.a)(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var o=[],c=n.getStore(),f=IDBKeyRange.only(t),m=c.index("shop_id").openCursor(f,"next");m.onsuccess=function(){var cursor=m.result;if(cursor){var t=cursor.value;o.push(t),cursor.continue()}e(o)}})));case 1:case"end":return e.stop()}}),e)}))),function(e){return n.apply(this,arguments)})}]),t}(n(162).a);t.a=new l},167:function(e,t,n){"use strict";n(14),n(23);var r=n(3),o=n(159),c=n(160),f=n(163),m=n(161),d=n(164),l=function(e){function t(){return Object(o.a)(this,t),Object(f.a)(this,Object(m.a)(t).call(this,"ItemDB","item","item_id"))}var n,l,h;return Object(d.a)(t,e),Object(c.a)(t,[{key:"connect",value:(h=Object(r.a)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){if(t.db)e(t);else{var r=indexedDB.open(t.dbName);r.onupgradeneeded=function(e){e.target.result.createObjectStore(t.storeName,{keyPath:t.keyName,autoIncrement:!0}).createIndex("parent_id","parent_id",{unique:!1})},r.onsuccess=function(n){t.db=n.target.result,e(t)}}})));case 1:case"end":return e.stop()}}),e)}))),function(){return h.apply(this,arguments)})},{key:"getChilds",value:(l=Object(r.a)(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var o=[],c=n.getStore(),f=IDBKeyRange.only(t),m=c.index("parent_id").openCursor(f,"next");m.onsuccess=function(){var cursor=m.result;if(cursor){var t=cursor.value;o.push(t),cursor.continue()}e(o)}})));case 1:case"end":return e.stop()}}),e)}))),function(e){return l.apply(this,arguments)})},{key:"getLatestItem",value:(n=Object(r.a)(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var o=null,c=n.getStore(),f=IDBKeyRange.only(t),m=c.index("parent_id").openCursor(f,"prev");m.onsuccess=function(){var cursor=m.result;cursor&&(o=cursor.value),e(o)}})));case 1:case"end":return e.stop()}}),e)}))),function(e){return n.apply(this,arguments)})}]),t}(n(162).a);t.a=new l},170:function(e,t,n){"use strict";n.r(t);var r=n(55),o=(n(23),n(3)),c=n(167),f=n(165),m={asyncData:function(e){return Object(o.a)(regeneratorRuntime.mark((function e(){var t,n,r,o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.connect();case 2:return t=e.sent,e.next=5,t.getChilds(0);case 5:n=e.sent,r={},o={},i=0;case 9:if(!(i<n.length)){e.next=17;break}return e.next=12,t.getChilds(n[i].item_id);case 12:r[n[i].item_id]=e.sent,o[n[i].item_id]="none";case 14:i++,e.next=9;break;case 17:return e.abrupt("return",{items:n,subitems:r,subitem_visis:o});case 18:case"end":return e.stop()}}),e)})))()},methods:{delSubConfirm:function(e,t,n){var r,m=this;this.$buefy.dialog.confirm({title:"サブ品目の削除",message:t+" を削除します。\n※この品目に関連する価格登録も削除されます。",confirmText:"OK",type:"is-danger",hasIcon:!0,props:{item_id:e,parent_id:n},onConfirm:(r=Object(o.a)(regeneratorRuntime.mark((function e(){var t,n,r,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.connect();case 2:return(t=e.sent).remove(this.props.item_id),e.next=6,t.getChilds(this.props.parent_id);case 6:return m.subitems[this.props.parent_id]=e.sent,0==m.subitems[this.props.parent_id].length&&(m.subitem_visis[this.props.parent_id]="none"),m.$buefy.toast.open("削除しました。"),e.next=11,f.a.connect();case 11:return n=e.sent,e.next=14,n.getByItemId(this.props.item_id);case 14:for(r=e.sent,i=0;i<r.length;i++)n.remove(r[i].idx_key);case 16:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})})},delConfirm:function(e,t){var n,r=this;this.$buefy.dialog.confirm({title:"品目の削除",message:t+" を削除します。\n※ この品目に関連する価格登録も削除されます。(サブ品目も含まれます)",confirmText:"OK",type:"is-danger",hasIcon:!0,props:{item_id:e},onConfirm:(n=Object(o.a)(regeneratorRuntime.mark((function e(){var t,n,o,i,m,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.connect();case 2:return(t=e.sent).remove(this.props.item_id),e.next=6,t.getChilds(0);case 6:return r.items=e.sent,delete r.subitems[this.props.item_id],delete r.subitem_visis[this.props.item_id],r.$buefy.toast.open("削除しました。"),e.next=12,f.a.connect();case 12:return n=e.sent,e.next=15,n.getByItemId(this.props.item_id);case 15:for(o=e.sent,i=0;i<o.length;i++)n.remove(o[i].idx_key);return e.next=19,t.getChilds(this.props.item_id);case 19:m=e.sent,i=0;case 21:if(!(i<m.length)){e.next=30;break}return t.remove(m[i].item_id),e.next=25,n.getByItemId(m[i].item_id);case 25:for(o=e.sent,d=0;d<o.length;d++)n.remove(o[d].idx_key);case 27:i++,e.next=21;break;case 30:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})})},openEditDialog:function(e,t,n){var f,m,d=this;this.$buefy.dialog.prompt({title:t+" の品目名変更",message:"新しい品目名(※ 空欄不可)",inputAttrs:{},props:(f={item_id:e},Object(r.a)(f,"item_id",e),Object(r.a)(f,"parent_id",n),f),trapFocus:!0,onConfirm:(m=Object(o.a)(regeneratorRuntime.mark((function e(t){var i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return d.$buefy.toast.open("品目名を入力してください。"),e.abrupt("return");case 3:return e.next=5,c.a.connect();case 5:if(e.sent.update(this.props.item_id,{item_name:t}),d.$buefy.toast.open("品目名を変更しました。"),!(this.props.parent_id>0)){e.next=19;break}i=0;case 10:if(!(i<d.subitems[this.props.parent_id].length)){e.next=17;break}if(d.subitems[this.props.parent_id][i].item_id!=this.props.item_id){e.next=14;break}return d.subitems[this.props.parent_id][i].item_name=t,e.abrupt("break",17);case 14:i++,e.next=10;break;case 17:e.next=27;break;case 19:i=0;case 20:if(!(i<d.items.length)){e.next=27;break}if(d.items[i].item_id!=this.props.item_id){e.next=24;break}return d.items[i].item_name=t,e.abrupt("break",27);case 24:i++,e.next=20;break;case 27:case"end":return e.stop()}}),e,this)}))),function(e){return m.apply(this,arguments)})})}}},d=n(24),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("h2",[e._v("品目管理")]),e._v(" "),n("hr"),e._v(" "),n("table",{staticClass:"table is-mobile",staticStyle:{width:"100%"}},[e._m(0),e._v(" "),e.items.length>0?n("tbody",[e._l(e.items,(function(t){return[n("tr",[n("td",[e._v(e._s(t.item_name))]),e._v(" "),n("td",{staticStyle:{width:"3em"}},[e.subitems[t.item_id]&&e.subitems[t.item_id].length>0?["none"==e.subitem_visis[t.item_id]?n("button",{on:{click:function(n){e.subitem_visis[t.item_id]=""}}},[e._v("▼")]):n("button",{on:{click:function(n){e.subitem_visis[t.item_id]="none"}}},[e._v("▲")])]:e._e()],2),e._v(" "),n("td",{staticStyle:{width:"4.5em"}},[n("button",{on:{click:function(n){return e.openEditDialog(t.item_id,t.item_name,0)}}},[e._v("編集")])]),e._v(" "),n("td",{staticStyle:{width:"4.5em"}},[n("button",{on:{click:function(n){return e.delConfirm(t.item_id,t.item_name)}}},[e._v("削除")])])]),e._v(" "),e.subitems[t.item_id]&&e.subitems[t.item_id].length>0?e._l(e.subitems[t.item_id],(function(r){return n("tr",{style:{display:e.subitem_visis[t.item_id]}},[n("td",{staticStyle:{"padding-left":"4em"},attrs:{colspan:"2"}},[e._v(e._s(r.item_name))]),e._v(" "),n("td",[n("button",{on:{click:function(t){return e.openEditDialog(r.item_id,r.item_name,r.parent_id)}}},[e._v("編集")])]),e._v(" "),n("td",[n("button",{on:{click:function(t){return e.delSubConfirm(r.item_id,r.item_name,r.parent_id)}}},[e._v("削除")])])])})):e._e()]}))],2):n("tbody",[e._m(1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",[this._v("品目")]),t("th",{attrs:{colspan:"3"}})])])},function(){var e=this.$createElement,t=this._self._c||e;return t("tr",[t("td",{attrs:{colspan:"4"}},[this._v("品目の登録がありません。")])])}],!1,null,null,null);t.default=component.exports}}]);