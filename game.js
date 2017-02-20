document.addEventListener("DOMContentLoaded",function(){var e=new LevelFlow({container:document.querySelector(".boards")});e.playLevel(parseInt(localStorage.level,10)||1),document.getElementById("reset").addEventListener("click",function(){e.resetCurrentLevel()})},!1),function(){"use strict";window.Board=function(e){function t(){var t,a,s,l,c;if(e.width*e.height!==e.tiles.length)throw"Map definition is invalid. Width * Height != number of tiles.";for(r=[],t=0;t<e.height;t++)r.push([]);for(t=0;t<e.tiles.length;t++)l=t%e.width,c=Math.floor(t/e.width),a=e.tiles[t],s=new Tile(l,c,a),r[c][l]=s,"start"===s.getType()&&(n=s),"end"===s.getType()&&o.push(s),"bug"===s.getType()&&i++}var n=null,o=[],i=0,r=null;t(),this.getWidth=function(){return e.width},this.getHeight=function(){return e.height},this.getStartTile=function(){return n},this.getEndTiles=function(){return o},this.getNumberOfBugs=function(){return i},this.getTile=function(e,t){return r[t]&&r[t][e]||null}}}(),function(){"use strict";window.Game=function(e){function t(){l=new Board(e.map),s=new EventListenersManager(["game-started","game-won","game-lost","object-moved","mole-killed","bug-eaten","dirt-removed","rock-pushed","cant-push-that-rock","door-opened","princess-found"])}function n(){for(var t=0,n=e.stars.length;n>t;t++)if(u<=e.stars[t])return n-t;return 0}function o(e){if(c){var t,a,d,g,m=e.getX(),X=e.getY();if("up"===c?(a=0,d=-1):"down"===c?(a=0,d=1):"left"===c?(a=-1,d=0):"right"===c&&(a=1,d=0),t=l.getTile(m+a,X+d),!t)return;var h=["dirt","end-open","bug","empty"];if(-1!==h.indexOf(t.getType())&&(u++,"end-open"===t.getType()&&s.trigger("game-won",n()),"dirt"===t.getType()?s.trigger("dirt-removed",t.getId()):"bug"===t.getType()&&r(t),t.set(e),e.setEmpty(),s.trigger("object-moved",{id:t.getId(),type:t.getType(),from:{x:m,y:X},to:{x:t.getX(),y:t.getY()}})),"rock"===t.getType()){if(m=t.getX(),X=t.getY(),g=l.getTile(m+a,X+d),!g)return;"empty"===g.getType()?(i(t,g),o(e)):s.trigger("cant-push-that-rock",e.getId())}"princess"===t.getType()&&s.trigger("princess-found"),c=null}}function i(e,t){t.set(e),t.setType("steady-rock"),e.setEmpty(),s.trigger("object-moved",{id:t.getId(),type:t.getType(),from:{x:e.getX(),y:e.getY()},to:{x:t.getX(),y:t.getY()}})}function r(e){s.trigger("bug-eaten",e.getId()),d++,d===l.getNumberOfBugs()&&l.getEndTiles().forEach(function(e){s.trigger("door-opened",e.getId()),e.setType("end-open")})}function a(e){var t=e.getX(),n=e.getY(),o=l.getTile(t,n+1);"rock"===e.getType()?"empty"===o.getType()&&(o.set(e),o.setType("falling-rock"),e.setEmpty(),s.trigger("object-moved",{id:o.getId(),type:o.getType(),from:{x:t,y:n},to:{x:o.getX(),y:o.getY()}})):"falling-rock"===e.getType()&&("empty"===o.getType()||"mole"===o.getType()?("mole"===o.getType()&&(s.trigger("mole-killed",{mole:o.getId(),rock:e.getId()}),s.trigger("game-lost")),o.set(e),e.setEmpty(),s.trigger("object-moved",{id:o.getId(),type:o.getType(),from:{x:t,y:n},to:{x:o.getX(),y:o.getY()}})):e.setType("rock"))}var s,l,c=null,d=0,u=0;t(),this.start=function(){l.getStartTile().setType("mole"),s.trigger("game-started")},this.getBoard=function(){return l},this.getName=function(){return e.name},this.on=function(e,t){s.addEventListener(e,t)},this.destroy=function(){s.removeEventListener()},this.reset=function(){c=null,d=0,u=0,t()},this.nextMoleMove=function(e){c=e},this.update=function(){for(var e=l.getHeight()-1;e>=0;e--)for(var t=l.getWidth()-1;t>=0;t--){var n=l.getTile(t,e);"rock"===n.getType()||"falling-rock"===n.getType()?a(n):"mole"===n.getType()?o(n):"steady-rock"===n.getType()&&n.setType("rock")}}}}(),function(){window.HTMLBoard=function(e){function t(e){switch(e.keyCode){case 38:l.nextMoleMove("up"),s.changeMoleLook("up");break;case 40:l.nextMoleMove("down"),s.changeMoleLook("down");break;case 37:l.nextMoleMove("left"),s.changeMoleLook("left");break;case 39:l.nextMoleMove("right"),s.changeMoleLook("right")}e.preventDefault()}function n(e){o(e)}function o(e){var t=document.querySelector(".board-wrapper.active .tile.tile--mole").getBoundingClientRect(),n=t.left+t.width,o=t.top+t.height,i=e.clientX,r=e.clientY;e.touches&&(i=e.touches[0].clientX,r=e.touches[0].clientY),t.left<i&&n>i?t.top<r&&o>r?console.log("mole clicked"):t.top<r?(l.nextMoleMove("down"),s.changeMoleLook("down")):(l.nextMoleMove("up"),s.changeMoleLook("up")):t.top<r&&o>r&&(t.left<i?(l.nextMoleMove("right"),s.changeMoleLook("right")):(l.nextMoleMove("left"),s.changeMoleLook("left")))}function i(){var e=window,t=document.documentElement,n=t.getElementsByTagName("body")[0],o=e.innerHeight||t.clientHeight||n.clientHeight;u=Math.floor(o/7),s.draw()}function r(){document.addEventListener("keydown",t),"ontouchstart"in document.documentElement?document.addEventListener("touchstart",n):document.addEventListener("mousedown",n),l.on("game-started",s.draw),l.on("object-moved",function(e){console.log("object ",e.type," (#",e.id,") moved from X:",e.from.x,", Y:",e.from.y," to X:",e.to.x,", Y:",e.to.y);var t=c.querySelector("#item_"+e.id);t.classList.add("anim"),t.style.transform="translate("+u*e.to.x+"px, "+u*e.to.y+"px)",t.style.webkitTransform="translate("+u*e.to.x+"px, "+u*e.to.y+"px)",t.style.MozTransform="translate("+u*e.to.x+"px, "+u*e.to.y+"px)"}),l.on("bug-eaten",function(e){console.log("bug ",e," eaten"),document.querySelector("#item_"+e).classList.add("remove-anim")}),l.on("dirt-removed",function(e){console.log("dirt ",e," removed"),document.querySelector("#item_"+e).classList.add("remove-anim")}),l.on("mole-killed",function(e){console.log("mole ",e.mole," killed"),document.querySelector("#item_"+e.mole).classList.add("remove-anim"),document.querySelector("#item_"+e.rock).classList.add("bloody")}),l.on("rock-pushed",function(e){console.log("rock",e,"rock")}),l.on("cant-push-that-rock",function(e){console.log("cant-push-that-rock",e,"cant-push-that-rock")}),l.on("door-opened",function(e){console.log("door ",e," are now open"),document.querySelector("#item_"+e).classList.add("remove-anim")}),l.on("princess-found",function(){console.log("princess found!")})}function a(){document.removeEventListener("keydown",t),document.removeEventListener("touchstart",n),document.removeEventListener("mousedown",n)}var s=this,l=e.game,c=e.container,d="down",u=50;this.getTileSize=function(){return u},this.reset=function(){i()},this.draw=function(){var t=e.container;t.style.backgroundSize=u+"px";var n=l.getBoard(),o=document.createDocumentFragment(),i=document.createElement("div");i.classList.add("tile");var r=document.createElement("div");r.classList.add("tile__inner"),i.appendChild(r);for(var a=0,s=n.getHeight();s>a;a++)for(var c=0,g=n.getWidth();g>c;c++){var m=n.getTile(c,a),X=i.cloneNode(!0);X.classList.add("tile--"+m.getType()),"mole"===m.getType()&&X.classList.add(d),X.id="item_"+m.getId(),X.style.width=u+"px",X.style.height=u+"px",X.style.transform="translate("+u*c+"px, "+u*a+"px)",X.style.webkitTransform="translate("+u*c+"px, "+u*a+"px)",X.style.MozTransform="translate("+u*c+"px, "+u*a+"px)",o.appendChild(X)}DOMHelper.purgeElement(t),t.style.marginLeft="-"+u+"px",t.style.width=u*n.getWidth()+"px",t.style.height=u*n.getHeight()+"px",t.appendChild(o)},this.changeMoleLook=function(e){d=e;var t=c.querySelector(".tile--mole");t&&(t.classList.remove("up"),t.classList.remove("down"),t.classList.remove("left"),t.classList.remove("right"),t.classList.add(d))},this.enable=function(){e.container.classList.add("active"),r()},this.disable=function(){e.container.classList.remove("active"),a()},this.removeEventListeners=a,i()}}(),function(){"use strict";window.LevelFlow=function(e){function t(t){var n=i.getLevel(t);if(!n)throw new Error("Unknown level #"+t);var o=new Game(n),a=document.createElement("div");a.classList.add("board-wrapper"),a.id="level_"+t;var s=new HTMLBoard({game:o,container:a});e.container.appendChild(a),r.push({level:n,game:o,htmlBoard:s,boardDiv:a})}function n(){for(var e=0,n=i.getNumberOfLevels();n>e;e++)t(e);window.onresize=function(){for(var e=0;e<r.length;e++)r[e].htmlBoard.reset();o()}}function o(){var t=r[s].game,n=r[s].boardDiv,o=e.container.parentNode,i=r[s].htmlBoard,a=i.getTileSize(),c=o.clientWidth,d=t.getBoard().getWidth()*i.getTileSize(),u=n.offsetLeft,g=l*a,m=(c-d)/2,X=0;X=0>m?c-2*a>g?-u:-(u+l*a-c/2+a):-(u-(c-d)/2),e.container.style.transform="translate3d("+X+"px, 0, 0)",e.container.style.webkitTransform="translate3d("+X+"px, 0, 0)",e.container.style.MozTransform="translate3d("+X+"px, 0, 0)"}var i=new MapLoader,r=[],a=this;n();var s=null,l=0,c=null;this.playLevel=function(e){function t(){n.update(),c=requestAnimationFrame(t)}localStorage.level=e,s=e;var n=r[s].game,i=r[s].htmlBoard;i.enable(),t(),document.getElementById("title").innerHTML=n.getName(),n.on("object-moved",function(e){"mole"===e.type&&(l=e.to.x,o())}),n.on("princess-found",function(){localStorage.clear(),i.removeEventListeners(),setTimeout(function(){i.changeMoleLook("down")},400),setTimeout(function(){i.changeMoleLook("right")},800),setTimeout(function(){i.changeMoleLook("down")},1200),setTimeout(function(){i.changeMoleLook("right")},1600),setTimeout(function(){i.changeMoleLook("down")},2e3),setTimeout(function(){location.reload()},2400)}),n.on("game-won",function(e){console.log("Level won with "+e+" stars!"),setTimeout(function(){n.destroy(),i.disable(),cancelAnimationFrame(c),a.playLevel(s+1)},500)}),n.on("game-lost",function(){console.log("You lost :(")}),n.start(),l=0,o()},this.resetCurrentLevel=function(){var e=r[s].game;e.reset(),cancelAnimationFrame(c),this.playLevel(s)}}}(),function(){"use strict";var e=[];window.MapLoader=function(){this.getLevel=function(t){return e[t]||null},this.getNumberOfLevels=function(){return e.length}},e=[{name:"Just a wall",stars:[1],map:{width:7,height:7,tiles:new Array(50).join("X")}},{name:"Training",stars:[6,7,10],map:{width:7,height:7,tiles:"XXXXXXXXXXXXXXXXOXXXXS#*#O EXOOOO XXXXXXXXXXXXXXX"}},{name:"That's easy",stars:[15,17,20],map:{width:7,height:7,tiles:"XXXXXXXX###OOXX##O*#XS#### XX#O#O XX##*# EXXXXXXX"}},{name:"Rolling stones",stars:[25,29,31],map:{width:10,height:7,tiles:"XXXXXXXXXXXOOO#OOOOXX*OO#O##*XX#OO####OEX##### ##XS#OO##O##XXXXXXXXXXX"}},{name:"Two roads",stars:[1],map:{width:12,height:7,tiles:"XXXXXXXXXXXXX OX####O  XXOO #X#X*XOXS#O X*XO#O#XX*#    O O#XX##XX O# ##EXXXXXXXXXXXX"}},{name:"Heavy lifting",stars:[1],map:{width:10,height:7,tiles:"XXXXOXXXXXX ##OX  OXX ##O   OXX OOO#X #EXO##*OX  XS#O  *#  XXXXXXXXXXX"}},{name:"The End",stars:[1],map:{width:7,height:7,tiles:"XXXXXXXXXXXXXXXXXXXXXS O $ XXXX XXXXXXXXXXXXXXXXX"}}]}(),function(){"use strict";var e={S:"start",E:"end",X:"wall","#":"dirt",O:"rock","@":"mole","*":"bug",$:"princess"," ":"empty"},t=0;window.Tile=function(n,o,i){if(this._id=t++,this._x=n,this._y=o,!e[i])throw'Unknown type of tile: "'+i+'".';this._symbol=i,this._type=e[i]},Tile.prototype.set=function(e){this._id=e._id,this._type=e._type},Tile.prototype.setEmpty=function(){this._id=null,this._type="empty"},Tile.prototype.getId=function(){return this._id},Tile.prototype.getX=function(){return this._x},Tile.prototype.getY=function(){return this._y},Tile.prototype.getType=function(){return this._type},Tile.prototype.setType=function(e){this._type=e}}(),function(){"use strict";function e(e){e.parentNode.replaceChild(e.cloneNode(!0),e)}function t(e,n){var o=e.parentNode;return o&&o.tagName?o.tagName.toLowerCase()==n?o:t(o,n):!1}function n(e){for(;e.hasChildNodes();)e.removeChild(e.lastChild)}window.DOMHelper={unbindAllEvents:e,getParentByTagName:t,purgeElement:n}}(),function(){"use strict";window.EventListenersManager=function(e){function t(){var t,o;for(t in e)e.hasOwnProperty(t)&&(o=e[t],n[o]=[])}var n={};t(),this.trigger=function(e,t){if(void 0===n[e])throw'Unknown event "'+e+'"';for(var o=0,i=n[e].length;i>o;o++)n[e][o](t)},this.addEventListener=function(e,t){if(void 0===n[e])throw'Unknown event "'+e+'"';if("function"!=typeof t)throw"Second argument must be a function.";n[e].push(t)},this.removeEventListener=function(e,t){if(e&&void 0===n[e])throw'Unknown event "'+e+'"';if(!e)return n=[],void 0;if(t){for(var o in n[e])if(n[e].hasOwnProperty(o)&&n[e][o]===t){n[e].splice(o,1);break}}else n[e]=[]}}}(),"serviceWorker"in navigator&&navigator.serviceWorker.register("/TheMoleGame/serviceworker.js",{scope:"/TheMoleGame/"}),function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),o=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+o)},o);return e=n+o,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}();