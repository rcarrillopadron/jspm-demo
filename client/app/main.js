/**
 * Created by Roberto on 9/22/2015.
 */
import 'whatwg-fetch';
import React from 'react';
import RepositoryList from './repository-list';

class HelloWorld extends React.Component{
    render() {
        return (
            <div>
                <h2>Open source</h2>
                <RepositoryList />
            </div>
        );
    }
}

React.render(<HelloWorld />, document.body);