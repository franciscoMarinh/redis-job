import Bull from 'bull'
import config from '../config/redis.config'

export default class BaseJob {
  public name: string
  public handle: any
  initialize () {
    return {
      bull: new Bull(this.name, config.uri),
      handle: this.handle
    }
  }
}
