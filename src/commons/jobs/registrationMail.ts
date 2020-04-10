import nodeMailer from '../libs/mail'
import BaseJob from '../utils/baseJob'

type Done = (error?: Error) => void

class RegistrationMail extends BaseJob {
  constructor () {
    super()
    this.name = 'RegistrationMail'
    this.initialize = this.initialize.bind(this)
  }

  public handle = async (data: { email: string; name: string }, done: Done): Promise<void> => {
    try {
      await nodeMailer.sendMail({
        from: 'nextgymnoreply@gmail.com',
        to: data.email,
        subject: 'Bem-vindo',
        text: `Olá ${data.name}, Parabéns por se registrar em nossa plataforma`
      })
      done()
      console.log('chegou aqui')
    } catch (error) {
      done(error)
      console.log('chegou aqui Error')
    }
  }
}

export default new RegistrationMail().initialize()
