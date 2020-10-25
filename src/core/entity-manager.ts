import Entity from "../entities/entity";
import Bug from "../entities/bug/bug";
import Plant from "../entities/plant/plant";

export interface IEntityManager {
	getEntities: () => Entity[]
	addEntity: (entity: Entity) => void
	clearAll: () => void
}

export default class EntityManager implements IEntityManager {
	private entities: Entity[] = []
	constructor(initialEntities: Entity[]) {
		initialEntities.forEach(this.addEntity);
	}

	public clearAll = () => {
		this.entities.splice(0, this.entities.length)
	};

	public getEntities = () => this.entities;

	public addEntity = (entity: Entity) => {
		this.entities.push(entity)
		if (entity instanceof Bug) {
			(entity as Bug).zIndexChanged.subscribe(this.sortEntities())
		}
	}

	sortEntities = () => () => {
		const plants = this.entities.filter(entity => entity instanceof Plant).map(entity => [entity])
		const climbingBugs: Bug[] = this.entities.filter(entity => entity instanceof Bug && entity.climbingOn) as Bug[]

		climbingBugs.forEach(bug => {
			const idx = plants.findIndex(plants => plants[0] === bug.climbingOn.plant)
			plants[idx].push(bug)
		})

		const otherEntities = this.entities.filter(entity =>
			!(entity instanceof Plant
				|| entity instanceof Bug && entity.climbingOn)).map(entity => [entity])

		this.entities = this.flatten([...plants, ...otherEntities].sort((a, b) => {
			return a[0].id - b[0].id
		}));

		window.DEBUG && console.log(this.entities)
	}

	flatten = (list: any[]): any[] => list.reduce(
		(a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []
	);
}