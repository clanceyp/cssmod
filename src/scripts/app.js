const Form = React.createClass({
	getInitialState() {
		return {
			mod: 3
		}
	},
	updateMod(e) {
		this.setState({mod: e.target.value});
		this.props.onUpdate(e.target.value)
	},
	displayAmount(e) {
		this.setState({value: e.target.value});
	},
	render() {
		return (
			<section className="formControl">
				<h2>Build a query</h2>
				<form>
					<div className="inputRow">
						<label htmlFor="element" className="inputLabel">Mod {this.state.mod}</label>
						<input data-tag={this.state.mod}
							   type="range"
							   step="1"
							   min="2"
							   max="10"
							   onChange={this.updateMod}
							   value={this.state.mod}
							   autoFocus ref="mod" required  />
					</div>
				</form>
			</section>
		);
	}
});

const Example = React.createClass({
	getInitialState() {
		return {
			items: ['i', 'i', 'i', 'i', 'i']
		}
	},
	addItem() {
		let newArray = this.state.items;
		newArray.push("i");
		this.setState({arr:newArray});
	},
	removeItem() {
		if (this.state.items.length > 1) {
			let newArray = this.state.items;
			newArray.pop();
			this.setState({arr:newArray})
		} else {
			return
		}
	},
	render() {
		let itemObjects = this.state.items.map(function(item) {
			return <li className="item"></li>
		});
		return (
			<div>
				<style>{this.props.styles}</style>
				<h2>Try it out</h2>
				<p>Your  query will be reflected on the items below by a change in colour. Add and remove items to see the styling be applied when the query matches.</p>
				<header className="controls">
					<div onClick={this.addItem} className="itemClick"><i className="fa fa-plus-circle "></i> Add Item</div>
					<div onClick={this.removeItem} className="itemClick"><i className="fa fa-minus-circle"></i> Remove Item</div>
				</header>
				<section className="itemList">
					<ul>
						{itemObjects}
					</ul>
				</section>
			</div>
		)
	}
});

const Display = React.createClass({
	render() {
		let m = this.props.data.mod || 3,
			mod = parseInt(m),
			getWidth = function(i){ return Math.round(100000/i)/1000+"%" },
			width = Math.round(100000/mod)/1000,
			styles,
			i = mod-1,
			equation='',
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

			equation = `li:nth-last-child(${mod}n+0):first-child ~ li:nth-child(n+2):nth-child(-n+${mod}) {
	width: ${getWidth(mod-1)};
}`;
			if ( mod === 3 ){
				equation+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+${mod+2}) {
	width: ${getWidth(mod-1)};
}`;
			}
			if ( mod === 4 ){
				equation+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
	width: ${getWidth(2)};
}`;
				equation+= `\nli:nth-last-child(${mod}n+2):first-child ~ li:nth-child(n+4):nth-child(-n+6) {
	width: ${getWidth(3)};
}`;
				equation+= `\nli:nth-last-child(${mod}n+3):first-child ~ li:nth-child(n+2):nth-child(-n+3) {
	width: ${getWidth(2)};
}`;
			}


		styles = common+"\n"+equation;
		return (
			<div className="displayBody">
				<Example styles={styles} />
				<section className="equationDisplay">
					<h2>Your Code</h2>
					<p>Copy and paste the code below into your styles</p>
					<pre><code>{styles}</code></pre>
				</section>
			</div>
		);
	}
});

const App = React.createClass({
	getInitialState() {
		return {
			data: {
				mod: ''
			}
		}
	},
	onUpdate(val){
		console.log(val);
		this.setState({
			data: {
				mod: val
			}
		});
	},
	render() {
		return (
			<section className="appBody">
				<Form onUpdate={this.onUpdate} data={this.state.data} />
				<Display data={this.state.data} />
			</section>
		);
	}
});

$(document).ready(function() {
	React.render(<App />, document.querySelector('#content'));
	$(document).on('click', 'p.explain', function() {
		$('#lightbox').addClass('show');
	});
	$(document).on('click', '.closeButton', function() {
		$('#lightbox').removeClass('show');
	});
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { // escape key maps to keycode `27`
	       $('#lightbox').removeClass('show');
	    }
	});
});
