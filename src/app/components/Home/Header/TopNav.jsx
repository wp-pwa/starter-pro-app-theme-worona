import React from 'react';
import { isIos } from 'worona-deps';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { toggleMobileMenu, closeMobileMenu } from '../../../actions';
import { Menu } from './Menu';
import Cover from './Cover';
import styles from './style.css';
import * as deps from '../../../deps';
import * as libs from '../../../libs';

const TopNav = ({ chosenColor, items, active, toggle, close }) => {
  let navigationMenu = null;
  if (items.length > 0) {
    navigationMenu = (
      <div>
        <span
          className={`nav-toggle is-right ${styles.navigationMenu} ${(active ? 'is-active' : '')}`}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </span>

        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 150 }}
          leave={{ animation: 'slideUp', duration: 150 }}
        >
          {active ? <Menu items={items} active={active} /> : null}
        </VelocityTransitionGroup>
        <Cover hide={!active} onClick={close} />
      </div>
    );
  }
  return (
    <div
      className="hero-head"
      style={{ backgroundColor: chosenColor, color: libs.blackOrWhite(chosenColor) }}
    >
      <div className="container">
        <nav className="nav">
          <div className="nav-left" />
          {navigationMenu}
        </nav>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  chosenColor: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  active: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // eslint-disable-line
  title: deps.selectorCreators.getSetting('generalApp', 'title')(state),
  chosenColor: deps.selectorCreators.getSetting('theme', 'chosenColor')(state),
  items: [
    {
      name: 'Get Help',
      type: 'link',
      url: 'https://www.worona.org/get-help',
    },
  ],
  active: state.theme.showingMobileMenu,
  ios: isIos,
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleMobileMenu()),
  close: () => dispatch(closeMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
