import{D as A,b,L as R,O as U,e as g,f as q,u as h,j as C,d as G,g as J,h as K,s as X,i as I,n as E,k as D}from"./index-DUAzpb7d.js";/**
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
 */class Y extends A{constructor(e){super(),this.input=e}async iterator(){return(await this.input.iterator()).decodeUTF8().split(`
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
 */const p='"',f=Symbol("out"),O=Symbol("field"),y=Symbol("quote"),x=Symbol("quoteafterquote"),F=Symbol("quoteinquote");class Z extends A{async columnNames(){return this.columnNamesValidated||await this.setColumnNames(),this.configuredColumnsOnly?Object.keys(this.columnConfigs):this.fullColumnNames}async setColumnNames(){const e=await this.maybeReadHeaderLine();if(!this.fullColumnNames&&!e)throw new Error("Column names must be provided if there is no header line.");this.fullColumnNames&&e&&b(e.length===this.fullColumnNames.length,()=>"The length of provided columnNames ("+this.fullColumnNames.length.toString()+") does not match the length of the header line read from file ("+e.length.toString()+")."),this.fullColumnNames||(this.fullColumnNames=e);const t=this.fullColumnNames.reduce((s,o)=>(s[o]=s[o]+1||1,s),{}),a=Object.keys(t).filter(s=>t[s]>1);if(b(a.length===0,()=>"Duplicate column names found: "+a.toString()),this.columnConfigs){for(const s of Object.keys(this.columnConfigs))if(this.fullColumnNames.indexOf(s)===-1)throw new Error('The key "'+s+'" provided in columnConfigs does not match any of the column names ('+this.fullColumnNames.toString()+").")}this.columnNamesValidated=!0}async maybeReadHeaderLine(){if(this.hasHeader){const t=await(await this.base.iterator()).next();if(t.done)throw new Error("No data was found for CSV parsing.");const a=t.value;return this.parseRow(a,!1)}else return null}constructor(e,t){super(),this.input=e,this.hasHeader=!0,this.fullColumnNames=null,this.columnNamesValidated=!1,this.columnConfigs=null,this.configuredColumnsOnly=!1,this.delimiter=",",this.delimWhitespace=!1,this.base=new Y(e),t||(t={}),this.hasHeader=t.hasHeader!==!1,this.fullColumnNames=t.columnNames,this.columnConfigs=t.columnConfigs,this.configuredColumnsOnly=t.configuredColumnsOnly,t.delimWhitespace?(b(t.delimiter==null,()=>"Delimiter should not be provided when delimWhitespace is true."),this.delimWhitespace=!0,this.delimiter=" "):this.delimiter=t.delimiter?t.delimiter:","}async iterator(){this.columnNamesValidated||await this.setColumnNames();let e=await this.base.iterator();return this.hasHeader&&(e=e.skip(1)),e.map(t=>this.makeDataElement(t))}makeDataElement(e){const t=this.parseRow(e),a={},s={};for(let o=0;o<this.fullColumnNames.length;o++){const l=this.fullColumnNames[o],n=this.columnConfigs?this.columnConfigs[l]:null;if(!(this.configuredColumnsOnly&&!n)){const u=t[o];let c=null;if(u==="")if(n&&n.default!==void 0)c=n.default;else{if(n&&(n.required||n.isLabel))throw new Error(`Required column ${l} is empty in this line: ${e}`);c=void 0}else{const m=Number(u);if(isNaN(m))n&&n.dtype==="bool"?c=this.getBoolean(u):c=u;else if(!n||!n.dtype)c=m;else switch(n.dtype){case"float32":c=m;break;case"int32":c=Math.floor(m);break;case"bool":c=this.getBoolean(u);break;default:c=m}}n&&n.isLabel?s[l]=c:a[l]=c}}return Object.keys(s).length===0?a:{xs:a,ys:s}}getBoolean(e){return e==="1"||e.toLowerCase()==="true"?1:0}parseRow(e,t=!0){const a=[];let s=0;const o=e.length;let l=f;for(let n=0;n<o;n++)switch(l){case f:switch(e.charAt(n)){case p:s=n+1,l=y;break;case this.delimiter:if(s=n+1,this.delimiter===" "&&this.delimWhitespace)break;a.push(""),l=f;break;default:l=O,s=n;break}break;case O:switch(e.charAt(n)){case this.delimiter:a.push(e.substring(s,n)),l=f,s=n+1;break}break;case y:switch(e.charAt(n)){case p:l=x;break}break;case x:switch(e.charAt(n)){case this.delimiter:a.push(e.substring(s,n-1)),l=f,s=n+1;break;case p:l=y;break;default:l=F;break}break;case F:switch(e.charAt(n)){case p:l=y;break}break}if(l===x?a.push(e.substring(s,o-1)):a.push(e.substring(s)),t&&a.length!==this.fullColumnNames.length)throw new Error(`Invalid row in csv file. Should have ${this.fullColumnNames.length} elements in a row, but got ${a}`);return a}}/**
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
 */class v extends R{split(e){return new ee(this,e)}}class ee extends v{constructor(e,t){super(),this.upstream=e,this.impl=new te(e,t)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class te extends U{constructor(e,t){super(),this.upstream=e,this.separator=t,this.carryover=""}summary(){return`${this.upstream.summary()} -> Split('${this.separator}')`}async pump(){const e=await this.upstream.next();if(e.done)return this.carryover===""?!1:(this.outputQueue.push(this.carryover),this.carryover="",!0);const t=e.value.split(this.separator);t[0]=this.carryover+t[0];for(const a of t.slice(0,-1))this.outputQueue.push(a);return this.carryover=t[t.length-1],!0}}/**
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
 */class se extends R{decodeUTF8(){return new re(this)}}class re extends v{constructor(e){super(),this.upstream=e,this.impl=new ne(e)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class ne extends U{constructor(e){if(super(),this.upstream=e,g().get("IS_BROWSER"))this.decoder=new TextDecoder("utf-8");else{const{StringDecoder:t}=require("string_decoder");this.decoder=new t("utf8")}}summary(){return`${this.upstream.summary()} -> Utf8`}async pump(){const e=await this.upstream.next();let t;if(e.done)return!1;t=e.value;let a;return g().get("IS_BROWSER")?a=this.decoder.decode(t,{stream:!0}):a=this.decoder.write(Buffer.from(t.buffer)),this.outputQueue.push(a),!0}}/**
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
 */class B extends se{constructor(e,t={}){super(),this.file=e,this.options=t,b(e instanceof Uint8Array||(g().get("IS_BROWSER")?e instanceof File||e instanceof Blob:!1),()=>"FileChunkIterator only supports File, Blob and Uint8Array right now."),this.offset=t.offset||0,this.chunkSize=t.chunkSize||1024*1024}summary(){return`FileChunks ${this.file}`}async next(){return this.offset>=(this.file instanceof Uint8Array?this.file.byteLength:this.file.size)?{value:null,done:!0}:{value:await new Promise((t,a)=>{const s=this.offset+this.chunkSize;if(this.file instanceof Uint8Array)t(new Uint8Array(this.file.slice(this.offset,s)));else{const o=new FileReader;o.onload=n=>{let u=o.result;if(u instanceof ArrayBuffer&&(u=new Uint8Array(u)),!(u instanceof Uint8Array))return a(new TypeError("FileReader returned unknown type."));t(u)},o.onabort=n=>a(new Error("Aborted")),o.onerror=n=>a(new Error(n.type));const l=this.file.slice(this.offset,s);o.readAsArrayBuffer(l)}this.offset=s}),done:!1}}}/**
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
 */async function ae(r,e={},t){let a,s;typeof r=="string"?a=r:(a=r.url,s=ie(r));const o=await q(a,s);if(o.ok){const l=new Uint8Array(await o.arrayBuffer());return new B(l,e)}else throw new Error(o.statusText)}const ie=r=>({method:r.method,headers:r.headers,body:r.body,mode:r.mode,credentials:r.credentials,cache:r.cache,redirect:r.redirect,referrer:r.referrer,integrity:r.integrity});/**
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
 */function V(r){return typeof r=="string"&&r.slice(0,7)==="file://"}/**
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
 */class oe extends _{constructor(e,t={}){super(),this.input=e,this.options=t}async iterator(){if(V(this.input)&&g().get("IS_NODE")){const e=require("fs");this.input=e.readFileSync(this.input.slice(7))}return new B(this.input,this.options)}}/**
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
 */class le extends _{constructor(e,t={}){super(),this.url=e,this.fileOptions=t}async iterator(){return V(this.url)?new oe(this.url,this.fileOptions).iterator():ae(this.url,this.fileOptions)}}/**
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
 */function ue(r,e={}){return new Z(new le(r),e)}const ce=r=>new Promise(e=>setTimeout(e,r));function de(){const r=h(i=>i.xLabel),e=h(i=>i.yLabel),t=h(i=>i.setLoader),a=h(i=>i.setNormalisedFeatureMinMax),s=h(i=>i.setNormalisedLabelMinMax),o=h(i=>i.setTrainingLabelTensor),l=h(i=>i.setTrainingFeatureTensor),n=h(i=>i.setTestingFeatureTensor),u=h(i=>i.setTestingLabelTensor),c=h(i=>i.setPlottingPoints),m=h(i=>i.isDataLoaded),M=h(i=>i.setIsDataLoaded),S=h(i=>i.setTerminalText),W=()=>{G(()=>{(async function(){t({isLoading:!0,status:"Loading data from CSV"}),await J();const i=ue("/linear-regression/assets/kc_house_data.csv"),d=await K(i,r,e).toArray();X(d),c(d);const L=d.map(k=>k.x),Q=I(L,[L.length,1]),N=d.map(k=>k.y),$=I(N,[N.length,1]),w=E(Q),T=E($);a({min:w.min,max:w.max}),s({min:T.min,max:T.max});const[H,P]=D(w.tensor,[.5,.5],d.length);l(H),n(P);const[j,z]=D(T.tensor,[.5,.5],d.length);o(j),u(z),await ce(1e3),t({isLoading:!1,status:""}),M(!0),S("Data loaded"),S("Data shuffled and splitted")})()})};return C.jsx("div",{children:C.jsx("button",{title:"Load data from CSV",disabled:m,onClick:W,children:"Load Data"})})}export{de as default};
