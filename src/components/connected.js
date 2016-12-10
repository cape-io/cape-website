import { connect } from 'react-redux'
import { menuActions, menuSelector } from '../select/menu'
import MenuEl from './Menu'

export const Menu = connect(menuSelector, menuActions)(MenuEl)
