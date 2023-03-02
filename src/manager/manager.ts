import { Consumer } from "Consumer"
import { Producer } from "Producer"

abstract class Manager {
  static sharedInstance: Manager

  public readonly abstract producer: Producer
  public readonly abstract consumers: Consumer[]

  public abstract clear(): void
  public abstract print(): void
  public abstract printArchive(): void
  public abstract printDeadLetter(): void
  public abstract printConfig(): void
}

export default Manager
