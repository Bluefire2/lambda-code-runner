(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,a){},40:function(e,t,a){e.exports=a.p+"static/media/red_robot_128.168b46bf.svg"},41:function(e,t,a){e.exports=a.p+"static/media/blue_robot_128.74e0a7af.svg"},44:function(e,t,a){e.exports=a(81)},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},79:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(18),o=a.n(i),s=a(8),l=a(1),c=a(35),u=a(36),m=a(7),d=a(43),h=a(42),v=a(37),p={TAKE:"Take",MOVE:"Move",SPAWN:"Spawn"},b={N:"N",NE:"NE",NW:"NW",S:"S",SE:"SE",SW:"SW",E:"E",W:"W"},f={BASE:"B",WALL:"W",PATH:"P",GOLD:"G",WORM:"Worm"},g=function(e){return e+"_FULFILLED"},y=function(e,t,a){return e<=a&&a<=t},E=function(e){return String.fromCharCode.apply(null,new Uint16Array(e))},O=function(e,t,a){return Object(v.a)(e,function(e){var n=t.command,r=t.team,i=t.handle;switch(n){case p.MOVE:var o=t.direction,s=e.robots.find(function(e){return e.handle===i}),l=w(o),c=Object(m.a)(l,2),u=c[0],d=c[1],v=Object(m.a)(s.xy,2),b=v[0],g=v[1],E=e.map[g][b];if(!a){var O=[-u,-d];u=O[0],d=O[1]}y(0,e.width-1,b+u)&&y(0,e.height,g+d)&&(s.xy=[b+u,g+d]);var x=e.map[s.xy[1]][s.xy[0]];if(a)if(x.type===f.WORM)s.wormHistory.push(s.xy),s.xy=x.out;else if(x.type===f.BASE){var N=x.team;e.teams[N]+=s.gold,s.lastDeposit.push(s.gold),s.gold=0,s.wormHistory.push([-1,-1])}else s.wormHistory.push([-1,-1]);else{var j=s.wormHistory.pop();if(-1!==j[0]&&-1!==j[1])s.xy=[j[0]+u][j[-1]+d];else if(E===f.BASE){var S=s.lastDeposit.pop();void 0!==S?(e.teams[E.team]-=S,s.gold+=S):console.log("stepping back with undefined last deposit")}}break;case p.TAKE:var k=t.direction,C=t.amount,A=e.robots.find(function(e){return e.handle===i}),B=Object(m.a)(A.xy,2),M=B[0],_=B[1],W=w(k),T=Object(m.a)(W,2),G=T[0],L=T[1],P=e.map[_+L][M+G];P.type===f.GOLD&&(a?C>0&&(P.amount-=C,A.gold+=C):(P.amount+=C,A.gold-=C));break;case p.SPAWN:e.robots=a?[].concat(Object(h.a)(e.robots),[{handle:i,team:r,xy:e.bases[r],gold:0,lastDeposit:[],wormHistory:[]}]):e.robots.filter(function(e){return e.handle!==i})}})},w=function(e){switch(e){case b.N:return[0,-1];case b.NE:return[1,-1];case b.NW:return[-1,-1];case b.S:return[0,1];case b.SE:return[1,1];case b.SW:return[-1,1];case b.E:return[1,0];case b.W:return[-1,0];default:return[0,0]}},x="SMOVE",N="MOVE",j="LOAD_FILE";function S(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return{type:x,payload:{next:e}}}function k(e){var t=new Promise(function(t,a){var n=new FileReader;n.onloadend=function(){var e=n.result instanceof ArrayBuffer?E(n.result):n.result;t(JSON.parse(e))},n.onerror=function(){return a()},n.readAsBinaryString(e)});return{type:j,payload:t}}var C={},A=function(e){for(var t={},a=(e.length,e[0].length,0);a<e.length;a++)for(var n=e[a],r=0;r<n.length;r++){var i=n[r];i.type===f.BASE&&(t[i.team]=[r,a])}return t},B=function(e,t,a){for(var n=[],r=0,i=0,o=0;o<e.length;o++)void 0===n[r]&&(n[r]=[]),n[r][i]=e[o],r<t-1?r++:(i++,r=0);return n},M=Object(l.combineReducers)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g(j):var a=t.payload,n=a.map,r=a.width,i=a.height,o=a.teams,s=a.max_gold,l=a.max_bots,c=a.moves,u=B(n,i,r),m=A(u),h={};return o.forEach(function(e){return h[e]=0}),{map:u,maxGold:s,maxBots:l,width:r,height:i,teams:h,teamNames:o,bases:m,robots:[],moves:c,nextMove:0};case N:var v=t.payload,p=v.forward,b=v.move;return O(e,b,p);case x:var f=t.payload.next,y=e.moves,E=e.nextMove,w=f?y[E]:y[E-1],S=Object(d.a)({},e,{moves:e.moves,nextMove:f?E+1:E-1});return O(S,w,f);default:return e}},initialized:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];switch((arguments.length>1?arguments[1]:void 0).type){case g(j):return!0;default:return e}}}),_=(a(52),a(2)),W=a(3),T=a(5),G=a(4),L=a(6),P=(a(53),a(14)),I=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(T.a)(this,Object(G.a)(t).call(this,e))).onChange=a.onChange.bind(Object(P.a)(Object(P.a)(a))),a}return Object(L.a)(t,e),Object(W.a)(t,[{key:"onChange",value:function(e){var t=this.props.onChange;t(e.target.files[0])}},{key:"render",value:function(){var e=this.props,t=e.label,a=e.types;return r.a.createElement("div",null,r.a.createElement("div",{id:"section-head"},t),r.a.createElement("div",null,r.a.createElement("input",{type:"file",accept:a,onChange:this.onChange})))}}]),t}(n.Component),R=(a(54),function(e){function t(){return Object(_.a)(this,t),Object(T.a)(this,Object(G.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(W.a)(t,[{key:"render",value:function(){var e=this.props,t=e.teamNames,a=e.teams,n=e.maxGold,i=e.moves,o=e.nextMove,s=r.a.createElement(I,{className:"header-item",label:"Import",types:".json",onChange:this.props.loadFile});return void 0===t?r.a.createElement("div",{id:"header-container"},s):r.a.createElement("div",{id:"header-container"},s,r.a.createElement("div",{className:"header-item",id:"Score"},r.a.createElement("div",{className:"section-head",key:-1},"Scores"),Object.keys(a).map(function(e,t){return r.a.createElement("div",{className:"score-item",key:t},"Team ",e,": ",a[e])})),r.a.createElement("div",{className:"header-item",id:"MovesLeft"},r.a.createElement("div",{className:"section-head",key:"gold"},"Gold Cap: ",n),r.a.createElement("div",{className:"section-head",key:"move-head"},"Moves: ",o," / ",i.length)))}}]),t}(n.Component)),D=Object(s.b)(function(e){var t=e.board,a=t.teamNames,n=t.maxGold,r=t.maxBots;return{teamNames:a,teams:t.teams,robots:t.robots,maxGold:n,maxBots:r,moves:t.moves,nextMove:t.nextMove}},function(e){return Object(l.bindActionCreators)({loadFile:k},e)})(R),H=a(38),J=a.n(H),F=(a(78),a(9)),V=a.n(F),z=(a(79),a(39)),U=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(T.a)(this,Object(G.a)(t).call(this,e))).showEditor=function(){a.setState({show:!a.state.show})},a.changeParams=function(e,t){if(t>0)if("width"===e){var n=a.initCells(t,a.state.height);a.setState({width:t,cells:n,grid:a.initGrids(t,a.state.height),lastgrid:a.initGrids(t,a.state.height)}),a.forceUpdate()}else if("height"===e){var r=a.initCells(a.state.width,t);a.setState({height:t,cells:r,grid:a.initGrids(a.state.width,t),lastgrid:a.initGrids(a.state.width,t)}),a.forceUpdate()}else"vision"===e?a.setState({vision:t}):"max_gold"===e?a.setState({max_gold:t}):"max_bots"===e?a.setState({max_bots:t}):"end_goal"===e&&a.setState({end_goal:t})},a.updateEditResult=function(e,t,n){var r=a.state.grid,i=e[0],o=e[1];if("cost"===t)r[o][i]={type:f.PATH,cost:n};else if("amount"===t&&n<10&&n>0)r[o][i]={type:f.GOLD,amount:n};else if("x"===t){var s=r[o][i].out[1];r[o][i]={type:f.WORM,out:[n,s]}}else if("y"===t){var l=r[o][i].out[0];r[o][i]={type:f.WORM,out:[l,n]}}a.setState({grid:r})},a.generateEditItem=function(){var e=a.state.editTile,t="";if(null!==e&&void 0!==e&&a.inBounds(e)){var n=a.state.grid[e[1]][e[0]];n.type===f.GOLD?t=r.a.createElement("div",{className:"edit-item"},r.a.createElement("div",{className:"edit-item-label"},"Amount: "),r.a.createElement("input",{key:1,type:"number",value:a.state.grid[e[1]][e[0]].amount,onChange:function(t){return a.updateEditResult(e,"amount",Number(t.target.value))}})):n.type===f.WORM&&(t=r.a.createElement("div",{className:"edit-item"},r.a.createElement("div",{className:"edit-item-label"},"To Position X: "),r.a.createElement("input",{type:"number",key:2,value:a.state.grid[e[1]][e[0]].out[0],onChange:function(t){return a.updateEditResult(e,"x",Number(t.target.value))}}),r.a.createElement("div",{className:"edit-item-label"},"Y: "),r.a.createElement("input",{type:"number",key:3,value:a.state.grid[e[1]][e[0]].out[1],onChange:function(t){return a.updateEditResult(e,"y",Number(t.target.value))}}),r.a.createElement("p",null,"Note: Bottom left grid is (0,0)"),r.a.createElement("p",null,"Out position must be a Path.")))}return t},a.reset=function(){var e=a.initCells(a.state.width,a.state.height),t=a.state.grid.map(function(e){return e.slice(0)});a.setState({cells:e,lastgrid:t})},a.changeSelectedItem=function(e){a.reset(),a.setState({selectedItem:e,editTile:null})},a.generateToolBox=function(){for(var e=[],t=["path","wall","base-red","base-blue","worm","gold","edit","done"],n=function(n){var i=t[n];e.push(r.a.createElement("div",{key:n,className:V()(i,"tool-item",a.state.selectedItem===t[n]?"selected":"not-selected"),onClick:function(e){return a.changeSelectedItem(i)}}))},i=0;i<t.length;i++)n(i);return e},a.getDifference=function(e,t){for(var n=a.initCells(a.state.width,a.state.height),r=0;r<a.state.height;r++)for(var i=0;i<a.state.width;i++)if(e[r][i]!==t[r][i]){n[r][i]=!0;break}return n},a.updateGrid=function(e){var t=a.state.grid;"edit"===a.state.selectedItem&&(e=a.getDifference(e,a.state.cells));for(var n=0;n<e.length;n++)for(var r=0;r<e[n].length;r++)!0===e[n][r]?"path"===a.state.selectedItem?t[n][r]={type:f.PATH,cost:10}:"wall"===a.state.selectedItem?t[n][r]={type:f.WALL}:"base-red"===a.state.selectedItem?t[n][r]={type:f.BASE,team:"Red"}:"base-blue"===a.state.selectedItem?t[n][r]={type:f.BASE,team:"Blue"}:"worm"===a.state.selectedItem?t[n][r]={type:f.WORM,out:[0,0]}:"gold"===a.state.selectedItem?t[n][r]={type:f.GOLD,amount:9}:"edit"===a.state.selectedItem?a.setState({editTile:[r,n]}):"done"===a.state.selectedItem&&a.setState({editTile:null,selectedItem:null}):t[n][r]=a.state.lastgrid[n][r];a.setState({cells:e,grid:t})},a.export=function(){for(var e=[],t=0,n=0,r=0;r<a.state.width;r++)for(var i=0;i<a.state.height;i++){var o=a.state.grid[i][r];e.push(a.tileToJson(o)),o.type===f.BASE&&("Red"===o.team?t+=1:"Blue"===o.team&&(n+=1))}if(1!==t||1!==n)return console.log(t,n),void alert("Each team must have exactly one homebase.");var s={width:a.state.width,height:a.state.height,max_gold:a.state.max_gold,max_bots:a.state.max_bots,end_goal:a.state.end_goal,teams:["Blue","Red"],vision:2,map:e,moves:[]},l=new Blob([JSON.stringify(s)],{type:"application/json",name:"map.json"});Object(z.saveAs)(l,"map.json")},a.state={width:30,height:5,cells:a.initCells(30,5),selectedItem:"gold",grid:a.initGrids(30,5),lastgrid:a.initGrids(30,5),editTile:null,max_gold:10,max_bots:4,vision:2,show:!1,end_goal:100},a}return Object(L.a)(t,e),Object(W.a)(t,[{key:"inBounds",value:function(e){return e[0]>=0&&e[0]<this.state.width&&e[1]>=0&&e[1]<this.state.height}},{key:"initCells",value:function(e,t){for(var a=[],n=0;n<t;n++){for(var r=[],i=0;i<e;i++)r.push(!1);a.push(r)}return a}},{key:"initGrids",value:function(e,t){for(var a=[],n=0;n<t;n++){for(var r=[],i=0;i<e;i++)r.push({type:f.PATH,cost:10});a.push(r)}return a}},{key:"generateTable",value:function(e){for(var t=e[0].length,a=e.length,n=[],i=0;i<a;i++){for(var o=[],s=0;s<t;s++){var l=s,c=i,u=this.state.grid[c][l];u.type===f.PATH?o.push(r.a.createElement("td",{className:V()("grid","path"),key:l+"|"+c})):u.type===f.WALL?o.push(r.a.createElement("td",{className:V()("grid","wall"),key:l+"|"+c})):u.type===f.GOLD?o.push(r.a.createElement("td",{className:V()("grid","gold"),key:l+"|"+c},this.state.grid[c][l].amount)):u.type===f.WORM?o.push(r.a.createElement("td",{className:V()("grid","worm"),key:l+"|"+c})):u.type===f.BASE&&o.push(r.a.createElement("td",{className:V()("grid","Blue"===u.team?"base-blue":"base-red"),key:l+"|"+c}))}n.push(r.a.createElement("tr",{key:i},o))}return n}},{key:"tileToJson",value:function(e){return e.type===f.WORM?{type:e.Type,out:[e.out[0],this.state.height-e.out[1]-1]}:e.type===f.PATH?{type:e.type,cost:e.cost}:e.type===f.GOLD?{type:e.type,amount:e.amount}:e.type===f.WALL?{type:e.type}:e.type===f.BASE?{type:e.type,team:e.team}:void 0}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"editorContainer"},r.a.createElement("div",{id:"editContainerContent",className:this.state.show?"editorContent":"disabled"},r.a.createElement("div",{id:"editorHeader"},r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"Width: "),r.a.createElement("input",{type:"number",name:"width",value:this.state.width,onChange:function(t){return e.changeParams("width",Number(t.target.value))}})),r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"Height: "),r.a.createElement("input",{type:"number",name:"height",value:this.state.height,onChange:function(t){return e.changeParams("height",Number(t.target.value))}})),r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"Vision: "),r.a.createElement("input",{type:"number",name:"vision",value:this.state.vision,onChange:function(t){return e.changeParams("vision",Number(t.target.value))}})),r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"Gold Cap: "),r.a.createElement("input",{type:"number",name:"max_gold",value:this.state.max_gold,onChange:function(t){return e.changeParams("max_gold",Number(t.target.value))}})),r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"Bot Cap: "),r.a.createElement("input",{type:"number",name:"max_bots",value:this.state.max_bots,onChange:function(t){return e.changeParams("max_bots",Number(t.target.value))}})),r.a.createElement("div",{className:"input-item"},r.a.createElement("div",{className:"label"},"End Goal: "),r.a.createElement("input",{type:"number",name:"end_goal",value:this.state.end_goal,onChange:function(t){return e.changeParams("end_goal",Number(t.target.value))}}))),r.a.createElement(J.a,{value:this.state.cells,onChange:function(t){return e.updateGrid(t)}},this.generateTable(this.state.cells)),r.a.createElement("br",null),r.a.createElement("div",{id:"toolBox"},r.a.createElement("div",{className:"label"},"Tools: "),this.generateToolBox()),r.a.createElement("br",null),r.a.createElement("div",{id:"editorBox",className:null===this.state.editTile?"disabled":"not-disabled"},r.a.createElement("div",{className:"label"},"Edit: "),this.generateEditItem()),r.a.createElement("br",null),r.a.createElement("div",{id:"export"},r.a.createElement("button",{onClick:function(t){return e.export()}},"Export"))),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(t){return e.showEditor()}},this.state.show?"Hide Editor":"Show Editor"))}}]),t}(n.Component),q=(a(33),a(40)),K=a.n(q),X=a(41),Y=a.n(X),$=function(e){var t=e.tile,a=e.robots,n={},i=t.type;i===f.BASE&&(n.border="1px solid ".concat(t.team.toLowerCase()));var o="";i===f.GOLD&&(0===t.amount?(t={type:f.PATH,cost:10},i=f.PATH):o=t.amount),i===f.PATH&&(o=t.cost);var s=a.map(function(e){var t=e.team,a=e.handle;return"Red"===t?r.a.createElement("img",{key:"red"+a,className:"bot-img",src:K.a,alt:"RBot"}):"Blue"===t?r.a.createElement("img",{key:"blue"+a,className:"bot-img",src:Y.a,alt:"BBot"}):null}),l="path";return i===f.GOLD?l="gold":i===f.BASE?l="base":i===f.WORM?l="worm":i===f.WALL&&(l="wall"),r.a.createElement("div",{style:n,className:"map-tile ".concat(l)},o,s)},Q=function(e){for(var t=e.tiles,a=e.robots,n=e.y,i=Array(t.length),o=0;o<t.length;o++)i[o]=[];return a.forEach(function(e){var t=Object(m.a)(e.xy,1)[0];i[t].push(e)}),r.a.createElement("div",{className:"map-row"},t.map(function(e,t){return r.a.createElement($,{key:t,tile:e,robots:i[t],x:t,y:n})}))},Z=function(e){function t(){return Object(_.a)(this,t),Object(T.a)(this,Object(G.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(W.a)(t,[{key:"render",value:function(){var e=this.props,t=e.map,a=(e.width,e.height),n=(e.teams,e.bases,e.robots);if(null==t)return r.a.createElement("div",{id:"map-container"});for(var i=Array(a),o=0;o<a;o++)i[o]=[];n.forEach(function(e){var t=Object(m.a)(e.xy,2)[1];i[t].push(e)});var s=t.map(function(e,t){return r.a.createElement(Q,{tiles:e,key:t,robots:i[t],y:t})});return r.a.createElement("div",{id:"map-container"},s)}}]),t}(n.Component),ee=Object(s.b)(function(e){var t=e.board;return{map:t.map,width:t.width,height:t.height,teams:t.teams,bases:t.bases,robots:t.robots}})(Z),te=(a(80),function(e){function t(){return Object(_.a)(this,t),Object(T.a)(this,Object(G.a)(t).apply(this,arguments))}return Object(L.a)(t,e),Object(W.a)(t,[{key:"render",value:function(){var e=this.props,t=e.moves,a=e.nextMove;if(null==t)return r.a.createElement("div",{id:"moves-container"});var n=t.map(function(e,t){var n=V()({"move-element":!0,"past-move":t<a,"next-move":t===a});return t<a?null:r.a.createElement("p",{key:t,className:n},function(e){return JSON.stringify(e)}(e))}).filter(function(e){return null!==e});return r.a.createElement("div",{id:"moves-container"},n)}}]),t}(n.Component)),ae=Object(s.b)(function(e){var t=e.board;return{moves:t.moves,nextMove:t.nextMove}})(te),ne=function(e){function t(e){var a;return Object(_.a)(this,t),(a=Object(T.a)(this,Object(G.a)(t).call(this,e))).state={},a}return Object(L.a)(t,e),Object(W.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.height,n=t.nextMove,i=t.totalMoves,o=t.initialized;return void 0===a&&(a=0),r.a.createElement("div",{className:"App"},r.a.createElement(D,null),r.a.createElement("div",{id:"data",style:{height:32*a}},r.a.createElement("div",{style:{flex:2}},r.a.createElement(ee,null)),r.a.createElement("div",{style:{flex:"1",overflowY:"scroll",overflowX:"scroll"}},r.a.createElement(ae,null)),r.a.createElement("br",null)),o&&r.a.createElement("div",{id:"buttons"},r.a.createElement("button",{onClick:function(){return e.props.runSequentialMove(!1)},disabled:0===n},"Previous Move"),r.a.createElement("button",{onClick:function(){return e.props.runSequentialMove(!0)},disabled:n>=i},"Next Move")),r.a.createElement("br",null),r.a.createElement(U,null))}}]),t}(n.Component),re=Object(s.b)(function(e){var t=e.board,a=t.height,n=t.nextMove,r=t.moves,i=e.initialized;return{height:a,nextMove:n,totalMoves:"undefined"===typeof r?0:r.length,initialized:i}},function(e){return Object(l.bindActionCreators)({runSequentialMove:S},e)})(ne);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ie=Object(l.createStore)(M,Object(u.composeWithDevTools)(Object(l.applyMiddleware)(c.a)));o.a.render(r.a.createElement(s.a,{store:ie},r.a.createElement(re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[44,1,2]]]);
//# sourceMappingURL=main.e7137047.chunk.js.map