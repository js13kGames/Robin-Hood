(()=>{"use strict";class t{constructor(t=1/60,e,i=!1){this.at=0,this.lt=null,this.dt=t,this.t=e,i&&this.start(),this.p=this.s=!1}fireOnce(){this.queue(),this.s=!0}up(t){if(this.lt)for(this.at+=(t-this.lt)/1e3,this.at>1&&(this.at=1);this.at>this.dt;){this.t.update(Math.floor(t/1e3)),this.at-=this.dt;break}this.lt=t,this.s||this.queue()}togglePause(){this.p=!this.p}queue(){requestAnimationFrame((t=>{this.up(t)}))}start(){this.s=!1,this.queue()}stop(){this.s=!0}}class e{constructor(t){this.main=t,this.Objects=[]}update(t){this.time=t,[...this.Objects].forEach((e=>{e.update&&e.update(t)})),this.Objects=this.Objects.filter((t=>!t.delete))}draw(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height),[...this.Objects].forEach((e=>{e.draw&&e.draw(t)}))}ss(t){this.main.previousScene=this.main.scene,t.main=this.main,this.main.toScene(t)}prevss(t){this.main.toScene(this.main.previousScene),this.main.previousScene=t}notify(t){let e=t.name,i=t.event;"keydown"==e&&this.keydown?this.keydown(i):"keyup"==e&&this.keyup?this.keyup(i):"mousemove"==e&&this.mousemove?this.mousemove(i):"click"==e&&this.click?this.click(i):"control"==e&&this.control?this.control(i.key):"controlts"==e&&this.controlts?this.controlts(i.key):"controlte"==e&&this.controlte?this.controlte(i.key):console.log(e)}mousemove(t){}keyup(t){this.control(t.key)}}const i=Math.PI,s=(t,e=document)=>e.querySelector(t),r=t=>t<0?-t:t,a=(t=1,e=0)=>e+(t-e)*Math.random(),h=(t=1,e=0)=>0|a(t,e),n=(t=0,e=0)=>{let i=document.createElement("canvas");return i.width=t,i.height=e,i},o=t=>t.getContext("2d"),c=(t,e,i,s)=>t+e+i+s==0?null:t+e+i==0||t>255||e>255||i>255?"#000000":"#"+((t<<16)+(e<<8)+i).toString(16).padStart(6,"0"),l=(t,e,s=!0)=>((t,e,i=!0)=>{let s,r;var a,h;i&&e%(Math.PI/4)!=0?(a=t.width,h=t.height,s=r=Math.sqrt(a*a+h*h)):(s=t.width,r=t.height);const c=n(s,r),l=o(c),d={x:s/2,y:r/2};return l.imageSmoothingQuality="high",l.save(),l.translate(d.x,d.y),l.rotate(e),l.drawImage(t,0,0,t.width,t.height,-t.width/2,-t.height/2,t.width,t.height),l.restore(),c})(t,(e%=8)*i/4,s),d=(t,e,i,s,r)=>{let a=n(s,r);return o(a).drawImage(t,e,i,s,r,0,0,s,r),a},u=(t,e=1,i=null)=>{let s=t.length,r=Math.max(...t.map((t=>t.length)));var a=n(r*e,s*e),h=o(a);for(let a=0;a<s;a++)for(let s=0;s<r;s++){var c=t[a][s];i&&(c=i(c)),c&&""!=c&&(h.fillStyle=c,h.fillRect(s*e,a*e,e,e))}return a},g=(t,e)=>{for(var i=o(t),s=t.width,r=t.height,a=i.getImageData(0,0,s,r).data,h=[],n=0;n<a.length;n+=4)h.push(c(a[n],a[n+1],a[n+2],a[n+3]));var l=[];for(let e=0;e<t.height;e++)l[e]=[];let d=0,u=0;for(let i=0;i<h.length;i++)d>=t.width&&(u++,d=0),l[u][d]=h[i],e&&(l[u][d]=e(l[u][d])),d++;return l};function m(t,e,i="source-atop"){let s=n(t.width,t.height),r=o(s);return r.drawImage(t,0,0),r.globalCompositeOperation=i,r.fillStyle=e,r.fillRect(0,0,s.width,s.height),s}const p=(t,e,i="source-atop")=>{let s=n(t.width,t.height),r=o(s);r.drawImage(t,0,0),r.globalCompositeOperation=i;for(let i=0;i<t.width/e.width;i++)for(let s=0;s<t.height/e.height;s++)r.drawImage(e,i*e.width,s*e.height);return s},w=0,f=1,y=2,v=3,b=4,x=5,S=6,T=7,I=(t,e=!0)=>{let i=n(t.width,t.height),s=o(i);return s.save(),e?(s.scale(-1,1),s.drawImage(t,0,0,-1*t.width,t.height)):(s.scale(1,-1),s.drawImage(t,0,0,t.width,-1*t.height)),s.restore(),i},A=t=>{var e=n(t[0].width,t[0].height),i=o(e);for(let e in t)i.drawImage(t[e],0,0);return e};function E(t,e){let i=n(t.width+e.width,t.height+e.height),s=o(i);return s.drawImage(t,0,0),s.drawImage(t,t.width,e.height),s.drawImage(e,t.width,0),s.drawImage(e,0,t.height),i}function M(t,e,i=0){0==i&&(i=e);var s=n(t.width*i,t.height*e),r=o(s);for(let s=0;s<e;s++)for(let e=0;e<i;e++)r.drawImage(t,e*t.width,s*t.height);return s}function k(t,e){let i=n(t.width,t.height),s=o(i);return s.globalAlpha=e,s.drawImage(t,0,0),s.globalAlpha=1,i}function C(t,e,i,s=!1){var r=n(e,i),a=o(r);return s&&a.fillRect(0,0,e,i),a.drawImage(t,e/2-t.width/2,i/2-t.height/2),r}function L(t){return t>1e9?parseInt(t/1e6)+"B":t>1e6?parseInt(t/1e6)+"M":t>1e3?parseInt(t/1e3)+"K":t}function P(t,e,i,r){let a=s("#spriteSheetMain");var h=d(a,8*t,8*e,8*i,8*r);return g(h,(t=>"#ffffff"===t?"":t))}class R{constructor(t={}){}static get(t,e,i,s,r="Arial",a=0,h=0){let c=o(n(1,1));c.font=e+"px "+r;const l=a||c.measureText(t).width||1,d=h||e+2;let u=n(parseInt(l),d);c=o(u),c.font=e+"px "+r,c.fillStyle=i,c.fillText(t,0,e-2),s&&(u=p(u,s));var g=n(u.width,u.height),m=o(g);return m.fillStyle="#ffffff",m.drawImage(u,0,0),g}}const O={dirt:P(0,0,1,1),grass:P(1,0,1,1),water:P(2,0,1,1),steel:P(3,0,1,1),brick:P(4,0,1,1),sword:P(0,1,1,1),bow:P(1,1,1,1),arrow:P(2,1,1,1),magic:P(3,1,1,1),tree:P(4,1,1,1),coin:P(0,2,1,1),apple:P(1,2,1,1),lemon:P(2,2,1,1),rabbit:P(0,3,1,1),wolf:P(1,3,2,1),castle:P(9,0,4,4),cave:P(3,2,2,2),player:P(0,4,2,2),playerb:P(2,4,2,2),players:P(4,4,1,2),playerh:P(5,4,1,2),wizzard:P(6,4,1,2),bear:P(7,4,2,2),deer:P(9,4,2,2),house:P(5,0,2,2),shop:P(5,2,2,2),npcman:P(7,0,2,2),npcgirl:P(7,2,2,2),direction:P(11,4,2,2),map_spawn:P(0,6,2,2),map_castle:P(2,6,2,2),map_forest_1:P(4,6,2,2),map_forest_2:P(6,6,2,2),map_forest_3:P(8,6,2,2),map_forest_4:P(10,6,2,2)},_={dirt:u(O.dirt,1),grass:u(O.grass,1),water:u(O.water,1),steel:u(O.steel,1),brick:u(O.brick,1),sword:u(O.sword,1),bow:u(O.bow,1),arrow:u(O.arrow,1),magic:u(O.magic,1),tree:u(O.tree,1),coin:u(O.coin,1),apple:u(O.apple,1),lemon:u(O.lemon,1),rabbit:u(O.rabbit,1),wolf:u(O.wolf,1),castle:u(O.castle,1),cave:u(O.cave,1),player:u(O.player,1),playerb:u(O.playerb,1),players:u(O.players,1),playerh:u(O.playerh,1),wizzard:u(O.wizzard,1),bear:u(O.bear,1),deer:u(O.deer,1),house:u(O.house,1),shop:u(O.shop,1),npcman:u(O.npcman,1),npcgirl:u(O.npcgirl,1),direction:u(O.direction,1),map_spawn:u(O.map_spawn,1),map_castle:u(O.map_castle,1),map_forest_1:u(O.map_forest_1,1),map_forest_2:u(O.map_forest_2,1),map_forest_3:u(O.map_forest_3,1),map_forest_4:u(O.map_forest_4,1)};u(O.castle,2),u(O.house,2),u(O.shop,2),u(O.cave,2);class D{constructor(t,e=2){this.scene=t;var i=u(O.castle,e),s=((t,e)=>{var i=g(t);const s=i.flat(),r=[...new Set(s)],a={};for(const t of r){a[t]=[];for(let e=0;e<i.length;e++){a[t].push([]);for(let s=0;s<i[e].length;s++)i[e][s]===t?a[t][e][s]="#000000":a[t][e][s]=null}}return delete a.null,a})(i),r=u(s["#6a6a6a"]),a=u(s["#c2c2c2"]),h=p(r,k(_.dirt,.5)),n=p(r,k(_.grass,.5)),o=p(r,k(_.water,.5)),c=p(r,k(_.brick,.5)),l=p(r,k(_.steel,.5)),d=p(r,k(_.magic,.5)),m=p(a,k(_.dirt,.2)),w=p(a,k(_.grass,.2)),f=p(a,k(_.water,.2)),y=p(a,k(_.brick,.2)),v=p(a,k(_.steel,.2)),b=p(a,k(_.magic,.2));this.dirt=A([i,m,h]),this.grass=A([i,w,n]),this.water=A([i,f,o]),this.brick=A([i,y,c]),this.steel=A([i,v,l]),this.magic=A([i,b,d])}update(t){this.time=t}}class H extends e{constructor(t){super(t);var e=_.dirt,i=_.steel,s=E(e,_.grass),r=E(i,e);this.castleObj=new D(this),this.player=u(O.player,2),this.gmat=function(t,e,i,s,r=1){r>1&&(t=M(t,r),e=M(e,r));let a=E(t,e);var h=n(a.width*s,a.height*i),c=o(h);for(let t=0;t<i;t++)for(let e=0;e<s;e++)c.drawImage(a,t*a.height,e*a.width);return h}(s,r,this.main.canvas.width/8,this.main.canvas.height/8),this.gmat=k(this.gmat,.2),this.log=this.getLogo(),this.buffer=this.getBuffer(),this.loading=-20,this.intro=this.getIntro()}getLogo(){var t=n(400,200),e=o(t),i=_.grass,s=_.dirt,r=_.water,a=_.steel,h=E(s,i),c=E(a,a),l=E(i,r),d=E(r,s);return this.TextSprites=[R.get("13th CENTURY™",20,"green",d,"Arial Black"),R.get("ROBIN➸HOOD ",40,"green",h,"Arial Black"),R.get("THE➸OUTLAW ",28,"green",c,"Arial Black"),R.get("★1370s∵∴∵∴∵∴∵∴∵∴∵∴∵2023★",15,"green",l,"Arial Black")],e.drawImage(m(this.TextSprites[0],"white"),0,1),e.drawImage(this.TextSprites[0],1,1),e.drawImage(m(this.TextSprites[1],"red"),1,18),e.drawImage(this.TextSprites[1],0,17),e.drawImage(m(this.TextSprites[2],"white"),85,53),e.drawImage(this.TextSprites[2],85,52),e.drawImage(this.TextSprites[3],82,82),t}getIntro(){var t=["you step into the legendary shoes of Robin Hood.","your mission is to make the world a better place.","- explore forest and hunt animals","- do quests and trade with merchants","- spread the wealth to the poor","- improve your stats and defend the village","a w s d / arrows for movement","e interact, q menue, space fire","explore forest hunt animal","trade with merchants","- give goodies to villagers for free (gain morale)","- take quests from villagers for extra love","find old wizzard for a magic bow","more instructions can be learned in game"],e=n(360,500);let i=o(e);i.fillStyle="white",i.font="16px Arial";for(let e=0;e<t.length;e++)i.fillText(t[e],0,25*e+20);return e}async prepareCanvas(){}update(t){this.time=t,this.loading+=.8}getBuffer(){let t=n(this.main.config.width,this.main.config.height),e=o(t);e.drawImage(this.gmat,0,0);var i=this.main.config.width<400?16:128;return e.drawImage(this.log,i,74),t}draw(t){let e=20;t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height),t.drawImage(this.buffer,0,0),t.fillStyle="green",t.font="16px Arial",t.fillText("Time "+this.time,20,e),e+=20,t.fillText("use any key to load menu ",20,e),e+=20,t.drawImage(this.castleObj.dirt,16,192),t.drawImage(this.castleObj.grass,88,192),t.drawImage(this.castleObj.water,160,192),t.drawImage(this.castleObj.brick,232,192),t.drawImage(this.castleObj.steel,304,192),t.drawImage(this.castleObj.magic,376,192),t.drawImage(this.player,16,320),t.drawImage(d(this.intro,0,this.loading%this.intro.height,this.intro.width,200),64,320)}goToMainMenuScene(){this.loading>100&&this.main.toMainMenuScene(),this.loading=100}control(t){this.goToMainMenuScene()}click(t){this.goToMainMenuScene()}keydown(t){this.goToMainMenuScene()}keyup(t){this.goToMainMenuScene()}}class q{constructor(t,e=300,i=!0,s=!0,r=3){this.notes=t,this.tempo=e,this.loop=r,this.pitch=s,this.playing=!1,this.audioContext=new AudioContext,this.originalNotes=this.notes,i&&this.start()}getPossibleNotes(){return["A","B","C","D","E"]}getPossibleNotesPitch(){return[1,2,3,4,5,6,7]}toggle(){this.playing?this.stop():this.start()}start(){this.playing=!0,this.playNextNote()}stop(){this.playing=!1}reset(){this.notes=this.originalNotes}getNoteFrequencyByLetter(t){switch(t){case"A":return 440;case"B":return 493.88;case"C":return 261.63;case"D":return 293.66;case"E":return 329.63;case"F":return 349.23;case"G":return 392}return 440}getFrequency(t){var e=this.getNoteFrequencyByLetter(t[0]);return t.length>1?e*Math.pow(2,t[1]/12):e}playNextNote(){if(!this.playing)return;if(0===this.notes.length&&this.loop>0&&(this.notes=this.originalNotes,this.loop--),0===this.notes.length)return this.stop();const t=this.notes[0];let e=1;this.pitch?(this.notes[1],this.notes=this.notes.slice(2)):this.notes=this.notes.slice(1);const i=this.audioContext.createOscillator(),s=this.audioContext.createGain();i.connect(s),s.connect(this.audioContext.destination),i.frequency.setValueAtTime(this.getFrequency(t),this.audioContext.currentTime),i.start(),s.gain.setValueAtTime(0,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(1,this.audioContext.currentTime+.02),setTimeout((()=>{s.gain.setValueAtTime(1,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+.02),i.stop(this.audioContext.currentTime+.02),this.playNextNote()}),60/this.tempo*1e3)}}class z extends e{constructor(t){super(t),this.sprites={steel:_.steel,water:_.water,grass:_.grass,dirt:_.dirt,magic:_.magic,player:_.player};var e=this.main.config.width<400?32:100;this.cursorLocations=[{x:e,y:128},{x:e,y:160},{x:e,y:192},{x:e,y:224},{x:e,y:256}],this.playername="robin hood",this.currentcursorloc=0,this.sound=!1,this.buffer=this.staticBuffer()}staticBuffer(){var t=n(this.main.config.width,this.main.config.height);return o(t),t}update(t){this.time=t}draw(t){let e=20;t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="green",t.font="16px Arial",t.drawImage(this.buffer,0,0),t.drawImage(R.get("█ ⓅⓁⒶⓎ ⒼⒶⓂⒺ",24,"green",this.sprites.grass,"Verdana"),this.cursorLocations[0].x+20,this.cursorLocations[0].y),t.drawImage(R.get("█ SOUND : "+(this.sound&&1==this.sound?"on":"off"),24,"green",this.sprites.water,"Verdana"),this.cursorLocations[1].x+20,this.cursorLocations[1].y),t.drawImage(R.get("█ Music : "+(this.musicPlayer&&this.musicPlayer.playing?"on":"off"),24,"green",this.sprites.water,"Verdana"),this.cursorLocations[2].x+20,this.cursorLocations[2].y),t.drawImage(R.get(`█ NAME : ${this.playername}`,24,"green",this.sprites.water,"Verdana"),this.cursorLocations[3].x+20,this.cursorLocations[3].y),t.drawImage(R.get("█ STATS ㋡",24,"green",this.sprites.dirt,"Roboto"),this.cursorLocations[4].x+20,this.cursorLocations[4].y),t.drawImage(this.sprites.player,this.cursorLocations[this.currentcursorloc].x,this.cursorLocations[this.currentcursorloc].y+4),t.fillText("Time "+this.time,20,e),e+=20}click(t){}control(t){if("s"===t||"ArrowDown"===t)this.currentcursorloc=r(this.currentcursorloc+1)%this.cursorLocations.length;else if("w"===t||"ArrowUp"===t)this.currentcursorloc=r(this.currentcursorloc-1)%this.cursorLocations.length;else if("a"===t||"ArrowLeft"===t||"d"===t||"ArrowRight"===t||"space"===t||" "===t)if(0==this.currentcursorloc)this.main.toGameScene();else if(1==this.currentcursorloc)this.sound?this.sound=!1:this.sound=!0;else if(2==this.currentcursorloc)this.musicPlayer||(this.musicPlayer=new q("E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4",120,!1,!0,2e3)),this.musicPlayer.toggle();else if(3==this.currentcursorloc){var e=prompt("name",this.playername);this.playername=e&&e.length>0?e.substring(0,10):this.playername}else 4==this.currentcursorloc&&(this.musicPlayer&&this.musicPlayer.stop(),alert("under construction"))}keydown(t){}keyup(t){this.control(t.key)}loadingNewGameScene(){}}class N{constructor(t,e){this.x=t,this.y=e}is(t){let e=this.x,i=this.y,s=t.x,r=t.y;return e==s&&i==r}distanceTo(t){if(!t)return 1/0;let e=this.x,i=this.y,s=t.x,r=t.y;if(e==s&&i==r)return 0;if(e==s)return Math.abs(i-r);if(i==r)return Math.abs(e-s);{let t=0;return t+=Math.pow(e-s,2),t+=Math.pow(i-r,2),t=Math.sqrt(t),t}}getAngleTo(t){let e=this.x,i=this.y,s=t.x,r=t.y;return e==s&&i==r?0:e==s&&i>r||i==r&&e<s||e==s&&i<r||i==r&&e>s||e<s&&i>r||e<s&&i<r||e>s&&i<r||e>s&&i>r?0*Math.PI/4:0}getDirectionTo(t){let e=this.x,i=this.y,s=t.x,r=t.y;return e==s&&i==r?b:e>s?S:e<s?y:i<r?b:i>r?w:b}moveClone(t,e){let i=this.clone();return i.move(t,e),i}move(t,e){t==w?this.y-=e:t==b?this.y+=e:t==S?this.x-=e:t==y?this.x+=e:t==T?(this.y-=e,this.x-=e):t==f?(this.y-=e,this.x+=e):t==v?(this.y+=e,this.x+=e):t==x&&(this.y+=e,this.x-=e)}moveAngleClone(t,e){t-=Math.PI/2;const i=e*Math.cos(t),s=e*Math.sin(t);return new N(this.x+i,this.y+s)}moveClone(t,e){let i=this.clone();return i.move(t,e),i}movetoward(t,e){let i=t.x-this.x,s=t.y-this.y,r=Math.sqrt(i*i+s*s),a=i/r||0,h=s/r||0;r<e?(this.x=t.x,this.y=t.y):(this.x+=a*e,this.y+=h*e)}movetowardGrid(t,e){t.x>this.x?this.x+=e:t.x<this.x?this.x-=e:t.y<this.y?this.y-=e:t.y>this.y&&(this.y+=e)}clone(){return new N(this.x,this.y)}draw(t,e="red"){t.fillStyle=e,this.drawCircle(t,3,e)}drawCircle(t,e=4,i="green"){t.fillStyle=i,t.strokeStyle=i,t.beginPath(),t.arc(this.x,this.y,e,0,2*Math.PI),t.fill()}}const B=[{mcd:15,attack:1,life:1,name:"rabbit"},{mcd:50,attack:4,life:5,name:"wolf"},{mcd:50,attack:10,life:8,name:"deer"},{mcd:50,attack:20,life:10,name:"bear"},{mcd:10,attack:15,life:10,name:"npcman"},{mcd:10,attack:10,life:10,name:"npcgirl"}];class V{constructor(t,e=0,i=null){this.type=e,this.scene=t,this.sprites=this.getSprites(),this.sprite=this.sprites[this.type],this.center=i||t.findAValidSpawnPoint(8,25),this.life=B[this.type].life,this.maxLife=B[this.type].life,this.moveCountDown=B[this.type].mcd}getPossibleNextMove(){let t=[];var e=this.scene.tileSize;let i=this.center.x/e,s=this.center.y/e;if(this.scene.checkObstacle(i+1,s)&&t.push(new N),this.scene.checkObstacle(i+1,s)&&t.push(new N(i*e+e,s*e)),this.scene.checkObstacle(i-1,s)&&t.push(new N(i*e-e,s*e)),this.scene.checkObstacle(i,s+1)&&t.push(new N(i*e,s*e+e)),this.scene.checkObstacle(i,s-1)&&t.push(new N(i*e,s*e-e)),t.length>0){var r=t[h(0,t.length)];this.center=new N(r.x,r.y)}}update(t){this.time=t,this.moveCountDown--,this.moveCountDown<=0&&(this.moveCountDown=B[this.type].mcd,this.getPossibleNextMove(),this.center.distanceTo(this.scene.player.center)<2*this.scene.tileSize&&(this.scene.player.life-=this.type+1,this.scene.player.showDamageEffect=10))}getHealthBar(){var t=n(this.sprite.width,3),e=o(t);e.fillStyle="green";var i=this.sprite.width*(this.life/this.maxLife);return e.fillRect(0,0,i,3),t}draw(t){t.drawImage(this.sprite,this.center.x,this.center.y),t.drawImage(this.getHealthBar(),this.center.x,this.center.y)}getSprites(){if(V.SPRITES)return V.SPRITES;var t=this.scene.scalemultiplier,e=this.scene.tileSize,i=C(u(O.rabbit,t),e,e,!1),s=C(u(O.wolf,t),e,e,!1),r=C(u(O.deer,t),e,e,!1),a=u(O.bear,t),h=u(O.npcman,t),n=u(O.npcgirl,t),o=u(O.sword,t);this.w=e,this.h=e;var c=[i,s,r,a,h,n,o];return V.SPRITES=c,V.SPRITES}}class F extends V{constructor(t,e=0,i=null){super(t,e,i)}draw(t){super.draw(t),t.drawImage(this.sprites[6],this.center.x+.65*this.sprite.width,this.center.y+.25*this.sprite.height)}}const G=[{n:"tree",o:1,c:"#0d3702"},{n:"brick",o:1,c:"#bf0a0a"},{n:"dirt",o:0,c:"#d9a066"},{n:"grass",o:0,c:"#99e550"},{n:"water",o:2,c:"#8a99f6"},{n:"steel",o:1,c:"#6a6a6a"},{n:"player",o:0,c:"#130c40"},{n:"army",o:0,c:"#ff0000"},{n:"cave",o:1,c:"#2e2b2b"},{n:"deerspawnpoint",o:0,c:"#df7126"},{n:"rabbitspawnpoint",o:0,c:"#d1d1d1"},{n:"wolfspawnpoint",o:0,c:"#898898"}];class j{constructor(t,e=1){this.gamescene=t,this.presetmobs=[],this.caves=[],this.deerspawnpoints=[],this.houseLocations=[],this.shopLocations=[],console.log(O),console.log(O.dirt),console.log(O.steel),console.log(_.dirt),this.getPredefinedMap1(e)}getColorAt(t,e){return t=Math.floor(t),e=Math.floor(e),t<0||t>this.colorMatrix.length-1||e<0||e>this.colorMatrix.length-1?null:this.colorMatrix[e][t]}isObstacleAt(t,e){if(t=Math.floor(t),e=Math.floor(e),t<0)return!0;if(t>this.colorMatrix.length-1)return!0;if(e<0)return!0;if(e>this.colorMatrix.length-1)return!0;if(!this.colorMatrix[t])return!0;var i=this.colorMatrix[e][t];return this.isObstacle(i)}isObstacle(t){var e=G.find((e=>e.c==t));return null==e?1:e.o}getPredefinedMap1(t=1){var e=_.map_spawn,i=_.map_castle,s=_.map_forest_1,r=_.map_forest_2,h=e.width,c=e.height,l=n(3*h,3*c);(f=o(l)).drawImage(r,0,0),f.drawImage(i,h,0),f.drawImage(s,h+h,0),f.drawImage(s,0,h),f.drawImage(e,h,h),f.drawImage(s,h+h,h),f.drawImage(s,0,h+h),f.drawImage(s,h,h+h),f.drawImage(s,h+h,h+h);var d=g(l);this.colorMatrix=d;for(var m={"#d9a066":M(_.dirt,2*t),"#bf0a0a":M(_.brick,2*t),"#99e550":M(_.grass,2*t),"#8a99f6":M(_.water,2*t),"#6a6a6a":M(_.steel,2*t),"#0d3702":u(O.tree,2*t),"#a9a9a9":u(O.castle,2*t),"#fbf236":u(O.house,2*t),"#eca732":u(O.shop,2*t),"#2e2b2b":u(O.cave,2*t)},p=16*t,w=n(d.length*p,d.length*p),f=o(w),y=0;y<d.length;y++)for(var v=0;v<d[y].length;v++){var b=d[v][y];f.drawImage(a()>.5?m["#d9a066"]:m["#99e550"],y*p,v*p),"#0d3702"==b?f.drawImage(m["#0d3702"],y*p,v*p):"#d9a066"==b?f.drawImage(m["#d9a066"],y*p,v*p):"#bf0a0a"==b?f.drawImage(m["#bf0a0a"],y*p,v*p):"#99e550"==b?f.drawImage(m["#99e550"],y*p,v*p):"#df7126"==b?(f.drawImage(m["#99e550"],y*p,v*p),this.deerspawnpoints.push([y,v])):"#8a99f6"==b?f.drawImage(m["#8a99f6"],y*p,v*p):"#6a6a6a"==b?f.drawImage(m["#6a6a6a"],y*p,v*p):"#a9a9a9"==b?this.castlelocation=new N(y*p,v*p):"#2e2b2b"==b?this.caves.push(new N(y*p,v*p)):"#fbf236"==b?this.houseLocations.push(new N(y*p,v*p)):"#eca732"==b?this.shopLocations.push(new N(y*p,v*p)):"#130c40"==b?(this.PLAYERLOCATION=new N(y*p,v*p),d[y][v]="#d9a066"):"#ff0000"==b?this.presetmobs.push(new F(this.gamescene,4,new N(y*this.gamescene.tileSize,v*this.gamescene.tileSize))):"#000000"==b||"#d1d1d1"==b||"#898898"==b||console.log(b,"unclassified")}f.drawImage(m["#a9a9a9"],this.castlelocation.x,this.castlelocation.y),this.houseLocations.forEach((t=>{f.drawImage(m["#fbf236"],t.x,t.y)})),this.shopLocations.forEach((t=>{f.drawImage(m["#eca732"],t.x,t.y)})),this.caves.forEach((t=>{f.drawImage(m["#2e2b2b"],t.x,t.y)})),this.mapcanvas=w}}class K{constructor(t,e,i,s,r){this.game=t,this.center=new N(0,0),this.h=i,this.w=e,this.ox=s,this.oy=r}fixToCords(t){this.center=new N(t.x,t.y)}mapToPoint(t){this.center=t}move(t){this.center.move(t,32)}getCanvas(t){var e={x:this.center.x-this.w/2,y:this.center.y-this.h/2};return d(t,e.x<0?0:e.x,e.y<0?0:e.y,this.w,this.h)}draw(t,e){let i,s,r,a,h,n,o,c,l=e;i=s=r=a=h=n=o=c=0;let d={x:this.center.x-this.w/2,y:this.center.y-this.h/2};i=d.x,s=d.y,i<=0&&(i=0,this.center.x=i+this.w/2),s<=0&&(s=0,this.center.y=s+this.h/2),i+this.w>l.width&&(i=l.width-this.w,this.center.x=i+this.w/2),s+this.h>l.height&&(s=l.height-this.h,this.center.y=s+this.h/2),h=this.ox,n=this.oy,r=o=this.w,a=c=this.h,t.drawImage(l,i,s,r,a,h,n,o,c)}getFxy(t,e){let i=t+this.center.x-this.w/2-this.ox,s=e+this.center.y-this.h/2-this.oy;return i=32*Math.floor(i/32)+16,s=32*Math.floor(s/32)+16,new N(i,s)}}class U{constructor(t){this.ARCHERY=8,this.HEALTH=1,this.POWER=1,this.SPEED=8,this.STELTH=1,this.LUCK=1}getAttributeClasses(){return[{n:"ARCHERY",s:this.ARCHERY,c:this.getAttributeClass(this.ARCHERY)},{n:"HEALTH",s:this.HEALTH,c:this.getAttributeClass(this.HEALTH)},{n:"POWER",s:this.POWER,c:this.getAttributeClass(this.POWER)},{n:"SPEED",s:this.SPEED,c:this.getAttributeClass(this.SPEED)},{n:"STELTH",s:this.STELTH,c:this.getAttributeClass(this.STELTH)},{n:"LUCK",s:this.LUCK,c:this.getAttributeClass(this.LUCK)}]}static getAttributeClass(t){return t<10?"G":t<20?"F":t<30?"E":t<40?"D":t<50?"C":t<60?"B":t<99?"A":"S"}static getClassMultiplier(t){switch(t.toUpperCase()){case"G":return 1;case"F":return 5;case"E":return 10;case"D":return 20;case"C":return 50;case"B":return 100;case"A":return 1e3;case"S":return 1/0}}}class Y{constructor(t){this.center=new N(t.x,t.y),this.life=1}draw(t){t.drawImage(this.sprite,this.center.x,this.center.y)}}class $ extends Y{constructor(t){super(t.center),this.e=t,this.direction=t.direction,this.sprites=this.getSprites(),this.sprite=this.sprites[this.direction],this.width=this.sprite.width,this.height=this.sprite.height,this.speed=this.width/4,this.distanceToTravel=this.e.attributes.ARCHERY*this.speed/2,this.movement=0,this.life=1}update(t){this.time=t,this.movement++,this.movement<this.distanceToTravel?(this.center.move(this.direction,this.speed),this.e.applyArrowEffect(this)):this.life=0}getSprites(){if($.SPRITES)return $.SPRITES;var t=this.e.scene.scalemultiplier,e=16*t,i=C(u(O.arrow,t),e,e),s=l(i,0),r=l(i,2),a=l(i,4),h=l(i,6);this.w=s.width,this.h=s.height;var n=[h,h,s,s,r,r,a,h];return $.SPRITES=n,$.SPRITES}}class W extends Y{constructor(t,e,i=1,s=0){super(e),this.scene=t,this.value=i,this.sprite=this.getCoinSprite()}update(t){this.time=t,this.center.distanceTo(this.scene.player.center)<1.5*this.scene.tileSize&&(this.scene.player.cash+=this.value,this.life=0)}draw(t){super.draw(t)}getCoinSprite(){if(W.CoinSprite)return W.CoinSprite;var t=this.scene.scalemultiplier,e=this.scene.tileSize,i=C(u(O.coin,t),e,e,!1);return W.CoinSprite=i,i}}class Q{constructor(t){this.scene=t,this.life=this.maxLife=100,this.score=0,this.cash=0,this.attributes=new U(1),this.center=new N(0,0),this.destination=new N(0,0),this.isMoving=!1,this.time=0,this.direction=b,this.sprites=this.getSprites(),this.sprite=this.sprites[b],this.shots=[],this.firecooldown=0,this.hunts=[],this.ArrowsCount=1e4}setPosition(t){this.center=new N(t.x,t.y),this.destination=new N(t.x,t.y)}update(t){this.firecooldown=Math.max(this.firecooldown-1,0),this.shots=this.shots.filter((t=>t.life>0)),[...this.shots].forEach((e=>{e.update&&e.update(t)})),this.time=t,0!=this.center.distanceTo(this.destination)?(this.isMoving=!0,this.center.movetoward(this.destination,this.attributes.SPEED)):(this.isMoving=!1,this.scene.camera.fixToCords(this.center))}fire(){this.firecooldown>0||(this.firecooldown=20-2*this.attributes.ARCHERY,this.ArrowsCount--,this.shots.push(new $(this)),this.playSwooshSound())}damageEffect(){this.showDamageEffect=10}useSword(){this.usingsword=10}applyArrowEffect(t){var e=t.center,i=this.scene.gamemap.isObstacleAt(e.x/this.scene.tileSize,e.y/this.scene.tileSize);1!=i&&1!=i||2==i||(t.life=0,this.playArrowHitSound());for(let e=0;e<this.scene.mobs.length;e++){var s=this.scene.mobs[e];if(s.center.distanceTo(t.center)<this.scene.tileSize){if(null==s.type)continue;s.life-=t.life,s.life<=0&&(this.scene.mobs.push(new W(this.scene,s.center,this.type+1)),4==s.type||5==s.type?this.score-=s.type+1:this.score+=s.type+1),this.playArrowHitSound(),t.life=0}}}getHealthBar(){var t=n(this.sprite.width,3),e=o(t);e.fillStyle="green",this.life<this.maxLife/2&&(e.fillStyle="orange"),this.life<this.maxLife/2&&(e.fillStyle="red");var i=this.sprite.width*(this.life/this.maxLife);return e.fillRect(0,0,i,3),t}draw(t){t.drawImage(this.sprite,this.center.x,this.center.y),this.direction==b&&t.drawImage(this.bow,this.center.x+this.sprite.width-this.bow.width,this.center.y+this.sprite.height-1.5*this.bow.height),this.direction==S&&t.drawImage(I(this.bow),this.center.x+this.sprite.width-1.6*this.bow.width,this.center.y+this.sprite.height-1.3*this.bow.height),this.direction==y&&t.drawImage(this.bow,this.center.x+this.sprite.width-1.2*this.bow.width,this.center.y+this.sprite.height-1.3*this.bow.height),[...this.shots].forEach((e=>{e.draw&&e.draw(t)})),t.drawImage(this.getHealthBar(),this.center.x,this.center.y),this.showDamageEffect>0&&(t.fillStyle="#ff0000aa",t.fillRect(this.center.x,this.center.y,this.sprite.width,this.sprite.height),this.showDamageEffect--)}rotateToward(t,e){var i=this.center.getDirectionTo(new N(t,e));this.direction=i,this.sprite=this.sprites[i]}moveTo(t,e){var i=this.center.getDirectionTo(new N(t,e));this.direction=i,0!=this.center.distanceTo(new N(t,e))&&(this.sprite=this.sprites[i],this.move(i))}move(t){t===this.direction?this.isMoving||(console.log("moving player"),this.destination.move(t,this.width)):this.direction=t}getSprites(){this.bow=u(O.bow,this.scene.scalemultiplier);var t=u(O.player,this.scene.scalemultiplier),e=u(O.playerb,this.scene.scalemultiplier),i=u(O.players,this.scene.scalemultiplier);return this.width=t.width,this.height=t.height,[e,e,i=C(i,this.width,this.height),t,t,t,I(i,!0),e]}getSprite(){return this.sprite}playSwooshSound(){const t=new(window.AudioContext||window.webkitAudioContext),e=t.createOscillator();e.type="sawtooth",e.frequency.setValueAtTime(500,t.currentTime);const i=t.createGain();i.gain.setValueAtTime(.2,t.currentTime);const s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(500,t.currentTime),e.connect(i),i.connect(s),s.connect(t.destination),e.start(),i.gain.exponentialRampToValueAtTime(.01,t.currentTime+.5),e.stop(t.currentTime+1)}playArrowHitSound(){const t=new(window.AudioContext||window.webkitAudioContext),e=t.createOscillator();e.type="square",e.frequency.setValueAtTime(400,t.currentTime);const i=t.createGain();i.gain.setValueAtTime(.2,t.currentTime);const s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(400,t.currentTime),e.connect(i),i.connect(s),s.connect(t.destination),e.start(),i.gain.exponentialRampToValueAtTime(.01,t.currentTime+.5),e.stop(t.currentTime+1)}}class J extends e{constructor(t){super(t),this.init()}init(){this.difficulity=1,this.scalemultiplier=2,this.tileSize=16*this.scalemultiplier,this.keyboard={},this.gamemap=new j(this,this.scalemultiplier),this.player=new Q(this),this.player.setPosition(this.gamemap.PLAYERLOCATION?this.gamemap.PLAYERLOCATION:new N(224,224)),this.camera=new K(this,this.main.config.width,this.main.config.height,0,0),this.camera.mapToPoint(this.player.center),this.playername="robin hood",this.mobs=[...this.gamemap.presetmobs],this.drops=[],this.validSpawnPointsForMobs=this.findValidSpawnPointInMap(),this.spawnPointsTest=this.findAllValidSpawnPoint()}haveEntityAt(t,e){var i=new N(t,e);for(let t=0;t<this.mobs.length;t++){var s=this.mobs[t];if(s.center.distanceTo(i)<this.tileSize)return s}return null}checkObstacle(t,e){}checkObstacle(t,e){return null!=this.haveEntityAt(t,e)||this.gamemap.isObstacleAt(t/this.tileSize,e/this.tileSize)}getBuffer(){var t=n(this.main.config.width,this.main.config.height);let e=o(t);e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillStyle="black",e.fillRect(0,0,e.canvas.width,e.canvas.height);var i=(t=>{if(!t)return null;let e=n(t.width,t.height);return o(e).drawImage(t,0,0),e})(this.gamemap.mapcanvas),s=o(i);[...this.mobs].forEach((t=>{t.draw&&t.draw(s)})),this.player.draw(s);var r=this.camera.getCanvas(i);return e.drawImage(r,0,0),t}update(t){this.time=t,this.mobs.length<35&&this._spawnMob(),[...this.mobs].forEach((e=>{e.update&&e.update(t)})),this.mobs=this.mobs.filter((t=>t.life>0)),this.player.update(t);for(let t in this.keyboard)this.keyboard[t]&&this.applyKeyboardKey(t);this.player.life<=0&&(alert("game over"),this.main.gamescene=null,this.main.toMainMenuScene())}_spawnMob(){if(this.mobs.length>35)return;let t=new V(this,h(0,3));this.mobs.push(t)}findValidSpawnPointInMap(){var t=[];for(let i=0;i<this.gamemap.colorMatrix.length;i++)for(let s=0;s<this.gamemap.colorMatrix.length;s++){var e=new N(i*this.tileSize,s*this.tileSize);this.gamemap.isObstacleAt(i,s)||t.push(e)}return t}findAValidSpawnPoint(t=8,e=13){var i=this.findAllValidSpawnPoint(t,e);return i.length>0?i[h(0,i.length)]:new N(this.tileSize,this.tileSize)}findAllValidSpawnPoint(t=8,e=13){var i=this.validSpawnPointsForMobs;i=(i=i.filter((e=>e.distanceTo(this.player.center)>this.tileSize*t))).filter((t=>t.distanceTo(this.player.center)<this.tileSize*e));var s=[];for(let t in i){var r=!0;for(let e=0;e<this.mobs.length;e++)if(this.mobs[e].center.distanceTo(new N(i[t].x,i[t].y))<this.tileSize){r=!1;break}r&&s.push(i[t])}return i}applyKeyboardKey(t){if(" "!==t&&"space"!==t||this.player.fire()," "!==t&&"f"!==t||this.player.useSword()," "===t||"e"===t);else if("q"===t)this.keyboard.q=!1,this.main.toMainMenuScene();else if(!this.player.isMoving){var e=this.player.center.clone(),i=!1;"s"===t||"ArrowDown"===t?(e.move(b,this.player.height),i=!0):"w"===t||"ArrowUp"===t?(e.move(w,this.player.height),i=!0):"d"===t||"ArrowRight"===t?(e.move(y,this.player.height),i=!0):"a"!==t&&"ArrowLeft"!==t||(e.move(S,this.player.height),i=!0),i&&(this.checkObstacle(e.x,e.y)?this.player.rotateToward(e.x,e.y):this.player.moveTo(e.x,e.y))}}draw(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="green",t.font="16px Arial",t.drawImage(this.getBuffer(),0,0),t.fillStyle="#004b52d6",t.fillRect(0,0,t.canvas.width,32),t.fillStyle="#ffffff",t.fillText("LIFE♥ "+this.player.life,15,15),t.fillText("SCORE "+this.player.score,15,30),t.fillText("Arrows    ➹ "+L(this.player.ArrowsCount),192,15),t.fillText("Cash      Ֆ "+L(this.player.cash),192,30)}click(t){}control(t){this.applyKeyboardKey(t)}keydown(t){this.keyboard[t.key]=!0}keyup(t){this.keyboard[t.key]=!1}}class X{constructor(t){return this.target=t,this.subscribers=[],!!t.addEventListener&&(["click","keydown","keyup","mousemove"].forEach((e=>{t.addEventListener(e,(t=>{this.fireEvent({name:e,event:t})}))})),!0)}sub(t){this.subscribers.push(t)}clear(){this.subscribers=[]}fireEvent(t){var e=this.subscribers;for(var i in e)e[i].notify&&e[i].notify(t)}}class Z{constructor(e){this.config=e,this.container=document.querySelector(e.container),this.canvas=Object.assign(document.createElement("canvas"),{width:e.width,height:e.height,className:"gamecanvas"}),this.container.appendChild(this.canvas),this.eventManager=new X(document),this.toLoadingScene(),this.Timer=new t(e.framerate,this,!0),this.enablePhoneControls()}update(t){if(0==this.Timer.p)if(this.time=t,this.framesPassedTillNow++,this.timeHMS=this.timeInHourFormat(t),this.scene)try{this.scene.update(t),this.scene.draw(o(this.canvas))}catch(t){console.log(t),this.Timer.stop()}else this.Timer.stop()}timeInHourFormat(t){let e=Math.floor(t/60),i=Math.floor(e/60);return e=Math.floor(e%60),`${i<10?"0":""}${i}:${e<10?"0":""}${e}:${(t=Math.floor(t%60))<10?"0":""}${t}`}toLoadingScene(){this.scene=new H(this),this.eventManager.clear(),this.eventManager.sub(this.scene)}toScene(t){this.scene=t,this.eventManager.clear(),this.eventManager.sub(this.scene)}toMainMenuScene(){this.mainmenuscene||(this.mainmenuscene=new z(this)),this.scene=this.mainmenuscene,this.eventManager.clear(),this.eventManager.sub(this.scene)}toGameScene(){this.gamescene||(this.gamescene=new J(this)),this.scene=this.gamescene,this.eventManager.clear(),this.eventManager.sub(this.scene)}enablePhoneControls(){if(!(this.config.width>400)){var t=Object.assign(document.createElement("div"),{className:"controls_container"});t.innerHTML="<table>\n        <tr><td id='q'>q</td><td id='w'>w</td><td id='e'>e</td><td class=\"padding\"></td><td id='space'>space</td> </tr>\n        <tr><td id='a'>a</td><td id='s'>s</td><td id='d'>d</td><td class=\"padding\"></td><td id='f'>f</td></tr></table>",this.container.appendChild(t);var e=((t,e=document)=>e.querySelectorAll(t))(".controls_container td");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(i=>{this.eventManager.fireEvent({name:"control",event:{key:e[t].id}})})),e[t].addEventListener("touchstart",(i=>{this.eventManager.fireEvent({name:"controlts",event:{key:e[t].id}})})),e[t].addEventListener("touchend",(i=>{this.eventManager.fireEvent({name:"controlte",event:{key:e[t].id}})}))}}}const tt={container:".canvas_container",tile:32,aspect:1,framerate:1/15,width:32*parseInt(window.innerWidth/32),height:576,assets:"Assets",spritesheet:s("#spriteSheetMain")};class et extends Z{constructor(t){super(t)}}document.addEventListener("DOMContentLoaded",(function(){window.game||(window.game=new et(tt))}),!1)})();