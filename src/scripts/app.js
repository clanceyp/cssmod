

const App = React.createClass({
	getInitialState() {
		let mod = 3;
		return {
			items: Array.apply(null, Array(mod*2)).map(function () {}),
			mod: mod
		}
	},
	setItems(mod){
		var arr = Array.apply(null, Array(mod)).map(function () {});
		this.setState({items:arr});
	},
	updateMod(e) {
		let mod = parseInt(e.target.value),
			arr = Array.apply(null, Array(mod*2)).map(function () {});
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
	makeFirstChildMessage(mod){
		let styles = `/* first child message */`, i=0;
		for (;i<mod;i++){
			styles+= `\nli:nth-last-child(${mod}n+${i}):first-child:before {\n\tcontent: "Mod ${mod} - remainder ${i}" \n} `;
		}
		return styles;
	},
	makeCommonCSS(mod){
		return `/*\n * mod ${mod}\n * first two, common to all queries\n */
li:first-child {
	width: 100%;
}
li:nth-child(2):last-child {
	margin-left: 25%;
	width: 50%;
}`;
	},
	makeSecondRowCSS(mod) {
		let styles = `/* styles for less than ${mod} items */`,i=2;
		for (;i<mod;i++){
			styles+= `\nli:nth-last-child(${i+1}):first-child ~ li { width: ${this.getWidth(i)} }`;
		}
		return styles;
	},
	makeModCSS(mod){
		let query = `/* mod query ${mod} */\nli {
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
		if (mod > 3) {
			for (let i = 3; i < mod; i++) {
				query += `\nli:nth-last-child(${mod}n+${i}):first-child ~ li:nth-child(n+2):nth-child(-n+${i}) {
	width: ${this.getWidth(i - 1)};
}`;
			}
		}
		return query;
	},
	componentDidUpdate: function() {
		hljs.initHighlighting.called = false;
		hljs.initHighlighting();
	},
	render() {
		let itemObjects = this.state.items.map(function(item) {
			return <li></li>
		}),
			styles = function(m, _this){
				let mod = parseInt(m),
					cssCommon = _this.makeCommonCSS(mod),
					cssRow = _this.makeSecondRowCSS(mod),
					cssMod = _this.makeModCSS(mod),
					firstChildMessage = _this.makeFirstChildMessage(mod);

				return `${cssCommon}\n${cssRow}\n${cssMod}\n${firstChildMessage}\n`;

		}(this.state.mod, this)

		return (
			<div>
				<section>
					<div className="hljs border padding">
						<h2>Select the mod base for your list</h2>
						<label htmlFor="element">Mod {this.state.mod}</label>
						<input data-tag={this.state.mod}
							   type="range"
							   step="1"
							   min="3"
							   max="10"
							   onChange={this.updateMod}
							   value={this.state.mod}
							   autoFocus  />
						<hr />
						<h2>Add/remove list items</h2>
						<div>
							<button onClick={this.addItem} className="btn btn-default"><span className="fa fa-plus-circle "></span> Add Item</button>
							<button onClick={this.removeItem} className="btn btn-default"><span className="fa fa-minus-circle"></span> Remove Item</button>
						</div>
						<div className="explanation" dangerouslySetInnerHTML={{__html: this.props.explanation}} />
					</div>
				</section>
				<section>
					<div class="preview">
						<style dangerouslySetInnerHTML={{__html: styles}} />
						<ul>
							{itemObjects}
						</ul>
					</div>
				</section>
				<section>
					<pre class="styles border"><code class="css">{styles}</code></pre>
				</section>
			</div>
		)
	}
});


$(document).ready(function() {
	const explanation = document.querySelector('.explanation').innerHTML;
	React.render(<App explanation={explanation} />, document.querySelector('article'));
	hljs.initHighlightingOnLoad();
});
