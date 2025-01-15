import{D as A,a as g,L as R,O as U,e as b,f as J,u as h,j as N,b as K,c as X,g as Y,s as Z,h as C,n as I,i as E,k as ee}from"./index-xz5XbTwW.js";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class te extends A{constructor(e){super(),this.input=e}async iterator(){return(await this.input.iterator()).decodeUTF8().split(`
`).map(s=>(s.endsWith("\r")&&(s=s.slice(0,-1)),s))}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */const p='"',f=Symbol("out"),O=Symbol("field"),y=Symbol("quote"),x=Symbol("quoteafterquote"),D=Symbol("quoteinquote");class se extends A{async columnNames(){return this.columnNamesValidated||await this.setColumnNames(),this.configuredColumnsOnly?Object.keys(this.columnConfigs):this.fullColumnNames}async setColumnNames(){const e=await this.maybeReadHeaderLine();if(!this.fullColumnNames&&!e)throw new Error("Column names must be provided if there is no header line.");this.fullColumnNames&&e&&g(e.length===this.fullColumnNames.length,()=>"The length of provided columnNames ("+this.fullColumnNames.length.toString()+") does not match the length of the header line read from file ("+e.length.toString()+")."),this.fullColumnNames||(this.fullColumnNames=e);const t=this.fullColumnNames.reduce((s,o)=>(s[o]=s[o]+1||1,s),{}),r=Object.keys(t).filter(s=>t[s]>1);if(g(r.length===0,()=>"Duplicate column names found: "+r.toString()),this.columnConfigs){for(const s of Object.keys(this.columnConfigs))if(this.fullColumnNames.indexOf(s)===-1)throw new Error('The key "'+s+'" provided in columnConfigs does not match any of the column names ('+this.fullColumnNames.toString()+").")}this.columnNamesValidated=!0}async maybeReadHeaderLine(){if(this.hasHeader){const t=await(await this.base.iterator()).next();if(t.done)throw new Error("No data was found for CSV parsing.");const r=t.value;return this.parseRow(r,!1)}else return null}constructor(e,t){super(),this.input=e,this.hasHeader=!0,this.fullColumnNames=null,this.columnNamesValidated=!1,this.columnConfigs=null,this.configuredColumnsOnly=!1,this.delimiter=",",this.delimWhitespace=!1,this.base=new te(e),t||(t={}),this.hasHeader=t.hasHeader!==!1,this.fullColumnNames=t.columnNames,this.columnConfigs=t.columnConfigs,this.configuredColumnsOnly=t.configuredColumnsOnly,t.delimWhitespace?(g(t.delimiter==null,()=>"Delimiter should not be provided when delimWhitespace is true."),this.delimWhitespace=!0,this.delimiter=" "):this.delimiter=t.delimiter?t.delimiter:","}async iterator(){this.columnNamesValidated||await this.setColumnNames();let e=await this.base.iterator();return this.hasHeader&&(e=e.skip(1)),e.map(t=>this.makeDataElement(t))}makeDataElement(e){const t=this.parseRow(e),r={},s={};for(let o=0;o<this.fullColumnNames.length;o++){const l=this.fullColumnNames[o],a=this.columnConfigs?this.columnConfigs[l]:null;if(!(this.configuredColumnsOnly&&!a)){const u=t[o];let c=null;if(u==="")if(a&&a.default!==void 0)c=a.default;else{if(a&&(a.required||a.isLabel))throw new Error(`Required column ${l} is empty in this line: ${e}`);c=void 0}else{const m=Number(u);if(isNaN(m))a&&a.dtype==="bool"?c=this.getBoolean(u):c=u;else if(!a||!a.dtype)c=m;else switch(a.dtype){case"float32":c=m;break;case"int32":c=Math.floor(m);break;case"bool":c=this.getBoolean(u);break;default:c=m}}a&&a.isLabel?s[l]=c:r[l]=c}}return Object.keys(s).length===0?r:{xs:r,ys:s}}getBoolean(e){return e==="1"||e.toLowerCase()==="true"?1:0}parseRow(e,t=!0){const r=[];let s=0;const o=e.length;let l=f;for(let a=0;a<o;a++)switch(l){case f:switch(e.charAt(a)){case p:s=a+1,l=y;break;case this.delimiter:if(s=a+1,this.delimiter===" "&&this.delimWhitespace)break;r.push(""),l=f;break;default:l=O,s=a;break}break;case O:switch(e.charAt(a)){case this.delimiter:r.push(e.substring(s,a)),l=f,s=a+1;break}break;case y:switch(e.charAt(a)){case p:l=x;break}break;case x:switch(e.charAt(a)){case this.delimiter:r.push(e.substring(s,a-1)),l=f,s=a+1;break;case p:l=y;break;default:l=D;break}break;case D:switch(e.charAt(a)){case p:l=y;break}break}if(l===x?r.push(e.substring(s,o-1)):r.push(e.substring(s)),t&&r.length!==this.fullColumnNames.length)throw new Error(`Invalid row in csv file. Should have ${this.fullColumnNames.length} elements in a row, but got ${r}`);return r}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class _{}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class v extends R{split(e){return new re(this,e)}}class re extends v{constructor(e,t){super(),this.upstream=e,this.impl=new ne(e,t)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class ne extends U{constructor(e,t){super(),this.upstream=e,this.separator=t,this.carryover=""}summary(){return`${this.upstream.summary()} -> Split('${this.separator}')`}async pump(){const e=await this.upstream.next();if(e.done)return this.carryover===""?!1:(this.outputQueue.push(this.carryover),this.carryover="",!0);const t=e.value.split(this.separator);t[0]=this.carryover+t[0];for(const r of t.slice(0,-1))this.outputQueue.push(r);return this.carryover=t[t.length-1],!0}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class ae extends R{decodeUTF8(){return new ie(this)}}class ie extends v{constructor(e){super(),this.upstream=e,this.impl=new oe(e)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class oe extends U{constructor(e){if(super(),this.upstream=e,b().get("IS_BROWSER"))this.decoder=new TextDecoder("utf-8");else{const{StringDecoder:t}=require("string_decoder");this.decoder=new t("utf8")}}summary(){return`${this.upstream.summary()} -> Utf8`}async pump(){const e=await this.upstream.next();let t;if(e.done)return!1;t=e.value;let r;return b().get("IS_BROWSER")?r=this.decoder.decode(t,{stream:!0}):r=this.decoder.write(Buffer.from(t.buffer)),this.outputQueue.push(r),!0}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class B extends ae{constructor(e,t={}){super(),this.file=e,this.options=t,g(e instanceof Uint8Array||(b().get("IS_BROWSER")?e instanceof File||e instanceof Blob:!1),()=>"FileChunkIterator only supports File, Blob and Uint8Array right now."),this.offset=t.offset||0,this.chunkSize=t.chunkSize||1024*1024}summary(){return`FileChunks ${this.file}`}async next(){return this.offset>=(this.file instanceof Uint8Array?this.file.byteLength:this.file.size)?{value:null,done:!0}:{value:await new Promise((t,r)=>{const s=this.offset+this.chunkSize;if(this.file instanceof Uint8Array)t(new Uint8Array(this.file.slice(this.offset,s)));else{const o=new FileReader;o.onload=a=>{let u=o.result;if(u instanceof ArrayBuffer&&(u=new Uint8Array(u)),!(u instanceof Uint8Array))return r(new TypeError("FileReader returned unknown type."));t(u)},o.onabort=a=>r(new Error("Aborted")),o.onerror=a=>r(new Error(a.type));const l=this.file.slice(this.offset,s);o.readAsArrayBuffer(l)}this.offset=s}),done:!1}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */async function le(n,e={},t){let r,s;typeof n=="string"?r=n:(r=n.url,s=ue(n));const o=await J(r,s);if(o.ok){const l=new Uint8Array(await o.arrayBuffer());return new B(l,e)}else throw new Error(o.statusText)}const ue=n=>({method:n.method,headers:n.headers,body:n.body,mode:n.mode,credentials:n.credentials,cache:n.cache,redirect:n.redirect,referrer:n.referrer,integrity:n.integrity});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */function M(n){return typeof n=="string"&&n.slice(0,7)==="file://"}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class ce extends _{constructor(e,t={}){super(),this.input=e,this.options=t}async iterator(){if(M(this.input)&&b().get("IS_NODE")){const e=require("fs");this.input=e.readFileSync(this.input.slice(7))}return new B(this.input,this.options)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class he extends _{constructor(e,t={}){super(),this.url=e,this.fileOptions=t}async iterator(){return M(this.url)?new ce(this.url,this.fileOptions).iterator():le(this.url,this.fileOptions)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */function me(n,e={}){return new se(new he(n),e)}const F=n=>new Promise(e=>setTimeout(e,n));function pe(){const n=h(i=>i.setModel),e=h(i=>i.xLabel),t=h(i=>i.yLabel),r=h(i=>i.setLoader),s=h(i=>i.setNormalisedFeatureMinMax),o=h(i=>i.setNormalisedLabelMinMax),l=h(i=>i.setTrainingLabelTensor),a=h(i=>i.setTrainingFeatureTensor),u=h(i=>i.setTestingFeatureTensor),c=h(i=>i.setTestingLabelTensor),m=h(i=>i.setPlottingPoints),W=h(i=>i.isDataLoaded),Q=h(i=>i.setIsDataLoaded),V=()=>{K(()=>{(async function(){r({isLoading:!0,status:"Loading data"}),await X();const i=me("/linear-regression/assets/kc_house_data.csv");await F(1e3),r({isLoading:!0,status:"Preparing model"}),Q(!0);const d=await Y(i,e,t).toArray();Z(d),m(d);const S=d.map(k=>k.x),$=C(S,[S.length,1]),L=d.map(k=>k.y),H=C(L,[L.length,1]),w=I($),T=I(H);s({min:w.min,max:w.max}),o({min:T.min,max:T.max});const[P,j]=E(w.tensor,[.5,.5],d.length);a(P),u(j);const[z,q]=E(T.tensor,[.5,.5],d.length);l(z),c(q);const G=ee();n(G),await F(1e3),r({isLoading:!1,status:""})})()})};return N.jsx("div",{children:N.jsx("button",{disabled:W,onClick:V,children:"Load Data"})})}export{pe as default};
