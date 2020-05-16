import bind from './jsonFactory.service'
import { Tanator } from '~/types/classes/Tanator'

const HISTORY_KEY = 'HISTORY_KEY'

const getHistory = (): Promise<Tanator[]> => {
  return new Promise<Tanator[]>((resolve, reject) => {
    try {
      const rawItems = JSON.parse(<string>localStorage.getItem(HISTORY_KEY))
      resolve(bind(rawItems, Tanator))
    } catch (ex) {
      reject(ex)
    }
  })
}

const addItemToHistory = async (profile: Tanator): Promise<void> => {
  const history = await getHistory()
  history.push(profile)

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export { getHistory, addItemToHistory }
