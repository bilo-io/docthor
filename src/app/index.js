import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppTopBar, AppSidenav, AppBody} from 'bilo-ui';
// Components Containers Pages
import About from './pages/about';
import Docs from './pages/docs';
import Home from './pages/home';

require('../app.scss');

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { sidenav } = this.state;
        return (
            <Router>
                <div>
                    <AppTopBar>
                        <img
                            src='https://raw.githubusercontent.com/bilo-io/resources/master/logo/react.png'
                            onClick={() => this.toggleSidenav()}
                            width='48'/>
                        <Link to="/">bilo.bio</Link>
                    </AppTopBar>
                    <AppBody>
                        <AppSidenav isOpen={this.state.sidenav.isOpen}>
                            {sidenav
                                .items
                                .map((page) => {
                                    return <Link
                                        key={page.link}
                                        to={page.link}
                                        className='sidenav-link'
                                        onClick={() => {
                                        this.toggleSidenav()
                                    }}>
                                        {page.name}
                                    </Link>
                                })}
                        </AppSidenav>
                        <Switch>
                            <Route exact path="/" component={Docs} />
                            <Route exact path="/docs" component={Docs}/>
                            <Route exact path="/about" component={About}/>
                        </Switch>
                    </AppBody>
                </div>
            </Router >
        )
    }
    componentWillMount() {
        this.setState({
            sidenav: {
                isOpen: false,
                items: [
                    {
                        link: '/',
                        name: 'home'
                    }, {
                        link: '/about',
                        name: 'about'
                    }
                ]
            }
        })
    }
    toggleSidenav() {
        let sidenav = this.state.sidenav
        this.setState({
            ...this.state,
            sidenav: {
                ...sidenav,
                isOpen: !sidenav.isOpen
            }
        });
    }
}