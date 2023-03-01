import Manager from "../manager"

class MongoManager implements Manager {
  public clear(): void {
    throw new Error('Method not implemented.')
  }
  public print(): void {
    throw new Error('Method not implemented.')
  }
  public printConfig(): void {
    throw new Error('Method not implemented.')
  }
}

export default MongoManager
