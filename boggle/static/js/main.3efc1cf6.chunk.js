(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{209:function(t,e,n){t.exports=n(344)},214:function(t,e,n){},344:function(t,e,n){"use strict";n.r(e);var a={};n.r(a),n.d(a,"joinSession",function(){return b}),n.d(a,"createSession",function(){return y}),n.d(a,"checkWord",function(){return g}),n.d(a,"startGame",function(){return v}),n.d(a,"selectedLetters",function(){return E}),n.d(a,"finishGame",function(){return j}),n.d(a,"getScores",function(){return x});var o=n(0),r=n.n(o),i=n(25),c=n.n(i),s=(n(214),n(7)),l=n(11),u=n(13),p=n(12),d=n(14),m=n(125),h=r.a.createContext({}),f="ws:fast-depths-95952.herokuapp.com",b=function(t){return{action:"joinRoom",options:{sessionID:t}}},y=function(){return{action:"createRoom"}},g=function(t){return{action:"checkWord",options:{word:t}}},v=function(){return{action:"startGame"}},E=function(t){return{action:"selectedLetters",options:{positions:t}}},j=function(){return{action:"finishGame"}},x=function(){return{action:"getScores"}},k=function t(e,n,o){var r=this;Object(s.a)(this,t),this.websocket=new WebSocket(f),this.websocket.onopen=n,this.websocket.onclose=o,this.websocket.onmessage=function(t){e(JSON.parse(t.data))},this.actions={},Object.entries(a).forEach(function(t){r.actions[t[0]]=function(){return r.websocket.send(JSON.stringify(t[1].apply(t,arguments)))}})},O=n(23),w=n(24);function C(){var t=Object(O.a)(["\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n\n    color: #fff;\n\tbackground: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);\n\tbackground-size: 400% 400%;\n\t-webkit-animation: Gradient 40s ease infinite;\n\t-moz-animation: Gradient 40s ease infinite;\n\tanimation: Gradient 40s ease infinite;\n\n\t@keyframes Gradient {\n\t\t0% {\n\t\t\tbackground-position: 0% 50%\n\t\t}\n\t\t50% {\n\t\t\tbackground-position: 100% 50%\n\t\t}\n\t\t100% {\n\t\t\tbackground-position: 0% 50%\n\t\t}\n\t}\n"]);return C=function(){return t},t}var T=w.a.div(C());function S(){var t=Object(O.a)(["\n    display: inline-block;\n    max-width: 92%;\n    margin: 0 auto;\n"]);return S=function(){return t},t}function D(){var t=Object(O.a)(["\n    text-align:center;\n    margin-top: 1rem;\n"]);return D=function(){return t},t}var I=w.a.div(D()),B=w.a.div(S()),G=function(t){var e=t.children;return r.a.createElement(I,null,r.a.createElement(B,null,e))},L=n(52),R=n.n(L);function M(){var t=Object(O.a)(["\n    text-transform: none !important;\n    span {\n        font-size: large;\n    }\n"]);return M=function(){return t},t}var A=Object(w.a)(R.a)(M()),P=function(t){return r.a.createElement(A,Object.assign({variant:"contained",color:"primary"},t))},W=n(2),F=n(15);function U(){var t=Object(O.a)(['\n    &:before {\n        content: "";\n        width: 70px;\n\n        background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);\n        background-size: 400% 400%;\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 50%;\n        z-index: 10;\n        animation: dropsand 4s infinite ease-in-out, Gradient 10s ease infinite;\n    }\n    \n    &:after {\n        content: "";\n        width: 0; \n        height: 0; \n        display: block;\n        position: absolute; \n        border-left: 0px solid transparent;\n        border-right: 70px solid transparent;\n        border-top: 100px solid rgba(255,255,255, 0.4);\n        z-index: 20;\n        }\n\n    @keyframes Gradient {\n\t\t0% {\n\t\t\tbackground-position: 0% 50%\n\t\t}\n\t\t50% {\n\t\t\tbackground-position: 100% 50%\n\t\t}\n\t\t100% {\n\t\t\tbackground-position: 0% 50%\n\t\t}\n\t}\n\n    @keyframes dropsand {\n        0% { \n            bottom: 50%; \n        }\n        \n        35% {\n            bottom: 0%;\n            top: 50%;\n        }\n        \n        50% {\n            bottom: 0%;\n            top: 50%;\n        }\n        \n        85% {\n            top: 0;\n            bottom: 50%; \n        }\n    }\n']);return U=function(){return t},t}function z(){var t=Object(O.a)(['\n width: 70px;\n  height: 100px;\n  border-radius: 50%;\n  background-color: #7de3f5;\n  margin: 40px auto;\n  position: relative;\n  overflow: hidden;\n  -webkit-animation: rotateGlass 4s infinite ease-in-out;\n  \n  &:before {\n    content: "";\n    width: 0; \n    height: 0; \n    display: block;\n    position: absolute; \n    z-index: 30;\n    border-top: 50px solid transparent;\n    border-bottom: 50px solid transparent;\n\tborder-left: 30px solid transparent;\n  }\n\n  &:after {\n    content: "";\n    width: 0; \n    height: 0; \n    right: 0;\n    display: block;\n    position: absolute; \n    z-index: 30;\n    border-top: 50px solid transparent;\n    border-bottom: 50px solid transparent;\n\tborder-right: 30px solid transparent;\n  }\n\n    @keyframes rotateGlass {\n        40% {\n            -webkit-transform: rotate(0deg);\n        }\n        50% {\n            -webkit-transform: rotate(180deg);\n        }\n        90% {\n            -webkit-transform: rotate(180deg);\n        }\n        100% {\n            -webkit-transform: rotate(0deg);\n        }\n    }\n']);return z=function(){return t},t}var Y=w.a.div(z()),X=w.a.div(U()),J=function(){return r.a.createElement(Y,null,r.a.createElement(X,null))},H=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.context.sessionID&&this.props.history.push("/room")}},{key:"render",value:function(){var t=this,e=this.context.actions;return r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{variant:"headline",gutterBottom:!0},"Do you want to host or join a game?"),r.a.createElement(J,null),r.a.createElement(W.d,{container:!0,spacing:8},r.a.createElement(W.d,{item:!0,xs:6},r.a.createElement(P,{onClick:function(){return e.createSession()}},"Host game")),r.a.createElement(W.d,{item:!0,xs:6},r.a.createElement(P,{onClick:function(){return t.props.history.push("/join")}},"Join game"))))}}]),e}(r.a.Component);H.contextType=h;var Q=Object(F.d)(H),q=function(t){return t[Math.floor(Math.random()*t.length)]},N=q(["s0FsE5TsEF8g8","ef0zYcOodmbTMQZjkU","RHS4uBLwvRNUA","7DzlajZNY5D0I","3XiQswSmbjBiU"]),Z=q(["LXHJRRjnviw7e","tXL4FHPSnVJ0A","A6YO96sBmr1te","bkcbX8SqTCXHG"]),K=q(["ejP8zPAorQPYs","26FL7sQXG1oT6qBy0"]),V=q(["sRJ3wPAyIxICA","3o7TKnrXco2SC0XM1q","gXhBZfzijya76","atbiDI1fXpYUU","rKj0oXtnMQNwY"]),$=q(["4jc0C6sRsKcFO","b09xElu8in7Lq","3fk9lvhoApWww","eHxnl41nTrY4w"]),_=q(["26gQZVvtZ6TR1EMlW"]),tt=function(t){return r.a.createElement("img",{width:"100%",src:"https://media.giphy.com/media/".concat(t.src,"/giphy.gif")})},et=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.sessionID||this.props.history.push("/")}},{key:"componentDidUpdate",value:function(){this.context.readyToPlay&&this.props.history.push("/settings")}},{key:"render",value:function(){var t=this.context.sessionID;return r.a.createElement("div",null,r.a.createElement(W.f,{variant:"h2",gutterBottom:!0},t),r.a.createElement(W.f,{variant:"headline",gutterBottom:!0},"Give this code to your friend, he knows what to do.."),r.a.createElement(tt,{src:Z}))}}]),e}(r.a.Component);et.contextType=h;var nt=Object(F.d)(et),at=function(t){return r.a.createElement(W.e,Object.assign({margin:"normal",variant:"outlined"},t))},ot=function(t,e){return t.some(function(t){return a=e,(n=t).x===a.x&&n.y===a.y;var n,a})},rt=function(t,e){var n=t.x-e.x,a=t.y-e.y;return Math.sqrt(n*n+a*a)<2},it=function(t){return 1===t?"":"s"},ct=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(o)))).state={gameId:""},n.onJoin=function(){var t=n.state.gameId,e=n.context.actions;t&&("ds892"===t.toLowerCase()?window.location="https://bit.ly/2I4lGc0":e.joinSession(t.toLowerCase()))},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.context.readyToPlay&&this.props.history.push("/settings")}},{key:"render",value:function(){var t=this,e=this.state.gameId,n=this.props.history;return r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{variant:"headline"},"Ask your friend for a secret code.."),r.a.createElement(tt,{src:K}),r.a.createElement(at,{autoFocus:!0,label:"Game id",fullWidth:window.innerWidth<=500,onChange:function(e){return t.setState({gameId:e.target.value})},value:e}),r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end",spacing:8,style:{marginTop:12}},r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:this.onJoin},"Join")),r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:function(){return n.push("/")}},"Back"))))}}]),e}(r.a.Component);ct.contextType=h;var st=Object(F.d)(ct);function lt(){var t=Object(O.a)(["\n    margin-top: 12px;\n    margin-bottom: 12px;\n    width: 300px;\n    margin:  0 auto;\n"]);return lt=function(){return t},t}function ut(){var t=Object(O.a)(["\n    min-width: 50px!important;\n    max-width: 50px;\n    margin-top: 5px;\n    \n    h1 {\n        color: #ffffff;\n    }\n"]);return ut=function(){return t},t}var pt=Object(w.a)(P)(ut()),dt=w.a.div(lt()),mt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this,e=this.context.board,n=this.props.selected;return r.a.createElement(dt,null,e.board.map(function(e,a){return r.a.createElement(W.d,{container:!0,spacing:8,key:a},e.map(function(e,o){var i=ot(n,{x:a,y:o}),c=n.length>0&&!i&&!rt({x:a,y:o},n[n.length-1]);return r.a.createElement(W.d,{item:!0,xs:!0,key:o},r.a.createElement(pt,{color:i?"secondary":"primary",onClick:function(){return t.props.onSelect({x:a,y:o})},disabled:c},r.a.createElement(W.f,{variant:"display1"},e)))}))}))}}]),e}(r.a.Component);mt.contextType=h;var ht=mt,ft=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(o)))).state={timeLeft:20},n.getSecondsLeft=function(){return Math.round((new Date(n.props.endTime)-new Date)/1e3)},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.timer=setInterval(function(){return t.setState({timeLeft:t.getSecondsLeft()})},200)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"componentDidUpdate",value:function(){this.state.timeLeft<=0&&(console.log(new Date(this.props.endTime)),this.props.onFinish())}},{key:"render",value:function(){var t=this.state.timeLeft;return r.a.createElement(W.f,{variant:"h4",style:{marginBottom:12}},Math.max(t,0)," seconds left")}}]),e}(r.a.Component),bt=n(53),yt=n.n(bt),gt=function(t){return r.a.createElement(yt.a,Object.assign({color:"secondary"},t))},vt=function(t,e){return t.slice().reverse().map(function(t){var n=e.find(function(e){return e.word===t});return n?r.a.createElement(W.d,{container:!0,spacing:8,key:t},r.a.createElement(W.d,{item:!0,xs:!0},r.a.createElement(W.f,{variant:"display1",gutterBottom:!0,color:"primary"},n.word)),r.a.createElement(W.d,{item:!0,xs:!0},r.a.createElement(W.f,{variant:"display1",gutterBottom:!0},n.points," point",it(n.points)))):r.a.createElement(W.f,{key:t,variant:"display1",gutterBottom:!0,color:"secondary"},t)})},Et=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.context,e=(t.sessionID,t.board),n=t.playerType,a=t.points,i=t.pointsOpponent,c=e.guessedWords,s=e.goodWords,l=n===e.currentTurn?a:i;return console.log(c,s),r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{gutterBottom:!0,variant:"h4"},l," point",it(l)),r.a.createElement(W.c,null),r.a.createElement("div",{style:this.props.fullHeight?{}:{marginTop:12,maxHeight:300,overflowY:"auto",overflowX:"hidden"}},vt(c,s)))}}]),e}(r.a.Component);Et.contextType=h;var jt=Et;function xt(){var t=Object(O.a)(["\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 999;\n"]);return xt=function(){return t},t}var kt=w.a.div(xt()),Ot=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(u.a)(this,Object(p.a)(e).call(this))).state={gameId:"",selected:[],timeLeft:20},t.onSelect=function(e){var n=[];n=0===t.state.selected.length?[e]:ot(t.state.selected,e)?t.state.selected.slice(0,t.state.selected.length-1):t.state.selected.concat(e),t.context.actions.selectedLetters(n),t.setState({selected:n})},t.clearLetters=function(){t.context.actions.selectedLetters([]),t.setState({selected:[]})},t.checkWord=function(e){t.context.actions.checkWord(e),t.clearLetters()},t.prevPoints=0,t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.board||this.props.history.push("/"),this.context.actions.selectedLetters([])}},{key:"componentDidUpdate",value:function(){this.context.points!==this.prevPoints&&(this.prevPoints=this.context.points,this.setState({selected:[]})),this.context.opponentDisconnected&&this.props.history.push("/disconnected"),this.context.gameStarted||this.props.history.push("/results")}},{key:"render",value:function(){var t=this,e=this.state,n=(e.gameId,e.selected),a=this.context,i=(a.actions,a.board),c=a.playerType;if(!i)return r.a.createElement(gt,null);console.log(this.context);var s=c===i.currentTurn,l=i.endTime,u=s?n:this.context.selectedLetters;console.log(u);var p=u.map(function(t){return i.board[t.x][t.y]}).join("");return r.a.createElement(o.Fragment,null,!s&&r.a.createElement(kt,null),r.a.createElement(W.f,{style:{maxWidth:310},variant:"h4"},s?"It's your turn!":"Please wait for your opponent.."),l&&r.a.createElement(ft,{endTime:l,onFinish:console.log}),r.a.createElement(ht,{onSelect:this.onSelect,selected:u}),r.a.createElement(W.f,{style:{height:50,wordBreak:"break-all",margin:8},variant:"h3"},p),s&&r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end",spacing:8,style:{marginBottom:12}},r.a.createElement(W.d,{item:!0},r.a.createElement(P,{color:"secondary",onClick:function(){return t.checkWord(p)}},"Check")),r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:this.clearLetters},"Clear"))),r.a.createElement(jt,null))}}]),e}(r.a.Component);Ot.contextType=h;var wt=Object(F.d)(Ot),Ct=Object(F.d)(function(t){return r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{variant:"display2"},"Sorry!"),r.a.createElement(W.f,{variant:"headline",gutterBottom:!0},"Your opponent disconnected.."),r.a.createElement(tt,{src:N}),r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end",spacing:8},r.a.createElement(W.d,{item:!0},r.a.createElement(P,{color:"primary",onClick:function(){return t.history.push("/")}},"Back"))))}),Tt=n(54),St=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(o)))).state={totalRounds:n.context.totalRounds,playTime:n.context.playTime},n.handleChange=function(t,e){n.setState(Object(Tt.a)({},t,e))},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.sessionID&&this.context.readyToPlay||this.props.history.push("/")}},{key:"componentDidUpdate",value:function(){this.context.opponentDisconnected&&this.props.history.push("/disconnected"),this.context.gameStarted&&this.props.history.push("/game")}},{key:"render",value:function(){var t=this,e=this.context,n=(e.sessionID,e.playerType),a=this.state,o=a.totalRounds,i=a.playTime;console.log(this.context);var c="host"===n;return r.a.createElement("div",null,r.a.createElement(W.f,{variant:"h2",gutterBottom:!0},"Game settings"),r.a.createElement(at,{InputProps:{inputProps:{min:20,max:120}},type:"number",label:"Round play time",value:i,onChange:function(e){return t.handleChange("playTime",e.target.value)}}),r.a.createElement(at,{InputProps:{inputProps:{min:1,max:10}},type:"number",label:"Total rounds",value:o,onChange:function(e){return t.handleChange("totalRounds",e.target.value)}}),c&&r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end"},r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:this.context.actions.startGame},"Start"))))}}]),e}(r.a.Component);St.contextType=h;var Dt=Object(F.d)(St),It=function(t){var e,n;return n=e=function(e){function n(){var t,e;Object(s.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=Object(u.a)(this,(t=Object(p.a)(n)).call.apply(t,[this].concat(o)))).checkSession=function(){e.context.opponentDisconnected&&e.props.history.push("/disconnected"),e.context.sessionID||e.props.history.push("/")},e}return Object(d.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){this.checkSession()}},{key:"componentDidUpdate",value:function(){this.checkSession()}},{key:"render",value:function(){return this.context.sessionID?r.a.createElement(t,this.props):null}}]),n}(r.a.Component),e.contextType=h,n},Bt=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(o)))).getAction=function(){var t=n.context,e=t.board,a=t.actions;return e.currentRound<e.totalRounds||"host"===e.currentTurn?r.a.createElement(P,{onClick:function(){return a.startGame()}},"My turn"):r.a.createElement(P,{onClick:n.finishGame},"Finish")},n.finishGame=function(){n.context.actions.finishGame()},n.checkRedirect=function(){n.context.gameStarted&&n.props.history.push("/game"),n.context.gameFinshed&&n.props.history.push("/finish")},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.checkRedirect()}},{key:"componentDidMount",value:function(){this.checkRedirect()}},{key:"render",value:function(){var t=this.context,e=(t.sessionID,t.playerType),n=t.board;console.log(this.context);var a=e===n.currentTurn;return r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{variant:"headline",gutterBottom:!0},a?"Your":"Your opponents"," results of round ",n.currentRound),r.a.createElement(jt,{fullHeight:!0}),!a&&r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end",spacing:8},r.a.createElement(W.d,{item:!0},this.getAction())))}}]),e}(r.a.Component);Bt.contextType=h;var Gt=It(Object(F.d)(Bt)),Lt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this,e=this.context,n=e.points,a=e.pointsOpponent,i=e.board,c=e.playerType,s=n===a,l=n>a;return r.a.createElement(o.Fragment,null,r.a.createElement(W.f,{variant:"display2",gutterBottom:!0},s?"It's a tie!":l?"You have won!":"You have lost.."),r.a.createElement(W.f,{variant:"display1",gutterBottom:!0},n," points"),r.a.createElement(tt,{src:s?_:l?$:V}),r.a.createElement(W.d,{container:!0,spacing:8},i.previousRounds.filter(function(t){return t.playerType===c}).map(function(t){vt(t.guessedWords,t.goodWords)})),r.a.createElement(W.d,{container:!0,direction:"row",justify:"flex-end",spacing:8},r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:function(){return t.props.history.push("/scores")}},"To score board")),r.a.createElement(W.d,{item:!0},r.a.createElement(P,{onClick:function(){return t.props.history.push("/")}},"Menu"))))}}]),e}(r.a.Component);Lt.contextType=h;var Rt=It(Object(F.d)(Lt)),Mt=n(130),At=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement(Mt.a,{basename:"/boggle"},r.a.createElement(W.a,null,r.a.createElement(W.b,null,r.a.createElement(F.a,{path:"/",exact:!0,component:Q}),r.a.createElement(F.a,{path:"/room",exact:!0,component:nt}),r.a.createElement(F.a,{path:"/join",exact:!0,component:st}),r.a.createElement(F.a,{path:"/game",exact:!0,component:wt}),r.a.createElement(F.a,{path:"/settings",exact:!0,component:Dt}),r.a.createElement(F.a,{path:"/results",exact:!0,component:Gt}),r.a.createElement(F.a,{path:"/finish",exact:!0,component:Rt}),r.a.createElement(F.a,{path:"/disconnected",exact:!0,component:Ct}))))}}]),e}(r.a.Component),Pt=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(u.a)(this,Object(p.a)(e).call(this))).initialState={points:0,connected:!1,selectedLetters:[],pointsOpponent:0,readyToPlay:!1},t.state=t.initialState,t.onMessage=function(e){t.setState(e)},t.joinGame=function(){t.setState({joinGame:!0})},t.boggle={},t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.setState(this.initialState),this.boggle=new k(this.onMessage,this.setState({connected:!0}),console.log)}},{key:"render",value:function(){var t=this.state.connected;return console.log(t),r.a.createElement(h.Provider,{value:Object(m.a)({},this.state,{actions:this.boggle.actions})},r.a.createElement(T,null,r.a.createElement(G,null,t?r.a.createElement(At,null):r.a.createElement(gt,null))))}}]),e}(r.a.Component),Wt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement(Pt,null)}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Wt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[209,1,2]]]);
//# sourceMappingURL=main.3efc1cf6.chunk.js.map
