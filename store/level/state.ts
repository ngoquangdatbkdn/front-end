import {Common} from '~/modals'

export interface LevelState {
  levels: Common[];
}

const state = (): LevelState => ({
  levels: []
})

export default state
