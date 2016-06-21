

const App = React.createClass({
	getInitialState() {
		let mod = 5;
		return {
			items: Array.apply(null, Array(mod)).map(function () {}),
			mod: mod
		}
	},
	setItems(mod){
		var arr = Array.apply(null, Array(mod)).map(function () {});
		this.setState({items:arr});
	},
	updateMod(e) {
		let mod = parseInt(e.target.value),
			arr = Array.apply(null, Array(mod)).map(function () {});
		this.setState({
			mod: mod,
			items: arr
		});
	},
	addItem() {
		let arr = this.state.items;
		arr.push("");
		this.setState({items:arr});
	},
	removeItem() {
		if (this.state.items.length > 1) {
			let arr = this.state.items;
			arr.pop();
			this.setState({items:arr})
		} else {
			return
		}
	},
	getWidth(i){
		return Math.round(100000/i)/1000+"%"
	},
	makeCommonCSS(){
		return `/* common to all queries */
li:first-child {
	width: 100%;
}
li:nth-child(2):last-child {
	margin-left: 25%;
	width: 50%;
}`;
	},
	makeSecondRowCSS(mod) {
		let styles = `\n/* styles for less than ${mod} items */`,i=2;
		for (;i<mod;i++){
			styles+= `\nli:nth-last-child(${i+1}):first-child ~ li { width: ${this.getWidth(i)} }`;
		}
		return styles;
	},
	makeModCSS(mod){
		let query = `\n/* mod query ${mod} */\nli {
	width: ${this.getWidth(mod)};
}
li:nth-last-child(${mod}n+0):first-child ~ li:nth-child(n+2):nth-child(-n+${mod}) {
	width: ${this.getWidth(mod-1)};
}
li:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+${mod+2}) {
	width: ${this.getWidth(mod-1)};
}
li:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
	width: ${this.getWidth(2)};
}`;
	//	if ( mod === 3 ){

//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+${mod+2}) {
//	width: ${this.getWidth(mod-1)};
//}`;
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+${mod-1}) {
//	width: ${this.getWidth(mod-2)};
//}`;
	//}
//		query+="/*  this is the original bit */";
//		query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
//	width: ${this.getWidth(2)};
//}`;
		if (mod > 3) {
			query += "\n/*  this is the dynamic bit */";
			for (let i = 3; i < mod; i++) {
				query += `\nli:nth-last-child(${mod}n+${i}):first-child ~ li:nth-child(n+2):nth-child(-n+${i}) {
	width: ${this.getWidth(i - 1)};
}`;
			}
		}
//		if ( mod === 14 ){
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
//	width: ${this.getWidth(2)};
//}`;
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+6) {
//	width: ${this.getWidth(3)};
//}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 		}
// 		if ( mod === 15 ){
// 		query+="/*  this is the original bit */";
// 			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+7) {
//	width: ${this.getWidth(4)};
//}`;
//			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
//	width: ${this.getWidth(2)};
//}`;
//			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
//	width: ${this.getWidth(3)};
//}`;
//		}
//		if ( mod === 16 ){
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
//	width: ${this.getWidth(2)};
//}`;
//			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+8) {
//	width: ${this.getWidth(5)};
//}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
// 	width: ${this.getWidth(3)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+5):first-child ~ li:nth-child(n+2):nth-child(-n+5) {
// 	width: ${this.getWidth(4)};
// }`;
// 		}
// 		if ( mod === 7 ){
// 			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// //			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+9) {
// //	width: ${this.getWidth(6)};
// //}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
// 	width: ${this.getWidth(3)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+5):first-child ~ li:nth-child(n+2):nth-child(-n+5) {
// 	width: ${this.getWidth(4)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+6):first-child ~ li:nth-child(n+2):nth-child(-n+6) {
// 	width: ${this.getWidth(5)};
// }`;
// 		}
// 		if ( mod === 8 ){
// 			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// //			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+10) {
// //	width: ${this.getWidth(7)};
// //}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
// 	width: ${this.getWidth(3)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+5):first-child ~ li:nth-child(n+2):nth-child(-n+5) {
// 	width: ${this.getWidth(4)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+6):first-child ~ li:nth-child(n+2):nth-child(-n+6) {
// 	width: ${this.getWidth(5)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+7):first-child ~ li:nth-child(n+2):nth-child(-n+7) {
// 	width: ${this.getWidth(6)};
// }`;
// 		}
// 		if ( mod === 9 ){
// 			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// //			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+11) {
// //	width: ${this.getWidth(8)};
// //}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
// 	width: ${this.getWidth(3)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+5):first-child ~ li:nth-child(n+2):nth-child(-n+5) {
// 	width: ${this.getWidth(4)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+6):first-child ~ li:nth-child(n+2):nth-child(-n+6) {
// 	width: ${this.getWidth(5)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+7):first-child ~ li:nth-child(n+2):nth-child(-n+7) {
// 	width: ${this.getWidth(6)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+8):first-child ~ li:nth-child(n+2):nth-child(-n+8) {
// 	width: ${this.getWidth(7)};
// }`;
// 		}
// 		if ( mod === 10 ){
// 			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// //			query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+12) {
// //	width: ${this.getWidth(9)};
// //}`;
// 			query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
// 	width: ${this.getWidth(2)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+4):first-child ~ li:nth-child(n+2):nth-child(-n+4) {
// 	width: ${this.getWidth(3)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+5):first-child ~ li:nth-child(n+2):nth-child(-n+5) {
// 	width: ${this.getWidth(4)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+6):first-child ~ li:nth-child(n+2):nth-child(-n+6) {
// 	width: ${this.getWidth(5)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+7):first-child ~ li:nth-child(n+2):nth-child(-n+7) {
// 	width: ${this.getWidth(6)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+8):first-child ~ li:nth-child(n+2):nth-child(-n+8) {
// 	width: ${this.getWidth(7)};
// }`;
// 			query+= `\nli:nth-last-child(${mod}n+9):first-child ~ li:nth-child(n+2):nth-child(-n+9) {
// 	width: ${this.getWidth(8)};
// }`;
// 		}
		return query;
	},
	componentDidUpdate: function() {
		hljs.initHighlighting.called = false;
		hljs.initHighlighting();
	},
	render() {
		// let mod = this.props.mod;
		// this.state.items = Array.apply(null, Array(mod)).map(function () {});
		//	newArray = Array.apply(null, Array(mod)).map(function () {});
		let itemObjects = this.state.items.map(function(item) {
			return <li className="item"></li>
		}),
			styles = function(m, _this){
				let mod = parseInt(m),
					getWidth = function(i){ return Math.round(100000/i)/1000+"%" },
					width = Math.round(100000/mod)/1000,
					styles,
					i = mod-1,
					query='',
					cssCommon = _this.makeCommonCSS(mod),
					cssRow = _this.makeSecondRowCSS(mod),
					cssMod = _this.makeModCSS(mod),
					common = `/* mod ${mod} */
	li {
		width: ${getWidth(mod)};
	}
	li:first-child {
		width:100%;
	}
	li:nth-child(2):last-child {
	  margin-left: 25%;
	}`;

				query = `li:nth-last-child(${mod}n+0):first-child ~ li:nth-child(n+2):nth-child(-n+${mod}) {
		width: ${getWidth(mod-1)};
	}`;
				if ( mod === 3 ){
					query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+${mod+2}) {
		width: ${getWidth(mod-1)};
	}`;
				}
				if ( mod === 4 ){
					query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
		width: ${getWidth(2)};
	}`;
					query+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+6) {
		width: ${getWidth(3)};
	}`;
					query+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
		width: ${getWidth(2)};
	}`;
				}


				styles = common+"\n"+query;
				// return styles;
				return cssCommon +"\n"+ cssRow +"\n"+ cssMod;
		}(this.state.mod, this)

		return (
			<div>
				<section>
					<p>Select the mod base for your list</p>
					<label htmlFor="element">Mod {this.state.mod}</label>
					<input data-tag={this.state.mod}
						   type="range"
						   step="1"
						   min="3"
						   max="10"
						   onChange={this.updateMod}
						   value={this.state.mod}
						   autoFocus  />
					<div>
						<button onClick={this.addItem} className="btn btn-default"><i className="fa fa-plus-circle "></i> Add Item</button>
						<button onClick={this.removeItem} className="btn btn-default"><i className="fa fa-minus-circle"></i> Remove Item</button>
					</div>
				</section>
				<section>
					<style>{styles}</style>
					<ul>
						{itemObjects}
					</ul>
				</section>
				<section>
					<pre><code class="css">{styles}</code></pre>
				</section>
			</div>
		)
	}
});

const Appold = React.createClass({
	getInitialState() {
		return {
			data: {
				mod: 3
			}
		}
	},
	render() {
		return (
			<div>
				<Example styles={styles} />

			</div>
		);
	}
});


$(document).ready(function() {
	React.render(<App />, document.querySelector('article'));
	hljs.initHighlightingOnLoad();
});
