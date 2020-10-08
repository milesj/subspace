(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{73:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return l})),o.d(t,"metadata",(function(){return c})),o.d(t,"rightToc",(function(){return i})),o.d(t,"default",(function(){return p}));var n=o(2),r=o(6),a=(o(0),o(86)),l={title:"PathResolver"},c={unversionedId:"common/path-resolver",id:"common/path-resolver",isDocsHomePage:!1,title:"PathResolver",description:"A PathResolver can be used to find a real path amongst a list of possible lookups. A lookup is",source:"@site/docs/common/path-resolver.md",slug:"/common/path-resolver",permalink:"/docs/common/path-resolver",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/common/path-resolver.md",version:"current",sidebar:"docs",previous:{title:"Path",permalink:"/docs/common/path"},next:{title:"Project",permalink:"/docs/common/project"}},i=[{value:"API",id:"api",children:[{value:"<code>getLookupPaths</code>",id:"getlookuppaths",children:[]},{value:"<code>lookupFilePath</code>",id:"lookupfilepath",children:[]},{value:"<code>lookupNodeModule</code>",id:"lookupnodemodule",children:[]},{value:"<code>resolve</code>",id:"resolve",children:[]},{value:"<code>resolvePath</code>",id:"resolvepath",children:[]}]}],s={rightToc:i};function p(e){var t=e.components,o=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A ",Object(a.b)("inlineCode",{parentName:"p"},"PathResolver")," can be used to find a real path amongst a list of possible lookups. A lookup is\neither a file system path or a Node.js module. If a path is found, an absolute resolved\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/common/path"}),Object(a.b)("inlineCode",{parentName:"a"},"Path"))," instance is returned, otherwise an error is thrown."),Object(a.b)("p",null,"A perfect scenario for this mechanism would be finding a valid configuration file, which we'll\ndemonstrate below. Import and instantiate the class to begin."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { PathResolver } from '@boost/common';\n\nconst resolver = new PathResolver();\n")),Object(a.b)("p",null,"To add a file system lookup, use the ",Object(a.b)("inlineCode",{parentName:"p"},"PathResolver#lookupFilePath()")," method, which requires a path\nand an optional current working directory (defaults to ",Object(a.b)("inlineCode",{parentName:"p"},"process.cwd()"),")."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"// Look in current directory\nresolver\n  .lookupFilePath('tool.config.js')\n  .lookupFilePath('tool.config.json')\n  .lookupFilePath('tool.config.yaml');\n\n// Look in a folder\nresolver.lookupFilePath('configs/tool.js');\n\n// Look in user's home directory\nresolver.lookupFilePath('tool.config.js', os.homedir());\n")),Object(a.b)("p",null,"And to add a Node.js module lookup, use the ",Object(a.b)("inlineCode",{parentName:"p"},"PathResolver#lookupNodeModule()")," method, which accepts\na module name or path."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"// Look in module (assuming index export)\nresolver.lookupNodeModule('tool-config-module');\n\n// Look in module with sub-path\nresolver.lookupNodeModule('tool-config-module/lib/configs/tool.js');\n")),Object(a.b)("p",null,"Once all the lookup paths have been defined, the ",Object(a.b)("inlineCode",{parentName:"p"},"PathResolver#resolve()")," method will iterate\nthrough them in order until one is found. If a file system path, ",Object(a.b)("inlineCode",{parentName:"p"},"fs.existsSync()")," will be used to\ncheck for existence, while ",Object(a.b)("inlineCode",{parentName:"p"},"require.resolve()")," will be used for Node.js modules. If found, a result\nobject will be returned with the resolved ",Object(a.b)("inlineCode",{parentName:"p"},"Path")," and original lookup parts."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const { originalPath, resolvedPath, type } = resolver.resolve();\n")),Object(a.b)("p",null,"If you'd prefer to only have the resolved path returned, the ",Object(a.b)("inlineCode",{parentName:"p"},"PathResolver#resolvePath()")," method can\nbe used instead."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const resolvedPath = resolver.resolvePath();\n")),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)("h3",{id:"getlookuppaths"},Object(a.b)("inlineCode",{parentName:"h3"},"getLookupPaths")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"PathResolver#getLookupPaths(): string[]")),Object(a.b)("p",null,"Return a list of all lookup paths that have been registered."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"resolver.lookupFilePath('file.js').lookupNodeModule('module-name');\n\nconst paths = resolver.getLookupPaths(); // => ['file.js', 'module-name']\n")),Object(a.b)("h3",{id:"lookupfilepath"},Object(a.b)("inlineCode",{parentName:"h3"},"lookupFilePath")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"PathResolver#lookupFilePath(filePath: PortablePath, cwd?: PortablePath): this")),Object(a.b)("p",null,"Add a file system path to look for, resolved against the defined current working directory (or\n",Object(a.b)("inlineCode",{parentName:"p"},"process.cwd()")," otherwise)."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"resolver.lookupFilePath('./some/path/to/file.js');\n")),Object(a.b)("h3",{id:"lookupnodemodule"},Object(a.b)("inlineCode",{parentName:"h3"},"lookupNodeModule")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"PathResolver#lookupNodeModule(modulePath: PortablePath): this")),Object(a.b)("p",null,"Add a Node.js module, either by name or relative path, to look for."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"resolver.lookupNodeModule('module-name');\n")),Object(a.b)("h3",{id:"resolve"},Object(a.b)("inlineCode",{parentName:"h3"},"resolve")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"PathResolver#resolve(): { originalPath: Path; resolvedPath: Path; type: LookupType; }")),Object(a.b)("p",null,"Given a list of lookups, attempt to find the first real/existing path and return a resolved absolute\npath. If a file system path, will check using ",Object(a.b)("inlineCode",{parentName:"p"},"fs.exists"),". If a node module path, will check using\n",Object(a.b)("inlineCode",{parentName:"p"},"require.resolve"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const { originalPath, resolvedPath, type } = resolver.resolve();\n")),Object(a.b)("h3",{id:"resolvepath"},Object(a.b)("inlineCode",{parentName:"h3"},"resolvePath")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"PathResolver#resolvePath(): Path")),Object(a.b)("p",null,"Like ",Object(a.b)("inlineCode",{parentName:"p"},"resolve()")," but only returns the resolved path."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const resolvedPath = resolver.resolvePath();\n")))}p.isMDXComponent=!0},86:function(e,t,o){"use strict";o.d(t,"a",(function(){return u})),o.d(t,"b",(function(){return h}));var n=o(0),r=o.n(n);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):c(c({},t),e)),o},u=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(o),d=n,h=u["".concat(l,".").concat(d)]||u[d]||b[d]||a;return o?r.a.createElement(h,c(c({ref:t},s),{},{components:o})):r.a.createElement(h,c({ref:t},s))}));function h(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,l=new Array(a);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var s=2;s<a;s++)l[s]=o[s];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,o)}d.displayName="MDXCreateElement"}}]);