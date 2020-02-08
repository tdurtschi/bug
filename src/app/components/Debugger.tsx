import React from "react";

interface Props {
	debug:any;
	
}

interface State {
}

export class Debugger extends React.Component<Props, State>{
	render = () =>
		<pre>
			{window.DEBUG &&
				<p className="debug">
					{JSON.stringify(this.props.debug, null, 4)}
				</p>}
		</pre>

}