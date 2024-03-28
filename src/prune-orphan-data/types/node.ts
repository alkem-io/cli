export enum RelationType {
  OneToOne = 'one-to-one',
  OneToMany = 'one-to-many',
  ManyToOne = 'many-to-one',
  ManyToMany = 'many-to-many',
}

export class Relation {
  constructor(
    public node: Node,
    public refColumnName: string,
    public refChildColumnName: string,
    public fkName: string | undefined = undefined,
    public type: RelationType
  ) {}
}

export class Node {
  public parents: Relation[] = [];
  public children: Relation[] = [];

  constructor(public name: string) {}
}
