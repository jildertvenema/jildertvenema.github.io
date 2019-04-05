(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{209:function(t,e,n){t.exports=n(344)},214:function(t,e,n){},344:function(t,e,n){"use strict";n.r(e);var a={};n.r(a),n.d(a,"joinSession",function(){return b}),n.d(a,"createSession",function(){return g}),n.d(a,"checkWord",function(){return y}),n.d(a,"startGame",function(){return v}),n.d(a,"selectedLetters",function(){return x}),n.d(a,"finishGame",function(){return E}),n.d(a,"getScores",function(){return j}),n.d(a,"setName",function(){return k});var r=n(0),o=n.n(r),i=n(25),c=n.n(i),s=(n(214),n(7)),l=n(8),u=n(10),m=n(9),p=n(11),d=n(125),h=o.a.createContext({}),f="ws:/boggle-backend-prod.herokuapp.com",b=function(t){return{action:"joinRoom",options:{sessionID:t}}},g=function(){return{action:"createRoom"}},y=function(t){return{action:"checkWord",options:{word:t}}},v=function(){return{action:"startGame"}},x=function(t){return{action:"selectedLetters",options:{positions:t}}},E=function(){return{action:"finishGame"}},j=function(){return{action:"getScores"}},k=function(t){return{action:"setName",options:{name:t}}},O=function t(e,n,r){var o=this;Object(s.a)(this,t),this.websocket=new WebSocket(f),this.websocket.onopen=n,this.websocket.onclose=r,this.websocket.onmessage=function(t){e(JSON.parse(t.data))},this.actions={},Object.entries(a).forEach(function(t){o.actions[t[0]]=function(){return o.websocket.send(JSON.stringify(t[1].apply(t,arguments)))}})},w=n(23),C=n(24);function S(){var t=Object(w.a)(["\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n\n    color: #fff;\n    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);\n    background-size: 400% 400%;\n    animation: Gradient 40s ease infinite;\n\n    @keyframes Gradient {\n      0% {\n        background-position: 0% 50%\n      }\n      50% {\n        background-position: 100% 50%\n      }\n      100% {\n        background-position: 0% 50%\n      }\n    }\n"]);return S=function(){return t},t}var T=C.a.div(S());function D(){var t=Object(w.a)(["\n    display: inline-block;\n    max-width: 92%;\n    margin: 0 auto;\n"]);return D=function(){return t},t}function B(){var t=Object(w.a)(["\n    text-align:center;\n    margin-top: 1rem;\n"]);return B=function(){return t},t}var I=C.a.div(B()),M=C.a.div(D()),G=function(t){var e=t.children;return o.a.createElement(I,null,o.a.createElement(M,null,e))},L=n(52),W=n.n(L);function A(){var t=Object(w.a)(["\n    text-transform: none !important;\n    span {\n        font-size: large;\n    }\n"]);return A=function(){return t},t}var R=Object(C.a)(W.a)(A()),F=function(t){return o.a.createElement(R,Object.assign({variant:"contained",color:"primary"},t))},P=n(2),Y=n(15);function U(){var t=Object(w.a)(['\n    &:before {\n        content: "";\n        width: 70px;\n\n        background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);\n        background-size: 400% 400%;\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 50%;\n        z-index: 10;\n        animation: dropsand 4s infinite ease-in-out, Gradient 10s ease infinite;\n    }\n    \n    &:after {\n        content: "";\n        width: 0; \n        height: 0; \n        display: block;\n        position: absolute; \n        border-left: 0px solid transparent;\n        border-right: 70px solid transparent;\n        border-top: 100px solid rgba(255,255,255, 0.4);\n        z-index: 20;\n        }\n\n    @keyframes Gradient {\n        0% {\n            background-position: 0% 50%\n        }\n        50% {\n            background-position: 100% 50%\n        }\n        100% {\n            background-position: 0% 50%\n        }\n    }\n\n    @keyframes dropsand {\n        0% { \n            bottom: 50%; \n        }\n        \n        35% {\n            bottom: 0%;\n            top: 50%;\n        }\n        \n        50% {\n            bottom: 0%;\n            top: 50%;\n        }\n        \n        85% {\n            top: 0;\n            bottom: 50%; \n        }\n    }\n']);return U=function(){return t},t}function z(){var t=Object(w.a)(['\n width: 70px;\n  height: 100px;\n  border-radius: 50%;\n  background-color: #7de3f5;\n  margin: 40px auto;\n  position: relative;\n  overflow: hidden;\n  -webkit-animation: rotateGlass 4s infinite ease-in-out;\n  \n  &:before {\n    content: "";\n    width: 0; \n    height: 0; \n    display: block;\n    position: absolute; \n    z-index: 30;\n    border-top: 50px solid transparent;\n    border-bottom: 50px solid transparent;\n    border-left: 30px solid transparent;\n  }\n\n  &:after {\n    content: "";\n    width: 0; \n    height: 0; \n    right: 0;\n    display: block;\n    position: absolute; \n    z-index: 30;\n    border-top: 50px solid transparent;\n    border-bottom: 50px solid transparent;\n    border-right: 30px solid transparent;\n  }\n\n    @keyframes rotateGlass {\n        40% {\n            -webkit-transform: rotate(0deg);\n        }\n        50% {\n            -webkit-transform: rotate(180deg);\n        }\n        90% {\n            -webkit-transform: rotate(180deg);\n        }\n        100% {\n            -webkit-transform: rotate(0deg);\n        }\n    }\n']);return z=function(){return t},t}var N=C.a.div(z()),X=C.a.div(U()),J=function(){return o.a.createElement(N,null,o.a.createElement(X,null))},H=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.context.sessionID&&this.props.history.push("/room")}},{key:"render",value:function(){var t=this,e=this.context.actions;return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},"Do you want to host or join a game?"),o.a.createElement(J,null),o.a.createElement(P.d,{container:!0,spacing:8},o.a.createElement(P.d,{item:!0,xs:12},o.a.createElement(F,{onClick:function(){return t.props.history.push("/scores")}},"Score board")),o.a.createElement(P.d,{item:!0,xs:6},o.a.createElement(F,{onClick:function(){return e.createSession()}},"Host game")),o.a.createElement(P.d,{item:!0,xs:6},o.a.createElement(F,{onClick:function(){return t.props.history.push("/join")}},"Join game"))))}}]),e}(o.a.Component);H.contextType=h;var q=Object(Y.d)(H),Q=function(t){return t[Math.floor(Math.random()*t.length)]},Z=Q(["s0FsE5TsEF8g8","ef0zYcOodmbTMQZjkU","RHS4uBLwvRNUA","7DzlajZNY5D0I","3XiQswSmbjBiU"]),K=Q(["LXHJRRjnviw7e","tXL4FHPSnVJ0A","A6YO96sBmr1te","bkcbX8SqTCXHG"]),V=Q(["ejP8zPAorQPYs","26FL7sQXG1oT6qBy0"]),$=Q(["sRJ3wPAyIxICA","3o7TKnrXco2SC0XM1q","gXhBZfzijya76","atbiDI1fXpYUU","rKj0oXtnMQNwY"]),_=Q(["4jc0C6sRsKcFO","b09xElu8in7Lq","3fk9lvhoApWww","eHxnl41nTrY4w"]),tt=Q(["26gQZVvtZ6TR1EMlW"]),et=function(t){return o.a.createElement("img",{width:"100%",src:"https://media.giphy.com/media/".concat(t.src,"/giphy.gif")})},nt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.sessionID||this.props.history.push("/")}},{key:"componentDidUpdate",value:function(){this.context.readyToPlay&&this.props.history.push("/settings")}},{key:"render",value:function(){var t=this.context.sessionID;return o.a.createElement("div",null,o.a.createElement(P.f,{variant:"h2",gutterBottom:!0},t),o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},"Give this code to your friend, he knows what to do.."),o.a.createElement(et,{src:K}))}}]),e}(o.a.Component);nt.contextType=h;var at=Object(Y.d)(nt),rt=function(t){return o.a.createElement(P.e,Object.assign({margin:"normal",variant:"outlined"},t))},ot=function(t,e){return t.findIndex(function(t){return a=e,(n=t).x===a.x&&n.y===a.y;var n,a})},it=function(t,e){var n=t.x-e.x,a=t.y-e.y;return Math.sqrt(n*n+a*a)<2},ct=function(t){return 1===t?"":"s"},st=function(){return window.innerWidth<=500},lt=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(r)))).state={gameId:"",name:""},n.onJoin=function(){var t=n.state,e=t.gameId,a=t.name,r=n.context.actions;r.setName(a||"Anonymous boggler"),e&&r.joinSession(e.toLowerCase())},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.context.readyToPlay&&this.props.history.push("/settings")}},{key:"render",value:function(){var t=this,e=this.state,n=e.gameId,a=e.name,i=this.props.history;return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{variant:"headline"},"Ask your friend for a secret code.."),o.a.createElement(et,{src:V}),o.a.createElement(rt,{autoFocus:!0,label:"Your name",fullWidth:st(),onChange:function(e){return t.setState({name:e.target.value})},value:a}),o.a.createElement(rt,{autoFocus:!0,label:"Game id",fullWidth:st(),onChange:function(e){return t.setState({gameId:e.target.value})},value:n}),o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end",spacing:8,style:{marginTop:12}},o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:this.onJoin},"Join")),o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:function(){return i.push("/")}},"Back"))))}}]),e}(o.a.Component);lt.contextType=h;var ut=Object(Y.d)(lt);function mt(){var t=Object(w.a)(["\n    min-width: 50px!important;\n    max-width: 50px;\n    margin-top: 5px;\n    \n    h1 {\n        color: #ffffff;\n    }\n\n    animation: spaceboots 0.2s;\n    transform-origin: 50% 50%;\n    animation-iteration-count: 3;\n    animation-timing-function: linear;\n\n    @keyframes spaceboots {\n        0% {\n            transform: translate(2px, 1px) rotate(0deg);\n        }\n        10% {\n            transform: translate(-1px, -2px) rotate(-1deg);\n        }\n        20% {\n            transform: translate(-3px, 0px) rotate(1deg);\n        }\n        30% {\n            transform: translate(0px, 2px) rotate(0deg);\n        }\n        40% {\n            transform: translate(1px, -1px) rotate(1deg);\n        }\n        50% {\n            transform: translate(-1px, 2px) rotate(-1deg);\n        }\n        60% {\n            transform: translate(-3px, 1px) rotate(0deg);\n        }\n        70% {\n            transform: translate(2px, 1px) rotate(-1deg);\n        }\n        80% {\n            transform: translate(-1px, -1px) rotate(1deg);\n        }\n        90% {\n            transform: translate(2px, 2px) rotate(0deg);\n        }\n        100% {\n            transform: translate(1px, -2px) rotate(-1deg);\n        }\n  }\n"]);return mt=function(){return t},t}var pt=Object(C.a)(F)(mt());function dt(){var t=Object(w.a)(["\n    margin-top: 12px;\n    margin-bottom: 12px;\n    width: 300px;\n    margin:  0 auto;\n"]);return dt=function(){return t},t}var ht=C.a.div(dt()),ft="abcdefghijklmnopqrstuvwxyz",bt=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(r)))).state={random:0},n.getCurrentY=function(t,e){for(var n=0;e>=5&&n<=t;)n++,e-=5;return e},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.interval=setInterval(function(){return t.setState({random:t.state.random+1})},100)}},{key:"componentDidUpdate",value:function(){this.state.random>=30&&clearInterval(this.interval)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var t=this,e=this.context.board,n=this.props.selected;return o.a.createElement(ht,null,o.a.createElement("div",{style:{height:50*e.board.length+30}},e.board.slice(0,this.state.random/5).map(function(a,r){return o.a.createElement(P.d,{container:!0,spacing:8,key:r},a.slice(0,t.getCurrentY(r,t.state.random)).map(function(a,i){var c=ot(n,{x:r,y:i}),s=n.length>0&&-1===c&&!it({x:r,y:i},n[n.length-1]);return o.a.createElement(P.d,{item:!0,key:r*e.board.length+i},o.a.createElement(pt,{color:c>-1?"secondary":"primary",onClick:function(){return t.props.onSelect({x:r,y:i})},disabled:s},o.a.createElement(P.f,{variant:"display1"},t.state.random<30-t.getCurrentY(r,t.state.random)?ft[Math.floor(Math.random()*ft.length)]:a)))}))})))}}]),e}(o.a.Component);bt.contextType=h;var gt=bt,yt=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(r)))).state={timeLeft:20},n.getSecondsLeft=function(){return Math.round((new Date(n.props.endTime)-new Date)/1e3)},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.timer=setInterval(function(){return t.setState({timeLeft:t.getSecondsLeft()})},200)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"componentDidUpdate",value:function(){this.state.timeLeft<=0&&this.props.onFinish()}},{key:"render",value:function(){var t=this.state.timeLeft;return o.a.createElement(P.f,{variant:"h4",style:{marginBottom:12}},Math.max(t,0)," seconds left")}}]),e}(o.a.Component),vt=function(t,e){return t.slice().reverse().map(function(t){var n=e.find(function(e){return e.word===t});return n?o.a.createElement(P.d,{container:!0,spacing:8,key:t},o.a.createElement(P.d,{item:!0,xs:!0},o.a.createElement(P.f,{variant:"display1",gutterBottom:!0,color:"primary"},n.word)),o.a.createElement(P.d,{item:!0,xs:!0},o.a.createElement(P.f,{variant:"display1",gutterBottom:!0},n.points," point",ct(n.points)))):o.a.createElement(P.f,{key:t,variant:"display1",gutterBottom:!0,color:"secondary"},t)})},xt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.context,e=t.board,n=t.playerType,a=t.points,i=t.pointsOpponent,c=e.guessedWords,s=e.goodWords,l=n===e.currentTurn?a:i;return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{gutterBottom:!0,variant:"h4"},l," point",ct(l)),o.a.createElement(P.c,null),o.a.createElement("div",{style:this.props.fullHeight?{}:{marginTop:12,maxHeight:300,overflowY:"auto",overflowX:"hidden"}},vt(c,s)))}}]),e}(o.a.Component);xt.contextType=h;var Et=xt,jt=n(53),kt=n.n(jt),Ot=function(t){return o.a.createElement(kt.a,Object.assign({color:"secondary"},t))};function wt(){var t=Object(w.a)(["\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 999;\n"]);return wt=function(){return t},t}var Ct=C.a.div(wt()),St=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(u.a)(this,Object(m.a)(e).call(this))).state={gameId:"",selected:[],timeLeft:20},t.onSelect=function(e){var n=[],a=ot(t.state.selected,e);n=0===t.state.selected.length?[e]:a>-1?t.state.selected.slice(0,a):t.state.selected.concat(e),t.context.actions.selectedLetters(n),t.setState({selected:n})},t.clearLetters=function(){t.context.actions.selectedLetters([]),t.setState({selected:[]})},t.setSelected=function(e){t.setState({selected:e})},t.checkWord=function(e){t.context.actions.checkWord(e),t.clearLetters()},t.prevPoints=0,t}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.board||this.props.history.push("/"),this.context.actions.selectedLetters([]),this.setState({selected:[]})}},{key:"componentDidUpdate",value:function(){this.context.points!==this.prevPoints&&(this.prevPoints=this.context.points,this.setSelected([])),this.context.opponentDisconnected&&this.props.history.push("/disconnected"),this.context.gameStarted||this.props.history.push("/results")}},{key:"render",value:function(){var t=this,e=this.state.selected,n=this.context,a=n.board,i=n.playerType,c=n.opponentName;if(!a)return o.a.createElement(Ot,null);var s=i===a.currentTurn,l=a.endTime,u=s?e:this.context.selectedLetters,m=u.map(function(t){return a.board[t.x][t.y]}).join("");return o.a.createElement(r.Fragment,null,!s&&o.a.createElement(Ct,null),o.a.createElement(P.f,{style:{maxWidth:310},variant:"h4"},s?"It's your turn!":"Please wait for ".concat(c||"your opponent","..")),l&&o.a.createElement(yt,{endTime:l,onFinish:console.log}),o.a.createElement(gt,{onSelect:this.onSelect,selected:u}),o.a.createElement(P.f,{style:{height:50,wordBreak:"break-all",margin:8},variant:"h3"},m),s&&o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end",spacing:8,style:{marginBottom:12}},o.a.createElement(P.d,{item:!0},o.a.createElement(F,{color:"secondary",onClick:function(){return t.checkWord(m)}},"Check")),o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:this.clearLetters},"Clear"))),o.a.createElement(Et,null))}}]),e}(o.a.Component);St.contextType=h;var Tt=Object(Y.d)(St),Dt=Object(Y.d)(function(t){return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{variant:"display2"},"Sorry!"),o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},"Your opponent disconnected.."),o.a.createElement(et,{src:Z}),o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end",spacing:8},o.a.createElement(P.d,{item:!0},o.a.createElement(F,{color:"primary",onClick:function(){return t.history.push("/")}},"Back"))))}),Bt=n(54),It=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(r)))).state={totalRounds:n.context.totalRounds,playTime:n.context.playTime,name:""},n.handleChange=function(t,e){n.setState(Object(Bt.a)({},t,e))},n.startGame=function(){var t=n.context.actions,e=n.state.name;t.setName(e||"Anonymous boggler"),t.startGame()},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.sessionID&&this.context.readyToPlay||this.props.history.push("/")}},{key:"componentDidUpdate",value:function(){this.context.opponentDisconnected&&this.props.history.push("/disconnected"),this.context.gameStarted&&this.props.history.push("/game")}},{key:"render",value:function(){var t=this,e=this.context.playerType,n=this.state,a=n.totalRounds,r=n.playTime,i=n.name,c="host"===e;return o.a.createElement("div",null,o.a.createElement(P.f,{variant:"h2",gutterBottom:!0},"Game settings"),c&&o.a.createElement(rt,{autoFocus:!0,label:"Your name",fullWidth:st(),onChange:function(e){return t.setState({name:e.target.value})},value:i}),o.a.createElement(rt,{fullWidth:st(),InputProps:{inputProps:{min:20,max:120}},type:"number",label:"Round play time",value:r,onChange:function(e){return t.handleChange("playTime",e.target.value)}}),o.a.createElement(rt,{fullWidth:st(),InputProps:{inputProps:{min:1,max:10}},type:"number",label:"Total rounds",value:a,onChange:function(e){return t.handleChange("totalRounds",e.target.value)}}),c&&o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end"},o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:this.startGame},"Start"))))}}]),e}(o.a.Component);It.contextType=h;var Mt=Object(Y.d)(It),Gt=function(t){var e=function(e){function n(){var t,e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=Object(u.a)(this,(t=Object(m.a)(n)).call.apply(t,[this].concat(r)))).checkSession=function(){e.context.opponentDisconnected&&e.props.history.push("/disconnected"),e.context.sessionID||e.props.history.push("/")},e}return Object(p.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){this.checkSession()}},{key:"componentDidUpdate",value:function(){this.checkSession()}},{key:"render",value:function(){return this.context.sessionID?o.a.createElement(t,this.props):null}}]),n}(o.a.Component);return e.contextType=h,e},Lt=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(r)))).getAction=function(){var t=n.context,e=t.board,a=t.actions;return e.currentRound<e.totalRounds||"host"===e.currentTurn?o.a.createElement(F,{onClick:function(){return a.startGame()}},"My turn"):o.a.createElement(F,{onClick:n.finishGame},"Finish")},n.finishGame=function(){n.context.actions.finishGame()},n.checkRedirect=function(){n.context.gameStarted&&n.props.history.push("/game"),n.context.gameFinshed&&n.props.history.push("/finish")},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.checkRedirect()}},{key:"componentDidMount",value:function(){this.checkRedirect()}},{key:"render",value:function(){var t=this.context,e=t.playerType,n=t.board,a=e===n.currentTurn;return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},a?"Your":"Your opponents"," results of round ",n.currentRound),!a&&o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end",spacing:8},o.a.createElement(P.d,{item:!0},this.getAction())),o.a.createElement(Et,{fullHeight:!0}))}}]),e}(o.a.Component);Lt.contextType=h;var Wt=Gt(Object(Y.d)(Lt)),At=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this,e=this.context,n=e.points,a=e.pointsOpponent,i=e.board,c=e.playerType,s=n===a,l=n>a;return o.a.createElement(r.Fragment,null,o.a.createElement(P.f,{variant:"display2",gutterBottom:!0},s?"It's a tie!":l?"You have won!":"You have lost.."),o.a.createElement(P.f,{variant:"display1",gutterBottom:!0},n," points"),o.a.createElement(et,{src:s?tt:l?_:$}),o.a.createElement(P.d,{container:!0,direction:"row",justify:"flex-end",spacing:8,style:{marginTop:12}},o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:function(){return t.props.history.push("/scores")}},"To score board")),o.a.createElement(P.d,{item:!0},o.a.createElement(F,{onClick:function(){return t.props.history.push("/")}},"Menu"))),o.a.createElement(P.d,{container:!0,spacing:8},i.previousRounds.filter(function(t){return t.playerType===c}).map(function(t){return vt(t.guessedWords,t.goodWords)})))}}]),e}(o.a.Component);At.contextType=h;var Rt=Gt(Object(Y.d)(At)),Ft=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.context.actions.getScores()}},{key:"render",value:function(){var t=this.context.scores;return o.a.createElement("div",null,t&&t.sort(function(t,e){return Math.max(e.host,e.player)-Math.max(t.host,t.player)}).map(function(t){return o.a.createElement(r.Fragment,null,o.a.createElement(P.d,{container:!0,spacing:8,style:{marginTop:12}},o.a.createElement(P.d,{item:!0,xs:12},o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},t.hostName,": ",t.host," point",ct(t.host))),o.a.createElement(P.d,{item:!0,xs:12},o.a.createElement(P.f,{variant:"headline",gutterBottom:!0},t.playerName,": ",t.player," point",ct(t.player)))),o.a.createElement(P.c,null))}))}}]),e}(o.a.Component);Ft.contextType=h;var Pt=Object(Y.d)(Ft),Yt=n(130),Ut=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement(Yt.a,{basename:"/boggle"},o.a.createElement(P.a,null,o.a.createElement(P.b,null,o.a.createElement(Y.a,{path:"/",exact:!0,component:q}),o.a.createElement(Y.a,{path:"/room",exact:!0,component:at}),o.a.createElement(Y.a,{path:"/join",exact:!0,component:ut}),o.a.createElement(Y.a,{path:"/game",exact:!0,component:Tt}),o.a.createElement(Y.a,{path:"/settings",exact:!0,component:Mt}),o.a.createElement(Y.a,{path:"/results",exact:!0,component:Wt}),o.a.createElement(Y.a,{path:"/finish",exact:!0,component:Rt}),o.a.createElement(Y.a,{path:"/disconnected",exact:!0,component:Dt}),o.a.createElement(Y.a,{path:"/scores",exact:!0,component:Pt}))))}}]),e}(o.a.Component),zt=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(u.a)(this,Object(m.a)(e).call(this))).initialState={points:0,connected:!1,selectedLetters:[],pointsOpponent:0,readyToPlay:!1},t.state=t.initialState,t.onMessage=function(e){t.setState(e)},t.joinGame=function(){t.setState({joinGame:!0})},t.boggle={},t}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.setState(this.initialState),this.boggle=new O(this.onMessage,function(){return t.setState({connected:!0})},console.log)}},{key:"render",value:function(){var t=this.state.connected;return o.a.createElement(h.Provider,{value:Object(d.a)({},this.state,{actions:this.boggle.actions})},o.a.createElement(T,null,o.a.createElement(G,null,t?o.a.createElement(Ut,null):o.a.createElement(Ot,null))))}}]),e}(o.a.Component),Nt=function(t){function e(){return Object(s.a)(this,e),Object(u.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement(zt,null)}}]),e}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(Nt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[209,1,2]]]);
//# sourceMappingURL=main.706717f1.chunk.js.map