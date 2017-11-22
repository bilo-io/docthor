import React from 'react';
import './style.scss';
import {Search, MDReader, Icon} from 'bilo-ui';
import FuzzySearch from 'fuzzy-search';
import axios from 'axios';
import config from 'docs.config';
import doctree from './doctree';
import DocsNav from '../../components/DocsNav';
// const fs = require('fs');

export default class Docs extends React.Component {
    constructor(props) {
        super(props)
        console.log(config);
        this.fuzzy = new FuzzySearch(config, ['label', 'children.label', 'children.markdown'])
    }
    componentWillMount() {
        this.setState({
            activeDoc: 'https://raw.githubusercontent.com/bilo-io/bilo-ui/master/README.md',
            docTree: config,
            filteredDocs: config
        }, () => {
            this.selectDoc(this.state.activeDoc)
        })
        this.initAllDocs();
    }
    initAllDocs() {
        let docTree = config;
        console.log({docTree})
        docTree.forEach((group) => {
            group
                .children
                .forEach((section) => {
                    axios
                        .get(section.link)
                        .then((response) => {
                            console.log('200: ', section.link)
                            section.markdown = response
                            this.setState({
                                docTree
                            }, () => {
                                console.log(this.state)
                                this.fuzzy = new FuzzySearch(this.state.docTree, ['label', 'children.label', 'children.markdown'])
                            })
                        })
                        .catch((e) => console.warn('could not fetch: ' + section.link, e))
                })
        })
    }
    searchDocs(tag, q) {
        let result = this
            .fuzzy
            .search(q);
        console.log(`searching: '${q}'\n`, result);
        this.setState({filteredDocs: result})
    }

    selectDoc(doc) {
        console.log(doc);
        this.setState({activeDoc: doc}, () => console.log(this.state))
    }
    render() {
        return this.state ? (
            <div className='page'>
                <div className='menu menu-padding'>
                    <Search
                        placeholder='search...'
                        onChange={() => console.log('nothing')}
                        search={(tag, q) => this.searchDocs(tag, q)}
                    />
                    {/* <Icon name='search' /> */}
                    
                    <DocsNav
                        docSections={this.state.filteredDocs}
                        selectDoc={(doc) => this.selectDoc(doc)}/>
                </div>
                <div className='docs'>
                    <MDReader url={this.state.activeDoc} showHeadings={false}/>
                </div>
            </div>
        ) : null
    }
}