(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=t(2),l=function(e){var n=e.eventHandler,t=e.value;return r.a.createElement("p",null,"Filter Contacts: ",r.a.createElement("input",{onChange:n,value:t}))},i=function(e){var n=e.contactNameHandler,t=e.contactNumberHandler,a=e.submitHandler,c=e.defaultName,o=e.defaultNumber;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:n,value:c}),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{onChange:t,value:o}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:a},"add")))},m=function(e){var n=e.data,t=e.filterString,a=e.deleteClickHandler;return r.a.createElement("div",null,""===t.trim()?function(e){return e.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.phone," ",r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))}))}(n):function(e,n){return e.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.phone," ",r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))}))}(n,t))},f=t(3),d=t.n(f),s="/api/persons",b=function(){return d.a.get(s).then((function(e){return e.data}))},h=function(e){return d.a.post(s,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},E=function(e,n){return d.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.messageType;return null===n?null:r.a.createElement("div",{className:t},n)},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),f=Object(u.a)(o,2),d=f[0],s=f[1],g=Object(a.useState)(""),j=Object(u.a)(g,2),k=j[0],O=j[1],w=Object(a.useState)(""),C=Object(u.a)(w,2),H=C[0],N=C[1],y=Object(a.useState)(null),S=Object(u.a)(y,2),T=S[0],x=S[1],A=Object(a.useState)(null),D=Object(u.a)(A,2),J=D[0],L=D[1],P=function(e,n){x(e),L(n),setTimeout((function(){x(null),L(null)}),5e3)};Object(a.useEffect)((function(){console.log("effect"),b().then((function(e){console.log("promise fulfilled"),c(e)})).catch((function(e){console.log(e),P("Error: ".concat(e),"error")}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:T,messageType:J}),r.a.createElement(l,{eventHandler:function(e){N(e.target.value)},value:H}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(i,{contactNameHandler:function(e){s(e.target.value)},contactNumberHandler:function(e){O(e.target.value)},submitHandler:function(e){e.preventDefault();var n={name:d,phone:k},a=t.filter((function(e){return e.name===n.name}));0===a.length?h(n).then((function(e){c(t.concat(e)),s(""),O(""),P("Added ".concat(e.name),"success")})).catch((function(e){console.log(e),P("Error: ".concat(e),"error")})):window.confirm(alert("".concat(d," already exists in the Phonebook, replace the old number with new one?")))&&E(a[0].id,n).then((function(e){var n=t.map((function(n){return n.id===e.id?e:n}));c(n),s(""),O(""),P("Updated ".concat(e.name),"success")})).catch((function(e){console.log(e),P("Error: ".concat(e),"error")}))},defaultName:d,defaultNumber:k}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{data:t,filterString:H,deleteClickHandler:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to delete ".concat(n.name))&&p(e).then((function(n){var a=t.filter((function(n){return n.id!==e}));c(a),s(""),O("")})).catch((function(e){console.log(e),P("Error: ".concat(e),"error")}))}}))};t(36);o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.d9d15995.chunk.js.map