(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){},15:function(e,t,a){},17:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),c=a.n(l),i=(a(13),a(2)),o=a(3),s=a(5),m=a(4),u=a(1),p=(a(15),function(){return r.a.createElement("div",{className:"backdrop"},r.a.createElement("img",{src:"http://d1bomuyprudxkd.cloudfront.net/covers2015/e2l_icons/c0402f.png"}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"Loader"}),r.a.createElement("div",{className:"Loader"}),r.a.createElement("div",{className:"Loader"})))});function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var d=function(e){Object(s.a)(a,e);var t=f(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"componentDidMount",value:function(){document.getElementById("bgvid").playbackRate=1}},{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",{id:"home"},r.a.createElement("video",{autoPlay:!0,muted:!0,loop:!0,id:"bgvid"},r.a.createElement("source",{src:"../images/video.mp4",type:"video/mp4"})),r.a.createElement("nav",{id:"nav-wrap"},r.a.createElement("a",{className:"mobile-btn",href:"#nav-wrap",title:"Show navigation"},"Show navigation"),r.a.createElement("a",{className:"mobile-btn",href:"#",title:"Hide navigation"},"Hide navigation"),r.a.createElement("ul",{id:"nav",className:"nav"},r.a.createElement("li",{className:"current"},r.a.createElement("a",{className:"smoothscroll",href:"#home"},"Home")),r.a.createElement("li",null,r.a.createElement("a",{className:"smoothscroll",href:"#about"},"About")),r.a.createElement("li",null,r.a.createElement("a",{className:"smoothscroll",href:"#resume"},"Resume")),r.a.createElement("li",null,r.a.createElement("a",{className:"smoothscroll",href:"#portfolio"},"Projects")))),r.a.createElement("div",{className:"row banner"},r.a.createElement("div",{className:"banner-text"},r.a.createElement("h1",{className:"responsive-headline"},"JILDERT.DEV"),r.a.createElement("h3",{style:{color:"#fff",fontFamily:"sans-serif "}},"I am ",r.a.createElement("b",null,"Jildert Venema"),". A Computing Science student and frontend developer."),r.a.createElement("hr",null),r.a.createElement("ul",{className:"social"},e.socialLinks&&e.socialLinks.map(function(e){return r.a.createElement("li",{key:e.name},r.a.createElement("a",{href:e.url,target:"_blank"},r.a.createElement("i",{className:e.className})))})))),r.a.createElement("p",{className:"scrolldown"},r.a.createElement("a",{className:"smoothscroll",href:"#about"},r.a.createElement("i",{className:"icon-down-circle"})))),r.a.createElement(p,null))}}]),a}(n.Component);function h(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var v=function(e){Object(s.a)(a,e);var t=h(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement("section",{id:"about"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"three columns"},r.a.createElement("img",{className:"profile-pic",src:"images/profilepic.jpg",alt:""})),r.a.createElement("div",{className:"nine columns main-col"},r.a.createElement("h2",null,"About Me"),r.a.createElement("p",null,e.aboutme),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"columns contact-details"},r.a.createElement("h2",null,"Contact Details"),r.a.createElement("p",{className:"address"},r.a.createElement("span",null,e.name),r.a.createElement("br",null),r.a.createElement("span",null,e.address),r.a.createElement("br",null),r.a.createElement("span",null,e.website)))))))}}]),a}(n.Component);a(17);function E(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var y=function(e){Object(s.a)(a,e);var t=E(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"getSkills",value:function(e){for(var t=[],a=0;a<e.skills.length;a+=2)t.push(r.a.createElement("row",null,r.a.createElement("p",{className:"paragraph"},r.a.createElement("span",null,"\u25cb")," "+e.skills[a].skillname),r.a.createElement("p",{className:"paragraph"},r.a.createElement("span",null,"\u25cb")," "+e.skills[a+1].skillname)));return t}},{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement("section",{id:"resume"},r.a.createElement("div",{className:"row education"},r.a.createElement("div",{className:"three columns header-col"},r.a.createElement("h1",null,r.a.createElement("span",null,"Education"))),r.a.createElement("div",{className:"nine columns main-col"},e.education&&e.education.map(function(e){return r.a.createElement("div",{className:"row item"},r.a.createElement("div",{className:"twelve columns"},r.a.createElement("h3",null,e.UniversityName),r.a.createElement("p",{className:"info"},e.specialization,r.a.createElement("span",null,"\u2022")," ",r.a.createElement("em",{className:"date"},e.MonthOfPassing," ",e.YearOfPassing)),r.a.createElement("p",null,e.Achievements)))}))),r.a.createElement("div",{className:"row work"},r.a.createElement("div",{className:"three columns header-col"},r.a.createElement("h1",null,r.a.createElement("span",null,"Work"))),r.a.createElement("div",{className:"nine columns main-col"},e.work&&e.work.map(function(e){return r.a.createElement("div",{className:"row item"},r.a.createElement("div",{className:"twelve columns"},r.a.createElement("h3",null,e.CompanyName),r.a.createElement("p",{className:"info"},e.specialization,r.a.createElement("span",null,"\u2022")," ",r.a.createElement("em",{className:"date"},e.MonthOfLeaving," ",e.YearOfLeaving)),r.a.createElement("p",null,e.Achievements)))}))),r.a.createElement("div",{className:"row skill"},r.a.createElement("div",{className:"three columns header-col"},r.a.createElement("h1",null,r.a.createElement("span",null,"Skills"))),r.a.createElement("div",{className:"skill-table"},this.getSkills(e))))}}]),a}(n.Component);function b(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var g=function(e){Object(s.a)(a,e);var t=b(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement("section",{id:"portfolio"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"twelve columns collapsed"},r.a.createElement("h1",null,"Check Out Some of My Works."),r.a.createElement("div",{id:"portfolio-wrapper",className:"bgrid-quarters s-bgrid-thirds cf"},e.portfolio&&e.portfolio.map(function(e){return r.a.createElement("div",{className:"columns portfolio-item"},r.a.createElement("div",{className:"item-wrap"},r.a.createElement("a",{onClick:function(){return t=e.link,void window.open(t,"_blank").focus();var t}},r.a.createElement("img",{src:"".concat(e.imgurl),className:"item-img"}),r.a.createElement("div",{className:"overlay"},r.a.createElement("div",{className:"portfolio-item-meta"},r.a.createElement("h5",null,e.name),r.a.createElement("p",null,e.description))))))})))))}}]),a}(n.Component);function N(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var k=function(e){Object(s.a)(a,e);var t=N(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement("section",{id:"testimonials"},r.a.createElement("div",{className:"text-container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"two columns header-col"},r.a.createElement("h1",null,r.a.createElement("span",null,"Client Testimonials"))),r.a.createElement("div",{className:"ten columns flex-container"},r.a.createElement("div",{className:"flexslider"},r.a.createElement("ul",{className:"slides"},e.testimonials&&e.testimonials.map(function(e){return r.a.createElement("li",null,r.a.createElement("blockquote",null,r.a.createElement("p",null,e.description),r.a.createElement("cite",null,e.name)))})))," ")," ")," "),"  ")}}]),a}(n.Component);function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}n.Component;function j(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var O=function(e){Object(s.a)(a,e);var t=j(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.resumeData;return r.a.createElement("footer",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"twelve columns"},r.a.createElement("ul",{className:"social-links"},e.socialLinks&&e.socialLinks.map(function(e){return r.a.createElement("li",null,r.a.createElement("a",{href:e.url},r.a.createElement("i",{className:e.className})))}))),r.a.createElement("div",{id:"go-top"},r.a.createElement("a",{className:"smoothscroll",title:"Back to Top",href:"#home"},r.a.createElement("i",{className:"icon-up-open"})))))}}]),a}(n.Component),R={imagebaseurl:"https://rbhatia46.github.io/",name:"Jildert Venema",role:"Frontend Developer",linkedinId:"403882158",roleDescription:"I like dabbling in various parts of frontend development and like to learn about new technologies, write technical articles or simply play games in my free time.",socialLinks:[{name:"linkedin",url:"https://www.linkedin.com/in/jildert-venema-403882158/",className:"fa fa-linkedin"},{name:"github",url:"https://github.com/jildertvenema",className:"fa fa-github"}],aboutme:"I'm a 3rd year Computing Science student. My passion is fronted development. Most of the time I develop with React.js, Node.js and Angular.",address:"Netherlands",website:"jildert.venema@hotmail.com",education:[{UniversityName:"University of Groningen",specialization:"Pre-Master - Computing Science",MonthOfPassing:"",YearOfPassing:"Sept 2020 - Present day"},{UniversityName:"NHL Stenden University of Applied Sciences",specialization:"Information Technology",MonthOfPassing:"",YearOfPassing:"Sept 2016 - Aug 2020"}],work:[{CompanyName:"ZiuZ",specialization:"Forensic - Video analyse system in Web",MonthOfLeaving:"Present day",Achievements:"Graduation project HBO"},{CompanyName:"Appmachine",specialization:"Frontend Developer - 2 years",MonthOfLeaving:"Jan",YearOfLeaving:"2020"}],skillsDescription:"These are my skills",skills:[{skillname:"HTML5"},{skillname:"CSS"},{skillname:"JQuery"},{skillname:"React.js"},{skillname:"Angular"},{skillname:"Node.js"},{skillname:".Net Core"},{skillname:"SQL"},{skillname:"Java"},{skillname:"Python"}],portfolio:[{name:"Shoots.ga",description:"A mobile webbased multiplayer party game. Play agains your friends and answer questions about your friends in the multiplayer quiz.",imgurl:"images/portfolio/project.png",link:"https://shoots.jildert.dev"},{name:"Spotify friends playlist generator",description:"A webapplication that generates a spotify playlist based on your and your friends music interests.",imgurl:"images/portfolio/project2.png",link:"https://jildertvenema.github.io/spotify-friends-app/"},{name:"Boggle",description:"A mobile webbased multiplayer game. Play Boggle multiplayer with your friends.",imgurl:"images/portfolio/boggle.png",link:"https://boggle.jildert.dev"},{name:"Whatsapp backup vizualiser",description:"A webapplication that let's you import and view your Whatsapp backup files.",imgurl:"images/portfolio/project4.png",link:"https://jildertvenema.github.io/whatsapp/"},{name:"Abgewaschen",description:"A school project where we made a webbased co-op game. 'You are stranded on a deserted island and you have to find a way to survive...'.",imgurl:"images/portfolio/project6.png",link:"https://abgewaschen.jildert.dev"},{name:"Dance and Vision detection Robot",description:"A school project where we made a robot that can dance and detect objects.",imgurl:"images/portfolio/project5.jpg",link:"https://lemmesmash.nl"},{name:"Hololens Factory",description:"A Microsoft Hololens application where you can manage machine statuses.",imgurl:"images/portfolio/hololens.png",link:"https://www.beenen.nl/augmented-reality-bediening/"}],testimonials:[{description:"\u201cThe computer was born to solve problems that did not exist before.\u201d",name:"Bill Gates"},{description:"\u201cComputer Science is no more about computers than astronomy is about telescopes.\u201d",name:"Edsger W. Dijkstraf"}]};function D(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(u.a)(e);if(t){var r=Object(u.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(m.a)(this,a)}}var S=function(e){Object(s.a)(a,e);var t=D(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(d,{resumeData:R}),r.a.createElement(v,{resumeData:R}),r.a.createElement(y,{resumeData:R}),r.a.createElement(g,{resumeData:R}),r.a.createElement(k,{resumeData:R}),r.a.createElement(O,{resumeData:R}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.fc295784.chunk.js.map