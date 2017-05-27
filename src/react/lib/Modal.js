import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Commands from './Commands'
import { MENU } from '../../core/Constants'
import LostGame from './LostGame'
import Menu from './Menu'
import SaveRank from './SaveRank'
import SavedRank from './SavedRank'
import ScaleModal from 'boron/ScaleModal'
import Scoreboard from './Scoreboard'

const contentStyle = {
  backgroundColor: 'white',
  borderRadius: '4px',
  height: '100%',
  padding: '2em'
}

@observer
class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      running: false
    }
    this.callback = this.callback.bind(this)
    this._getContent = this._getContent.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.startGame = this.startGame.bind(this)
    this.showModal = this.showModal.bind(this)
    this.switchPage = this.switchPage.bind(this)
  }

  callback() {
  }

  componentDidMount() {
    this.showModal()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appState.running && !nextProps.appState.running) {
      this.setState({ running: false })
      this.showModal()
    }
  }

  _getContent() {
    const { switchPage } = this
    const { updateScoreboard, menu, player, rank, saveScore, score, scoreboard } = this.props.appState

    switch (menu) {
      case MENU.DEFAULT: return <Menu onSelect={switchPage}/>
      case MENU.SCOREBOARD: return <Scoreboard onSelect={switchPage} scoreboard={scoreboard} updateScoreboard={updateScoreboard}/>
      case MENU.HOWTOPLAY: return <Commands onSelect={switchPage}/>
      case MENU.LOSTGAME: return <LostGame onSelect={switchPage} rank={rank} score={score}/>
      case MENU.SAVERANK: return <SaveRank onSelect={switchPage} player={player} saveScore={saveScore} score={score}/>
      case MENU.SAVEDRANK: return <SavedRank onSelect={switchPage}/>
    }
  }

  hideModal() {
    this.refs.modal.hide()
  }

  showModal() {
    this.refs.modal.show()
  }

  startGame() {
    this.hideModal()
    this.setState({ running: true })
    this.props.appState.gameStart()
  }

  switchPage(page) {
    page ? this.props.appState.menu = page : this.startGame()
  }

  render() {
    return (
      <div>
        <ScaleModal ref="modal" closeOnClick={false} keyboard={this.callback} contentStyle={contentStyle}>
          <h2 style={{ textAlign: 'center', fontWeight: 300 }}>SNAKE</h2>
          <br/>
          {this._getContent()}
        </ScaleModal>
      </div>
    );
  }
}

Modal.propTypes = {
  appState: PropTypes.object.isRequired
}

export default Modal
