import fs from 'fs'
import path from 'path'
import * as Bull from 'bull'

interface GetJob {
  bull: Bull.Queue;
  handle: any;
}

class JobsQueues {
  private getAllJobs (): Array<GetJob> {
    const jobsList = fs.readdirSync(path.join(__dirname, 'commons', 'jobs'))

    return jobsList.map((pathJob) => {
      return require(path.join(__dirname, 'commons', 'jobs', pathJob)).default
    })
  }

  public initialize (): void {
    const jobs = this.getAllJobs()
    jobs.forEach((job) => {
      job.bull.process(job.handle)
    })
  }
}

export default new JobsQueues().initialize()
