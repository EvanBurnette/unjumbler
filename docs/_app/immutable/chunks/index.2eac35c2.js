function E(){}function U(t,e){for(const n in e)t[n]=e[n];return t}function B(t){return t()}function k(){return Object.create(null)}function g(t){t.forEach(B)}function O(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let b;function ht(t,e){return b||(b=document.createElement("a")),b.href=e,t===b.href}function V(t){return Object.keys(t).length===0}function q(t,...e){if(t==null)return E;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function mt(t){let e;return q(t,n=>e=n)(),e}function pt(t,e,n){t.$$.on_destroy.push(q(e,n))}function yt(t,e,n,i){if(t){const r=G(t,e,n,i);return t[0](r)}}function G(t,e,n,i){return t[1]&&i?U(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)o[u]=e.dirty[u]|r[u];return o}return e.dirty|r}return e.dirty}function xt(t,e,n,i,r,o){if(r){const s=G(e,n,i,o);t.p(s,r)}}function bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function $t(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Et(t){const e={};for(const n in t)e[n]=!0;return e}function Tt(t,e,n){return t.set(n),e}let N=!1;function X(){N=!0}function Y(){N=!1}function Z(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function tt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const l=e[c].claim_order,f=(r>0&&e[n[r]].claim_order<=l?r+1:Z(1,r,x=>e[n[x]].claim_order,l))-1;i[c]=n[f]+1;const a=f+1;n[a]=c,r=Math.max(a,r)}const o=[],s=[];let u=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);u>=c;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);o.reverse(),s.sort((c,l)=>c.claim_order-l.claim_order);for(let c=0,l=0;c<s.length;c++){for(;l<o.length&&s[c].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;t.insertBefore(s[c],f)}}function et(t,e){if(N){for(tt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function nt(t,e,n){t.insertBefore(e,n||null)}function it(t,e,n){N&&!n?et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function T(t){t.parentNode&&t.parentNode.removeChild(t)}function Nt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function R(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function M(t){return document.createTextNode(t)}function vt(){return M(" ")}function wt(){return M("")}function At(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Mt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function rt(t){return Array.from(t.childNodes)}function F(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,r=!1){F(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const c=n(u);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const c=n(u);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function I(t,e,n,i){return W(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||o.push(u.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function St(t,e,n){return I(t,e,n,R)}function Ht(t,e,n){return I(t,e,n,z)}function st(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>M(e),!0)}function Lt(t){return st(t," ")}function j(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function kt(t,e){const n=j(t,"HTML_TAG_START",0),i=j(t,"HTML_TAG_END",n);if(n===i)return new C(void 0,e);F(t);const r=t.splice(n,i-n+1);T(r[0]),T(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new C(o,e)}function jt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ct(t,e){t.value=e??""}function Dt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Pt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}class ct{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=z(n.nodeName):this.e=R(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)nt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(T)}}class C extends ct{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)it(this.t,this.n[n],e)}}function Bt(t,e){return new t(e)}let y;function p(t){y=t}function S(){if(!y)throw new Error("Function called outside component initialization");return y}function Ot(t){S().$$.on_mount.push(t)}function qt(t){S().$$.after_update.push(t)}function Gt(t){S().$$.on_destroy.push(t)}function Rt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],D=[];let m=[];const P=[],J=Promise.resolve();let w=!1;function K(){w||(w=!0,J.then(Q))}function zt(){return K(),J}function A(t){m.push(t)}const v=new Set;let d=0;function Q(){if(d!==0)return;const t=y;do{try{for(;d<h.length;){const e=h[d];d++,p(e),lt(e.$$)}}catch(e){throw h.length=0,d=0,e}for(p(null),h.length=0,d=0;D.length;)D.pop()();for(let e=0;e<m.length;e+=1){const n=m[e];v.has(n)||(v.add(n),n())}m.length=0}while(h.length);for(;P.length;)P.pop()();w=!1,v.clear(),p(t)}function lt(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(A)}}function ot(t){const e=[],n=[];m.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),m=e}const $=new Set;let _;function Ft(){_={r:0,c:[],p:_}}function Wt(){_.r||g(_.c),_=_.p}function ut(t,e){t&&t.i&&($.delete(t),t.i(e))}function It(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Jt(t){t&&t.c()}function Kt(t,e){t&&t.l(e)}function at(t,e,n,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),i||A(()=>{const s=t.$$.on_mount.map(B).filter(O);t.$$.on_destroy?t.$$.on_destroy.push(...s):g(s),t.$$.on_mount=[]}),o.forEach(A)}function ft(t,e){const n=t.$$;n.fragment!==null&&(ot(n.after_update),g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _t(t,e){t.$$.dirty[0]===-1&&(h.push(t),K(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Qt(t,e,n,i,r,o,s,u=[-1]){const c=y;p(t);const l=t.$$={fragment:null,ctx:[],props:o,update:E,not_equal:r,bound:k(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:k(),dirty:u,skip_bound:!1,root:e.target||c.$$.root};s&&s(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,x,...H)=>{const L=H.length?H[0]:x;return l.ctx&&r(l.ctx[a],l.ctx[a]=L)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](L),f&&_t(t,a)),x}):[],l.update(),f=!0,g(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){X();const a=rt(e.target);l.fragment&&l.fragment.l(a),a.forEach(T)}else l.fragment&&l.fragment.c();e.intro&&ut(t.$$.fragment),at(t,e.target,e.anchor,e.customElement),Y(),Q()}p(c)}class Ut{$destroy(){ft(this,1),this.$destroy=E}$on(e,n){if(!O(n))return E;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!V(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Nt as $,at as A,ft as B,mt as C,yt as D,et as E,xt as F,bt as G,gt as H,Et as I,U as J,$t as K,At as L,Rt as M,C as N,z as O,Pt as P,kt as Q,Ht as R,Ut as S,E as T,g as U,pt as V,Tt as W,ht as X,O as Y,Gt as Z,Ct as _,vt as a,q as a0,it as b,Lt as c,It as d,wt as e,Wt as f,ut as g,T as h,Qt as i,qt as j,R as k,St as l,rt as m,Mt as n,Ot as o,Dt as p,M as q,st as r,dt as s,zt as t,jt as u,Ft as v,D as w,Bt as x,Jt as y,Kt as z};