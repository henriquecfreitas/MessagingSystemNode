abstract class Manager {
  static sharedInstance: Manager
  public abstract clear(): void
  public abstract print(): void
  public abstract printConfig(): void
}

export default Manager
