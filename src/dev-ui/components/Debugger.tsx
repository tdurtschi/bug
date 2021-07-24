import React from "react";
import { Game } from "../../core/game-engine";
import Entity from "../../core/entities/entity";

interface Props {
	game: Game;
}

interface State {
	currentEntity?: Entity
}

export class Debugger extends React.Component<Props, State>{
	componentDidMount() {
		this.setState({})
		setInterval(() => this.forceUpdate(), 500)
		document.addEventListener("keydown", this.handleKeyDown)
	}

	render = () => {
		return (
			<pre>
				{window.DEBUG &&
					<p className="debug">
						{this.getMessage()}
					</p>}
			</pre>)
	}

	private getMessage() {
		try
		{
			return JSON.stringify(this.state.currentEntity, null, 4)
		}
		catch (error)
		{
			return "ERROR DISPLAYING DEBUG FOR ENTITY!"
		}
	}

	private handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key)
		{
			case "d":
				window.DEBUG = !window.DEBUG
				break
			case "ArrowLeft":
			case "[":
				this.targetNextEntity()
				break
			case "ArrowRight":
			case "]":
				this.targetPreviousEntity()
				break
		}
	}

	private targetPreviousEntity = () => {
		const entities = this.props.game.entityManager.getEntities()
		if (entities.length < 1) { return }

		const currentIndex = entities.indexOf(this.state.currentEntity)
		let nextIndex = 0
		if (typeof currentIndex == "number" && currentIndex + 1 < entities.length)
		{
			nextIndex = currentIndex + 1
		}
		this.setState({ currentEntity: entities[nextIndex] })
	}

	private targetNextEntity = () => {
		const entities = this.props.game.entityManager.getEntities()
		if (entities.length < 1) { return }

		const currentIndex = entities.indexOf(this.state.currentEntity)
		let nextIndex = entities.length - 1
		if (typeof currentIndex == "number" && currentIndex > 0)
		{
			nextIndex = currentIndex - 1
		}
		this.setState({ currentEntity: entities[nextIndex] })
	}
}