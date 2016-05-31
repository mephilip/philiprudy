var Posts = React.createClass({
    displayName: 'Posts',

    getInitialState: function () {
        return {
            id: '',
            title: '',
            body: ''
        };
    },
    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastPost = result[0];
            this.setState({
                id: lastPost.id,
                title: lastPost.title.rendered,
                body: lastPost.content.rendered
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            this.state.title,
            ' is the title',
            React.createElement('br', null),
            this.state.id,
            ' is teh id',
            React.createElement('br', null),
            'and this is the content:',
            React.createElement('br', null),
            this.state.body
        );
    }
});

ReactDOM.render(React.createElement(Posts, { source: 'http://localhost:8888/philiprudy/wp-json/wp/v2/posts' }), document.getElementById('portfolio'));
//# sourceMappingURL=bundle.js.map
