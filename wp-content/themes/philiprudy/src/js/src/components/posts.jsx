var Posts = React.createClass({
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
        return (
            <div>
                {this.state.title} is the title<br />
                {this.state.id} is teh id<br />
                and this is the content:<br />
                {this.state.body}
            </div>
        );
    }
});

ReactDOM.render(
    <Posts source="http://localhost:8888/philiprudy/wp-json/wp/v2/posts" />,
    document.getElementById('portfolio')
);