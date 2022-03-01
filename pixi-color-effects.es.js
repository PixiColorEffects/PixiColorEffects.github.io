import { Filter, filters as filters$1, utils, Texture } from "pixi.js";
var fragment$q = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;void main(){vec4 col=texture2D(uSampler,vTextureCoord.xy);vec3 color=col.rgb;float luminance=color.r*0.299+color.g*0.587+color.b*0.114;float mn=min(min(color.r,color.g),color.b);float mx=max(max(color.r,color.g),color.b);float sat=(1.0-(mx-mn))*(1.0-mx)*luminance*5.0;vec3 lightness=vec3((mn+mx)/2.0);color=mix(color,mix(color,lightness,-value),sat);gl_FragColor=vec4(mix(color,lightness,(1.0-lightness)*(1.0-value)/2.0*abs(value)),col.a);}";
class Vibrance extends Filter {
  constructor(value = 0) {
    super(null, fragment$q);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
  }
}
class Saturation extends Filter {
  constructor(value = 0) {
    super(null, null);
    this._colorMatrixFilter = new filters$1.ColorMatrixFilter();
    this.value = value;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._colorMatrixFilter.apply(filterManager, input, output, clearMode);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    let red = 2 * Number(value) / 3 + 1;
    let blue = -0.5 * (red - 1);
    this._colorMatrixFilter.matrix = [
      red,
      blue,
      blue,
      0,
      0,
      blue,
      red,
      blue,
      0,
      0,
      blue,
      blue,
      red,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this.uniforms.value = value;
  }
}
var fragment$p = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;void main(){vec4 color=texture2D(uSampler,vTextureCoord);color.r=clamp(color.r+value,0.0,1.0);color.b=clamp(color.b-value,0.0,1.0);gl_FragColor=color;}";
class Temperature extends Filter {
  constructor(value = 0) {
    super(null, fragment$p);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value / 6;
  }
}
var fragment$o = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;void main(){vec4 color=texture2D(uSampler,vTextureCoord);color.g=clamp(color.g+value,0.0,1.0);gl_FragColor=color;}";
class Tint extends Filter {
  constructor(value = 0) {
    super(null, fragment$o);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value / 6;
  }
}
class Hue extends Filter {
  constructor(value = 0) {
    super(null, null);
    this._colorMatrixFilter = new filters$1.ColorMatrixFilter();
    this.value = value;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._colorMatrixFilter.apply(filterManager, input, output, clearMode);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this._colorMatrixFilter.reset();
    this._colorMatrixFilter.hue(value * 180, true);
    this.uniforms.value = value;
  }
}
class Brightness extends Filter {
  constructor(value = 0) {
    super(null, null);
    this._colorMatrixFilter = new filters$1.ColorMatrixFilter();
    this.value = value;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._colorMatrixFilter.apply(filterManager, input, output, clearMode);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this._colorMatrixFilter.brightness(value + 1, false);
    this.uniforms.value = value;
  }
}
var fragment$n = "#define GLSLIFY 1\nprecision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;const float epsilon=0.000001;const float mx=1.0-epsilon;const mat3 matRGBtoROMM=mat3(0.5293459296226501,0.3300727903842926,0.14058130979537964,0.09837432950735092,0.8734610080718994,0.028164653107523918,0.01688321679830551,0.11767247319221497,0.8654443025588989);const mat3 matROMMtoRGB=mat3(2.0340757369995117,-0.727334201335907,-0.3067416846752167,-0.22881317138671875,1.2317301034927368,-0.0029169507324695587,-0.008569774217903614,-0.1532866358757019,1.1618564128875732);float ramp(in float t){t*=2.0;if(t>=1.0){t-=1.0;t=log(0.5)/log(0.5*(1.0-t)+0.9332*t);}return clamp(t,0.001,10.0);}vec3 rgb2hsv(in vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 hsv2rgb(in vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}vec3 setHue(in vec3 res,in vec3 base){vec3 hsv=rgb2hsv(base);vec3 res_hsv=rgb2hsv(res);return hsv2rgb(vec3(hsv.x,res_hsv.y,res_hsv.z));}void main(){lowp vec4 col=texture2D(uSampler,vTextureCoord.xy);vec3 base=col.rgb*matRGBtoROMM;float a=abs(value)*col.a+epsilon;float v=pow(2.0,a*2.0+1.0)-2.0;float m=mx-exp(-v);vec3 res=(value>0.0)?(1.0-exp(-v*base))/m : log(1.0-base*m)/-v;res=mix(base,res,min(a*100.0,1.0));res=setHue(res,base);res=pow(res,vec3(ramp(1.0-(0.0*col.a+1.0)/2.0)));res=res*matROMMtoRGB;gl_FragColor=vec4(res,col.a);}";
class Exposure extends Filter {
  constructor(value = 0) {
    super(null, fragment$n);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
  }
}
class Contrast extends Filter {
  constructor(value = 0) {
    super(null, null);
    this._colorMatrixFilter = new filters$1.ColorMatrixFilter();
    this.value = value;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._colorMatrixFilter.apply(filterManager, input, output, clearMode);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this._colorMatrixFilter.contrast(value, false);
    this.uniforms.value = value;
  }
}
var fragment$m = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;void main(){float bval=value/255.0;float wval=(255.0/(255.0-value));vec3 color=texture2D(uSampler,vTextureCoord).rgb;color=color*wval-(bval*wval);gl_FragColor=vec4(color,texture2D(uSampler,vTextureCoord).a);}";
class Black extends Filter {
  constructor(value = 0) {
    super(null, fragment$m);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value * (255 / 2);
  }
}
var fragment$l = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;void main(){float bval=0.0/255.0;float wval=(255.0/(value-255.0)*-1.0);vec3 color=texture2D(uSampler,vTextureCoord).rgb;color=color*wval-(bval*wval);gl_FragColor=vec4(color,texture2D(uSampler,vTextureCoord).a);}";
class White extends Filter {
  constructor(value = 0) {
    super(null, fragment$l);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value * (255 / 2);
  }
}
var fragment$k = "#define GLSLIFY 1\nprecision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;const float epsilon=0.000001;const float mx=1.0-epsilon;const float PI=3.1415926535897932384626433832795;const mat3 matRGBtoROMM=mat3(0.5293459296226501,0.3300727903842926,0.14058130979537964,0.09837432950735092,0.8734610080718994,0.028164653107523918,0.01688321679830551,0.11767247319221497,0.8654443025588989);const mat3 matROMMtoRGB=mat3(2.0340757369995117,-0.727334201335907,-0.3067416846752167,-0.22881317138671875,1.2317301034927368,-0.0029169507324695587,-0.008569774217903614,-0.1532866358757019,1.1618564128875732);float luma_romm(in vec3 color){return dot(color,vec3(0.242655,0.755158,0.002187));}float luma(in vec3 color){return dot(color,vec3(0.298839,0.586811,0.11435));}vec3 rgb2hsv(in vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 hsv2rgb(in vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}vec3 setHue(in vec3 res,in vec3 base){vec3 hsv=rgb2hsv(base);vec3 res_hsv=rgb2hsv(res);return hsv2rgb(vec3(hsv.x,res_hsv.y,res_hsv.z));}float gaussian(in float x){return 1.0-exp(-PI*2.0*x*x);}void main(){lowp vec4 col=texture2D(uSampler,vTextureCoord.xy);lowp vec3 map=col.rgb;vec3 base=col.rgb*matRGBtoROMM;float base_lum=luma(col.rgb);float map_lum=luma_romm(map*matRGBtoROMM);float exposure=mix(value,0.0,1.0-map_lum)*col.a;float a=abs(exposure)*col.a+epsilon;float v=pow(2.0,a+1.0)-2.0;float m=mx-exp(-v);vec3 res=(exposure>0.0)?(1.0-exp(-v*base))/m : log(1.0-base*m)/-v;res=mix(base,res,min(a*100.0,1.0));res=setHue(res,base);res=res*matROMMtoRGB;gl_FragColor=vec4(res,col.a);}";
class Highlights extends Filter {
  constructor(value = 0) {
    super(null, fragment$k);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
  }
}
class Shadows extends Filter {
  constructor(value = 0) {
    super(null, fragment$k);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value * -1;
  }
}
var fragment$j = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform vec2 px;uniform float m[9];uniform float value;void main(void){vec4 c11=texture2D(uSampler,vTextureCoord-px);vec4 c12=texture2D(uSampler,vec2(vTextureCoord.x,vTextureCoord.y-px.y));vec4 c13=texture2D(uSampler,vec2(vTextureCoord.x+px.x,vTextureCoord.y-px.y));vec4 c21=texture2D(uSampler,vec2(vTextureCoord.x-px.x,vTextureCoord.y));vec4 c22=texture2D(uSampler,vTextureCoord);vec4 c23=texture2D(uSampler,vec2(vTextureCoord.x+px.x,vTextureCoord.y));vec4 c31=texture2D(uSampler,vec2(vTextureCoord.x-px.x,vTextureCoord.y+px.y));vec4 c32=texture2D(uSampler,vec2(vTextureCoord.x,vTextureCoord.y+px.y));vec4 c33=texture2D(uSampler,vTextureCoord+px);vec4 color=c11*m[0]+c12*m[1]+c13*m[2]+c21*m[3]+c22*m[4]+c23*m[5]+c31*m[6]+c32*m[7]+c33*m[8];gl_FragColor=color*value+(c22*(1.0-value));}";
class Sharpen extends Filter {
  constructor(value = 0) {
    super(null, fragment$j);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.m = new Float32Array([
      -1,
      -1,
      -1,
      -1,
      9,
      -1,
      -1,
      -1,
      -1
    ]);
    this.uniforms.px = [1 / width, 1 / height];
    this.uniforms.value = value / 2;
  }
}
var fragment$i = "#define GLSLIFY 1\nprecision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec2 px;float Lum(vec3 c){return 0.299*c.r+0.587*c.g+0.114*c.b;}float BlendOverlayf(float base,float blend){return(base<0.5 ?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend)));}vec3 BlendOverlay(vec3 base,vec3 blend){return vec3(BlendOverlayf(base.r,blend.r),BlendOverlayf(base.g,blend.g),BlendOverlayf(base.b,blend.b));}float BlendVividLightf(float base,float blend){float BlendColorBurnf=(((2.0*blend)==0.0)?(2.0*blend): max((1.0-((1.0-base)/(2.0*blend))),0.0));float BlendColorDodgef=(((2.0*(blend-0.5))==1.0)?(2.0*(blend-0.5)): min(base/(1.0-(2.0*(blend-0.5))),1.0));return((blend<0.5)? BlendColorBurnf : BlendColorDodgef);}vec3 BlendVividLight(vec3 base,vec3 blend){return vec3(BlendVividLightf(base.r,blend.r),BlendVividLightf(base.g,blend.g),BlendVividLightf(base.b,blend.b));}float normpdf(in float x,in float sigma){return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;}vec3 blurMap(){const int mSize=11;const int kSize=(mSize-1)/2;float kernel[mSize];vec3 final_colour=vec3(0.0);float sigma=7.0;float Z=0.0;for(int j=0;j<=kSize;++j){kernel[kSize+j]=kernel[kSize-j]=normpdf(float(j),sigma);}for(int j=0;j<mSize;++j){Z+=kernel[j];}for(int i=-kSize;i<=kSize;++i){for(int j=-kSize;j<=kSize;++j){final_colour+=kernel[kSize+j]*kernel[kSize+i]*texture2D(uSampler,(vTextureCoord.xy+vec2(float(i),float(j))*px)).rgb;}}return vec3(final_colour/(Z*Z));}void main(){vec4 base4=texture2D(uSampler,vTextureCoord.xy);vec3 blurMap=blurMap();vec3 base=base4.rgb;float intensity=(value<0.0)?(value/2.0): value;float lum=Lum(base);vec3 col=vec3(lum);vec3 mask=vec3(1.0-pow(lum,1.8));vec3 layer=vec3(1.0-Lum(blurMap));vec3 detail=clamp(BlendVividLight(col,layer),0.0,1.0);vec3 inverse=mix(1.0-detail,detail,(intensity+1.0)/2.0);gl_FragColor=vec4(BlendOverlay(base,mix(vec3(0.5),inverse,mask)),base4.a);}";
class Clarity extends Filter {
  constructor(value = 0) {
    super(null, fragment$i);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.px = [1 / width, 1 / height];
    this.uniforms.value = value * 2;
  }
}
var fragment$h = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform vec2 px;uniform float m[9];uniform float value;void main(void){vec4 c11=texture2D(uSampler,vTextureCoord-px);vec4 c12=texture2D(uSampler,vec2(vTextureCoord.x,vTextureCoord.y-px.y));vec4 c13=texture2D(uSampler,vec2(vTextureCoord.x+px.x,vTextureCoord.y-px.y));vec4 c21=texture2D(uSampler,vec2(vTextureCoord.x-px.x,vTextureCoord.y));vec4 c22=texture2D(uSampler,vTextureCoord);vec4 c23=texture2D(uSampler,vec2(vTextureCoord.x+px.x,vTextureCoord.y));vec4 c31=texture2D(uSampler,vec2(vTextureCoord.x-px.x,vTextureCoord.y+px.y));vec4 c32=texture2D(uSampler,vec2(vTextureCoord.x,vTextureCoord.y+px.y));vec4 c33=texture2D(uSampler,vTextureCoord+px);vec4 color=c11*m[0]+c12*m[1]+c13*m[2]+c21*m[3]+c22*m[4]+c23*m[5]+c31*m[6]+c32*m[7]+c33*m[8];gl_FragColor=color*value+(c22*(1.0-value));}";
class Smooth extends Filter {
  constructor(value = 0) {
    super(null, fragment$h);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.m = new Float32Array([
      1 / 16,
      2 / 16,
      1 / 16,
      2 / 16,
      0.25,
      2 / 16,
      1 / 16,
      2 / 16,
      1 / 16
    ]);
    this.uniforms.px = [1 / width, 1 / height];
    this.uniforms.value = value;
  }
}
class Blur extends Filter {
  constructor(value = 0) {
    super(null, null);
    this._blurFilter = new filters$1.BlurFilter();
    this.value = value;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._blurFilter.apply(filterManager, input, output, clearMode);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this._blurFilter.blur = value * 10;
    this.uniforms.value = value;
  }
}
var fragment$g = "precision highp float;uniform sampler2D uSampler;varying vec2 vTextureCoord;uniform float width;uniform float height;uniform float value;uniform float timer;const float permTexUnit=1.0/256.0;const float permTexUnitHalf=0.5/256.0;float grainsize=1.8;float lumamount=1.0;vec4 rnm(in vec2 tc){float noise=sin(dot(tc+vec2(timer,timer),vec2(12.9898,78.233)))*43758.5453;float noiseR=fract(noise)*2.0-1.0;float noiseG=fract(noise*1.2154)*2.0-1.0;float noiseB=fract(noise*1.3453)*2.0-1.0;float noiseA=fract(noise*1.3647)*2.0-1.0;return vec4(noiseR,noiseG,noiseB,noiseA);}float fade(in float t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float pnoise3D(in vec3 p){vec3 pi=permTexUnit*floor(p)+permTexUnitHalf;vec3 pf=fract(p);float perm00=rnm(pi.xy).a;vec3 grad000=rnm(vec2(perm00,pi.z)).rgb*4.0-1.0;float n000=dot(grad000,pf);vec3 grad001=rnm(vec2(perm00,pi.z+permTexUnit)).rgb*4.0-1.0;float n001=dot(grad001,pf-vec3(0.0,0.0,1.0));float perm01=rnm(pi.xy+vec2(0.0,permTexUnit)).a;vec3 grad010=rnm(vec2(perm01,pi.z)).rgb*4.0-1.0;float n010=dot(grad010,pf-vec3(0.0,1.0,0.0));vec3 grad011=rnm(vec2(perm01,pi.z+permTexUnit)).rgb*4.0-1.0;float n011=dot(grad011,pf-vec3(0.0,1.0,1.0));float perm10=rnm(pi.xy+vec2(permTexUnit,0.0)).a;vec3 grad100=rnm(vec2(perm10,pi.z)).rgb*4.0-1.0;float n100=dot(grad100,pf-vec3(1.0,0.0,0.0));vec3 grad101=rnm(vec2(perm10,pi.z+permTexUnit)).rgb*4.0-1.0;float n101=dot(grad101,pf-vec3(1.0,0.0,1.0));float perm11=rnm(pi.xy+vec2(permTexUnit,permTexUnit)).a;vec3 grad110=rnm(vec2(perm11,pi.z)).rgb*4.0-1.0;float n110=dot(grad110,pf-vec3(1.0,1.0,0.0));vec3 grad111=rnm(vec2(perm11,pi.z+permTexUnit)).rgb*4.0-1.0;float n111=dot(grad111,pf-vec3(1.0,1.0,1.0));vec4 n_x=mix(vec4(n000,n001,n010,n011),vec4(n100,n101,n110,n111),fade(pf.x));vec2 n_xy=mix(n_x.xy,n_x.zw,fade(pf.y));float n_xyz=mix(n_xy.x,n_xy.y,fade(pf.z));return n_xyz;}vec2 coordRot(in vec2 tc,in float angle){float aspect=width/height;float rotX=((tc.x*2.0-1.0)*aspect*cos(angle))-((tc.y*2.0-1.0)*sin(angle));float rotY=((tc.y*2.0-1.0)*cos(angle))+((tc.x*2.0-1.0)*aspect*sin(angle));rotX=((rotX/aspect)*0.5+0.5);rotY=rotY*0.5+0.5;return vec2(rotX,rotY);}void main(){vec3 rotOffset=vec3(1.425,3.892,5.835);vec2 rotCoordsR=coordRot(vTextureCoord,timer+rotOffset.x);vec3 noise=vec3(pnoise3D(vec3(rotCoordsR*vec2(width/grainsize,height/grainsize),0.0)));vec4 tex=texture2D(uSampler,vTextureCoord);vec3 col=tex.rgb;vec3 lumcoeff=vec3(0.299,0.587,0.114);float luminance=mix(0.0,dot(col,lumcoeff),lumamount);float lum=smoothstep(0.2,0.0,luminance);lum+=luminance;noise=mix(noise,vec3(0.0),pow(lum,4.0));col=col+noise*value;gl_FragColor=vec4(col,tex.w);}";
class Grain extends Filter {
  constructor(value = 0) {
    super(null, fragment$g);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.width = width;
    this.uniforms.height = height;
    this.uniforms.timer = 1;
    this.uniforms.value = value / 10;
  }
}
var fragment$f = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform float size;void main(){vec4 color=texture2D(uSampler,vTextureCoord);float dist=distance(vTextureCoord,vec2(0.5,0.5));float grd=smoothstep(0.8,size*0.799,dist*(value*0.6+size*2.0));color.rgb+=vec3(1.0,1.0,1.0)*(1.0-grd);gl_FragColor=color;}";
class VignetteWhite extends Filter {
  constructor(value = 0) {
    super(null, fragment$f);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.size = 0.25;
    this.uniforms.value = (value - 0.1) * 2;
  }
}
var fragment$e = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform float size;void main(){vec4 color=texture2D(uSampler,vTextureCoord);float dist=distance(vTextureCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(value*0.75+size*2.0));gl_FragColor=color;}";
class VignetteBlack extends Filter {
  constructor(value = 0) {
    super(null, fragment$e);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.size = 0.25;
    this.uniforms.value = (value - 0.1) * 2;
  }
}
var fragment$d = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec2 px;float normpdf(in float x,in float sigma){return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;}vec3 blurMap(){const int mSize=11;const int kSize=(mSize-1)/2;float kernel[mSize];vec3 final_colour=vec3(0.0);float sigma=7.0;float Z=0.0;for(int j=0;j<=kSize;++j){kernel[kSize+j]=kernel[kSize-j]=normpdf(float(j),sigma);}for(int j=0;j<mSize;++j){Z+=kernel[j];}for(int i=-kSize;i<=kSize;++i){for(int j=-kSize;j<=kSize;++j){final_colour+=kernel[kSize+j]*kernel[kSize+i]*texture2D(uSampler,(vTextureCoord.xy+vec2(float(i),float(j))*px)).rgb;}}return vec3(final_colour/(Z*Z));}float luma(vec3 color){return dot(color,vec3(0.299,0.587,0.114));}void main(){vec4 base=texture2D(uSampler,vTextureCoord);vec3 color=blurMap();color=vec3(luma(color));color=vec3((base.r<=0.5)?(2.0*base.r*color.r):(1.0-2.0*(1.0-base.r)*(1.0-color.r)),(base.g<=0.5)?(2.0*base.g*color.g):(1.0-2.0*(1.0-base.g)*(1.0-color.g)),(base.b<=0.5)?(2.0*base.b*color.b):(1.0-2.0*(1.0-base.b)*(1.0-color.b)));gl_FragColor=mix(base,vec4(color,base.a),value);}";
class Glamour extends Filter {
  constructor(value = 0) {
    super(null, fragment$d);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.px = [1 / width, 1 / height];
    this.uniforms.value = value;
  }
}
var fragment$c = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec2 px;float thresh=.5;void main(){vec4 sum=vec4(0);int j=-2;for(int i=-2;i<=2;i++)sum+=texture2D(uSampler,vTextureCoord+vec2(i,j)*px);j=-1;for(int i=-2;i<=2;i++)sum+=texture2D(uSampler,vTextureCoord+vec2(i,j)*px);j=0;for(int i=-2;i<=2;i++)sum+=texture2D(uSampler,vTextureCoord+vec2(i,j)*px);j=1;for(int i=-2;i<=2;i++)sum+=texture2D(uSampler,vTextureCoord+vec2(i,j)*px);j=2;for(int i=-2;i<=2;i++)sum+=texture2D(uSampler,vTextureCoord+vec2(i,j)*px);sum/=25.0;gl_FragColor=texture2D(uSampler,vTextureCoord);if(length(sum)>thresh){gl_FragColor+=sum*value;}}";
class Bloom extends Filter {
  constructor(value = 0) {
    super(null, fragment$c);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.px = [1 / width, 1 / height];
    this.uniforms.value = value;
  }
}
var fragment$b = "#define GLSLIFY 1;\nprecision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec2 size;float hazeMap(vec4 base){vec3 color=vec3(1.0,1.0,1.0);vec2 step=vec2(1.0/size.xy);const int patchRadius=1;for(int i=-patchRadius;i<=patchRadius;++i){for(int j=-patchRadius;j<=patchRadius;++j){vec2 uv=clamp(vTextureCoord+(vec2(i,j)*step),0.0,1.0);color=min(color,base.rgb);}}return min(color.r,min(color.g,color.b));}void main(){lowp vec4 base=texture2D(uSampler,vTextureCoord.xy);lowp float haze=hazeMap(base);float transmission=1.0-0.95*haze;const float A=0.95;const float t0=0.1;float t=mix(1.0,max(t0,transmission),value);vec3 J=(base.rgb-A)/t+A;gl_FragColor=vec4(J,base.a);}";
class Dehaze extends Filter {
  constructor(value = 0) {
    super(null, fragment$b);
    this.value = value;
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    var _a, _b, _c, _d;
    let [width, height] = (_d = (_c = (_b = (_a = this.uniforms) == null ? void 0 : _a.filterGlobals) == null ? void 0 : _b.uniforms) == null ? void 0 : _c.inputSize) != null ? _d : [
      1920,
      1080
    ];
    this.uniforms.size = [1 / width, 1 / height];
    this.uniforms.value = value;
  }
}
var fragment$a = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform sampler2D paletteMap;uniform float value;float luma(vec3 color){return dot(color,vec3(0.299,0.587,0.114));}void main(){lowp vec4 base=texture2D(uSampler,vTextureCoord.xy);float avg=luma(base.rgb);float r=texture2D(paletteMap,vec2(avg,0)).r;float g=texture2D(paletteMap,vec2(avg,0)).g;float b=texture2D(paletteMap,vec2(avg,0)).b;gl_FragColor=mix(base,vec4(r,g,b,base.a),value);}";
class Toning extends Filter {
  constructor(value = 0, lightColor = "#ff2200", darkColor = "#ff00ff") {
    super(null, fragment$a);
    this._imageData = new ImageData(256, 1);
    this.value = value;
    this.lightColor = lightColor;
    this.darkColor = darkColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.lightColor));
    const [rDark, gDark, bDark] = utils.hex2rgb(utils.string2hex(this.uniforms.darkColor));
    let paletteMap = this._imageData;
    Toning.fillPaletteMap({
      value: this.uniforms.value,
      lightColor: { r: r * 255, g: g * 255, b: b * 255 },
      darkColor: { r: rDark * 255, g: gDark * 255, b: bDark * 255 }
    }, paletteMap);
    const rawdata = new Uint8Array(Array.from(paletteMap.data));
    this.uniforms.paletteMap = Texture.fromBuffer(rawdata, rawdata.length / 4, 1);
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
  get lightColor() {
    return this.uniforms.lightColor;
  }
  set lightColor(value) {
    this.uniforms.lightColor = value;
    this.update();
  }
  get darkColor() {
    return this.uniforms.darkColor;
  }
  set darkColor(value) {
    this.uniforms.darkColor = value;
    this.update();
  }
  static fillPaletteMap(payload, image) {
    for (let s = 0; s < 256; ++s) {
      let i = s / 255;
      image.data[4 * s] = Math.round(payload.lightColor.r * i + payload.darkColor.r * (1 - i));
      image.data[4 * s + 1] = Math.round(payload.lightColor.g * i + payload.darkColor.g * (1 - i));
      image.data[4 * s + 2] = Math.round(payload.lightColor.b * i + payload.darkColor.b * (1 - i));
    }
  }
}
var fragment$9 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendSoftLight(float base,float blend){return(blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));}vec3 blendSoftLight(vec3 base,vec3 blend){return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));}vec3 blendSoftLight(vec3 base,vec3 blend,float opacity){return(blendSoftLight(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendSoftLight(base.rgb,color.rgb,value),base.a);}";
class SoftLight extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$9);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$8 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendOverlay(float base,float blend){return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));}vec3 blendOverlay(vec3 base,vec3 blend){return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));}vec3 blendHardLight(vec3 base,vec3 blend){return blendOverlay(blend,base);}vec3 blendHardLight(vec3 base,vec3 blend,float opacity){return(blendHardLight(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendHardLight(base.rgb,color.rgb,value),base.a);}";
class HardLight extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$8);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$7 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendColorBurn(float base,float blend){return(blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);}float blendColorDodge(float base,float blend){return(blend==1.0)?blend:min(base/(1.0-blend),1.0);}float blendVividLight(float base,float blend){return(blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));}vec3 blendVividLight(vec3 base,vec3 blend){return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));}vec3 blendVividLight(vec3 base,vec3 blend,float opacity){return(blendVividLight(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendVividLight(base.rgb,color.rgb,value),base.a);}";
class VividLight extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$7);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$6 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendOverlay(float base,float blend){return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));}vec3 blendOverlay(vec3 base,vec3 blend){return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));}vec3 blendOverlay(vec3 base,vec3 blend,float opacity){return(blendOverlay(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendOverlay(base.rgb,color.rgb,value),base.a);}";
class Overlay extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$6);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$5 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;vec3 blendMultiply(vec3 base,vec3 blend){return base*blend;}vec3 blendMultiply(vec3 base,vec3 blend,float opacity){return(blendMultiply(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendMultiply(base.rgb,color.rgb,value),base.a);}";
class Multiply extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$5);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$4 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendColorDodge(float base,float blend){return(blend==1.0)?blend:min(base/(1.0-blend),1.0);}vec3 blendColorDodge(vec3 base,vec3 blend){return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));}vec3 blendColorDodge(vec3 base,vec3 blend,float opacity){return(blendColorDodge(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendColorDodge(base.rgb,color.rgb,value),base.a);}";
class ColorDodge extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$4);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$3 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendColorBurn(float base,float blend){return(blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);}vec3 blendColorBurn(vec3 base,vec3 blend){return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));}vec3 blendColorBurn(vec3 base,vec3 blend,float opacity){return(blendColorBurn(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendColorBurn(base.rgb,color.rgb,value),base.a);}";
class ColorBurn extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$3);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$2 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;float blendScreen(float base,float blend){return 1.0-((1.0-base)*(1.0-blend));}vec3 blendScreen(vec3 base,vec3 blend){return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));}vec3 blendScreen(vec3 base,vec3 blend,float opacity){return(blendScreen(base,blend)*opacity+base*(1.0-opacity));}void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=vec4(blendScreen(base.rgb,color.rgb,value),base.a);}";
class Screen extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$2);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
var fragment$1 = "precision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform float value;uniform vec4 color;void main(){vec4 base=texture2D(uSampler,vTextureCoord.xy);gl_FragColor=mix(base,color,value);}";
class Default extends Filter {
  constructor(value = 0, fillColor = "#f20") {
    super(null, fragment$1);
    this.value = value;
    this.fillColor = fillColor;
  }
  update() {
    const [r, g, b] = utils.hex2rgb(utils.string2hex(this.uniforms.fillColor));
    this.uniforms.color = [r, g, b, 1];
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(color) {
    this.uniforms.fillColor = color;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
const fillMode = {
  default: Default,
  screen: Screen,
  overlay: Overlay,
  multiply: Multiply,
  colorDodge: ColorDodge,
  colorBurn: ColorBurn,
  hardLight: HardLight,
  softLight: SoftLight,
  vividLight: VividLight
};
class Fill extends Filter {
  constructor(value = 0, fillColor = "#ff2200", mode = "softLight") {
    super(null, null);
    this._fillFilter = new fillMode[mode]();
    this.mode = mode;
    this.value = value;
    this.fillColor = fillColor;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._fillFilter.apply(filterManager, input, output, clearMode);
  }
  update() {
    this._fillFilter.value = this.uniforms.value;
    this._fillFilter.fillColor = this.uniforms.fillColor;
  }
  get mode() {
    return this.uniforms.mode;
  }
  set mode(mode) {
    this._fillFilter = new fillMode[mode]();
    this.uniforms.mode = mode;
    this.update();
  }
  get fillColor() {
    return this.uniforms.fillColor;
  }
  set fillColor(value) {
    this.uniforms.fillColor = value;
    this.update();
  }
  get value() {
    return this.uniforms.value;
  }
  set value(value) {
    this.uniforms.value = value;
    this.update();
  }
}
const presetConfig = {
  flower: [
    {
      name: "vibrance",
      value: 0.2
    },
    {
      name: "saturation",
      value: 0.1
    },
    {
      name: "temperature",
      value: 0.1
    }
  ],
  forest: [
    {
      name: "saturation",
      value: -0.2
    },
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "clarity",
      value: 0.2
    },
    {
      name: "temperature",
      value: 0.16
    },
    {
      name: "tint",
      value: 0.2
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 65, 52, 173, 190, 236, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    }
  ],
  beach: [
    {
      name: "saturation",
      value: 0.2
    },
    {
      name: "vibrance",
      value: 0.2
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 68, 56, 199, 208, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 98, 97, 196, 201, 255, 255],
          [0, 0, 87, 85, 201, 182, 255, 255]
        ]
      }
    },
    {
      name: "temperature",
      value: 0.1
    }
  ],
  sham: [
    {
      name: "saturation",
      value: -0.3
    },
    {
      name: "fill",
      value: {
        value: 0.3,
        mode: "overlay",
        fillColor: "#99ddff"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [60, 31, 191, 217],
          [0, 0, 120, 134, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 120, 144, 255, 255]
        ]
      }
    }
  ],
  stalker: [
    {
      name: "curves",
      value: {
        preset: [
          [62, 64, 190, 191],
          [0, 0, 133, 125, 255, 255],
          [0, 0, 54, 65, 209, 208, 255, 255],
          [60, 62, 96, 99, 240, 230, 255, 255]
        ]
      }
    },
    {
      name: "contrast",
      value: 0.1
    },
    {
      name: "saturation",
      value: -0.2
    }
  ],
  shimmer: [
    {
      name: "temperature",
      value: -0.2
    },
    {
      name: "tint",
      value: -0.12
    },
    {
      name: "fill",
      value: {
        value: 0.12,
        mode: "screen",
        fillColor: "#be0bff"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [8, 23, 244, 227],
          [0, 0, 255, 255],
          [0, 0, 131, 124, 255, 255],
          [0, 0, 149, 112, 255, 255]
        ]
      }
    }
  ],
  mold: [
    {
      name: "curves",
      value: {
        preset: [
          [65, 64, 233, 233],
          [0, 0, 138, 121, 255, 255],
          [0, 0, 60, 75, 184, 184, 255, 255],
          [0, 0, 64, 75, 181, 176, 255, 255]
        ]
      }
    },
    {
      name: "contrast",
      value: 0.1
    },
    {
      name: "saturation",
      value: -0.12
    }
  ],
  style: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 73, 74, 191, 177, 235, 221, 255, 255],
          [0, 26, 89, 64, 121, 126, 180, 213, 255, 255],
          [0, 0, 71, 50, 190, 210, 255, 255],
          [61, 64, 112, 97, 199, 198, 255, 255]
        ]
      }
    },
    {
      name: "vibrance",
      value: -0.1
    },
    {
      name: "saturation",
      value: -0.4
    },
    {
      name: "temperature",
      value: 0.1
    }
  ],
  cement: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 73, 74, 191, 177, 235, 221, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 60, 54, 198, 210, 255, 255],
          [0, 0, 73, 37, 150, 149, 199, 198, 255, 255]
        ]
      }
    },
    {
      name: "vibrance",
      value: -0.1
    },
    {
      name: "saturation",
      value: -0.1
    }
  ],
  sharp: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 42, 20, 199, 218, 224, 246, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "vibrance",
      value: 0.1
    },
    {
      name: "sharpen",
      value: 0.1
    },
    {
      name: "clarity",
      value: 0.1
    }
  ],
  corn: [
    {
      name: "temperature",
      value: 0.1
    },
    {
      name: "vibrance",
      value: 0.3
    },
    {
      name: "contrast",
      value: 0.1
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 66, 78, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    }
  ],
  morning: [
    {
      name: "tint",
      value: 0.18
    },
    {
      name: "temperature",
      value: 0.1
    },
    {
      name: "highlights",
      value: 0.08
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 245,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [64, 64, 150, 181, 254, 255],
          [0, 0, 122, 138, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "fill",
      value: {
        value: 0.2,
        mode: "overlay",
        fillColor: "#c27829"
      }
    }
  ],
  ensalat: [
    {
      name: "highlights",
      value: 0.2
    },
    {
      name: "shadows",
      value: -0.2
    },
    {
      name: "brightness",
      value: 0.1
    },
    {
      name: "levels",
      value: {
        minin: 10,
        maxin: 245,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 135, 119, 191, 193, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 129, 121, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "clarity",
      value: 0.2
    },
    {
      name: "sharpen",
      value: 0.15
    }
  ],
  berry: [
    {
      name: "vibrance",
      value: 0.44
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 62, 66, 121, 135, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "contrast",
      value: 0.2
    },
    {
      name: "highlights",
      value: 0.4
    },
    {
      name: "shadows",
      value: -0.2
    },
    {
      name: "levels",
      value: {
        minin: 20,
        maxin: 255,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  gritty: [
    {
      name: "saturation",
      value: -0.4
    },
    {
      name: "levels",
      value: {
        minin: 20,
        maxin: 255,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 50, 33, 128, 112, 190, 215, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "clarity",
      value: 1
    },
    {
      name: "grain",
      value: 0.3
    }
  ],
  sunny: [
    {
      name: "fill",
      value: {
        value: 0.2,
        mode: "overlay",
        fillColor: "#ffc260"
      }
    },
    {
      name: "temperature",
      value: 0.1
    },
    {
      name: "glamour",
      value: 0.4
    },
    {
      name: "clarity",
      value: 0.3
    }
  ],
  film: [
    {
      name: "sharpen",
      value: 0.2
    },
    {
      name: "glamour",
      value: 0.5
    },
    {
      name: "grain",
      value: 0.5
    },
    {
      name: "highlights",
      value: -0.2
    },
    {
      name: "shadows",
      value: -0.2
    },
    {
      name: "saturation",
      value: -0.2
    }
  ],
  matte: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 50, 38, 56, 79, 82, 152, 153, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "contrast",
      value: 0.12
    },
    {
      name: "saturation",
      value: -0.1
    }
  ],
  deep: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 117, 99, 191, 198, 255, 255],
          [0, 0, 71, 38, 177, 209, 255, 255],
          [0, 0, 236, 255],
          [0, 28, 75, 101, 190, 171, 254, 233]
        ]
      }
    },
    {
      name: "saturation",
      value: -0.3
    }
  ],
  aladin: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 52, 87, 99, 255, 255],
          [0, 0, 106, 107, 194, 190, 254, 212],
          [0, 0, 166, 129, 254, 142]
        ]
      }
    }
  ],
  amber: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 98, 150, 255, 255],
          [0, 0, 138, 117, 255, 255],
          [0, 128, 254, 129]
        ]
      }
    }
  ],
  anne: [
    {
      name: "contrast",
      value: 0.25
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 78, 66, 135, 171, 255, 255],
          [0, 0, 99, 87, 180, 208, 255, 255],
          [0, 0, 94, 93, 171, 161, 255, 255]
        ]
      }
    }
  ],
  antonio: [
    {
      name: "glamour",
      value: 0.8
    }
  ],
  alex: [
    {
      name: "glamour",
      value: 0.6
    }
  ],
  bob: [
    {
      name: "saturation",
      value: -0.6
    },
    {
      name: "highlights",
      value: 0.5
    }
  ],
  greg: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 74, 50, 181, 198, 255, 255],
          [0, 0, 61, 41, 108, 170, 158, 207, 254, 208],
          [0, 0, 83, 56, 168, 204, 255, 255]
        ]
      }
    }
  ],
  hagrid: [
    {
      name: "vibrance",
      value: 0.9
    },
    {
      name: "saturation",
      value: 0.1
    },
    {
      name: "clarity",
      value: 0.5
    },
    {
      name: "shadows",
      value: -0.3
    }
  ],
  harry: [
    {
      name: "fill",
      value: {
        value: 0.7,
        mode: "overlay",
        fillColor: "#d6b277"
      }
    },
    {
      name: "grain",
      value: 0.5
    }
  ],
  ivan: [
    {
      name: "fill",
      value: {
        value: 0.4,
        mode: "overlay",
        fillColor: "#ff0044"
      }
    },
    {
      name: "shadows",
      value: 0.15
    },
    {
      name: "levels",
      value: {
        minin: 6,
        maxin: 255,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  jean: [
    {
      name: "levels",
      value: {
        minin: 56,
        maxin: 233,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "saturation",
      value: -1
    },
    {
      name: "tint",
      value: 0.1
    },
    {
      name: "exposure",
      value: 0.78
    },
    {
      name: "bloom",
      value: 0.1
    }
  ],
  josh: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 78, 52, 175, 207, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 64, 87, 129, 254, 193]
        ]
      }
    }
  ],
  karen: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 89, 144, 255, 255],
          [0, 0, 138, 112, 255, 255],
          [0, 0, 162, 88, 255, 255]
        ]
      }
    }
  ],
  lucas: [
    {
      name: "tint",
      value: 1
    },
    {
      name: "saturation",
      value: -0.85
    },
    {
      name: "contrast",
      value: 0.4
    },
    {
      name: "shadows",
      value: 1
    },
    {
      name: "temperature",
      value: 0.1
    }
  ],
  melissa: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 62, 255, 255],
          [0, 0, 255, 255],
          [0, 61, 254, 193]
        ]
      }
    }
  ],
  peter: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 6, 31, 20, 65, 26, 87, 51, 195, 190, 254, 230],
          [0, 11, 24, 27, 102, 131, 189, 195, 255, 255],
          [0, 40, 126, 148, 254, 177]
        ]
      }
    }
  ],
  salomon: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 83, 50, 177, 213, 255, 255],
          [0, 0, 69, 55, 186, 205, 255, 255],
          [11, 56, 254, 212]
        ]
      }
    },
    {
      name: "contrast",
      value: -0.2
    }
  ],
  sara: [
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "contrast",
      value: 0.1
    },
    {
      name: "highlights",
      value: 0.3
    }
  ],
  sophia: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 140, 116, 222, 254],
          [0, 0, 70, 59, 182, 201, 255, 255],
          [0, 29, 252, 227]
        ]
      }
    },
    {
      name: "saturation",
      value: 0.3
    }
  ],
  tony: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 92, 42, 218, 252],
          [0, 0, 73, 75, 157, 194, 255, 255],
          [0, 27, 254, 227]
        ]
      }
    }
  ],
  agnes: [
    {
      name: "desaturate",
      value: 1
    },
    {
      name: "contrast",
      value: 0.5
    }
  ],
  conny: [
    {
      name: "saturation",
      value: -0.55
    },
    {
      name: "temperature",
      value: 0.25
    },
    {
      name: "brightness",
      value: -0.25
    },
    {
      name: "levels",
      value: {
        minin: 14,
        maxin: 233,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "exposure",
      value: 0.35
    },
    {
      name: "highlights",
      value: -0.9
    }
  ],
  gordon: [
    {
      name: "desaturate",
      value: 1
    },
    {
      name: "temperature",
      value: 0.7
    },
    {
      name: "tint",
      value: 0.3
    },
    {
      name: "saturation",
      value: -0.2
    }
  ],
  harrison: [
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#fff0d7",
        darkColor: "#301a18"
      }
    },
    {
      name: "grain",
      value: 0.2
    }
  ],
  henry: [
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#fff0d7",
        darkColor: "#301a18"
      }
    },
    {
      name: "saturation",
      value: -0.5
    }
  ],
  logan: [
    {
      name: "glamour",
      value: 0.5
    },
    {
      name: "tint",
      value: 0.4
    },
    {
      name: "saturation",
      value: -0.35
    },
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#fff0d7",
        darkColor: "#301a18"
      }
    }
  ],
  olay: [
    {
      name: "saturation",
      value: -1
    },
    {
      name: "grain",
      value: 0.5
    },
    {
      name: "vignette",
      value: 0.5
    }
  ],
  porter: [
    {
      name: "saturation",
      value: -1
    },
    {
      name: "vignette",
      value: 0.4
    },
    {
      name: "levels",
      value: {
        minin: 50,
        maxin: 205,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  tom: [
    {
      name: "desaturate",
      value: 1
    }
  ],
  sampi: [
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#ffe4c4",
        darkColor: "#000000"
      }
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 217,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "temperature",
      value: 0.3
    }
  ],
  vinny: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 133, 111, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 133, 138, 255, 255]
        ]
      }
    },
    {
      name: "vibrance",
      value: -1
    },
    {
      name: "saturation",
      value: 1
    },
    {
      name: "temperature",
      value: 0.8
    },
    {
      name: "contrast",
      value: -0.1
    },
    {
      name: "highlights",
      value: 0.1
    }
  ],
  borg: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 94, 66, 227, 255],
          [0, 0, 93, 94, 179, 198, 255, 255],
          [0, 19, 254, 228]
        ]
      }
    },
    {
      name: "fill",
      value: {
        value: 0.1,
        mode: "default",
        fillColor: "#ccff00"
      }
    }
  ],
  carl: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 93, 64, 227, 255],
          [0, 0, 93, 94, 181, 189, 255, 255],
          [0, 19, 254, 228]
        ]
      }
    },
    {
      name: "vignette",
      value: 0.3
    },
    {
      name: "contrast",
      value: 0.15
    },
    {
      name: "saturation",
      value: -0.3
    }
  ],
  coco: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 64, 97, 255, 255],
          [0, 0, 142, 122, 255, 255],
          [0, 0, 144, 112, 255, 255]
        ]
      }
    }
  ],
  doris: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 78, 48, 177, 209, 255, 255],
          [0, 0, 92, 94, 179, 208, 255, 255],
          [0, 52, 254, 215]
        ]
      }
    },
    {
      name: "saturation",
      value: -0.2
    }
  ],
  doug: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 64, 255, 255],
          [0, 0, 255, 255],
          [1, 64, 252, 193]
        ]
      }
    }
  ],
  earl: [
    {
      name: "vignette",
      value: 0.4
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 222, 254],
          [0, 47, 223, 254],
          [0, 129, 222, 255]
        ]
      }
    },
    {
      name: "fill",
      value: {
        value: 0.8,
        mode: "multiply",
        fillColor: "#f7daae"
      }
    }
  ],
  kevin: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 75, 164, 126, 212, 255, 255],
          [1, 37, 111, 147, 217, 217],
          [73, 80, 149, 111, 200, 173]
        ]
      }
    },
    {
      name: "contrast",
      value: 0.15
    }
  ],
  nash: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 221, 255],
          [0, 48, 222, 252],
          [0, 129, 226, 255]
        ]
      }
    },
    {
      name: "fill",
      value: {
        value: 1,
        mode: "multiply",
        fillColor: "#f7daae"
      }
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 225,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  stan: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 69, 54, 180, 199, 255, 255],
          [0, 117, 64, 158, 147, 185, 208, 228, 255, 255],
          [0, 69, 101, 131, 180, 182, 209, 224, 254, 233],
          [1, 87, 83, 110, 168, 149, 215, 145, 254, 184]
        ]
      }
    }
  ],
  sun: [
    {
      name: "fill",
      value: {
        value: 0.8,
        mode: "multiply",
        fillColor: "#fbf2a3"
      }
    },
    {
      name: "vignette",
      value: -0.25
    }
  ],
  "bd orange": [
    {
      name: "curves",
      value: {
        preset: [
          [
            1,
            34,
            43,
            43,
            77,
            70,
            97,
            108,
            138,
            158,
            173,
            184,
            223,
            208,
            254,
            231
          ],
          [28, 3, 55, 38, 110, 92, 152, 148, 201, 208, 255, 255],
          [0, 0, 62, 55, 193, 189, 255, 255],
          [0, 27, 55, 75, 116, 110, 190, 149, 254, 163]
        ]
      }
    },
    {
      name: "grain",
      value: 0.33
    }
  ],
  blues: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 77, 54, 181, 207, 255, 255],
          [0, 0, 73, 51, 180, 209, 255, 255],
          [0, 0, 54, 75, 201, 185, 255, 255]
        ]
      }
    }
  ],
  country: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 84, 74, 115, 105, 255, 255],
          [0, 0, 73, 80, 93, 124, 255, 255],
          [0, 0, 50, 34, 93, 105, 119, 142, 255, 255],
          [0, 0, 85, 85, 125, 112, 255, 255]
        ]
      }
    }
  ],
  lemonpell: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 36, 80, 84, 156, 190, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 103, 105, 158, 176, 255, 255],
          [0, 19, 107, 83, 198, 196, 255, 255]
        ]
      }
    }
  ],
  joyful: [
    {
      name: "vibrance",
      value: 0.3
    },
    {
      name: "saturation",
      value: 0.4
    },
    {
      name: "temperature",
      value: -0.35
    },
    {
      name: "tint",
      value: 0.8
    },
    {
      name: "exposure",
      value: 0.3
    }
  ],
  "tiny dc": [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 79, 46, 199, 217, 255, 255],
          [9, 1, 110, 126, 254, 232],
          [0, 46, 92, 103, 191, 158, 254, 205]
        ]
      }
    },
    {
      name: "grain",
      value: 0.3
    }
  ],
  sheberios: [
    {
      name: "temperature",
      value: 0.5
    },
    {
      name: "saturation",
      value: 0.25
    }
  ],
  superone: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ffd899",
        darkColor: "#4d0033"
      }
    },
    {
      name: "levels",
      value: {
        minin: 50,
        maxin: 175,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  tonola: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ddff99",
        darkColor: "#4d0033"
      }
    },
    {
      name: "levels",
      value: {
        minin: 26,
        maxin: 213,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "saturation",
      value: 0.36
    },
    {
      name: "temperature",
      value: 0.22
    }
  ],
  reddish: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ffd693",
        darkColor: "#6e2500"
      }
    },
    {
      name: "contrast",
      value: 0.3
    },
    {
      name: "highlights",
      value: 1
    }
  ],
  fellowing: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ffd899",
        darkColor: "#4d2f00"
      }
    },
    {
      name: "levels",
      value: {
        minin: 24,
        maxin: 203,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "contrast",
      value: 0.14
    },
    {
      name: "saturation",
      value: 0.3
    },
    {
      name: "temperature",
      value: 0.18
    }
  ],
  grassland: [
    {
      name: "toning",
      value: {
        value: 0.7,
        lightColor: "#ddff99",
        darkColor: "#004d19"
      }
    },
    {
      name: "levels",
      value: {
        minin: 18,
        maxin: 227,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "contrast",
      value: 0.16
    }
  ],
  springs: [
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#ddff99",
        darkColor: "#001a26"
      }
    },
    {
      name: "highlights",
      value: 1
    },
    {
      name: "levels",
      value: {
        minin: 40,
        maxin: 155,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "shadows",
      value: 1
    }
  ],
  justblues: [
    {
      name: "toning",
      value: {
        value: 0.79,
        lightColor: "#c6ecff",
        darkColor: "#1a004d"
      }
    },
    {
      name: "levels",
      value: {
        minin: 16,
        maxin: 189,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "saturation",
      value: 0.2
    },
    {
      name: "contrast",
      value: 0.2
    }
  ],
  bluesteel: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ffd899",
        darkColor: "#1a004d"
      }
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 215,
        minout: 12,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  flowerpot: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ff99dd",
        darkColor: "#334d00"
      }
    },
    {
      name: "levels",
      value: {
        minin: 22,
        maxin: 215,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "vignette",
      value: -0.2
    }
  ],
  stinker: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ffd899",
        darkColor: "#1a004d"
      }
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 247,
        minout: 8,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "brightness",
      value: 0.14
    },
    {
      name: "contrast",
      value: 0.4
    }
  ],
  violiin: [
    {
      name: "contrast",
      value: 0.32
    },
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#c3a6ff",
        darkColor: "#210000"
      }
    },
    {
      name: "levels",
      value: {
        minin: 22,
        maxin: 223,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "exposure",
      value: 0.22
    },
    {
      name: "brightness",
      value: 0.12
    }
  ],
  blupur: [
    {
      name: "toning",
      value: {
        value: 0.8,
        lightColor: "#ff99dd",
        darkColor: "#074461"
      }
    },
    {
      name: "vibrance",
      value: 0.7
    },
    {
      name: "contrast",
      value: 0.3
    }
  ],
  beyllo: [
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "saturation",
      value: 1
    },
    {
      name: "temperature",
      value: -0.55
    },
    {
      name: "tint",
      value: 0.1
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 255,
        minout: 24,
        maxout: 249,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "toning",
      value: {
        value: 0.76,
        lightColor: "#ffd500",
        darkColor: "#7d0354"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 131, 115, 255, 255],
          [0, 0, 136, 128, 255, 255],
          [0, 0, 122, 145, 255, 255]
        ]
      }
    },
    {
      name: "vignette",
      value: 0.28
    }
  ],
  wifortress: [
    {
      name: "toning",
      value: {
        value: 1,
        lightColor: "#6cceff",
        darkColor: "#001a26"
      }
    },
    {
      name: "highlights",
      value: 1
    },
    {
      name: "levels",
      value: {
        minin: 40,
        maxin: 155,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "shadows",
      value: 1
    }
  ],
  vib: [
    {
      name: "vibrance",
      value: 0.1
    },
    {
      name: "saturation",
      value: 0.5
    },
    {
      name: "brightness",
      value: 0.1
    },
    {
      name: "temperature",
      value: 0.5
    },
    {
      name: "levels",
      value: {
        minin: 12,
        maxin: 253,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: 0.2
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 70, 80, 198, 181, 255, 255],
          [0, 0, 140, 135, 255, 255],
          [0, 0, 74, 96, 200, 172, 255, 255]
        ]
      }
    },
    {
      name: "toning",
      value: {
        value: 0.07,
        lightColor: "#ffeed2",
        darkColor: "#360606"
      }
    },
    {
      name: "contrast",
      value: -0.1
    }
  ],
  ranguit: [
    {
      name: "saturation",
      value: 0.22
    },
    {
      name: "temperature",
      value: 0.96
    },
    {
      name: "tint",
      value: -0.28
    },
    {
      name: "contrast",
      value: 0.14
    },
    {
      name: "brightness",
      value: -0.2
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 237,
        minout: 56,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "toning",
      value: {
        value: 0.26,
        lightColor: "#ddff99",
        darkColor: "#292321"
      }
    }
  ],
  rangeen: [
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "saturation",
      value: 0.46
    },
    {
      name: "temperature",
      value: 0.36
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 251,
        minout: 14,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "shadows",
      value: 0.34
    },
    {
      name: "highlights",
      value: 0.12
    },
    {
      name: "toning",
      value: {
        value: 0.12,
        lightColor: "#79ffe0",
        darkColor: "#f5166b"
      }
    },
    {
      name: "contrast",
      value: -0.1
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 144, 152, 255, 255],
          [0, 0, 136, 107, 255, 255],
          [0, 0, 115, 102, 255, 255],
          [0, 0, 106, 91, 255, 255]
        ]
      }
    }
  ],
  creamlow: [
    {
      name: "vibrance",
      value: 0.82
    },
    {
      name: "saturation",
      value: -0.24
    },
    {
      name: "temperature",
      value: 1
    },
    {
      name: "tint",
      value: 0.78
    },
    {
      name: "contrast",
      value: -0.3
    },
    {
      name: "levels",
      value: {
        minin: 40,
        maxin: 247,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: 0.64
    },
    {
      name: "toning",
      value: {
        value: 0.29,
        lightColor: "#ddff99",
        darkColor: "#912709"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 5, 13, 78, 83, 172, 162, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 131, 120, 255, 255],
          [0, 0, 68, 61, 175, 184, 255, 255]
        ]
      }
    }
  ],
  sven: [
    {
      name: "vibrance",
      value: 0.7
    },
    {
      name: "temperature",
      value: 0.5
    },
    {
      name: "tint",
      value: 0.3
    },
    {
      name: "exposure",
      value: 0.2
    },
    {
      name: "contrast",
      value: -0.2
    },
    {
      name: "levels",
      value: {
        minin: 4,
        maxin: 255,
        minout: 0,
        maxout: 235,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: -0.3
    },
    {
      name: "shadows",
      value: 0.3
    },
    {
      name: "grain",
      value: 0.3
    },
    {
      name: "vignette",
      value: 0.45
    }
  ],
  yenely: [
    {
      name: "tint",
      value: 0.5
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 235,
        minout: 20,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "saturation",
      value: -0.62
    },
    {
      name: "contrast",
      value: -0.3
    },
    {
      name: "shadows",
      value: -0.6
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 148, 105, 255, 255],
          [0, 0, 92, 79, 128, 227, 255, 255],
          [0, 0, 74, 103, 119, 172, 255, 255],
          [0, 0, 111, 148, 255, 255]
        ]
      }
    },
    {
      name: "highlights",
      value: 1
    },
    {
      name: "brightness",
      value: 0.14
    },
    {
      name: "temperature",
      value: 0.3
    },
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "exposure",
      value: -0.1
    }
  ],
  ragwarm: [
    {
      name: "temperature",
      value: 0.62
    },
    {
      name: "levels",
      value: {
        minin: 32,
        maxin: 255,
        minout: 0,
        maxout: 243,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: -0.14
    },
    {
      name: "vignette",
      value: 0.28
    },
    {
      name: "toning",
      value: {
        value: 0.07,
        lightColor: "#99ffbb",
        darkColor: "#15378f"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 126, 125, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 130, 121, 255, 255],
          [0, 0, 138, 124, 255, 255]
        ]
      }
    }
  ],
  greered: [
    {
      name: "vibrance",
      value: 0.32
    },
    {
      name: "temperature",
      value: 0.4
    },
    {
      name: "tint",
      value: -0.5
    },
    {
      name: "brightness",
      value: 0.24
    },
    {
      name: "contrast",
      value: -0.1
    },
    {
      name: "vignette",
      value: 0.31
    },
    {
      name: "shadows",
      value: 0.38
    }
  ],
  danligter: [
    {
      name: "saturation",
      value: 0.86
    },
    {
      name: "temperature",
      value: -1
    },
    {
      name: "tint",
      value: -0.92
    },
    {
      name: "brightness",
      value: 0.22
    },
    {
      name: "exposure",
      value: 0.22
    },
    {
      name: "contrast",
      value: 0.1
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 239,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: -0.12
    },
    {
      name: "dehaze",
      value: -0.12
    },
    {
      name: "toning",
      value: {
        value: 0.14,
        lightColor: "#ffd899",
        darkColor: "#00344d"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 255, 255],
          [0, 0, 96, 115, 162, 194, 255, 255],
          [0, 0, 101, 97, 185, 189, 255, 255],
          [0, 0, 144, 130, 222, 228, 255, 255]
        ]
      }
    }
  ],
  trotto: [
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "saturation",
      value: -0.34
    },
    {
      name: "temperature",
      value: 1
    },
    {
      name: "tint",
      value: -0.26
    },
    {
      name: "levels",
      value: {
        minin: 24,
        maxin: 229,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "shadows",
      value: 0.14
    },
    {
      name: "dehaze",
      value: 0.38
    },
    {
      name: "toning",
      value: {
        value: 0.5,
        lightColor: "#46fa82",
        darkColor: "#bf5a20"
      }
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 66, 56, 168, 171, 255, 255],
          [0, 0, 68, 77, 191, 179, 255, 255],
          [0, 0, 73, 80, 173, 166, 255, 255],
          [0, 0, 82, 110, 171, 185, 255, 255]
        ]
      }
    },
    {
      name: "vignette",
      value: 0.14
    }
  ],
  rasky: [
    {
      name: "vibrance",
      value: 1
    },
    {
      name: "saturation",
      value: 1
    },
    {
      name: "temperature",
      value: -0.84
    },
    {
      name: "tint",
      value: 0.34
    },
    {
      name: "dehaze",
      value: 0.52
    },
    {
      name: "toning",
      value: {
        value: 0.39,
        lightColor: "#cbd420",
        darkColor: "#d9180a"
      }
    }
  ],
  garage: [
    {
      name: "tint",
      value: 0.6
    },
    {
      name: "saturation",
      value: -0.04
    },
    {
      name: "shadows",
      value: -1
    },
    {
      name: "grain",
      value: 0.42
    },
    {
      name: "glamour",
      value: 0.3
    }
  ],
  travelster: [
    {
      name: "vibrance",
      value: 0.84
    },
    {
      name: "saturation",
      value: 0.66
    },
    {
      name: "contrast",
      value: 0.24
    },
    {
      name: "levels",
      value: {
        minin: 62,
        maxin: 255,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "highlights",
      value: 0.62
    },
    {
      name: "shadows",
      value: -0.3
    },
    {
      name: "curves",
      value: {
        preset: [
          [0, 32, 136, 111, 255, 255],
          [0, 0, 149, 161, 255, 255],
          [0, 0, 148, 139, 255, 255],
          [0, 0, 99, 173, 164, 213, 255, 255]
        ]
      }
    },
    {
      name: "toning",
      value: {
        value: 0.3,
        lightColor: "#ffd899",
        darkColor: "#334d00"
      }
    },
    {
      name: "sharpen",
      value: 0.24
    },
    {
      name: "grain",
      value: 0.23
    },
    {
      name: "temperature",
      value: 0.72
    },
    {
      name: "vignette",
      value: 0.13
    }
  ],
  strawberry: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#ff0000"
      }
    }
  ],
  clementine: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#ff9e00"
      }
    }
  ],
  pear: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#aaff00"
      }
    }
  ],
  apple: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#00ff55"
      }
    }
  ],
  blueberry: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#00aaff"
      }
    }
  ],
  grapes: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#5500ff"
      }
    }
  ],
  dragon: [
    {
      name: "fill",
      value: {
        value: 0.5,
        mode: "softLight",
        fillColor: "#ff00aa"
      }
    }
  ],
  punch: [
    {
      name: "curves",
      value: {
        preset: [
          [0, 0, 80, 64, 173, 193, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255],
          [0, 0, 255, 255]
        ]
      }
    },
    {
      name: "vibrance",
      value: 0.5
    }
  ],
  bright: [
    {
      name: "highlights",
      value: -0.3
    },
    {
      name: "shadows",
      value: 0.5
    },
    {
      name: "levels",
      value: {
        minin: 0,
        maxin: 215,
        minout: 10,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    }
  ],
  contrast: [
    {
      name: "contrast",
      value: 0.2
    },
    {
      name: "highlights",
      value: 0.2
    },
    {
      name: "levels",
      value: {
        minin: 20,
        maxin: 215,
        minout: 0,
        maxout: 255,
        midin: 1,
        mid: 0.5
      }
    },
    {
      name: "shadows",
      value: 0.4
    }
  ],
  vivid: [
    {
      name: "vibrance",
      value: 0.4
    },
    {
      name: "shadows",
      value: 0.25
    }
  ],
  clairify: [
    {
      name: "clarity",
      value: 0.6
    },
    {
      name: "sharpen",
      value: 0.1
    },
    {
      name: "glamour",
      value: 0.2
    }
  ]
};
class CanvasSQ {
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  distanceTo(e) {
    return Math.sqrt(Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2));
  }
  angleTo(e) {
    let t = -(this.x - e.x), s = this.y - e.y, i = 360 - Math.atan2(s, t) * (180 / Math.PI);
    return i < 0 && (i += 360), i > 360 && (i -= 360), i;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  lengthSQ() {
    return this.dot(this);
  }
  length() {
    return Math.sqrt(this.lengthSQ());
  }
  hypot2() {
    return this.dot(this);
  }
  hypot() {
    return Math.hypot(this.x, this.y);
  }
  add(e) {
    return e ? e instanceof CanvasSQ ? new CanvasSQ(this.x + e.x, this.y + e.y) : new CanvasSQ(this.x + e, this.y + e) : this;
  }
  neg(e) {
    return e instanceof CanvasSQ ? new CanvasSQ(this.x - e.x, this.y - e.y) : new CanvasSQ(this.x - e, this.y - e);
  }
  mul(e) {
    return e instanceof CanvasSQ ? new CanvasSQ(this.x * e.x, this.y * e.y) : new CanvasSQ(this.x * e, this.y * e);
  }
  rotateAround(e, t) {
    let s = Math.sin(t), n = Math.cos(t), a = this.x - e.x, r = this.y - e.y, o = a * s + r * n;
    return new CanvasSQ(a * n - r * s + e.x, o + e.y);
  }
  equalTo(e) {
    return this.x === e.x && this.y === e.y;
  }
  clone() {
    return new CanvasSQ(this.x, this.y);
  }
}
class interpolate {
  constructor(e, t) {
    var s, i, n, a, r, o, h, c, l, d, u, p, g;
    if (e != null && t != null) {
      for (c = e.length - 1, a = [], u = [], h = [], d = [], p = [], i = [], s = [], n = [], o = [], l = [], r = 0; 0 <= c ? r < c : r > c; 0 <= c ? r += 1 : r -= 1)
        a[r] = e[r + 1] - e[r], o[r] = t[r + 1] - t[r], l[r] = o[r] / a[r];
      for (r = 1; 1 <= c ? r < c : r > c; 1 <= c ? r += 1 : r -= 1)
        u[r] = 3 / a[r] * (t[r + 1] - t[r]) - 3 / a[r - 1] * (t[r] - t[r - 1]);
      for (h[0] = 1, d[0] = 0, p[0] = 0, r = 1; 1 <= c ? r < c : r > c; 1 <= c ? r += 1 : r -= 1)
        h[r] = 2 * (e[r + 1] - e[r - 1]) - a[r - 1] * d[r - 1], d[r] = a[r] / h[r], p[r] = (u[r] - a[r - 1] * p[r - 1]) / h[r];
      for (h[c] = 1, p[c] = 0, i[c] = 0, r = g = c - 1; g <= 0 ? r <= 0 : r >= 0; g <= 0 ? r += 1 : r -= 1)
        i[r] = p[r] - d[r] * i[r + 1], s[r] = (t[r + 1] - t[r]) / a[r] - a[r] * (i[r + 1] + 2 * i[r]) / 3, n[r] = (i[r + 1] - i[r]) / (3 * a[r]);
      this.x = e.slice(0, c + 1), this.a = t.slice(0, c), this.b = s, this.c = i.slice(0, c), this.d = n;
    }
  }
  interpolate(e) {
    var t, s, i;
    for (s = i = this.x.length - 1; (i <= 0 ? s <= 0 : s >= 0) && !(this.x[s] <= e); i <= 0 ? s += 1 : s -= 1)
      ;
    return t = e - this.x[s], this.a[s] + this.b[s] * t + this.c[s] * Math.pow(t, 2) + this.d[s] * Math.pow(t, 3);
  }
}
var fragment = "#define GLSLIFY 1\nprecision highp float;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform sampler2D paletteMap;void main(){lowp vec4 base=texture2D(uSampler,vTextureCoord.xy);float r=texture2D(paletteMap,vec2(base.r,0)).r;float g=texture2D(paletteMap,vec2(base.g,0)).g;float b=texture2D(paletteMap,vec2(base.b,0)).b;gl_FragColor=vec4(r,g,b,base.a);}";
class Mapping extends Filter {
  constructor(paletteMap) {
    super(null, fragment);
    this.paletteMap = paletteMap;
  }
  get paletteMap() {
    return this.uniforms.paletteMap;
  }
  set paletteMap(value) {
    const rawdata = new Uint8Array(Array.from(value.data));
    this.uniforms.paletteMap = Texture.fromBuffer(rawdata, rawdata.length / 4, 1);
  }
}
class Curves extends Filter {
  constructor(options) {
    super(null, null);
    this._imageData = new ImageData(256, 1);
    this.options = options;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._mapping.apply(filterManager, input, output, clearMode);
  }
  update() {
    let paletteMap = this._imageData;
    interpolateCanvas.fillPaletteMap(Curves.createCurveSet(this.uniforms.options), paletteMap);
    this.uniforms.paletteMap = paletteMap;
    if (!this._mapping) {
      this._mapping = new Mapping(this.uniforms.paletteMap);
    } else {
      this._mapping.paletteMap = this.uniforms.paletteMap;
    }
  }
  get options() {
    return this.uniforms.options;
  }
  set options(value) {
    this.uniforms.options = value;
    this.update();
  }
  static createCurveSet(e) {
    const t = new Array(), s = new Array(), n = new Array(), a = new Array();
    for (let r = 0; r < e.preset[0].length; r += 2)
      t.push(new CanvasSQ(e.preset[0][r], e.preset[0][r + 1]));
    for (let r = 0; r < e.preset[1].length; r += 2)
      s.push(new CanvasSQ(e.preset[1][r], e.preset[1][r + 1]));
    for (let r = 0; r < e.preset[2].length; r += 2)
      n.push(new CanvasSQ(e.preset[2][r], e.preset[2][r + 1]));
    for (let r = 0; r < e.preset[3].length; r += 2)
      a.push(new CanvasSQ(e.preset[3][r], e.preset[3][r + 1]));
    return new interpolateCanvas(1, t, s, n, a);
  }
}
class interpolateCanvas {
  constructor(e = 255, t = [], s = [], i = [], n = []) {
    this.scale = e, this.rgb = t, this.red = s, this.green = i, this.blue = n, this.percent = 1;
  }
  static getInterpolation(e, t) {
    let s = [], i = [], a = new Float32Array(256);
    for (var r = 0; r < t.length; r++)
      s.push(t[r].x * e), i.push(t[r].y * e);
    let o = new interpolate(s, i);
    for (var h = 0; h < Math.ceil(s[0]); h++)
      a[h] = i[0];
    for (h = Math.ceil(s[0]); h < Math.ceil(s[s.length - 1]); h++)
      a[h] = o.interpolate(h);
    for (h = Math.ceil(s[s.length - 1]); h < 256; h++)
      a[h] = i[i.length - 1];
    return a;
  }
  static fillPaletteMap(e, t) {
    let s = interpolateCanvas.getInterpolation(e.scale, e.rgb), i = interpolateCanvas.getInterpolation(e.scale, e.red), n = interpolateCanvas.getInterpolation(e.scale, e.green), a = interpolateCanvas.getInterpolation(e.scale, e.blue);
    for (let r = 0; r < 256; ++r) {
      let o = r - s[r];
      t.data[4 * r] = r - Math.round((r - (i[r] - o)) * e.percent), t.data[4 * r + 1] = r - Math.round((r - (n[r] - o)) * e.percent), t.data[4 * r + 2] = r - Math.round((r - (a[r] - o)) * e.percent);
    }
  }
}
class LevelMapping {
  constructor(e = 0, t = 255, s = 0, i = 255, n = 1, a = 0.5) {
    this.minin = e, this.maxin = t, this.minout = s, this.maxout = i, this.midin = n, this.mid = a, this.map = (e2) => (e2 = (e2 - this.minin) / (this.maxin - this.minin), e2 = Math.pow(e2, this.midin), (e2 = this.minout + e2 * (this.maxout - this.minout)) > this.maxout ? e2 = this.maxout : e2 < this.minout && (e2 = this.minout), Math.round(e2));
  }
  reset() {
    this.minout = 0, this.maxout = 255, this.midin = 1, this.minin = 0, this.maxin = 255, this.mid = 0.5;
  }
  isFlat() {
    return Boolean(this.minout == 0 && this.maxout == 255 && this.mid == 0.5 && this.minin == 0 && this.maxin == 255);
  }
  setMid(e) {
    this.mid = (e - this.minin) / (this.maxin - this.minin), this.midin = this.midToIn(this.mid);
  }
  midToIn(e) {
    return Math.min(Math.max(Math.pow(9.99, 2 * e - 1), 0.1), 9.99);
  }
  static fillPaletteMap(e, t) {
    for (let s = 0; s < 256; ++s) {
      let i = e.map(s);
      t.data[4 * s] = i, t.data[4 * s + 1] = i, t.data[4 * s + 2] = i;
    }
  }
  static fillRGBPaletteMap(e, t, s, i) {
    for (let n = 0; n < 256; ++n)
      i.data[4 * n] = e ? e.map(n) : n, i.data[4 * n + 1] = t ? t.map(n) : n, i.data[4 * n + 2] = s ? s.map(n) : n;
  }
}
class Levels extends Filter {
  constructor(options) {
    super(null, null);
    this._imageData = new ImageData(256, 1);
    this.options = options;
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    this._mapping.apply(filterManager, input, output, clearMode);
  }
  update() {
    let paletteMap = this._imageData;
    this.uniforms.paletteMap = paletteMap;
    LevelMapping.fillPaletteMap(this.uniforms.options, paletteMap);
    if (!this._mapping) {
      this._mapping = new Mapping(this.uniforms.paletteMap);
    } else {
      this._mapping.paletteMap = this.uniforms.paletteMap;
    }
  }
  get options() {
    return this.uniforms.options;
  }
  set options(value) {
    this.uniforms.options = value;
    this.update();
  }
}
class Preset extends Filter {
  constructor(preset) {
    super(null, null);
    this.filtersArr = [];
    this.filtersArr = presetConfig[preset].map((f) => {
      if (f.name === "curves") {
        return new Curves(f.value);
      }
      if (f.name === "fill") {
        const { value, fillColor, mode } = f.value;
        return new filters[f.name](value, fillColor, mode);
      }
      if (f.name === "levels") {
        const payload = f.value;
        const value = new LevelMapping(Math.round(payload.minin * 1), Math.round(255 - (255 - payload.maxin) * 1));
        return new Levels(value);
      }
      if (f.name === "toning") {
        const { value, lightColor, darkColor } = f.value;
        return new filters[f.name](value, lightColor, darkColor);
      }
      if (f.name === "desaturate") {
        return new filters["saturation"](-1);
      }
      if (f.name === "vignette") {
        if (f.value < 0) {
          return new filters.vignetteWhite(f.value);
        } else {
          return new filters.vignetteBlack(Math.abs(f.value));
        }
      }
      console.log(f.name);
      return new filters[f.name](f.value);
    });
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    let textObj = {};
    for (let i = 0; i < this.filtersArr.length; i++) {
      if (i === 0) {
        if (this.filtersArr.length === 1) {
          this.filtersArr[i].apply(filterManager, input, output, 0);
        } else {
          textObj[i] = filterManager.getFilterTexture();
          this.filtersArr[i].apply(filterManager, input, textObj[i], 0);
        }
      } else if (i === this.filtersArr.length - 1) {
        this.filtersArr[i].apply(filterManager, textObj[i - 1], output, 0);
      } else {
        textObj[i] = filterManager.getFilterTexture();
        this.filtersArr[i].apply(filterManager, textObj[i - 1], textObj[i], 0);
      }
    }
  }
}
const filters = {
  vibrance: Vibrance,
  saturation: Saturation,
  temperature: Temperature,
  tint: Tint,
  hue: Hue,
  brightness: Brightness,
  exposure: Exposure,
  contrast: Contrast,
  black: Black,
  white: White,
  highlights: Highlights,
  shadows: Shadows,
  sharpen: Sharpen,
  clarity: Clarity,
  smooth: Smooth,
  blur: Blur,
  grain: Grain,
  vignetteWhite: VignetteWhite,
  vignetteBlack: VignetteBlack,
  glamour: Glamour,
  bloom: Bloom,
  dehaze: Dehaze,
  toning: Toning,
  fill: Fill
};
export { Black, Bloom, Blur, Brightness, Clarity, Contrast, Dehaze, Exposure, Fill, Glamour, Grain, Highlights, Hue, Preset, Saturation, Shadows, Sharpen, Smooth, Temperature, Tint, Toning, Vibrance, VignetteBlack, VignetteWhite, White, filters };
